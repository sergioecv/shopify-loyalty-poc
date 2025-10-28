import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { authenticate } from '../../shopify.server';

// export const loader: LoaderFunction = async ({ request }) => {
//   const { cors } = await authenticate.admin(request);
  
//   // Your app logic here
//   const data = {
//     message: 'Hello from your server',
//     timestamp: new Date().toISOString(),
//   };
  
//   return cors(Response.json(data));
// };

// Loader for GET requests
export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { sessionToken, cors } = await authenticate.public.customerAccount(request);
    // const offers = await getOffers({ shop: sessionToken.dest, customerId: sessionToken.sub });
    console.log('app',sessionToken)
    const offers = {'content': 'a'}
    return cors({ offers });
  };
  
  // Action for POST requests (if needed)
  export const action = async ({ request }: ActionFunctionArgs) => {
    const { sessionToken, cors } = await authenticate.public.customerAccount(request);
    // Handle POST logic here
    console.log('app',sessionToken)
    return cors({ success: true });
  };