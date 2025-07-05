import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      {/* <Navbar /> */}
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </RecoilRoot>
  );
}