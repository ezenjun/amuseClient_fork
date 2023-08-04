import React from 'react';
import './IconDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDetailProps } from '../../../../../Interfaces/PropsInterfaces';


function IconDetail({ icon, text }: IconDetailProps) {
  return (
    <div className="Detail-icon-detail">
      {/* 아이콘 정보 */}
      <div className="content">
        <div className="icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <p className="phrases">{text}</p>
      </div>
    </div>
  );
}

export default IconDetail;
