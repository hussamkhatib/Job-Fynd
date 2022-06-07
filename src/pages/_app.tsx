import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import AuthGuard from "../components/AuthGuard";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

const queryClient = new QueryClient();

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer autoClose={3000} hideProgressBar={true} />
        </QueryClientProvider>
      </AuthGuard>
    </SessionProvider>
  );
}
export default App;
