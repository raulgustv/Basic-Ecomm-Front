import { Divider, Row, Col, Checkbox, Slider, Button } from 'antd';
import { useState, useEffect } from 'react';
import { getCategories } from '../../actions/category';
import { getAllProducts, loadFilteredProducts } from '../../actions/product';
import { ProductCard, JumboCarousel } from '../../components/cards';

const Shop = () => {

  //const [auth] = useAuth();
  //const { user } = auth;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [slider, setSlider] = useState([]);
  const formatter = (value) => `${value}%`;

  const onCheckChange = (value, id) => {
    let allCategories = [...checked];

    if (value.target.checked) {
      allCategories.push(id)
    } else {
      allCategories = allCategories.filter((c) => c !== id)
    }

    setChecked(allCategories)

    //console.log(allCategories)
  }

  const loadProducts = () => {
    getAllProducts().then((data) => {
      setProducts(data)
    })
  }

  const loadCategories = () => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }

  //tiene que recibir estos dos argumentos para poder colocarlos como dependencia en el useEffect()
  const loadFiltered = (checked, slider) => {
    if (checked.length || slider.length) {
      loadFilteredProducts(checked, slider).then((data) => {
        setProducts(data)
      })
    }
  }

  //pagination
  // const loadTotal = () => {
  //   getTotalProductsCount().then((data) => {
  //     setTotalProducts(data)
  //   })
  // }

  // const loadTotalProducts = (page) => {
  //   getTotalProducts(page).then((data) => {
  //     setProducts([...products, ...data]);
  //     setLoading(false)
  //   })
  // };

  // const loadMore = (page) => {
  //   setLoading(true)
  //   getTotalProducts(page).then((data) => {
  //     setProducts(data)
  //   })
  // };


  useEffect(() => {
    if (!checked.length || !slider.length) loadProducts();
    //loadTotalProducts(page);
    loadCategories();
    loadFiltered(checked, slider);
    //loadTotal();
  }, [checked, slider]);


  const sliderMarks = {
    0: '$0.00',
    19.99: '$19.99',
    39.99: '$39.99',
    59.99: '$149.99',
    79.99: {
      label: <strong>$79.99</strong>,
    },
  };

  const handleSlideChange = (value) => {
    setSlider(value)
  }

  const handleResetFilters = () => {
    window.location.reload()
  }

  const arr = [...products];

  const carouselProds = arr.slice(0, 4);

  return (
    <div className='container-fluid'>
      <JumboCarousel products={carouselProds} />
      <h1 className='text-center'>Shop page</h1>

      <Row>
        <Col span={6}>
          <Row>
            <h3>Category Filter</h3>
            <Row gutter={8}>
              {
                categories.map(({ name, _id }) => (
                  <Col span={8} key={_id}>
                    <Checkbox onChange={(e) => onCheckChange(e, _id)}>{name}</Checkbox>
                  </Col>
                ))
              }
            </Row>

            <Divider />

          </Row>

          <Row>
            <Col span={24}>
              <h3>Price Range</h3>
              <Slider
                tooltip={formatter}
                marks={sliderMarks}
                range={{ draggableTrack: true }}
                onChange={handleSlideChange}
                max={100}
                min={0}
                defaultValue={[0, 100]}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <h3>Reset Filters</h3>
              <Button type='dashed' onClick={handleResetFilters}>Reset all filters</Button>
            </Col>
          </Row>
        </Col>

        <Col span={18}>
          <Row gutter={10}>
            <ProductCard products={products} />
          </Row>
        </Col>
      </Row>

      {/* <div className="container">
        <Row>
          {products && products?.length < totalProducts && (
            <Button type='dashed'
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1)
              }}
            >
              {loading ? 'Loading...' : 'Load More...'}
            </Button>
          )}
        </Row>
      </div> */}


    </div>
  )
}

export default Shop