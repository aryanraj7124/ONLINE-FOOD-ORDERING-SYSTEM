import React, { useState } from 'react';
import { actionCreator } from "../state/index";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux';


export default function Payment({ totalAmount, handlePayment }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const cartItems = useSelector(state => state.cartItems);
  const userEmail = localStorage.getItem("userEmail");
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Done")
  };
  // style={{color:"black"}}
  return (
    <div >
      <h2 className="form-group text-center">Payment Details</h2>
      <div >
        <div >
          <form onSubmit={handleSubmit}>
            <div className=' text-dark' >
              <label htmlFor="cardNumber  text-dark">Card Number:</label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                placeholder="Enter Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group  text-dark">
              <label htmlFor="cardHolderName  text-dark">Card Holder Name:</label>
              <input
                type="text"
                className="form-control"
                id="cardHolderName"
                placeholder="Enter Card Holder Name"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div >
                <div className="form-group  text-dark">
                  <label htmlFor="expiryMonth">Expiry Month:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="expiryMonth"
                    placeholder="MM"
                    min="1"
                    max="12"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div >
                <div className="form-group  text-dark">
                  <label htmlFor="expiryYear ">Expiry Year:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="expiryYear"
                    placeholder="YYYY"
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 10}
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className=' text-dark'>
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="Enter CVV"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group text-center">
              <h4>Total Amount: ₹{totalAmount}</h4>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}