import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('')

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
      console.log(response[0], response[1]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              {/* <button className="btn btn-outline-success text-white bg-success my-2 my-sm-0 m-2" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/800x800/?chef" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/800x800/?pepper" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/800x800/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button></div>
        <div className='container'>
          {foodCat.length > 0 ? (
            foodCat.map((data) => (
              <div key={data._id}>
                <div className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                <div className='row'>
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map((filterItems) => (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 px-2 mb-3'>
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}

                          />
                        </div>
                      ))
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            ""
          )}
          {/* Remove this line unless you have specific data for a single card outside the map function */}
          {/* <Card /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
