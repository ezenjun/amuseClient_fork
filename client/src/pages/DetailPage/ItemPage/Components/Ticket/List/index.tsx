import React, { useEffect, useState } from "react";
import { format, isSameDay, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import { TicketData } from "../../../../../../Interfaces/DataInterfaces";
import { useOrderContext } from "../../../../Contexts/OrderContext";
import Select from "../Select";
import axios from "axios";
import * as S from "./style";
import * as C from "../constants";

type DateProps = {
  itemId: number | null;
  range: DateRange | undefined;
};

function List({ range, itemId }: DateProps) {
  const [ticketData, setTicketData] = useState<TicketData[]>([]);
  const { orderTicketData, setOrderTicketData } = useOrderContext();

  // Ticket API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/ticket-select`)
      .then((response) => {
        const dataWithCount = response.data.data.ticket.map(
          (ticket: TicketData) => ({
            ...ticket,
            count: 0,
          })
        );
        setTicketData(dataWithCount);
      })
      .catch((error) => {
        console.log("Ticket List 연결 실패");
      });
  }, [itemId]);

  // plus button function
  const handlePlus = (index: number, price: number) => {
    setTicketData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        count: updatedData[index].count + 1,
      };
      return updatedData;
    });
  };
  useEffect(() => {
    setOrderTicketData(ticketData);
  }, [setOrderTicketData, ticketData]);

  // minus button function
  const handleMinus = (index: number) => {
    setTicketData((prevData) => {
      const updatedData = [...prevData];
      if (updatedData[index].count > 0) {
        updatedData[index] = {
          ...updatedData[index],
          count: updatedData[index].count - 1,
        };
      }
      return updatedData;
    });
  };

  // date format change
  function getSelectedPriceIndex(
    ticket: TicketData,
    range: DateRange | undefined
  ): number {
    return ticket.priceList.findIndex((priceItem) => {
      function getMonthNumber(monthString: string) {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return months.findIndex((month) => month === monthString);
      }
      const parts = priceItem.startDate.split(" ");
      const month = getMonthNumber(parts[1]);
      const day = parseInt(parts[2]);
      const year = parseInt(parts[5]);
      const date = new Date(year, month, day);

      const formattedDate = format(date, "yyyy-MM-dd");
      return range?.from && isSameDay(parseISO(formattedDate), range.from);
    });
  }

  // Ticket Button
  const totalAmount = ticketData.reduce((sum, ticket) => {
    const selectedPriceIndex = getSelectedPriceIndex(ticket, range);
    const price =
      selectedPriceIndex !== -1
        ? ticket.priceList[selectedPriceIndex].price
        : 0;
    return sum + ticket.count * price;
  }, 0);
  return (
    <S.List>
      <S.Date>
        {range?.from ? format(range.from, "yyyy년 LL월 dd일") : ""}
      </S.Date>

      {/* ticket list */}
      <S.Select>
        {ticketData.map((ticketInfo, index) => {
          const selectedPriceIndex = getSelectedPriceIndex(ticketInfo, range);
          const price =
            selectedPriceIndex !== -1
              ? ticketInfo.priceList[selectedPriceIndex].price
              : 0;
          return (
            <Select
              key={index}
              name={ticketInfo.title}
              detail={ticketInfo.content}
              price={price}
              count={ticketInfo.count}
              handleMinus={() => handleMinus(index)}
              handlePlus={() => handlePlus(index, price)}
            />
          );
        })}
      </S.Select>

      {/* selected ticket price */}
      {ticketData
        .filter((ticket) => ticket.count > 0)
        .map((ticket, index) => {
          const selectedPriceIndex = getSelectedPriceIndex(ticket, range);
          const price =
            selectedPriceIndex !== -1
              ? ticket.priceList[selectedPriceIndex].price
              : 0;
          return (
            <S.Ticket key={index}>
              <S.Info>
                <S.Count>{ticket.title}</S.Count>
                <S.Count>
                  {ticket.count}
                  {C.TICKET.MUIT}
                  {price.toLocaleString("en")}
                  {C.TICKET.WON}
                </S.Count>
              </S.Info>
              <S.Price>
                {(ticket.count * price).toLocaleString("en")}
                {C.TICKET.WON}
              </S.Price>
            </S.Ticket>
          );
        })}

      {/* total amount */}
      {ticketData.some((ticket) => ticket.count > 0) && (
        <S.Total>
          <S.Title>{C.TICKET.SUM}</S.Title>
          <S.Amount>
            {totalAmount.toLocaleString("en")}
            {C.TICKET.WON}
          </S.Amount>
        </S.Total>
      )}
    </S.List>
  );
}

export default List;
