import React, { useContext } from "react";
import { ApiContext } from "../../contexts/ApiContext";

function KategoriaSzuro(props) {
    const {szures}=useContext(ApiContext)
  return (
    <div className="p-5">
      <label htmlFor="exampleDataList" className="form-label">
        Válassz kategóriát!
      </label>

      <select className="form-select" aria-label="Default select example" onChange={(e)=>{szures(e.target.value)}}>
      <option value="osszes" >összes</option>;

        {props.kategoriak.map((elem, index) => {
          console.log(elem);
          return <option value={elem} key={index} >{elem}</option>;
        })}
      </select>
    </div>
  );
}

export default KategoriaSzuro;
