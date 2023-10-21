import "./categories.style.scss";
import CatagoryItem from "../category-item/category-item.component";

const CatagoryList = (props) => {
  const { catagories } = props;
  return (
    <div className="categories-container">
      {catagories.map((catagory) => (
        <CatagoryItem catagory={catagory} key={catagory.id} />
      ))}
    </div>
  );
};

export default CatagoryList;
