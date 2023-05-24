import './OtherInfoDetail.scss';

interface OtherInfoDetailProps {
    title: string;
    content: string;
  }

function OtherInfoDetail({ title, content }: OtherInfoDetailProps){
  return(
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
};

export default OtherInfoDetail;
