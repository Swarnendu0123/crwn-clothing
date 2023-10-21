import catagoriesData from "./categories.json";
import CatagoryList from "./components/catagory-list/catagory-list.component";
import "./App.css";

const App = () => {
  const catagories = catagoriesData;
  return <CatagoryList catagories={catagories} />;
};

export default App;
