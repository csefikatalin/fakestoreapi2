import { createContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";


export const ApiContext=createContext("")

export const ApiProvider = ({ children }) => {
    const [apiData, setApiData] = useState(null); // vagy bármilyen adat, amit az API-tól vársz
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getData = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await myAxios.get("/products");
          setApiData(response.data);          
        } catch (err) {
          setError('Hiba történt az adatok lekérésekor.');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getData(); // Adatok automatikus lekérése, amikor a kontextus betöltődik
      }, []);
  
    return (
      <ApiContext.Provider value={{ apiData, getData }}>
        {children}
      </ApiContext.Provider>
    );
  };