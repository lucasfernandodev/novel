import { useRouteError } from "react-router-dom";
import { Layout } from "../../layout/Layout";

export default function ErrorPage() {
  const error = useRouteError() as { statusText: string, message: string };
  return (
    <Layout>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Layout>
  );
}