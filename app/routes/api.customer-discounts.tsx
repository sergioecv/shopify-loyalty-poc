import { LoaderFunction } from 'react-router';
import { authenticate } from '../shopify.server';

export const loader: LoaderFunction = async ({ request }) => {
  const { cors } = await authenticate.admin(request);
  
  // Your app logic here
  const data = {
    message: 'Hello from your server',
    timestamp: new Date().toISOString(),
  };
  
  return cors(Response.json(data));
};