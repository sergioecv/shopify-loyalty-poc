import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";

/**
 * Helper function to create CORS headers
 * These headers are CRITICAL for Customer Account UI Extensions
 * which run in a Web Worker with null origin
 */
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // Required for null origin (Web Workers)
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
  };
}

/**
 * LOADER: Handles GET and HEAD requests
 * This is what you already had, but now with CORS headers
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log('=== APP PROXY LOADER ===');
  console.log('Method:', request.method);
  console.log('URL:', request.url);
  
  try {
    // Authenticate the request using Shopify's app proxy authentication
    await authenticate.public.appProxy(request);
    
    // Extract URL parameters that Shopify adds to the request
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    const loggedInCustomerId = url.searchParams.get("logged_in_customer_id");
    const pathPrefix = url.searchParams.get("path_prefix");
    const timestamp = url.searchParams.get("timestamp");
    
    console.log('Shop:', shop);
    console.log('Customer ID:', loggedInCustomerId);
    console.log('Path Prefix:', pathPrefix);
    
    // Your business logic here
    // Example: Fetch customer data, query metafields, etc.
    const responseData = {
      success: true,
      message: `Hello world from ${loggedInCustomerId || "not-logged-in"} on ${shop}`,
      shop: shop || 'unknown',
      customerId: loggedInCustomerId || null,
      timestamp: new Date().toISOString(),
      // Add your data here
    };
    
    // Return JSON response with CORS headers
    return Response.json(responseData, {
      headers: getCorsHeaders(),
    });
    
  } catch (error) {
    console.error('Error in loader:', error);
    return Response.json(
      { 
        success: false, 
        error: "Failed to process request",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { 
        status: 500,
        headers: getCorsHeaders(),
      }
    );
  }
};

/**
 * ACTION: Handles POST, PUT, DELETE, PATCH, and OPTIONS requests
 * THIS IS THE KEY TO FIXING YOUR CORS ISSUE!
 * 
 * Why you need this:
 * - React Router loaders only handle GET/HEAD
 * - OPTIONS preflight requests need to be handled here
 * - POST/PUT/DELETE requests also need to be handled here
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('=== APP PROXY ACTION ===');
  console.log('Method:', request.method);
  console.log('URL:', request.url);
  
  /**
   * CRITICAL: Handle OPTIONS preflight request
   * This is sent by the browser BEFORE the actual request
   * when making CORS requests from a Web Worker
   */
  if (request.method === "OPTIONS") {
    console.log('✅ Handling OPTIONS preflight request');
    return new Response(null, {
      status: 204, // No Content - this is the correct status for OPTIONS
      headers: getCorsHeaders(),
    });
  }
  
  try {
    // Authenticate the request for non-OPTIONS methods
    await authenticate.public.appProxy(request);
    
    // Extract URL parameters
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    const loggedInCustomerId = url.searchParams.get("logged_in_customer_id");
    
    console.log('Shop:', shop);
    console.log('Customer ID:', loggedInCustomerId);
    
    // Handle different HTTP methods
    if (request.method === "POST" || request.method === "PUT") {
      // Parse the request body
      let body;
      try {
        body = await request.json();
        console.log('Request body:', body);
      } catch (parseError) {
        console.error('Failed to parse request body:', parseError);
        return Response.json(
          { 
            success: false, 
            error: "Invalid JSON in request body" 
          },
          { 
            status: 400,
            headers: getCorsHeaders(),
          }
        );
      }
      
      /**
       * YOUR BUSINESS LOGIC GOES HERE
       * 
       * Examples of what you can do:
       * 
       * 1. Save to database:
       *    await prisma.loyaltyPoints.create({ data: { ... } })
       * 
       * 2. Call Shopify Admin API:
       *    const { admin } = await authenticate.public.appProxy(request);
       *    const response = await admin.graphql(`...your query...`);
       * 
       * 3. Update metafields:
       *    await admin.graphql(`
       *      mutation {
       *        customerUpdate(input: { ... }) { ... }
       *      }
       *    `);
       * 
       * 4. Call external API:
       *    const externalData = await fetch('https://your-api.com/endpoint');
       */
      
      // Example response
      const responseData = {
        success: true,
        message: "Data processed successfully",
        receivedData: body,
        shop: shop,
        customerId: loggedInCustomerId,
        processedAt: new Date().toISOString(),
      };
      
      return Response.json(responseData, {
        status: 200,
        headers: getCorsHeaders(),
      });
    }
    
    // Handle DELETE requests
    if (request.method === "DELETE") {
      console.log('Handling DELETE request');
      
      // Your delete logic here
      
      return Response.json(
        { 
          success: true, 
          message: "Resource deleted successfully" 
        },
        { 
          status: 200,
          headers: getCorsHeaders(),
        }
      );
    }
    
    // Default response for other methods
    return Response.json(
      { 
        success: false,
        error: `Method ${request.method} not implemented` 
      },
      { 
        status: 405,
        headers: getCorsHeaders(),
      }
    );
    
  } catch (error) {
    console.error('Error in action:', error);
    return Response.json(
      { 
        success: false, 
        error: "Failed to process request",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { 
        status: 500,
        headers: getCorsHeaders(),
      }
    );
  }
};

/**
 * OPTIONAL: Default component
 * This is rendered if someone navigates directly to the proxy URL in a browser
 * It's not used by the extension, but can be helpful for debugging
 */
export default function MyAppProxy() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>App Proxy Endpoint</h1>
      <p>This endpoint is designed to be called via fetch from a Shopify UI extension.</p>
      <p>If youre seeing this page, the endpoint is working and accessible.</p>
      
      <h2>How to use:</h2>
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
{`// From your Customer Account UI Extension:
const response = await fetch('/apps/my-custom-path', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // your data here
  }),
});

const data = await response.json();
console.log(data);`}
      </pre>
    </div>
  );
}