/* eslint-disable react/button-has-type */
import React, { FC, useState } from 'react';
import './Ticket.scss';

interface TicketProps {
  name: string;
  detail: string;
  price: number;
  count: number;
  handlePlus: () => void;
  handleMinus: () => void;
  classTicketContainer? : string;
  classTicketPrice? : string;
  classTicketCnt? : string;
}

const Ticket: FC<TicketProps> = ({
  name, detail, price, count, handlePlus, handleMinus, classTicketContainer, classTicketPrice, classTicketCnt
}) => {
  const formattedCount = count !== undefined ? count : 0;
  
  return (
    <div className={`ticket ${classTicketContainer}`}>
      <div className="ticket-content">
        <h5 className="ticket-name">{name}</h5>
        <p className="ticket-detail">{detail}</p>
      </div>
      <div className={`ticket-price ${classTicketPrice}`}>
        {/* <span className="person">1명</span> */}
        <span className="price">{price.toLocaleString('en')}</span>
        <span className="won">원</span>
      </div>
      <div className={`ticket-cnt ${classTicketCnt}`}>
        <button className={`minus-btn ${formattedCount === 0 ? 'gray' : ''}`} onClick={handleMinus}>-</button>
        <p className="cnt">{formattedCount}</p>
        <button className={`plus-btn ${price === 0 ? 'gray' : ''}`} onClick={handlePlus}>+</button>
      </div>
    </div>
  );

};

export default Ticket;
