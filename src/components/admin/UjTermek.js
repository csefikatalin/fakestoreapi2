import React, { useContext, useState } from "react";
import { ApiContext } from "../../contexts/ApiContext";

function UjTermek() {
  const {postData} =useContext(ApiContext)
  const [termek, setTermek] = useState({
    title: "",
    price: 10,
    description: "",
    category: "",
    image: "",
  });

  function handleChange(event) {
    console.log(event.target.id);
    const stermek = { ...termek };
    stermek[event.target.id] =
      event.target.id === "price"
        ? parseFloat(event.target.value) || 0
        : event.target.value;

    console.log(stermek);
    setTermek({ ...stermek });
  }
  function handleSubmit(event) {
    event.preventDefault() 
    console.log(termek)
    postData("/products",termek)
  }
  return (
    <form  onSubmit={(event) => {
      
      handleSubmit(event);
    }}>
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
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Ár
        </label>
        <input
          type="number"
          min="10"
          max="100000"
          required
          className="form-control"
          id="price"
          value={termek.price}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Leírás
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={termek.description}
          onChange={(event) => {
            handleChange(event);
          }}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Válassz képet!
        </label>
        <input
          className="form-control"
          type="file"
          id="image"
          value={termek.image}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <button
        type="submit"
       
        className="btn btn-primary"
      >
        Küld
      </button>
    </form>
  );
}

export default UjTermek;
{
  /*      <div className="mb-3">
        
        <select className="form-select" aria-label="kategória választék" id="category"  value={termek.category}>
        <option value="0">Válassz kategóriát! </option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      </div> 
      
     
      
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Válassz képet!
        </label>
        <input className="form-control" type="file" id="image" />
      </div>*/
}
