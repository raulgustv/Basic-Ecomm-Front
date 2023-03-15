import {  Row } from 'antd';
import { useState, useEffect } from 'react';
import { getAllProducts } from '../actions/product';
import { ProductCard, JumboCarousel } from '../components/cards';
//import { UserMenu } from '../components/nav';
//import { useAuth } from '../context/auth';

const Home = () => {

  //const [auth] = useAuth();
  //const { user } = auth;

  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getAllProducts().then((data) => {
      setProducts(data)
    })
  }

  useEffect(() => {
    loadProducts()
  }, []);

  const arr = [...products];

  const carouselProds = arr.slice(0,3); 

  const sortedBySold = arr?.sort((a, b) => (a.sold > b.sold ? 1 : -1)).slice(0,3)

  return (
    <div>
      <JumboCarousel products={carouselProds} />
      <h1>Home page</h1>

      <hr />

      <h2>New Arrivals</h2>
      <Row>        
        <ProductCard colSize={6} products={carouselProds} />
      </Row>

      <hr />

      <h2>Best sellers</h2>
      <Row>
        <ProductCard colSize={6} products={sortedBySold} />
      </Row>



    </div>
  )
}

export default Home