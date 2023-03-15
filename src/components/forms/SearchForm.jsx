import { Input } from 'antd';
import { getSearchProducts } from '../../actions/product';
import { useSearch } from '../../context/search';
import {useNavigate} from 'react-router-dom';


const SearchForm = () => {

    const { Search } = Input;

    const navigate = useNavigate();

    //search hook
    const [values, setValues] = useSearch();

    const handleSearch = (keyword) =>{
        setValues({...values, keyword})
        getSearchProducts(keyword).then((data) =>{
            setValues({...values, results: data})
        }).finally(navigate('/search')).catch(err => console.log(err))
    };

   // console.log(values)
    return (
        <>
            <Search
                placeholder="Search Products"
                allowClear
                onSearch={handleSearch}
                style={{
                    width: 200,
                }}
            />
        </>
    )
}

export default SearchForm