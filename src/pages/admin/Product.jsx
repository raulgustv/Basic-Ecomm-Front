import { useEffect, useState } from "react";
import { getCategories } from "../../actions/category";
import { Jumbotron } from "../../components/cards"
import ProductForm from "../../components/forms/ProductForm";
import { AdminMenu } from "../../components/nav";
import { useAuth } from "../../context/auth"



const Product = () => {

  const [auth] = useAuth();
  const { user } = auth;

  //list them to drop down
  const [categories, setCategories] = useState([])

  //form

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }, []);



  return (
    <div>
      <Jumbotron title='Admin Dashboard Products' subtitle={`Welcome ${user.name}`} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mb-2 mt-2 h4 bg-light">
              Manage Products
            </div>

           <ProductForm categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product