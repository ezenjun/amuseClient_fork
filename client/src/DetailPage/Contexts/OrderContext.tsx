import { createContext, useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { OrderData } from "../../Types/DataTypes";
import { OrderContextProps } from "../../Interfaces/PropsInterfaces";
import { TicketData } from "../../Interfaces/DataInterfaces";

const OrderContext = createContext({} as OrderData);

export function OrderContextProvider({ children, location }: OrderContextProps) {
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
