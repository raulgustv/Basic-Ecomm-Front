import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  width: '300px'
};

const JumboCarousel = ({ products }) => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col text-center p-4 bg-light jumbotron">
          <Carousel autoplay effect="fade">
            {
              products.map((p) => (
                <div key={p._id}>
                  <h3>
                    <img className='mx-auto d-block' style={contentStyle} alt={p.name} src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} />
                  </h3>
                </div>
              ))
            }

          </Carousel>
        </div>
      </div>
    </div>


  )
}
export default JumboCarousel;