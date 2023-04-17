/* eslint-disable react/button-has-type */
import React, { FC } from 'react';
import './Ticket.scss';

interface TicketProps {
    name: string;
    detail: string;
    price: string;
}

const Ticket: FC<TicketProps> = ({
  name, detail, price,
}) => (
  <div className="ticket">
    <div className="ticket-content">
      <h5 className="ticket-name">{name}</h5>
      <p className="ticket-detail">{detail}</p>
    </div>
    <div className="ticket-price">
      <span className="person">1명</span>
      <span className="price">{price}</span>
      <span className="won">원</span>
    </div>
    <div className="ticket-cnt">
      <button className="minus-btn">-</button>
      <p className="cnt">0</p>
      <button className="plus-btn">+</button>
    </div>
  </div>
);

// function Ticket() {
//     return (
//         <div className='ticket'>
//             <div className='ticket-content'>
//                 <h5 className='ticket-name'>어린이 이용권</h5>
//                 <p className='ticket-detail'>만 6세~13세</p>
//             </div>
//             <div className='ticket-price'>
//                 <span className='person'>1명</span>
//                 <span className='price'>55,000</span>
//                 <span className='won'>원</span>
//             </div>
//             <div className='ticket-cnt'>
//                 <button className='minus-btn'>-</button>
//                 <p className='cnt'>0</p>
//                 <button className='plus-btn'>+</button>
//             </div>
//         </div>
//     );
// }

export default Ticket;
