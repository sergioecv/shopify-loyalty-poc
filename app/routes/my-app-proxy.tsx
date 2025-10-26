// app/routes/my-app-proxy.tsx
import { type ActionFunction } from "react-router";
import { authenticate } from "../shopify.server"
import { useLoaderData } from "react-router";

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

export const loader = async ({ request }) => {
  console.log('-proxy hit-')
  // Use the authentication API from the React Router template
  await authenticate.public.appProxy(request);

  // Read URL parameters added by Shopify when proxying
  const url = new URL(request.url);
  console.log('url')
  console.log(url)

  // const externalResponse = await fetch("https://jsonplaceholder.typicode.com/users/1");
  // const externalData = await externalResponse.json();

  // async function newLogin(username, password) { 
  //   const res = await fetch("https://testing-app-123803528.myshopify.com/apps/my-custom-path", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       // 'Access-Control-Allow-Origin': '*'
  //       // 'X-Shopify-Access-Token': 'yeecki'
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password
  //     })
  //   });

  //   const data = await res.json();
  //   console.log(data);
  // }

  // const user = await newLogin('sergiochz10@gmail.com', 'raIdar.23');


  

  return {
    shop: url.searchParams.get("shop") || 'e',
    loggedInCustomerId: url.searchParams.get("logged_in_customer_id") || "e",
  };
};

export default function MyAppProxy() {
  const { shop, loggedInCustomerId } = useLoaderData();

  return <div>{`Hello world from ${loggedInCustomerId || "not-logged-in"} on ${shop}`}</div>;
}