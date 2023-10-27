import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useState,useEffect } from "react";
import Card from "../components/Card";
// import './Home.css';
import Carousal from "../components/Carousal";
export default function Home() {
  const [search,setSearch] = useState('');
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


  const [foodcat,setFoodct] = useState([]);
  const [fooditems,setFooditems] = useState([]);

  const loaddata = async () => {
   
    const response = await fetch("http://localhost:5000/get", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
   const json = await response.json();
  //  console.log(json[0],json[1]);
setFooditems(json[0]);
setFoodct(json[1]);
    }
useEffect(()=>{
  loaddata();
},[])
  return (
    <>
      <div>
        <div>
          <Navbar
            title="Online Food Ordering System"
            mode={mode}
            togglemode={togglemode}
          />
        </div>
        <div id="carouselExample" className="carousel slide" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption "style={{"zIndex":"10"}}>
  <div className="d-flex justify-content-center" >
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-black bg-success" type="submit">Search</button> */}
    </div>
      </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/30×30/?burger" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/30×30/?fruits" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/30×30/?food" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
       <div className="container">
         {
          foodcat!==[]
          ?foodcat.map((data)=>{
               return (<div className="row mb-3">
                 <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                 <hr />
                
                {
                
                fooditems!==[]
                ?
                fooditems.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                ).map(filterItems =>{
                
                  return (<>
               <div className="col-lg-3">
        
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card key={filterItems._id} fooditem ={filterItems} options = {filterItems.options} />
                      
                      </div>
                     </div>
                      </>
                  )
                })
                :<div>No Data Found</div>} 
                 </div>
               )
              
          })
          :""
         }
       </div>
        <div >
          <Footer />
        </div>
      </div>
    </>
  );
}
