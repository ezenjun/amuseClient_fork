import React, { FC } from "react";
import * as S from "./style";
import * as C from "../constants";

interface SelectProps {
  name: string;
  detail: string;
  price: number;
  count: number;
  handlePlus: () => void;
  handleMinus: () => void;
}

const Select: FC<SelectProps> = ({
  name,
  detail,
  price,
  count,
  handlePlus,
  handleMinus,
}) => {
  const formattedCount = count !== undefined ? count : 0;

  return (
    <S.Select>
      <S.Content>
        <S.Name>{name}</S.Name>
        <S.Detail>{detail}</S.Detail>
      </S.Content>

      <S.Payment>
        <S.Price>
          <S.Number>{price.toLocaleString("en")}</S.Number>
          <S.Won>{C.TICKET.WON}</S.Won>
        </S.Price>

        <S.Count>
          <S.MinusBtn
            className={`${formattedCount === 0 ? "gray" : ""}`}
            onClick={handleMinus}
          >
            {C.TICKET.MINUS}
          </S.MinusBtn>
          {formattedCount}
          <S.PlusBtn
            className={`${price === 0 ? "gray" : ""}`}
            onClick={handlePlus}
          >
            {C.TICKET.PLUS}
          </S.PlusBtn>
        </S.Count>
      </S.Payment>
    </S.Select>
  );
};

export default Select;
