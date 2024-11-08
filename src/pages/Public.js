import { useContext } from "react";
import TermekekPublic from "../components/public/TermekekPublic";
import { ApiContext } from "../contexts/ApiContext";
import Kosaram from "../components/public/Kosaram";
import { KosarContext } from "../contexts/KosarContext";
import KategoriaSzuro from "../components/public/KategoriaSzuro";


function Public() {
  const { apiData,kategoriaData } = useContext(ApiContext);
  const { kosar } = useContext(KosarContext);

  return (
    <main className="row g-5">
      <aside className="col-lg-4">
        <h3>Kosaram</h3>
        <Kosaram kosar={kosar} />
      </aside>
      <article className="col-lg-8">

        {kategoriaData ? <KategoriaSzuro kategoriak={kategoriaData} /> : "Nincs adat"}
        {apiData ? <TermekekPublic termekek={apiData} /> : "Nincs adat"}
      </article>
    </main>
  );
}

export default Public;
