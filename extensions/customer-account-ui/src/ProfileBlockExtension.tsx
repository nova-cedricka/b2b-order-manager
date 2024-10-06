import {
  reactExtension,
  Link,
  Card,
  InlineStack,
  Text,
} from "@shopify/ui-extensions-react/customer-account";

export default reactExtension("customer-account.profile.block.render", () => (
  <BlockExtension />
));

function BlockExtension() {
  return (
    <Card padding>
      <InlineStack inlineAlignment="center" spacing="tight">
        <Link to="extension:customer-account-ui/">View Draft Order</Link>
      </InlineStack>
    </Card>
  );
}
