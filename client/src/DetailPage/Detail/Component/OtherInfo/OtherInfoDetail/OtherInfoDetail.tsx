import { FC } from 'react';
import './OtherInfoDetail.scss';

interface OtherInfoDetailProps {
    title: string;
    content: string;
  }

const OtherInfoDetail: FC<OtherInfoDetailProps> = ({ title, content }) => (
  <div className="otherinfo-information">
    <h3>{title}</h3>
    <p>
      {content.split('\n').map((line) => (
        <span>
          {line}
          <br />
        </span>
      ))}
    </p>
  </div>
);

export default OtherInfoDetail;
