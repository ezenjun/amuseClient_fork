import { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactElement;
}

type InfoData = {
  name?: string;
  setName?: any;
  phone?: string;
  setPhone?: any;
  email?: string;
  setEmail?: any;
};

const InfoContext = createContext<InfoData>({});

export function InfoContextProvider({ children }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("salr921@gmail.com");
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
