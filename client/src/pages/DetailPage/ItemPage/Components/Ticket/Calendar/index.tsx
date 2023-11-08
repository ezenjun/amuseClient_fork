import React, { useEffect, useState } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import {
  DayPicker,
  DateFormatter,
  DateRange,
  DayClickEventHandler,
  ClassNames,
} from "react-day-picker";
import { useSetRecoilState } from "recoil";
import { selectedItemState } from "../../../../../../Recoil/OrderAtomState";
import { useOrderContext } from "../../../../Contexts/OrderContext";
import styles from "react-day-picker/dist/style.module.css";
import Payment from "../../../../../../components/Payment";
import List from "../List";
import axios from "axios";
import * as S from "./style";
import * as C from "../constants";

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
};

function Calendar({ itemId }: CalendarProps) {
  interface CalendarType {
    duration: number;
  }
  const [CalendarData, setCalendarData] = useState<CalendarType>();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const setSelectedItemState = useSetRecoilState(selectedItemState);
  const { setOrderRange } = useOrderContext();

  useEffect(() => {
    setOrderRange(range);
  }, [range]);

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
        console.log("Calendar 연결 실패");
      });
  }, [itemId, setSelectedItemState]);

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
  }, [CalendarData, setSelectedItemState]);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (CalendarData) {
      console.log(CalendarData);
      if (modifiers.selected && range?.from) {
        if (isSameDay(day, range?.from)) {
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

  const today = new Date();
  const classNames: ClassNames = {
    ...styles,
    day_selected: "custom-select",
  };

  const [month, setMonth] = useState(2);
  const handleResize = () => {
    let result;
    switch (true) {
      case window.innerWidth >= 1170:
        result = 2;
        break;
      case window.innerWidth >= 1024:
        result = 1;
        break;
      case window.innerWidth >= 768:
        result = 2;
        break;
      default:
        result = 1;
    }
    setMonth(result);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <S.Calendar>
      <S.Title>{C.TICKET.TITLE}</S.Title>
      <S.Date>
        <style>{`.custom-select { color: white; background-color: #F184A1; }`}</style>
        <DayPicker
          locale={ko}
          numberOfMonths={month}
          pagedNavigation
          formatters={{ formatCaption }}
          mode="range"
          selected={range}
          onDayClick={handleDayClick}
          disabled={{ before: today }}
          classNames={classNames}
        />
      </S.Date>
      <List range={range} itemId={itemId} />
      <S.Payment>
        <Payment version="ver2" />
      </S.Payment>
    </S.Calendar>
  );
}

export default Calendar;
