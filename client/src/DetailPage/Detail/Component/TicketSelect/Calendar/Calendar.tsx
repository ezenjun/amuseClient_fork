import React, { useEffect, useState } from 'react';
import '../../../../../../node_modules/react-day-picker/dist/style.css';
import './Calendar.scss';
import { addDays, format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker, DateFormatter, DateRange, DayClickEventHandler } from 'react-day-picker';
import TicketList from '../TicketList/TicketList';
import axios from "axios";

const seasonEmoji: Record<string, string> = {
    winter: '⛄️',
    spring: '🌸',
    summer: '🌻',
    autumn: '🍂'
};

const getSeason = (month: Date): string => {
    const monthNumber = month.getMonth();
    if (monthNumber >= 0 && monthNumber < 3) return 'winter';
    if (monthNumber >= 3 && monthNumber < 6) return 'spring';
    if (monthNumber >= 6 && monthNumber < 9) return 'summer';
    else return 'autumn';
};

const formatCaption: DateFormatter = (month, options) => {
    const season = getSeason(month);
    return (
        <>
            <span role="img" aria-label={season}>
                {seasonEmoji[season]}
            </span>{' '}
            {format(month, 'yyyy년 LL월', { locale: options?.locale })}
        </>
    );
};

type CalendarProps = {
    itemId: number | null;
};


function Calendar({ itemId }: CalendarProps) {
    // duration data
    interface CalendarData {
        duration: number
    }
    const [CalendarData, setCalendarData] = useState<CalendarData>();

    useEffect(() => {
        axios
            .get(`https://ammuse.store/detail/${itemId}/title`)
            .then((response) => {
                setCalendarData(response.data.data)
            })
            .catch(error => {
                console.log("연결 실패");
            });
    }, []);

    // default date
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    useEffect(() => {
        if (CalendarData) {
            const today = new Date();
            const defaultDate: DateRange = {
                from: today,
                to: addDays(today, CalendarData.duration - 1)
            };
            setRange(defaultDate);
        }
    }, [CalendarData]);

    const handleDayClick: DayClickEventHandler = (day, modifiers) => {
        if (CalendarData) {
            if (modifiers.selected && range?.from) {
                if (isSameDay(day, range?.from)) {
                    // setRange(undefined);
                } else {
                    const handleRange: DateRange = {
                        from: day,
                        to: addDays(day, CalendarData?.duration - 1)
                    }
                    setRange(handleRange);
                }
            } else {
                const handleRange: DateRange = {
                    from: day,
                    to: addDays(day, CalendarData?.duration - 1)
                }
                setRange(handleRange);
            }
        }
    }

    const today = new Date();
    return (
        <div className='select-date'>
            <p className='select-ticket-title'>티켓 선택</p>
            <div className='Calendar'>
                <DayPicker
                    locale={ko}
                    numberOfMonths={2}
                    pagedNavigation
                    formatters={{ formatCaption }}
                    mode='range'
                    selected={range}
                    onDayClick={handleDayClick}
                    disabled={{ before: today }}
                />
            </div>
            <TicketList range={range} itemId={itemId} />
        </div>
    );
}

export default Calendar;
