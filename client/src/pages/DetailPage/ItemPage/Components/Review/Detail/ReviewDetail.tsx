import "./ReviewDetail.scss";

interface ReviewDetailProps {
  name: string;
  content: string;
  img: string;
}

function Review({ name, content, img }: ReviewDetailProps) {
  return (
    <div className="ReviewDetail">
      <div className="name">{name}</div>
      <div className="content">{content}</div>
    </div>
  );
}

export default Review;
