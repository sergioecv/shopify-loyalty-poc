import { redirect } from 'react-router';

/**
 * Loader for Shopify OAuth callback
 * Receives the authorization code from Shopify and exchanges it via your API
 * Then redirects to the Shopify admin
 */
export async function loader({ request }) {
  const url = new URL(request.url);
  
  // Extract OAuth parameters from URL
  const code = url.searchParams.get('code');
  const shop = url.searchParams.get('shop');
  const hmac = url.searchParams.get('hmac');
  const state = url.searchParams.get('state');

  console.log('This url', url)

  // Validate required parameters
  if (!code || !shop) {
    console.error('Missing OAuth parameters:', { code: !!code, shop: !!shop });
    throw new Response('Invalid OAuth callback - missing parameters', { status: 400 });
  }

  try {
    // Call your API to exchange the code for an access token
    // const response = await fetch(import.meta.env.VITE_API_ENDPOINT || 'https://shopify-loyalty-poc.onrender.com', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     client_id: process.env.SHOPIFY_API_KEY,
    //     client_secret: process.env.SHOPIFY_API_SECRET,
    //     code,
    //   })
    // });

    // if (!response.ok) {
    //   const errorData = await response.json().catch(() => ({}));
    //   console.error('API error:', response.status, errorData);
    //   throw new Response('Failed to exchange authorization code', { status: response.status });
    // }

    // const data = await response.json();
    // console.log('Token exchange successful for shop:', shop);
    https://[shop].myshopify.com/admin/oauth/authorize?client_id=ba221144a193b2f27582531c62e48d2d&scope=write_app_proxy,write_products&redirect_uri=https://shopify-loyalty-poc.onrender.com/&state=212a8b839860d1aefb258aaffcdbd63f

    console.log('clientID', process.env.SHOPIFY_API_KEY, code)
    console.log('secret', process.env.SHOPIFY_API_SECRET)

    // Extract store name (remove .myshopify.com suffix)
    const storeName = shop.split('.')[0];

    // Redirect to Shopify admin
    return redirect(`https://admin.shopify.com/store/${storeName}/`);

  } catch (error) {
    console.error('Shopify OAuth callback error:', error);
    
    if (error instanceof Response) {
      throw error;
    }
    
    throw new Response('OAuth callback failed', { status: 500 });
  }
}

// No component needed - loader handles everything
export default function ShopifyCallbackRoute() {
  return null;
}