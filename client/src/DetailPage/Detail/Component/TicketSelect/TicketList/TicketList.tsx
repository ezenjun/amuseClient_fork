import React, { useEffect, useState } from 'react';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';
import { format, isSameDay, parseISO, parse } from 'date-fns';
import { DateRange } from 'react-day-picker';
import axios from "axios";


type DateProps = {
    itemId: number | null;
    range: DateRange | undefined;
};

function TicketList({ range, itemId }: DateProps) {
    // Ticket Data
    interface TicketData {
        title: string;
        content: string;
        priceList: { startDate: string; price: number; }[];
    }

    const [ticketData, setTicketData] = useState<TicketData[]>([]);

    // Ticket API
    useEffect(() => {
        axios
            .get(`https://ammuse.store/detail/${itemId}/ticket-select`)
            .then((response) => {
                setTicketData(response.data.data.ticket)
            })
            .catch(error => {
                console.log("연결 실패");
            });
    }, [itemId]);


    return (
        <div className='select-ticket'>
            <div className='TicketList'>
                {/* 선택 날짜 출력*/}
                <p>{range?.from ? format(range.from, 'yyyy년 LL월 dd일') : ''}</p>

                {ticketData.map((ticketInfo) => {
                    const selectedPrice = ticketInfo.priceList.map(
                        (priceItem) => {
                            function getMonthNumber(monthString: string) {
                                const months = [
                                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                ];
                                return months.findIndex(month => month === monthString);
                            }
                            const parts = priceItem.startDate.split(' ');
                            const month = getMonthNumber(parts[1]);
                            const day = parseInt(parts[2]);
                            const year = parseInt(parts[5]);
                            const date = new Date(year, month, day);

                            const formattedDate = format(date, 'yyyy-MM-dd');
                            return range?.from && isSameDay(parseISO(formattedDate), range.from)
                        }
                    );

                    const trueIndex = selectedPrice.indexOf(true);
                    const price = trueIndex !== -1 ? ticketInfo.priceList[trueIndex].price : 0;
                    return (
                        <Ticket
                            name={ticketInfo.title}
                            detail={ticketInfo.content}
                            price={price}
                        />
                    );
                })}
                <div className='total-cost'>

                </div>
            </div>
        </div>

    );
}

export default TicketList;
