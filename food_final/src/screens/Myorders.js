
import Footer from "../components/Footer";
import React, { useEffect, useState } from 'react';
import './Myorders.css'
import Navbar from '../components/Navbar';
import { Container, Row, Col, Alert } from "react-bootstrap";


export default function MyOrders() {
  const [items, setItems] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  // load data
  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });
      const json = await response.json();
      setItems(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const [mode, setmode] = useState("light");

  const togglemode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      document.title = "Online Food Ordering System - Dark Mode";
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      document.title = "Online Food Ordering System - Light Mode";
    }
  };


  return (
    <>  <Navbar
    title="Online Food Ordering System"
    mode={mode}
    togglemode={togglemode}
  />
   
    
    
    <div className='container'>
    <h1 className="text-center my-5"><Alert variant="success">My Orders</Alert></h1> 
      <div className='row'>
        {items.map(({ userEmail, orderData, orderDate }) => {
          const orderItems = JSON.parse(orderData);
          let totalPrice = 0;
          orderItems.forEach(({ price, quantity }) => {
            totalPrice += price * quantity;
          });
          return (
            <div className='col-md-6' key={orderDate}>
              <div className='card' style={{ width: '22rem' }}>
                <div className='card-header bg-primary text-white'>Order Date: {orderDate}</div>
                <ul className='list-group list-group-flush'>
                  {orderItems.map(({ name, price, qty }, index) => (
                    <li className='list-group-item' key={index}>
                      <div className='d-flex justify-content-between'>
                        <div>{name}</div>
                        <div>₹{price}/-</div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        
                        
                      </div>
                    </li>
                  ))}
                  <li className='list-group-item'>
                    <div className='d-flex justify-content-between'>
                      <div>
                        <b>Total: ₹{totalPrice}/-</b>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <button className='btn btn-primary mt-3' >Send Email</button>
    </div>
    <div >
          <Footer />
        </div>
    </>
  );
  
    }