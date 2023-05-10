import React from 'react';
import '../../../../../../node_modules/react-day-picker/dist/style.css';
import './Calendar.scss';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker, DateFormatter } from 'react-day-picker';
import TicketList from '../TicketList/TicketList';

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

// 달력 날짜 별 색 지정 및 legend 추가
function Calendar({ itemId }: CalendarProps) {
    const [selected, setSelected] = React.useState<Date>();

    return (
        <div className='select-date'>
            <p className='select-ticket-title'>티켓 선택</p>
            <div className='Calendar'>
                <DayPicker
                    locale={ko}
                    numberOfMonths={2}
                    pagedNavigation
                    formatters={{ formatCaption }}
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                />
            </div>
            <TicketList selected={selected} />
        </div>
    );
}

export default Calendar;
