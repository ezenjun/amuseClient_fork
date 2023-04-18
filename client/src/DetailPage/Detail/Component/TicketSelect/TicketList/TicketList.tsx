import React from 'react';
import './TicketList.scss';
import Ticket from '../Ticket/Ticket';
import { format } from 'date-fns';


type DateProps = {
    selected: Date | undefined;
};

function TicketList({ selected }: DateProps) {
    return (
        <div className='select-ticket'>
            <div className='TicketList'>
                {/* 선택 날짜 출력 : defult 오늘 날짜 출력하기*/}
                <p>{selected ? format(selected, 'yyyy년 LL월 dd일') : ''}</p>
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
