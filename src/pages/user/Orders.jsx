
import { Layout, theme } from 'antd'
import { useEffect, useState } from 'react'
import { getAllUserOrders } from '../../actions/orders'
import { Jumbotron } from '../../components/cards'
import OrderCard from '../../components/cards/OrderCard'
import { UserMenu } from '../../components/nav'
import { useAuth } from '../../context/auth'

const Orders = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const { Sider, Content } = Layout;

  const [auth] = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  const loadOrders = () =>{
      setLoading(true)
      getAllUserOrders().then((data) =>{
        setOrders(data)
        setLoading(false)
      }) 
  };


  useEffect(() =>{
    if(auth?.token){
      loadOrders()
    }
  }, [auth?.token]);


 


  return (
    <>
      <Jumbotron title='Orders' subtitle={'Your Orders'} />

      <Layout>
        <Sider style={{backgroundColor: colorBgContainer, margin: '12px 12px' }}>
          <UserMenu />
        </Sider>

        <Content style={{margin: '12px 12px'}}>          

        {!orders && <h2>You have not placed any orders yet</h2>}
          
        <OrderCard orders={orders} loading={loading} />        
     
        </Content>
      </Layout>
    </>
  )
}

export default Orders