import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";
import { Caraousal } from "../components/Caraousal";
import ContactUs from "../contact/ContactUs";
export default function Home() {
  return (
  <div className="Pathik-Main bg-[#ebd7a7]">
  
    <Navbar />
    <Caraousal/>
    <ContactUs/>
    <Footer />
  </div>
  );
}
