import SideNavigation from "../../Components/SideNavigation";
import VideoSection from "../../Components/VideoSection";

const Home = () => {
  return (
    <div className="grid grid-cols-6 px-5 h-full">
      <div className=" min-h-[100vh] md:block">
        <SideNavigation />
      </div>
      <div className="col-span-5  h-full">
        <VideoSection />
      </div>
    </div>
  );
};

export default Home;
