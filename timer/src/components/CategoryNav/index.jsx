import React from "react";
import "./styles.scss"

const CategoryNav = ({changeCategory, category,fontClass, colorClass}) => {
  function getCategoryName() {
    if (category === 1) {
      return "Pomodoro";
    }
    if (category === 2) {
      return "Short-Break";
    }
    if (category === 3) {
      return "Long-Break";
    }
  }


  return (
    <div className="category-container">
      <div className={`category-selector ${getCategoryName()} ${colorClass}`}></div>
      <p
        className={category === 1 ? `selected ${fontClass}` :fontClass}
        onClick={() => changeCategory(1)}
        >
          Pomodoro
      </p>
      <p
        className={category === 2 ? `selected ${fontClass}` : fontClass}
        onClick={() => changeCategory(2)}
      >
        Short Break
      </p>
      <p
        className={category === 3 ? `selected ${fontClass}` : fontClass}
        onClick={() => changeCategory(3)}
      >
        Long Break
      </p>
    </div>
  );
};

export default CategoryNav