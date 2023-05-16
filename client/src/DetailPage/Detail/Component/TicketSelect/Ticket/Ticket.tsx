/* eslint-disable react/button-has-type */
import React, { FC, useState } from 'react';
import './Ticket.scss';

interface TicketProps {
  name: string;
  detail: string;
  price: number | undefined;
}

const Ticket: FC<TicketProps> = ({
  name, detail, price,
}) => {
  const [count, setCount] = useState(0);
  
  const handlePlus = () => {
    setCount(count + 1);
  }

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  
  return (
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
        <button className="minus-btn" onClick={handleMinus}>-</button>
        <p className="cnt">{count}</p>
        <button className="plus-btn" onClick={handlePlus}>+</button>
      </div>
    </div>
  );

};

export default Ticket;
