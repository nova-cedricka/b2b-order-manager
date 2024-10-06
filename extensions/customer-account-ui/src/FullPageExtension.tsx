import {
  reactExtension,
  Banner,
  useApi,
} from "@shopify/ui-extensions-react/customer-account";
import { useEffect } from "react";

export default reactExtension("customer-account.page.render", () => (
  <FullPage />
));

const url = "https://buck-spam-dictionary-phrase.trycloudflare.com/";

function FullPage() {
  const { sessionToken } = useApi();

  useEffect(() => {
    async function queryApi() {
      const token = await sessionToken.get();

      console.log("sessionToken.get()", token);

      const apiResponse = await fetchWithToken(token);

      console.log("API response", apiResponse);
    }

    async function fetchWithToken(token: string) {
      const result = await fetch(url + "/api/draft-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await result.json();

      return data;
    }

    queryApi();
  }, [sessionToken]);
  return <Banner>See console for API response</Banner>;
}
