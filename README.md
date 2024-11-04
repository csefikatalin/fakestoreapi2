# Fake Store webáruház 

A használt végpont dokumentációja: <a href="https://fakestoreapi.com/docs">https://fakestoreapi.com/docs</a>

## Axios saját példány létrehozása és alapbeállítások megadása a MyAxios.js fájlban

    import axios from "axios";
    export const myAxios = axios.create({
        baseURL: 'https://fakestoreapi.com',
        timeout: 10000,
        headers: {
        'Content-Type': 'application/json',
        },
    });

## Context létrehozása az asszinkron hívások kezeléséhez - ApiContext.js

    import { createContext, useEffect, useState } from "react";
    //saját Axios példány használata
    import { myAxios } from "./MyAxios";

    export const ApiContext = createContext("");

    export const ApiProvider = ({ children }) => {
    const [apiData, setApiData] = useState(null); // vagy bármilyen adat, amit az API-tól vársz
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* Az adatok asszinkron hívása axios segítségével */

    const getData = async () => {
        setLoading(true);
        setError(null);
        // saját axios példányt használjuk
        try {
        const response = await myAxios.get("/products"); //az alapértelmezett baseURL-ben megadott végpontot kiegészítjük a /products-szal
        setApiData(response.data); //beállítjuk az apiData statet a beállítófüggvényével.
        } catch (err) {
        setError("Hiba történt az adatok lekérésekor.");
        } finally {
        setLoading(false);
        }
    };
    /*  A UseEffect hook segítségével asszinkron módon tudunk adatokat kezelni, illetve frissíteni tudjuk a DOM-ot, időzítőket használhatunk. Két argumentuma van. Az első argumentum egy függvény. Amikor a függvény által meghatározott tartalom megváltozik, automatikusan újrarenderelődik az oldalon a vonatkozó tartalom a DOM-ban. 
    A második paraméter  opcionális, arra használjuk, hogy függőségeket adjunk át a useEffectnek. A tömb eleme lehetnek props, vagy state elemek. A useEffect összehasonlítja a tömbben adott értékek előző és az aktuális állapotát, és csak akkor frissíti az oldalt, ha eltérés mutatkozik a két állapot között. Ezzel elkerülhetjük a végtelen hívásokat és frissítéseket.  */

    useEffect(() => {
        getData(); // Adatok automatikus lekérése, amikor a kontextus betöltődik
    }, []);

    return (
        <ApiContext.Provider value={{ apiData, getData }}>
        {children}
        </ApiContext.Provider>
    );
    };

## Kosár kezelés - KosarContext.js, Kosaram.js

    import { createContext, useState } from "react";

    export const KosarContext = createContext("");

    export const KosarProvider = ({ children }) => {
    //a kosaram állapotát a kosar lista és a total (összár ) változók fogják leírni, létrehozom a stateket
    const [kosar, setKosar] = useState([]);
    const [total, setTotal] = useState(0);

    function kosarba(termek) {
        //kosárba teszem a terméket. 
        const segedKosar = [...kosar];
        //Megnézem van-e már ilyen termék a kosárban
        const vanIlyenTermek = segedKosar.find((elem) => elem.id === termek.id);
        if (vanIlyenTermek === undefined) {
        //ha nincs beállítom a termék darabszámát 1-re
        termek.db = 1;
        segedKosar.push(termek);
        } else {
        // ha van, akkor csak a darabszámot növelem.
        vanIlyenTermek.db++;
        }
        // a beállítófüggvénnyel frissítem a kosarat
        setKosar([...segedKosar]);
        console.log(kosar)
        osszeg()
    }
    function dbModosit(id, db){
        // adott termék darabszámának módosítása
        const segedKosar = [...kosar];
        const vanIlyenTermek = segedKosar.find((elem) => elem.id === id);    
        vanIlyenTermek.db = db;  
        // ha a darabszám 0, akkor tölöm a kosárból.   
        if (db===0){
        let termekIndex=segedKosar.indexOf(vanIlyenTermek)
        segedKosar.splice(termekIndex,1)
        
        }
        setKosar([...segedKosar]);
        osszeg()
    }
    function osszeg(){
        //fizetendő összár számítása
        let szum=kosar.reduce((sv,termek)=>{return sv+termek.price*termek.db;},0)
        setTotal(szum)
    }
    return (
        <KosarContext.Provider value={{ kosarba, kosar, dbModosit, total }}>
        {children}
        </KosarContext.Provider>
    );
    };

## Űrlap létrehozása - Ujtermek.js

1. a form submit eseményét a form tagre kell írni, nem a submit gombra.
2. Minden űrlaphoz  tartozik egy state változó, melynek értéke az űrlap beviteli mezőinek tartalma alapján kapja az értékeit. 

    const [termek, setTermek] = useState({
        title: "",
        price: 10,
        description: "",
        category: "",
        image: "",
    });

3. Egy általános űrlap elem az alábbi módon néz ki: 

    a. Az űrlapelem id-jét az űrlapot leíró state objektum kulcsai alapján érdemes adni. 
    b. Az onChange esemény fogja kezelni  az űrlapmezőbe írt változásokat

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Név
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          required
          placeholder="Termék neve"
          onChange={(event) => {
            handleChange(event);
          }}
          value={termek.title}
        />
      </div>

4. Az onChange esemény bekövetkeztekor lefutó függvény frissíti a state objektumot.

    function handleChange(event) {
        const stermek = { ...termek };
        stermek[event.target.id] =
        event.target.id === "price" ? parseFloat(event.target.value) || 0 : event.target.value;
        setTermek({ ...stermek });
    }

5. A handleSubmit függvény ellenőrzi az objektum validációját, majd ha valid az adat, akkor elküldi a szerver felé, azaz meghívja az ApiContext-ben létrehozott postData függvényt. 

    function handleSubmit(event) {
        event.preventDefault() 
        postData("/products",termek)
    }