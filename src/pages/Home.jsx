import Banner from "@/components/home/Banner/Index";
import BestProducts from "@/components/home/BestProduct/Index";
import Category from "@/components/home/Category/Index";
import Features from "@/components/home/Features/Index";
import ProductVariant from "@/components/home/ProductVariant/Index";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("guestId")) {
      return;
    } else {
      const guestId = `guest-${Math.round(Math.random() * 9999)}`;
      localStorage.setItem("guestId", guestId);
    }
  }, []);
  return (
    <div>
      <Banner />
      <Features />
      <Category />
      <ProductVariant />
      <BestProducts />
    </div>
  );
};
export default Home;
