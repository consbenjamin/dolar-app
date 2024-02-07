import "@/styles/globals.css";
import Nav from '../components/Nav'
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <div className=" max-w-screen-xl sm:mx-auto mx-2 ">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
