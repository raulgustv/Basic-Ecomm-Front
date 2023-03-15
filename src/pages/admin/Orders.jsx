
import { Layout, theme } from 'antd'
import { useEffect, useState } from 'react'
import { getAllOrdersAdmin } from '../../actions/orders'
import { Jumbotron } from '../../components/cards'
import OrderCard from '../../components/cards/OrderCard'
import { AdminMenu } from '../../components/nav'
import { useAuth } from '../../context/auth'

const Orders = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const { Sider, Content } = Layout;

  const [auth] = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);



  const loadAllOrders = () => {
    setLoading(true)
    getAllOrdersAdmin().then((data) => {
      //console.log(data)
      setOrders(data)
      setLoading(false)
    })
  };

  //console.log(orders)


  useEffect(() => {
    if (auth?.user?.role === 1) {
      loadAllOrders()
    }
  }, [auth?.user?.role]);


  return (
    <>
      <Jumbotron title='Orders' subtitle={'Your Orders'} />

      <Layout>
        <Sider style={{ backgroundColor: colorBgContainer, margin: '12px 12px' }}>
          <AdminMenu />
        </Sider>

        <Content style={{ margin: '12px 12px' }}>

          {!orders && <h2>There are no orders placed</h2>}

          <OrderCard orders={orders} loading={loading} />

        </Content>
      </Layout>
    </>
  )
}

export default Orders