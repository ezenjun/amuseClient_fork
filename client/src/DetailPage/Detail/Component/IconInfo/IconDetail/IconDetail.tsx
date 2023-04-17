import React from 'react';
import './IconDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconProp;
  text: string;
}

function IconDetail({ icon, text }: Props): JSX.Element {
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
