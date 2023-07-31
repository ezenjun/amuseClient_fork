import { createContext, useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface Props {
  children: React.ReactElement;
  location?: any;
}
interface TicketData {
  title: string;
  content: string;
  priceList: { startDate: string; price: number }[];
  count: number;
}
type OrderData = {
  orderData: any;
  setOrderData: any;
  orderTicketData: any;
  setOrderTicketData: any;
  orderRange: any ; 
  setOrderRange: any;
};

const OrderContext = createContext({} as OrderData);

export function OrderContextProvider({ children, location }: Props) {
  const [orderData, setOrderData] = useState<any>({
    pay_method: "신용/체크카드",
    productPrice: 0,
    point: 0,
  });
  const [orderTicketData, setOrderTicketData] = useState<TicketData[]>([]);
  const [orderRange, setOrderRange] = useState<DateRange | undefined>(undefined);

  // useEffect(() => {
  //   // setOrderData({ ...orderData, totalPrice: location.state.totalPrice });
  // }, []);

  return (
    <OrderContext.Provider value={{ orderData, setOrderData ,orderTicketData, setOrderTicketData, orderRange, setOrderRange}}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  return useContext(OrderContext);
}
