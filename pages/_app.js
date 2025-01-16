import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import {BrowserRouter} from 'react-router-dom';
export default function App({ Component, pageProps }) {
  
  return <>
   
  <RecoilRoot> 
    <Component {...pageProps} />
  </RecoilRoot>;
 
  </>
}
