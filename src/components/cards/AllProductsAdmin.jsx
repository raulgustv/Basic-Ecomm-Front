import { Link } from "react-router-dom";
import { Card, Col } from 'antd';
import moment from 'moment';
//import {DeleteOutlined} from '@ant-design/icons';

const AllProductsAdmin = ({ products }) => {

  //const {Meta} = Card;


  return (
    <>
      {
        products?.map((p) => (
          <Col span={6} key={p._id}>
            <Link to={`/dashboard/admin/product/update/${p.slug}`}>
              <Card
                title={p.name}
                hoverable
                cover={<img style={{height: 180}} alt={p.name} src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}  />}
                style={{
                  width: 180,
                  height: 320,
                  margin: 25
                }}

              >
                  {/* <Meta description={p.description} /> */}
                  <p>
                    <small className="text-muted">
                      Created: {moment(p.createdAt).format('MMMM Do YYYY')}
                    </small>
                  </p>
              </Card>
            </Link>
          </Col>
        ))
      }
    </>
  )
}

export default AllProductsAdmin;