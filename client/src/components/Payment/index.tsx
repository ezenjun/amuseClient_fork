import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useOrderContext } from "../../pages/DetailPage/Contexts/OrderContext";
import * as S from "./style";

export interface PaymentProps {
  version: string;
}

function Payment({ version }: PaymentProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["__jwtkid__"]);
  const {  orderTicketData } = useOrderContext();
  const movePage = useNavigate();

  // Ticket Button
  const handleButtonClick = () => {
    handleBuyTicket();
  };

  const handleBuyTicket = () => {
    if (cookies.__jwtkid__) {
      let count = 0;
      for (let i = 0; i < orderTicketData.length; i++) {
        if (orderTicketData[i].count) count += 1;
      }
      if (count > 0) movePage("/order");
      else alert("티켓을 선택해 주세요");
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <S.Payment className={version} onClick={handleButtonClick}>
      결제
    </S.Payment>
  );
}

export default Payment;
