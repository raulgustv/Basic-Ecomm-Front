import { Button, Popconfirm } from "antd";
import { useState } from "react";
import {WarningOutlined} from '@ant-design/icons';
import { cancelUserOrder, getAllUserOrders } from "../../actions/orders";
import {toast} from 'react-hot-toast';

const PopupCancel = ({ id }) => {

    const [openPop, setOpenPop] = useState(false);

    const handleCancel = () =>{
        setOpenPop(false)
    };

    const handleConfirmDelete = () =>{
        cancelUserOrder(id).then(() =>{
            toast.success('Order has been successfully cancelled')
            setOpenPop(false)
            getAllUserOrders()
        })       
        
    }

    return (
        <>
            <Popconfirm
                open={openPop}
                onCancel={handleCancel}
                icon={<WarningOutlined />}
                title='Cancel Order'
                onConfirm={handleConfirmDelete}
                description='This action cannot be reversed! Are you sure you want to cancel this order?'
            >
                <Button
                    type='primary'
                    danger
                    size='small'
                    style={{
                        display: 'block',
                        float: 'right'
                    }}
                    onClick={() => setOpenPop(true)}
                >
                    Cancel Order
                </Button>
            </Popconfirm>
        </>
    )
}

export default PopupCancel