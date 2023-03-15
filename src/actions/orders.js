import axios from 'axios';

export const getAllUserOrders = async() =>{
    try {
        const {data} = await axios.get('/user-orders');

        return data;
    } catch (error) {
        console.log(error)
    }

}

export const cancelUserOrder = async(id) =>{
    try {
        
        axios.put(`/cancel-order/${id}`);

    } catch (error) {
        console.log(error)
    }
}

export const getAllOrdersAdmin = async() =>{
    try {
        const {data} = await axios.get('/all-orders');
        return data;



    } catch (error) {
        console.log(error)
    }
}

export const updateOrdersAdmin = async(_id, status) =>{
    try {

       const {data} = await axios.put(`update-order/${_id}`, {status});

       return data;
        
    } catch (error) {
        console.log(error)
    }
}