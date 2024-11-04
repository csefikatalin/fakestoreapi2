import { createContext, useState } from "react";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
  const [kosar, setKosar] = useState([]);
  const [total, setTotal] = useState(0);

  function kosarba(termek) {
    const segedKosar = [...kosar];
    const vanIlyenTermek = segedKosar.find((elem) => elem.id === termek.id);
    if (vanIlyenTermek === undefined) {
      termek.db = 1;
      segedKosar.push(termek);
    } else {
      vanIlyenTermek.db++;
    }
   
    setKosar([...segedKosar]);
    console.log(kosar)
    osszeg()
  }
  function dbModosit(id, db){
    const segedKosar = [...kosar];
    const vanIlyenTermek = segedKosar.find((elem) => elem.id === id);    
    vanIlyenTermek.db = db;    
    if (db===0){
      let termekIndex=segedKosar.indexOf(vanIlyenTermek)
      segedKosar.splice(termekIndex,1)
      
    }
    setKosar([...segedKosar]);
    osszeg()
  }
  function osszeg(){
  
    let szum=kosar.reduce((sv,termek)=>{return sv+termek.price*termek.db;},0)
    setTotal(szum)
  }
  return (
    <KosarContext.Provider value={{ kosarba, kosar, dbModosit, total }}>
      {children}
    </KosarContext.Provider>
  );
};
