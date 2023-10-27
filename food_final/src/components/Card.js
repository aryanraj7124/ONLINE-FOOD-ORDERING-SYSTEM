import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../state/index";
import { bindActionCreators } from "redux";
import './Home.css';

export default function Card(props) {
  const options = props.options;
  console.log(options)

  
  const priceOptions = Object.values(options);
  const entries = Object.entries(priceOptions[0]);
  //add to cart
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);

  const size1 = Object.values(entries[1][0]);
  const [qty, setQty] = useState(1);
  const [qtysize, setQtysize] = useState(Object.values(entries[0][0]).join(''));
  const [fullPrice, setFullPrice] = useState(Object.values(entries[0][1]).join(''));

  const priceRef = useRef();
  useEffect(() => {
    const newFullPrice = Object.values(entries.find(([size]) => size === qtysize)[1]).join('');
    setFullPrice(newFullPrice);
  }, [qtysize]);

  const finalPrice = qty * fullPrice;
  // const handleAddToCart = async () => {
  //   actions.depositMoney(1);
  // await  dispatch({
  //     type: 'ADD',
  //     id: props.fooditem._id,
  //     name: props.fooditem.name,
  //     price: finalPrice,
  //     qty: qty,
  //     qtysize: qtysize,
  //     img : props.fooditem.img
  //   });
  //   console.log(`Added to cart: ${props.fooditem._id}, ${props.fooditem.name}, ${qty}, ${qtysize} , ${finalPrice}`);
  // }

  const handleAddToCart = async () => {
    actions.depositMoney(1);
  actions.addToCart({ id: props.fooditem._id, name: props.fooditem.name, qty: qty, qtysize: qtysize, price: finalPrice, img: props.fooditem.img});
console.log(`Added to cart: ${props.fooditem._id}, ${props.fooditem.name}, ${qty}, ${qtysize} , ${finalPrice}`);
}
return (
  <div>
    <div>
      <div className="card my-3 mx-3 p-3" style={{ "width": "18rem", "height": "28rem" }}>
        <img src={props.fooditem.img} alt="..." className="card-img-top" style={{ "height": "12rem", "objectFit": "cover" }} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{props.fooditem.name}</h5>
            <p className="card-text">{props.fooditem.description}</p>
          </div>
          <div className="d-flex align-items-center">
            <select className="form-select form-select-sm me-2" value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className="form-select form-select-sm me-2" ref={priceRef} value={qtysize} onChange={(e) => setQtysize(e.target.value)}>
              {entries.map((data) => {
                return <option key={data} value={data[0]}>{data[0]}</option>
              })}
            </select>
           
          </div>
         
          <div className="fw-bold fs-6" >Total Price: ₹ {finalPrice}/-</div> 
          <div>
            <button onClick={handleAddToCart} className="btn btn-warning w-100">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}