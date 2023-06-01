import React, { useEffect, useState } from 'react';
import './ReservationBottom.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function ReservationBottom() {


    return (
        <div className="reservation-bottom">
            <button className="wish-btn">
                <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            </button>

            <button className="purchase-btn" >구매하기</button>
        </div>
    );
}

export default ReservationBottom;