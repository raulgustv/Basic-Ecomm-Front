import axios from 'axios';
import toast from 'react-hot-toast'
import {DeleteOutlined} from '@ant-design/icons'


export const createProduct = async(values, photo, navigate) => {

    const {name, description, price, category, quantity, shipping} = values;

    try {

        const productData = new FormData();

        productData.append('name', name);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('category', category);
        productData.append('quantity', quantity);
        productData.append('shipping', shipping);
        productData.append('photo', photo);
        
        const {data} = await axios.post('/product', productData);

        if(data?.error){
            return toast.error(data.error)
        }
        
        toast.success(`'${data.name}' has been created`)

        navigate('/dashboard/admin/products')

        //console.log(data)
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllProducts = async() =>{
    try {
        const {data} = await axios.get('/product');

        return data;
    } catch (error) {
        console.log(error) 
    }
}

export const getProduct = async(params) =>{
    try {

        const {slug} = params;

        const {data} = await axios.get(`/product/${slug}`);

        return data;

        
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async(values, photo, params, navigate) =>{

    const {slug} = params;

    const {name, description, price, category, quantity, shipping} = values;

    const productData = new FormData();

    productData.append('name', name);
    productData.append('description', description);
    productData.append('price', price);
    productData.append('category', category);
    productData.append('quantity', quantity);
    productData.append('shipping', shipping);
    photo && productData.append('photo', photo);

    const {data} = await axios.put(`/product/${slug}`, productData);

    if(data?.error){
        return toast.error(data.error)
    }

    toast.success(`${data.name} has been updated`);
    navigate('/dashboard/admin/products')
}

export const deleteProduct = async(slug, navigate) =>{
    try {
        await axios.delete(`/product/${slug}`) 

        toast.success('Product deleted correctly', {
            icon: <DeleteOutlined />,
        });
        navigate('/dashboard/admin/products')
    } catch (error) {
        console.log(error)
    }
}

export const loadFilteredProducts = async (checked, slider) =>{
    try {

        //console.log(slider)

        const {data} = await axios.post('/filtered-products', {checked, slider});

        //console.log(data)

        return data;
        
    } catch (error) {
        console.log(error)
    }
}

export const getTotalProductsCount = async() =>{
    try {
        const {data} = await axios.get('/products-count');

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getTotalProducts = async( page) =>{
    try {
    
    const {data} = await axios.get(`/list-products/${page}`)

    return data;
    } catch (error) {
        console.log(error)
    } 
}

export const getSearchProducts = async(keyword) =>{
    try {
        
        const {data} = await axios.get(`/products/search/${keyword}`);

        //console.log(data)

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getRelatedProducts = async(productId, categoryId) =>{
    try {
        const {data} = await axios.get(`/related-products/${productId}/${categoryId}`) ;
        return data;
    } catch (error) {
        console.log(error)
    }
}

