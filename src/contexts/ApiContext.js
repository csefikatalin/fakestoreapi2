import { createContext, useEffect, useState } from "react";
//saját Axios példány használata
import { myAxios } from "./MyAxios";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null); // vagy bármilyen adat, amit az API-tól vársz
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Az adatok asszinkron hívása axios segítségével */

  const getData = async (vegpont) => {
    setLoading(true);
    setError(null);
    // saját axios példányt használjuk
    try {
      const response = await myAxios.get(vegpont); //az alapértelmezett baseURL-ben megadott végpontot kiegészítjük a /products-szal
      setApiData(response.data); //beállítjuk az apiData statet a beállítófüggvényével.
    } catch (err) {
      setError("Hiba történt az adatok lekérésekor.");
    } finally {
      setLoading(false);
    }
  };
  const postData = async (vegpont, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await myAxios.post(vegpont, data); // a POST kérés, ami a baseURL-hez adja hozzá a megadott végpontot
      console.log("Sikeresen elküldött adat:", response.data); // itt feldolgozhatod a szerver válaszát
    } catch (err) {
      setError("Hiba történt az adat elküldésekor.");
    } finally {
      setLoading(false);
    }
  };
  /*  A UseEffect hook segítségével asszinkron módon tudunk adatokat kezelni, illetve frissíteni tudjuk a DOM-ot, időzítőket használhatunk. Két argumentuma van. Az első argumentum egy függvény. Amikor a függvény által meghatározott tartalom megváltozik, automatikusan újrarenderelődik az oldalon a vonatkozó tartalom a DOM-ban. 
 A második paraméter  opcionális, arra használjuk, hogy függőségeket adjunk át a useEffectnek. A tömb eleme lehetnek props, vagy state elemek. A useEffect összehasonlítja a tömbben adott értékek előző és az aktuális állapotát, és csak akkor frissíti az oldalt, ha eltérés mutatkozik a két állapot között. Ezzel elkerülhetjük a végtelen hívásokat és frissítéseket.  */

  useEffect(() => {
    getData("/products"); // Adatok automatikus lekérése, amikor a kontextus betöltődik
  }, []);

  return (
    <ApiContext.Provider value={{ apiData, getData, postData }}>
      {children}
    </ApiContext.Provider>
  );
};
