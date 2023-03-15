import axios from "axios";
import toast from 'react-hot-toast';


export const createCategory = async(name) =>{
    try {
        
        const {data} = await axios.post('/category', {name});
        //console.log(data)



        if(data.error){
            return toast.error(data.error)
        }

        toast.success(`"${data.name}" created`);
        return data;
    } catch (error) {
        console.log(error)
        toast.error('Error creating category'
        )
    }
}

export const getCategories = async() =>{
    try {
        const {data} = await axios.get('/categories');

        return data;

    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = async(updatedName, selected) =>{
    
    const {name} = updatedName;
    const {slug} = selected

    //console.log(slug, {name})
    try {

        const {data} = await axios.put(`/category/${slug}`, {name});
        if(data?.error){
           return toast.error(data?.error)
        }
        toast.success(`Category has been updated to ${data.name}`)

        //
        //console.log(data)
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory = async(selected) =>{
   try {

    const {name, slug} = selected;
    await axios.delete(`/category/${slug}`);

    toast.success(`Category ${name} has been deleted`)

   } catch (error) {
        console.log(error)
   }

  
}