import React, {useState} from 'react'
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import { useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";


function OrderStatus(){
  const orderStatus = useSelector((state) => state.orderStatus);
  const approvedArray = useSelector((state) => state.ADMIN);
  const approved = approvedArray.length > 0 && approvedArray[0].approved;
  console.log(approved)

  const FoodArray = useSelector((state) => state.FOOD);
  const food = FoodArray.length > 0 && FoodArray[0].approved;

  const FoodD = useSelector((state) => state.D);
  const D = FoodD.length > 0 && FoodD[0].approved;

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
    <>
    <Navbar
            title="Online Food Ordering System"
            mode={mode}
            togglemode={togglemode}
          />
          <div className="container">
            
     <h1 className="text-center my-5"><Alert variant="success">Order Status</Alert></h1> 
          </div>
   
    
       
       
        <tbody className='text-light'>
  <tr>
    
    <td>   
    <div
          className="container-fluid"
          style={{
            backgroundImage: 'url(approved.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '60vh',
            width: '25vw',
            position: 'relative',
            marginTop: '0px',
          }}
        ></div>
      {approved ? (
            <Alert variant="success">
             Your purchase has been accepted! It will shortly be prepared for cooking.
            </Alert>):<Alert variant="danger">
            Your purchase has not been authorised. It will shortly be prepared for cooking.
            </Alert>
          }</td>
    <td> <div
          className="container-fluid"
          style={{
            backgroundImage: 'url(cooking.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '60vh',
            width: '20vw',
            position: 'relative',
            marginTop: '0px',
          }}
        ></div> {food ?  (
          <Alert variant="success">
           Your order is now ready! It will soon be prepared for packing.
          </Alert>
        ):<Alert variant="success">
        Your order hasn't even been begun yet! It will soon be prepared for packing.
      </Alert>}</td>
    <td>
    <div
          className="container-fluid"
          style={{
            backgroundImage: 'url(food-delivery.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '60vh',
            width: '30vw',
            position: 'relative',
            marginTop: '0px',
          }}
        ></div>
    {D ?  (
          <Alert variant="success">
           Delivery of your order has been made! Enjoy .
          </Alert>
        ):<Alert variant="success">
       Your order has not yet been shipped!
      </Alert>}
    </td>
  </tr>
</tbody>
          {orderStatus === "packed" && (
            <Alert variant="warning">
              Your order is ready to be delivered!
            </Alert>
          )}
          {orderStatus === "delivered" && (
            <Alert variant="info">Your order has been delivered!</Alert>
          )}
       
     
       <div >
          <Footer />
        </div>
    </>
  );
};

export default OrderStatus;


