import { useContext,createContext,useState } from 'react'
export const DataContext = createContext()
export const Datacontextprovied = ({ children }) => {
  const [data, setData] = useState(null);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}
