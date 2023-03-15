import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { deleteProduct } from '../../actions/product';

const { confirm } = Modal;

const showDeleteConfirm = (slug, navigate) => {
    confirm({
        title: 'Are you sure delete this product?',
        content: 'By deleting this book you will not have access to it anymore',
        icon: <ExclamationCircleFilled />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            deleteProduct(slug, navigate)
            
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const ConfirmModal = ({ slug, navigate }) => {    

    return (
        <Space wrap>
            <Button onClick={() => showDeleteConfirm(slug, navigate)} danger type="primary">
                Delete
            </Button>
        </Space>
    )
}

export default ConfirmModal;
