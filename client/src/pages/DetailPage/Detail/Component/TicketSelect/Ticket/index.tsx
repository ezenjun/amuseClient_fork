import React, { FC } from "react";
import * as S from "./style";

interface TicketProps {
  name: string;
  detail: string;
  price: number;
  count: number;
  handlePlus: () => void;
  handleMinus: () => void;
}

const Ticket: FC<TicketProps> = ({
  name,
  detail,
  price,
  count,
  handlePlus,
  handleMinus,
}) => {
  const formattedCount = count !== undefined ? count : 0;

  return (
    <S.Ticket>
      <S.Content>
        <S.Name>{name}</S.Name>
        <S.Detail>{detail}</S.Detail>
      </S.Content>

      <S.Price>
        <S.Number>{price.toLocaleString("en")}</S.Number>
        <S.Won>원</S.Won>
      </S.Price>

      <S.Count>
        <S.MinusBtn
          className={`${formattedCount === 0 ? "gray" : ""}`}
          onClick={handleMinus}
        >
          -
        </S.MinusBtn>
        {formattedCount}
        <S.PlusBtn
          className={`${price === 0 ? "gray" : ""}`}
          onClick={handlePlus}
        >
          +
        </S.PlusBtn>
      </S.Count>
    </S.Ticket>
  );
};

export default Ticket;
