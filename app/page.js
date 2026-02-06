import About from "@/components/about";
import Banner from "@/components/Banner";
import BannerSlider from "@/components/BannerSlider";
import BudgetBuys from "@/components/budgetbuys";
import Categories from "@/components/categories";
import Customers from "@/components/customers";
import FrequentlyBought from "@/components/FrequentlyBought";
import IntroSection from "@/components/IntroSection";
import NewArrivals from "@/components/newarrivals";
import OffersSlider from "@/components/offersslider";
import PopularCategory from "@/components/PopularCategory";
import Products from "@/components/Products";
import Products2 from "@/components/products2";
import Products4 from "@/components/products4";
import Products5 from "@/components/products5";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      <IntroSection />
      {/* <PopularCategory /> */}
      {/* <Products1 /> */}
      {/* <FrequentlyBought /> */}
      <Categories />
      <BudgetBuys />
      <Products2 />
      <OffersSlider />
      {/* <NewArrivals /> */}
      {/* <Guides /> */}
      <Products4 />
      <Products5 />
      <Banner />
      <Products />
      <Customers />
      <About />
    </div>
  );
}
