import { useContext } from "react";
import TermekekPublic from "./components/public/TermekekPublic";
import { ApiContext } from "./contexts/ApiContext";
import Kosaram from "./components/public/Kosaram";
import { KosarContext } from "./contexts/KosarContext";

function App() {
  const { apiData } = useContext(ApiContext);
  const { kosar } = useContext(KosarContext);

  return (
    <div className="container">
      <header className="">
        <h1>FakeStore Webáruház</h1>
      </header>
    
      <main className="row g-5">
      <aside className="col-lg-4">
        <h3>Kosaram</h3>
        <Kosaram kosar={kosar} />
      </aside>
        <article className="col-lg-8">
          {apiData ? <TermekekPublic termekek={apiData} /> : "Nincs adat"}
        </article>
      </main>
    </div>
  );
}

export default App;
