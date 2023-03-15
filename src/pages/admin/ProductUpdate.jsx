import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategories } from "../../actions/category";
import { getProduct } from "../../actions/product";
import { Jumbotron } from "../../components/cards"
import ProductUpdateForm from "../../components/forms/ProductUpdateForm";
import { AdminMenu } from "../../components/nav";
//import { useAuth } from "../../context/auth";



const ProductUpdate = () => {

  //const [auth] = useAuth();
  //const { user } = auth;

  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});


  

  //get categories
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }, []);

  //getproduct
  useEffect(() =>{
    getProduct(params).then((data) =>{
        setProduct(data)
    })
  }, [params]);

  return (
    <div>
      <Jumbotron title={`Update ${product.name}`} subtitle={`Update your product`} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mb-2 mt-2 h4 bg-light">
              Enter the new values for {product.name}
            </div>

           <ProductUpdateForm categories={categories} product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate