import { useSearch } from "../../context/search";
import {  Row } from 'antd'
import { Jumbotron, ProductCard } from "../../components/cards";


const Search = () => {

  const [searchResults] = useSearch();
  const { results } = searchResults;


  return (
    <div className='container-fluid'>
      <Jumbotron
        title='Search results'
        subtitle={`${results.length} ${results.length > 1 || results.length === 0 ? 'products' : 'product'} found`}
      />
      <h1 className='text-center'>SHOP
      
      </h1>

      <Row>
        <ProductCard products={results} />
      </Row>




    </div>
  )
}

export default Search