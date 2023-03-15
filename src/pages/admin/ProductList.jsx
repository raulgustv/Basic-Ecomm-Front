import { useAuth } from "../../context/auth";
import { Jumbotron, AllProductsAdmin } from "../../components/cards"
import { AdminMenu } from "../../components/nav";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../actions/product";
import { Row, Col } from "antd";




const ProductList = () => {

  const [auth] = useAuth();
  const { user } = auth;

  const [products, setProducts] = useState([]);

  //console.log(products)

  const loadProducts = () => {
    getAllProducts().then((data) => {
      setProducts(data)
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div>
      <Jumbotron title='Admin Dashboard All Products' subtitle={`Welcome ${user.name}`} />

      <Row>
        <Col span={6}>
          <AdminMenu />
        </Col>

        <Col span={16} offset={1}>
          <div className="p-3 mb-2 mt-2 h4 bg-light">
            Products
          </div>

          <Row gutter={16}>        
            <AllProductsAdmin products={products} />
          </Row>
        </Col>
      </Row>
    </div>
  )
}



export default ProductList