import React from 'react'

export default function Carousal() {
  return (
   <>
   <div id="carouselExample" className="carousel slide" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption "style={{"zIndex":"10"}}>
  <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-black bg-success" type="submit">Search</button>
    </form>
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
   </>
  )
}
