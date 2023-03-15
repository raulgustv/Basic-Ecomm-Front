import { useEffect, useState } from "react";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../actions/category";
import { Jumbotron } from "../../components/cards"
import CategoryForm from "../../components/forms/CategoryForm";
import { AdminMenu } from "../../components/nav";
import { useAuth } from "../../context/auth"
//import {Modal} from 'antd'
import Modal from "antd/es/modal/Modal";



const Category = () => {

  const [auth] = useAuth();
  const { user } = auth;


  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);


  const [form, setForm] = useState({
    name: ''
  });

  const [updatedForm, setUpdatedForm] = useState({
    updatedName: ''
  });

  const { updatedName } = updatedForm;
  const { name } = form;

  const handleSubmit = e => {
    e.preventDefault();
    createCategory(name).then(loadCategories).finally(setForm({ name: '' }))
  }

  //get all categories
  const loadCategories = () => {
    getCategories().then(data => {
      setCategories(data)
    }).catch(err => {
      console.log(err)
    })
  };

  useEffect(() => {
    loadCategories();
  }, []);

  //update category
  const handleCategoryUpdate = (e) => {
    e.preventDefault();
    updateCategory(updatedForm, selected).then(() => {
      setSelected(null);
      setVisible(false);
      loadCategories();
      setUpdatedForm({updatedName: ''})
    })
  }

  //Delete category
  const handleCategoryDelete = (e) => {
    e.preventDefault();
    deleteCategory(selected).then(() =>{
      setVisible(false);
      loadCategories();
      setSelected(null);
    })
  }


  //console.log(categories)

  return (
    <div>
      <Jumbotron title='Admin Dashboard Category' subtitle={`Welcome ${user.name}`} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mb-2 mt-2 h4 bg-light">
              Manage categories
            </div>

            <hr className="hr hr-blurry" />

            <CategoryForm
              name={name} setForm={setForm}
              handleSubmit={handleSubmit}
            />

            <div className="col">
              {
                categories.map((c) => (
                  <button
                    className="btn btn-outline-info m-3"
                    onClick={() => {
                      setVisible(true)
                      setSelected(c)
                      setUpdatedForm(c.name)
                    }}
                    key={c._id}
                  >
                    {c.name}
                  </button>
                ))
              }
            </div>
            {/* <CategoryModal visible={visible} /> */}
            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                values={form}
                name={updatedName}
                setForm={setUpdatedForm}
                handleSubmit={handleCategoryUpdate}
                buttonText='Update'
                handleDelete={handleCategoryDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category