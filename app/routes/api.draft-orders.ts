import { json, LoaderFunction } from "@remix-run/node";
import { authenticate } from "app/shopify.server";
import { RequestToken } from "utils/RequestToken";
import { createAdminApiClient } from "@shopify/admin-api-client";

export const loader: LoaderFunction = async ({ request }) => {
  /*const shopifyAdminClient = createAdminApiClient({
    apiVersion: "2024-01",
    accessToken: process.env.ADMIN_API_ACCESS_TOKEN ?? "",
    storeDomain: process.env.PUBLIC_STORE_DOMAIN ?? "",
  }); */

  /* const { admin } = await authenticate.public.appProxy(request);
  const { cors } = await authenticate.public.customerAccount(request);

  const customerId = new URL(request.url).searchParams.get(
    "logged_in_customer_id",
  );

  if (!admin) {
    console.error("Something went wrong with proxy authentification.");
    return json({ error: "Something went wrong" }, { status: 400 });
  }

  if (!customerId) {
    return json({ error: "Customer must be logged in." }, { status: 400 });
  }

  const response = await admin
    .graphql(GET_DRAFT_ORDERS)
    .then((response) => response.json());
  const draftOrders = response.data?.draftOrders; 

  if (!draftOrders) {
    console.error("Draft Orders Query failed.");
    return json({ error: "Something went wrong" }, { status: 400 });
  }
  */

  console.log("sending data");
  return json(process.env);
};

export const GET_DRAFT_ORDERS = `#graphql
  query {
    draftOrders(first: 10) {
      edges {
        node {
          id
        }
      }
    }
  }
` as const;
