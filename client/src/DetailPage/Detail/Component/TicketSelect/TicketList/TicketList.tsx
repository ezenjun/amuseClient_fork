import React from 'react';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';
import Calendar from '../Calendar/Calendar';

function TicketList() {
    return (
        <div className='select-ticket'>
            <p className='select-ticket-title'>티켓 선택</p>
            <Calendar />
            <div className='TicketList'>
                {/* 날짜 출력하는 곳 */}
                <Ticket
                    name="어린이 이용권"
                    detail="만 6세~13세"
                    price="55,000"
                />
                <Ticket
                    name="어른 이용권"
                    detail="만 19세 이상"
                    price="77,000"
                />
            </div>
        </div>

    );
}

export default TicketList;
