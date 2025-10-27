// app/routes/my-app-proxy.tsx
import { LoaderFunctionArgs, type ActionFunction } from "react-router";
import { authenticate } from "../shopify.server"
import { useLoaderData } from "react-router";
import { cors } from "remix-utils/cors";

const baseURL = 'https://stg-loyalty-web.azurewebsites.net/api/v1'


export const action: ActionFunction = async ({ request }) => {
  console.log('----proxy hit----')
  const { session, storefront } = await authenticate.public.appProxy(request);

  if (!session || !storefront) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log('session', session, 'storefront', storefront)

  // Read login credentials from the POST body
  const {username, password} = await request.json();

  if (typeof username !== "string" || typeof password !== "string") {
    return new Response("Invalid input", { status: 400 });
  }

  const apiUrl = `${baseURL}/login`;
  // Read URL parameters added by Shopify when proxying
  const url = new URL(request.url);

  return {
    shop: url.searchParams.get("shop"),
    loggedInCustomerId: url.searchParams.get("logged_in_customer_id"),
  };

  // try {
  //   const apiResponse = await fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Optional: Forward Shopify info
  //       // "X-Shopify-Shop-Domain": storefront.shop,
  //     },
  //     body: JSON.stringify({ username, password }),
  //   });

  //   const result = await apiResponse.json();

  //   if (!apiResponse.ok) {
  //     return Response.json({ error: result.message || "Login failed" }, { status: apiResponse.status });
  //   }

  //   // Return successful login response
  //   return Response.json({ success: true, user: result });
  // } catch (err) {
  //   console.error("Login API call failed", err);
  //   return new Response("Internal error", { status: 500 });
  // }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log('=== LOADER HIT ===');
  console.log('Method:', request.method);
  
  // Handle OPTIONS preflight FIRST - before authentication
  // if (request.method === "OPTIONS") {
  //   console.log('✅ Handling OPTIONS in loader');
  //   const response = Response.json({ status: "ok" }, { status: 200 });
  //   return await cors(request, response);
  // }
  
  // Now authenticate for GET requests
  const {cors} = await authenticate.admin(request);
  await authenticate.public.appProxy(request);
  
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const loggedInCustomerId = url.searchParams.get("logged_in_customer_id");
  
  console.log('Shop:', shop);
  console.log('Customer ID:', loggedInCustomerId);
  
  const responseData = {
    success: true,
    message: `Hello from ${shop}`,
    shop: shop || 'unknown',
    customerId: loggedInCustomerId || null,
    timestamp: new Date().toISOString(),
  };
  
  // Wrap response with CORS
  const response = Response.json(responseData);
  return await cors(request, response);
};


export default function MyAppProxy() {
  const { shop, loggedInCustomerId } = useLoaderData();

  return <div>{`Hello world from ${loggedInCustomerId || "not-logged-in"} on ${shop}`}</div>;
}