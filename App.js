import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';

function App() {
  class OrderHandler {
    constructor() {
      this.basket = [];
    }

    add(salad) {
      this.basket.push(salad);
    }

    delete(uuid) {
      this.basket = this.basket.filter((salad) => salad.uuid !== uuid);
    }

    calculatePrice() {
      return this.basket.reduce((accPrice, salad) => accPrice + salad.getPrice(), 0);
    }
  }

  const [myOrderHandler, setOrderHandler] = useState(new OrderHandler());

  const handleCallBack = (saladData) => {
    let newOrderHandler = new OrderHandler();
    myOrderHandler.basket.forEach((x) => newOrderHandler.add(x));
    if (saladData) 
      newOrderHandler.add(saladData);
    setOrderHandler(newOrderHandler);
  }

const removeSaladButton = function(uuid) {
myOrderHandler.delete(uuid);
handleCallBack();
}

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <div className="continer col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h3>Din beställning</h3>
          <ViewOrder orderHandler={myOrderHandler} button={removeSaladButton}/> 
        </div>
      </div>

      <ComposeSalad inventory={inventory} parentCallBack={handleCallBack} />

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;
