import React from "react";
import { ReactComponent as ArrowRightWeb } from "../assets/Icons/Arrow/arrow_right_web.svg";
import { ReactComponent as ArrowRightTablet } from "../assets/Icons/Arrow/arrow_right_tablet.svg";
import { ReactComponent as ArrowRightMobile } from "../assets/Icons/Arrow/arrow_right_mobile.svg";
import { onClickProps } from "../interfaces/PropsInterfaces";

const RightArrow = ({ onClick }: onClickProps) => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    return <ArrowRightWeb onClick={onClick} />;
  } else if (screenWidth >= 768) {
    return <ArrowRightTablet onClick={onClick} />;
  } else {
    return <ArrowRightMobile onClick={onClick} />;
  }
};

export default RightArrow;
