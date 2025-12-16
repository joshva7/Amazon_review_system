import { createContext, useState } from "react";
export const Providerdata = createContext(null);
export const Prodatesprov = ({ children }) => {
  const [data, setData] = useState("");
  return (
    <Providerdata.Provider value={{ data, setData }}>
      {children}
    </Providerdata.Provider>
  );
};
