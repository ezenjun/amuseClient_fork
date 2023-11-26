import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../../Contexts/CategoryContext";
import { CategoryNameMenuProps } from "../../../../Interfaces/PropsInterfaces";
import ArrowIcon from "../../Images/arrow.svg";
import _ from "lodash";
import axios from "axios";
import * as S from "./style";

interface MoreDropdownProps {
  // handleClick: () => void;
  // count: number;
}

interface MenuProps {
  type: string;
}

function Menu({ type }: MenuProps) {
  const movePage = useNavigate();
  const { setCategoriesInfo } = useCategoryContext();
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const CategoryMenu: React.FC<CategoryNameMenuProps> = ({
    categoryName: categoryName,
    handleClick,
  }) => <S.Category onClick={handleClick}>{categoryName}</S.Category>;

  const navigateToSubPageComp = (apiKey: number, cName: string) => {
    const apiKeyString: string = apiKey.toString();
    console.log(apiKey, "apiKey");
    if (cName === "home" || cName === "Home") {
      movePage("/");
    } else movePage(`/category/${apiKeyString}`);
  };

  const MoreDropdown: React.FC<MoreDropdownProps> = () => (
    <S.Dropdown className="dropdown">
      <S.DropButton className="dropbtn">
        더보기
        <img src={ArrowIcon} alt="Arrow Down" />
      </S.DropButton>

      <S.DropContent className="dropdown-content">
        {categories.slice(5).map((categoryName: string, index: number) => (
          <S.Item
            key={index}
            onClick={() =>
              navigateToSubPageComp(categoryIds[index + 5], categoryName)
            }
          >
            {categoryName}
          </S.Item>
        ))}
      </S.DropContent>
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
    <>
      {type === "pc" ? (
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
              {categories
                .slice(0, 5)
                .map((categoryName: string, index: number) => (
                  <CategoryMenu
                    key={index}
                    categoryName={categoryName}
                    handleClick={() =>
                      navigateToSubPageComp(categoryIds[index], categoryName)
                    }
                  />
                ))}
              <MoreDropdown />
            </>
          )}
        </S.Menu>
      ) : (
        <S.MobileMenu>
          <S.Divider />
          {categories.map((categoryName: string, index: number) => (
            <>
              <CategoryMenu
                key={index}
                categoryName={categoryName}
                handleClick={() =>
                  navigateToSubPageComp(categoryIds[index], categoryName)
                }
              />
              <S.Divider />
            </>
          ))}
        </S.MobileMenu>
      )}
    </>
  );
}

export default Menu;
