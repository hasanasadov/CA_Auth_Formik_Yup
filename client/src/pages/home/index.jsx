import Header from "./components/Header";
import Footer from "./components/Footer";

const HomePage = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-between ">
      <Header />
      <div className="lg:text-[200px] text-center">content</div>
      <Footer />
    </div>
  );
};

export default HomePage;
