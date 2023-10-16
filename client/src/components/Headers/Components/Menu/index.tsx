import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../../Contexts/CategoryContext";
import { CategoryNameMenuProps } from "../../../../Interfaces/PropsInterfaces";
import ArrowDown from "./arrow_down.svg";
import _ from "lodash";
import axios from "axios";
import * as S from "./style";

interface MoreDropdownProps {
  // handleClick: () => void;
  // count: number;
}

function Menu() {
  const movePage = useNavigate();
  const { setCategoriesInfo } = useCategoryContext();
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const CategoryMenu: React.FC<CategoryNameMenuProps> = ({
    categoryName: categoryName,
    handleClick,
  }) => <div onClick={handleClick}>{categoryName}</div>;

  const navigateToSubPageComp = (apiKey: number, cName: string) => {
    const apiKeyString: string = apiKey.toString();
    console.log(apiKey, "apiKey");
    if (cName === "home" || cName === "Home") {
      movePage("/");
    } else movePage(`/category/${apiKeyString}`);
  };

  const MoreDropdown: React.FC<MoreDropdownProps> = () => (
    <S.Dropdown className="dropdown">
      {categories.slice(4).map((categoryName: string, index: number) => (
        <S.DropdownItem
          className="dropdown-item"
          key={index}
          onClick={() =>
            navigateToSubPageComp(categoryIds[index + 4], categoryName)
          }
        >
          {categoryName}
        </S.DropdownItem>
      ))}
    </S.Dropdown>
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/main/category`)
      .then((response) => {
        const categoryAll = response.data.data.categories;
        const categorySort: any | [] = _.sortBy(categoryAll, "sequence");
        const categoryNames = categorySort.map((id: any) => id.categoryName);
        setCategoriesInfo(categorySort);
        setCategories(categoryNames);
        const categoryId = categoryAll.map((id: any) => id.categoryId);
        setCategoryIds(categoryId);
      })
      .catch((error) => {
        console.log("해시태그 연결 실패");
      });
  }, []);

  return (
    <S.Menu>
      {categories.length <= 5 ? (
        categories.map((categoryName: string, index: number) => (
          <CategoryMenu
            key={index}
            categoryName={categoryName}
            handleClick={() =>
              navigateToSubPageComp(categoryIds[index], categoryName)
            }
          />
        ))
      ) : (
        <>
          {categories.slice(0, 5).map((categoryName: string, index: number) => (
            <CategoryMenu
              key={index}
              categoryName={categoryName}
              handleClick={() =>
                navigateToSubPageComp(categoryIds[index], categoryName)
              }
            />
          ))}
          <S.More className="menu-item more-dropdown">
            더보기
            <img src={ArrowDown} alt="Arrow Down" />
            <MoreDropdown />
          </S.More>
        </>
      )}
    </S.Menu>
  );
}

export default Menu;
