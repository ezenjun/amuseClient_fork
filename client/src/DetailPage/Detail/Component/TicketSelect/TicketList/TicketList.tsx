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
        count: number;
    }



    const [ticketData, setTicketData] = useState<TicketData[]>([]);

    // Ticket API
    useEffect(() => {
        axios
            .get(`https://ammuse.store/detail/${itemId}/ticket-select`)
            .then((response) => {
                const dataWithCount = response.data.data.ticket.map((ticket: TicketData) => ({
                    ...ticket,
                    count: 0,
                }));
                setTicketData(dataWithCount);
                // setTicketData(response.data.data.ticket)
            })
            .catch(error => {
                console.log("연결 실패");
            });
    }, []);

    // plus button function
    const handlePlus = (index: number) => {
        setTicketData(prevData => {
            const updatedData = [...prevData];
            updatedData[index] = {
                ...updatedData[index],
                count: updatedData[index].count + 1,
            }
            return updatedData;
        });
    };

    // minus button function
    const handleMinus = (index: number) => {
        setTicketData(prevData => {
            const updatedData = [...prevData];
            if (updatedData[index].count > 0) {
                updatedData[index] = {
                    ...updatedData[index],
                    count: updatedData[index].count - 1,
                }
            }
            return updatedData;
        });
    };

    // date format change
    function getSelectedPriceIndex(ticket: TicketData, range: DateRange | undefined):number {
        return ticket.priceList.findIndex(priceItem => {
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
        });
    }

    return (
        <div className='select-ticket'>
            <div className='TicketList'>
                {/*print selected date*/}
                <p>{range?.from ? format(range.from, 'yyyy년 LL월 dd일') : ''}</p>

                {/* ticket list */}
                {ticketData.map((ticketInfo, index) => {
                    const selectedPriceIndex = getSelectedPriceIndex(ticketInfo, range);
                    const price = selectedPriceIndex !== -1 ? ticketInfo.priceList[selectedPriceIndex].price : 0;
                    return (
                        <Ticket
                            key={index}
                            name={ticketInfo.title}
                            detail={ticketInfo.content}
                            price={price}
                            count={ticketInfo.count}
                            handleMinus={() => handleMinus(index)}
                            handlePlus={() => handlePlus(index)}
                        />
                    );
                })}

                {/* selected ticket price */}
                {ticketData.filter(ticket => ticket.count > 0).map((ticket, index) => {
                    const selectedPriceIndex = getSelectedPriceIndex(ticket, range);
                    const price = selectedPriceIndex !== -1 ? ticket.priceList[selectedPriceIndex].price : 0;
                    return (
                        <div key={index} className='selected-ticket'>
                            <div className='selected-ticket-title'>{ticket.title}</div>
                            <div className='selected-ticket-count'>{ticket.count} X {price}원</div>
                            <div className='selected-ticket-price'>{ticket.count * price}원</div>
                        </div>
                    );
                })}

                {/* total amount */}
                {ticketData.some(ticket => ticket.count > 0) && (
                    <div className='total-container'>
                        <span className='total-title'>총 여행 금액</span>
                        <span className='total-amount'>
                            {ticketData.reduce((sum, ticket) => {
                                const selectedPriceIndex = getSelectedPriceIndex(ticket, range);
                                const price = selectedPriceIndex !== -1 ? ticket.priceList[selectedPriceIndex].price : 0;
                                return sum + ticket.count * price;
                            }, 0)}원
                        </span>
                    </div>
                )}
            </div>
            
            {/* payment button */}
            {ticketData.some(ticket => ticket.count > 0) && (
                <div className='pay-btn-container'>
                    <button className='pay-btn'>결제하기</button>
                </div>
            )}
        </div>
    );
}

export default TicketList;
