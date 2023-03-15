import { Button, Form, Input, InputNumber, Switch } from 'antd';
import { Select } from 'antd';
//import { UploadOutlined } from '@ant-design/icons';
import { createProduct } from '../../actions/product';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const ProductForm = ({ categories }) => {

    const navigate = useNavigate();

    const [photo, setPhoto] = useState('');

    const { TextArea } = Input;

    const onFinish = (values) => {
        createProduct(values, photo, navigate)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const handleFileChange = ({ file }) => {
    //     console.log(file)
    // }

    // const getFile = (e) => {
    //     //console.log('Upload event:', e);      
    //     if (Array.isArray(e)) {
    //       return e;
    //     }
    //    return e && e.fileList;
    //   };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Product Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input a name for the product!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name='description'
                rules={[
                    {
                        required: true,
                        message: 'Please input a description'
                    }
                ]}
            >
                <TextArea rows={4} placeholder="maxLength is 1000" showCount maxLength={1000} />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                        required: true,
                        message: 'Please add a product price!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Select Catetory"
                name='category'
                rules={[
                    {
                        required: true,
                        message: 'Please select a category'
                    }
                ]}
            >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={
                        categories.map((c) => (
                            {
                                value: c._id,
                                label: c.name,
                            }
                        ))
                    }
                />
            </Form.Item>

            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                    {
                        required: true,
                        message: 'Please add quantity!',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item label='Shipping' valuePropName="checked" initialValue={true} name="shipping">
                <Switch />
            </Form.Item>

            {/* <Form.Item
                getValueProps={getFile}
                name='photo'
            >
                <Upload
                    listType='picture'
                    showUploadList
                    onChange={handleFileChange}
                    action={'localhost:8000/api/product'}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>

            </Form.Item> */}

            <div className="p-3">
                <label className='btn btn-outline-secondary p-2 col-10 offset-2 mb-3'>
                    {photo ? photo.name : 'Upload Photo'}
                    <input
                        type="file"
                        name='photo'
                        accept='image/*'
                        onChange={e => setPhoto(e.target.files[0])}
                        hidden
                    />
                </label>
            </div>

            {
                photo && <div className="text-center mb-5">
                    <img
                        src={URL.createObjectURL(photo)}
                        alt={photo.name}
                        className='img img-responsive'
                        height='200px'
                    />
                </div>
            }

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProductForm