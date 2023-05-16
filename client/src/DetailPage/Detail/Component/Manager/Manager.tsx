import React, { useEffect, useState } from 'react';
import './Manager.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

type ManagerProps = {
  itemId: number | null;
};

function Manager({ itemId }: ManagerProps) {
  /**
   * Manager Data
   */
  interface ManagerData {
    email : string
    img : string
    name : string
    test : string
  }

  const [managerData, setManagerData] = useState<ManagerData>();

  /**
   * Manager API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/manager-info`)
      .then((response) => {
        setManagerData(response.data.data)

        //console.log(response.data.data)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  });
  
  return (
    <div className="Manager">
      <div className="manager-profile">
        <img className="manager-image" src={managerData?.img ?? "img"} alt="manager" />
        <p className="manager-name">{managerData?.name ?? "name"}</p>
        <div className="manager-inquiry">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <p className="inquiry">문의하기</p>
        </div>
      </div>
      <div className="manager-info">
        <p>{managerData?.name ?? "name"}</p>
      </div>
    </div>
  );
}

export default Manager;
