import axios from "axios";

export const getClientToken = async() =>{
    try {
        const {data} = await axios.get('/braintree/token');
        return data;
    } catch (error) {
        console.log(error)
    }
}


export const processPayment = async(instance, cart) =>{
   try {
    const {nonce} = await instance.requestPaymentMethod();

    const {data} = await axios.post('/braintree/payment', {
        nonce,
        cart
    });

    return data;
   } catch (error) {
        return console.log(error)
   }
}