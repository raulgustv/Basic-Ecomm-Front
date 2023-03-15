import { Card, Col, Divider, List, Progress, Result, Row, Select, Skeleton } from 'antd'
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { updateOrdersAdmin } from '../../actions/orders';
import { useAuth } from '../../context/auth';
import PopupCancel from '../forms/PopupCancel';

const OrderCard = ({ orders, loading }) => {

    const [auth] = useAuth();

    const { user } = auth;
    const { Option } = Select;


    const orderStatus = [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ];
    

    const handleStatusChange = (_id, value) => {
        updateOrdersAdmin(_id, value).then((data) => {
            toast.success(`Order status sucessfully updates to ${data.status}`);
            
        })
    };

    return (
        <>

            <Skeleton loading={loading}>
                {
                    orders.map(({ _id, status, payment, creaedAt, products, buyer }) => (
                        <Card style={{ marginTop: '16px' }} key={_id}>
                            <Row>
                                <Col span={24}>
                                    <h4>Order # {_id}</h4>
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col span={6}>
                                    <h4>Items</h4>
                                    <List
                                        dataSource={products}
                                        renderItem={(p) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={p.name}

                                                />
                                            </List.Item>
                                        )}
                                    >

                                    </List>

                                    {
                                        user.role === 1 && (
                                            <>
                                                <Divider />
                                                <h5>Buyer</h5>
                                                <p>{buyer.name}</p>
                                                <p>Payment Id: <small>{payment.transaction.id}</small></p>
                                            </>
                                        )
                                    }
                                </Col>

                                <Col span={1}>
                                    <Divider type='vertical' style={{ minHeight: '300px' }} />
                                </Col>

                                <Col span={6}>
                                    <h5>Order placed on:</h5>
                                    <span>{moment(creaedAt).format('MMM Do, YY')}</span>

                                    <Divider />

                                    <h5>Total Paid</h5>
                                    <span>${payment?.transaction?.amount}</span>
                                </Col>

                                <Divider type='vertical' style={{ minHeight: '300px' }} />
                                <Col span={6}>
                                    <h5>Order Status:</h5>
                                    <Progress
                                        percent={status === 'Not processed' ? 0 :
                                            (status === 'Processing' ? 50 : (status === 'Shipped' ? 80 : status === 'Delivered' && 100))}
                                        success={{
                                            percent: status === 'Not processed' ? 0 :
                                                (status === 'Processing' ? 50 : (status === 'Shipped' ? 80 : status === 'Delivered' && 100 ))
                                        }}
                                        status={status === 'Cancelled' && 'exception'}
                                    />
                                    <Result
                                        status={
                                            status === 'Not processed' || status === 'Processing' ? 'info' :
                                                (status === 'Shipped' || status === 'Delivered' ? 'success' : 'error')
                                        }
                                        title={status}
                                        subTitle={`Deliver to: ${buyer.address}`}
                                    />

                                    {
                                        user.role === 1 ? (
                                            <Select defaultValue={status} style={{ width: '100%' }} bordered='false' onChange={(value) => handleStatusChange(_id, value)}>
                                                {
                                                    orderStatus.map((os) => (
                                                        <Option key={os} value={os} >
                                                            {os}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        ) : (
                                            <>
                                                {
                                                    status === "Not processed" && (
                                                        <PopupCancel id={_id} />
                                                    )
                                                }
                                            </>
                                        )
                                    }


                                </Col>
                            </Row>
                        </Card>
                    ))
                }
            </Skeleton>
        </>
    )
}

export default OrderCard