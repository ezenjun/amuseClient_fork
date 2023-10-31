import React, { useEffect, useState } from "react";
import styles from "react-day-picker/dist/style.module.css";
import { addDays, format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import {
  DayPicker,
  DateFormatter,
  DateRange,
  DayClickEventHandler,
  ClassNames,
} from "react-day-picker";
import TicketList from "../TicketList/TicketList";
import axios from "axios";
import { useOrderContext } from "../../../../Contexts/OrderContext";
import { useSetRecoilState } from "recoil";
import { selectedItemState } from "../../../../../../Recoil/OrderAtomState";
import * as S from "./style";

const seasonEmoji: Record<string, string> = {
  winter: "⛄️",
  spring: "🌸",
  summer: "🌻",
  autumn: "🍂",
};

const getSeason = (month: Date): string => {
  const monthNumber = month.getMonth();
  if (monthNumber >= 0 && monthNumber < 3) return "winter";
  if (monthNumber >= 3 && monthNumber < 6) return "spring";
  if (monthNumber >= 6 && monthNumber < 9) return "summer";
  else return "autumn";
};

const formatCaption: DateFormatter = (month, options) => {
  const season = getSeason(month);
  return (
    <>
      <span role="img" aria-label={season}>
        {seasonEmoji[season]}
      </span>{" "}
      {format(month, "yyyy년 LL월", { locale: options?.locale })}
    </>
  );
};

type CalendarProps = {
  itemId: number | null;
  numberOfmonth: number;
  classNone?: string;
  classContainer?: string;
  classTicketContainer?: string;
  classTicketPrice?: string;
  classTicketCnt?: string;
};

function Calendar({
  itemId,
  numberOfmonth,
  classNone,
  classContainer,
  classTicketContainer,
  classTicketPrice,
  classTicketCnt,
}: CalendarProps) {
  // duration data
  interface CalendarData {
    duration: number;
  }
  const [CalendarData, setCalendarData] = useState<CalendarData>();
  const setSelectedItemState = useSetRecoilState(selectedItemState);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/title`)
      .then((response) => {
        setCalendarData(response.data.data);
        setSelectedItemState((prevSelectedItem) => ({
          ...prevSelectedItem,
          duration: response.data.data.duration,
        }));
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  // default date
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  useEffect(() => {
    if (CalendarData) {
      const today = new Date();
      let insertTo = CalendarData?.duration - 1;
      if (insertTo < 0) {
        insertTo = 0;
      }
      const defaultDate: DateRange = {
        from: today,
        to: addDays(today, insertTo),
      };
      setRange(defaultDate);
      setSelectedItemState((prevSelectedItem) => ({
        ...prevSelectedItem,
        startDate: today,
      }));
    }
  }, [CalendarData]);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (CalendarData) {
      console.log(CalendarData);
      if (modifiers.selected && range?.from) {
        if (isSameDay(day, range?.from)) {
          // setRange(undefined);
        } else {
          let insertTo = CalendarData?.duration - 1;
          if (insertTo < 0) {
            insertTo = 0;
          }
          const handleRange: DateRange = {
            from: day,
            to: addDays(day, insertTo),
          };
          setRange(handleRange);
          setSelectedItemState((prevSelectedItem) => ({
            ...prevSelectedItem,
            startDate: day,
          }));
        }
      } else {
        let insertTo = CalendarData?.duration - 1;
        if (insertTo < 0) {
          insertTo = 0;
        }
        const handleRange: DateRange = {
          from: day,
          to: addDays(day, insertTo),
        };
        setRange(handleRange);
        setSelectedItemState((prevSelectedItem) => ({
          ...prevSelectedItem,
          startDate: day,
        }));
      }
    }
  };

  const classNames: ClassNames = {
    ...styles,
    day_selected: "custom-select",
  };
  const today = new Date();

  const { orderRange, setOrderRange } = useOrderContext();
  useEffect(() => {
    setOrderRange(range);
  }, [range]);
  return (
    <>
      <S.Title>일자</S.Title>
      <S.Calendar>
        <style>{`.custom-select { color: white; background-color: #F184A1; }`}</style>
        <DayPicker
          locale={ko}
          numberOfMonths={numberOfmonth}
          pagedNavigation
          formatters={{ formatCaption }}
          mode="range"
          selected={range}
          onDayClick={handleDayClick}
          disabled={{ before: today }}
          classNames={classNames}
        />
      </S.Calendar>
      <TicketList
        range={range}
        itemId={itemId}
        classNone={classNone}
        classTicketContainer={classTicketContainer}
        classTicketPrice={classTicketPrice}
        classTicketCnt={classTicketCnt}
      />
    </>
  );
}

export default Calendar;
