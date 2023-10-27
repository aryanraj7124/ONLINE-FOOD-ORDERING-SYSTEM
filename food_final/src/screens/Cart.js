
import React,{ useEffect, useState } from 'react';
import { actionCreator } from "../state/index";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../state/action_creater/action_creater';
import { updateOrderStatus } from "../state/action_creater/action_creater"; 

import Payment from '../components/Payment';
import Modell from "./Modell";


export default function Cart() {
  const approvedArray = useSelector((state) => state.ADMIN);
  const approved = approvedArray.length > 0 && approvedArray[0].approved;
  
 

  const [id, setId] = useState(null);
  //
  useEffect(() => {
    async function fetchData() {
      try {
     
        const response = await fetch('http://localhost:5000/getcustomers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:userEmail}),
        });
        const data = await response.json();
        setId(data[0].id);
       
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
 



  const cartItems = useSelector(state => state.cartItems);
  const userEmail = localStorage.getItem("userEmail");
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);

  const amount = useSelector((state) => state.amount);

  const [payview,setPayview] = useState(false);


  if (cartItems.length === 0) {
    return (
      <div>
            <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
 

  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0);

  const handleCheckout = async () => {
  
    try {
      
      const orderData = cartItems.map(({ id, name, price, qty, qtysize }) => ({
        foodItemId: id,
        name,
        price,
        quantity: qty,
        qtysize
      }));
      const orderDate = new Date();

       // replace with the actual user's email address
  
      const response = await fetch("http://localhost:5000/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userEmail, orderData, orderDate ,customerId:id})
      });
  
      if (response.ok) {
        const { order } = await response.json();
        console.log("Order saved successfully!", order);
        // clear the cart and show a success message
      //  actions.clearCart();
      dispatch(updateOrderStatus("approved"));
      setPayview(true);
      }
      else {
        throw new Error("Error saving order details!");
      }
    } catch (error) {
      console.error("Error hai bhai",error);
    
    }
  };
  var q;

  //

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' style={{ "color": "white" }}>
        <table className='table table-hover'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Total Price</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody className='text-light'>
            {cartItems.map((food, index) => (
             
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.qtysize}</td>
                <td>{food.qty * food.price}</td>
                <td><button type="button" className="btn p-0 text-light" onClick={()=>{
                     dispatch(removeFromCart({index}));
                     actions.withdrawMoney(1);
                }}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          {/* <button className='btn bg-success mt-5 ' onClick={handleCheckout} > Check Out </button> */}
         
          <div>
            <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
          </div>
     
        {payview?<Modell onClose={()=>setPayview(false)}><Payment/></Modell>
                      :null}
        </div>
       
      </div>
    </div>
  )
}