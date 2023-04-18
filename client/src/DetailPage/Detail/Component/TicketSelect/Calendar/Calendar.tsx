import React from 'react';
import '../../../../../../node_modules/react-day-picker/dist/style.css';
import './Calendar.scss';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker, DateFormatter } from 'react-day-picker';

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


function Calendar() {
    const [selected, setSelected] = React.useState<Date>();

    return (
        <div className='Calendar'>
            <DayPicker
                locale={ko}
                numberOfMonths={2}
                pagedNavigation
                formatters={{ formatCaption }}
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={<p>{selected ? format(selected, 'yyyy년 LL월 dd일') : ''}</p>}
            />
        </div>
    );
}

export default Calendar;
