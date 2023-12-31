import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ComposeSalad(props) {
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);

  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extra, setExtra] = useState({});
  const [dressing, setDressing] = useState('');



  let mySaladSelect = function (type, stateValue, changeFunction, allOptionsOfType) {
    let firstDisplayedOption = (<option></option>);
    if (stateValue) {
      firstDisplayedOption = (<option selected hidden>{stateValue} {props.inventory[stateValue]['price']} kr</option>);
    } else {
      firstDisplayedOption = (<option selected hidden>Välj {type}</option>);
    }
    return (
      <>
        <select
          required
          onChange={(e) => { changeFunction(e.target.value) }}
          style={{ width: 'auto' }}>
          {firstDisplayedOption}
          {allOptionsOfType.map(choice => <option value={choice} key={choice}>{choice} {props.inventory[choice]['price']} kr</option>)}
        </select>
      </>
    );
  }

  const myExtraSelect = function (type, stateValue) {
    return (
      <div>
        {extras.map(name => <label className="col-4">
          <input
            type='checkbox'
            checked={extra[name]}
            name={name}
            onChange={(e) => {
              setExtra({ ...stateValue, [e.target.name]: [e.target.checked][0] })
            }}>
          </input> {name} {props.inventory[name]['price']} kr</label>)}
      </div>
    );
  };

  class Salad {

    constructor(salad) {
      if (salad) {
        this.ingredients = salad.ingredients;
      } else {
        this.ingredients = {};
      }
      const uuid = uuidv4();
      this.uuid = uuid;
    }

    add(name, properties) {
      this.ingredients[name] = properties;
      return this;
    }

    remove(name) {
      delete this.ingredients[name];
    }
  }

  Salad.prototype.getPrice = function () {
    return Object.values(this.ingredients).reduce((accPrice, ingredient) => accPrice + ingredient['price'], 0);
  }
  Salad.prototype.displayIngredients = function () {
    return Object.keys(this.ingredients).reduce((a, b) => a + ", " + b);
  }

  const onSubmit = function (event) {
    event.preventDefault()
    if (!foundation || !protein || !dressing) {
      return;
    }

    let mySalad = new Salad();
    const chosenExtras = Object.keys(extra).filter((x) => x);

    mySalad
      .add(foundation, props.inventory[foundation])
      .add(protein, props.inventory[protein]);
    chosenExtras.forEach((x) => mySalad.add(x, props.inventory[x]));
    mySalad.add(dressing, props.inventory[dressing]);

    console.log(mySalad);

    resetForm();
    props.parentCallBack(mySalad);
  }

  const resetForm = function () {
    setFoundation("");
    setProtein("");
    setExtra({});
    setDressing("");
    document.forms.form.reset();
  }

  const caesarSalladBtn = function () {
    resetForm();
    setFoundation("Sallad");
    setProtein("Kycklingfilé");
    setExtra({ Bacon: true, Krutonger: true, Körsbärstomater: true, Rödlök: true, Fetaost: true });
    setDressing("Ceasardressing");
  }

  const optimalSaladBtn = function () {
    resetForm();
    setFoundation('Sallad + Pasta');
    setProtein("Kycklingfilé");
    setExtra({ "Soltorkad tomat": true, Sojabönor: true, "Inlagd lök": true, "Krossade jordnötter": true, Parmesan: true });
    setDressing("Pesto");
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

        <form id="form" onSubmit={(e) => onSubmit(e)}>
          <button type="button" className="btn btn-outline-primary" onClick={caesarSalladBtn}>Förvälj Caesarsallad</button>
          <button type="button" className="btn btn-outline-primary" onClick={optimalSaladBtn}>Förvälj Högst Kundvärde</button>
          <button type="button" className="btn btn-outline-danger" onClick={resetForm}>Rensa förval</button>
          <br />
          <div className="mb-3">
            <label htmlFor="foundation" className="form-label">Välj bas: </label>
            <br />
            {mySaladSelect('bas', foundation, setFoundation, foundations)}
          </div>

          <div className="mb-3">
            <label htmlFor="protein" className="form-label">Välj protein: </label>
            <br />
            {mySaladSelect('protein', protein, setProtein, proteins)}
          </div>

          <div className="mb-3">
            <label htmlFor="extra" className="form-label">Välj tillbehör: </label>
            <br />
            {myExtraSelect('tillbehör', extra)}
          </div>

          <div className="mb-3">
            <label htmlFor="dressing" className="form-label">Välj dressing: </label>
            <br />
            {mySaladSelect('dressing', dressing, setDressing, dressings)}
          </div>

          <button type="submit" className="btn btn-primary">Lägg till i kundvagnen</button>
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;