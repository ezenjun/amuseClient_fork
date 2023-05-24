/* eslint-disable react/button-has-type */
import React, { FC, useState } from 'react';
import './Ticket.scss';

interface TicketProps {
  name: string;
  detail: string;
  price: number | undefined;
  count: number;
  handlePlus: () => void;
  handleMinus: () => void;
}

const Ticket: FC<TicketProps> = ({
  name, detail, price, count, handlePlus, handleMinus
}) => {
  const formattedCount = count !== undefined ? count : 0;
  
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
        <p className="cnt">{formattedCount}</p>
        <button className="plus-btn" onClick={handlePlus}>+</button>
      </div>
    </div>
  );

};

export default Ticket;
