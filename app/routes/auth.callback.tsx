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
    console.log('clientID', process.env.SHOPIFY_CLIENT_ID, code)
    console.log('secret', process.env.SHOPIFY_APP_SECRET)

  // Validate required parameters
  if (!code || !shop) {
    console.error('Missing OAuth parameters:', { code: !!code, shop: !!shop });
    throw new Response('Invalid OAuth callback - missing parameters', { status: 400 });
  }

  try {
    // import.meta.env.VITE_API_ENDPOINT || 
    const params = new URLSearchParams({
        client_id: process.env.SHOPIFY_CLIENT_ID || '',
        client_secret: process.env.SHOPIFY_APP_SECRET || '',
        code,
        shopName: shop
      });
    const response = await fetch(`https://stg-loyalty-tigres-api.azurewebsites.net/admin/shopify/install?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    //   body: JSON.stringify({
    //     client_id: process.env.SHOPIFY_API_KEY,
    //     client_secret: process.env.SHOPIFY_API_SECRET,
    //     code,
    //     shopName: 'k5an0a-iz.myshopify.com'
    //   })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', response.status, errorData);
      throw new Response('Failed to exchange authorization code', { status: response.status });
    }

    if (response.status === 204) {
        console.log('Token exchange successful for shop:', shop);
        const storeName = shop.split('.')[0];
        return redirect(`https://admin.shopify.com/store/${storeName}/`);
    }

    const data = await response.json();
    console.log('Token exchange successful for shop:', shop);
    console.log('response:', data)
    // https://[shop].myshopify.com/admin/oauth/authorize?client_id=ba221144a193b2f27582531c62e48d2d&scope=write_app_proxy,write_products&redirect_uri=https://shopify-loyalty-poc.onrender.com/&state=212a8b839860d1aefb258aaffcdbd63f

    console.log('clientID', process.env.SHOPIFY_CLIENT_ID, code)
    console.log('secret', process.env.SHOPIFY_APP_SECRET)

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