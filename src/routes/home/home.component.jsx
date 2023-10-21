import { Outlet } from "react-router-dom";
import catagoriesData from "../../categories.json";
import CatagoryList from "../../components/catagory-list/catagory-list.component";
import "../../App.css";

const Home = () => {
  const catagories = catagoriesData;
  return (
    <div>
      <Outlet />
      <CatagoryList catagories={catagories} />
    </div>
  );
};

export default Home;
