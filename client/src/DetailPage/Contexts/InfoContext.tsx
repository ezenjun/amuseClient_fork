import { createContext, useContext, useEffect, useState } from "react";
import { IProps } from "../../Interfaces/PropsInterfaces";  
import { InfoData } from "../../Types/DataTypes";

const InfoContext = createContext<InfoData>({});

export function InfoContextProvider({ children }: IProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    // setOrderData({ ...orderData, totalPrice: location.state.totalPrice });
  }, []);

  return (
    <InfoContext.Provider
      value={{ name, setName, email, setEmail, phone, setPhone }}
    >
      {children}
    </InfoContext.Provider>
  );
}

export function useInfoContext() {
  return useContext(InfoContext);
}
