import {
    Button,
    Checkbox,
    Form,
    Input,

} from 'antd';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateProfile } from '../../actions/users';
import { useAuth } from '../../context/auth';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const ProfileForm = () => {

    const [passwordChange, setPasswordChange] = useState(false)

    const [auth, setAuth] = useAuth();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        updateProfile(values).then((data) =>{
            setAuth({...auth, user: data});            

            //update local storage
            let localSto = localStorage.getItem('auth');
            localSto = JSON.parse(localSto);

            localSto.user = data;
            localStorage.setItem('auth', JSON.stringify(localSto));
            toast.success('Profile updated correctly');
        }).catch((err) => {
            console.log(err)
            toast.error(err)
        })
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
                name: auth.user.name,
                email: auth.user.email,
                address: auth?.user?.address
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >

            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item name="disabler" label="Update Password?">  

                    <Checkbox style={{ lineHeight: '32px' }} checked={passwordChange} onChange={(e) => setPasswordChange(e.target.checked)}>
                        Check to update password
                    </Checkbox>             
            </Form.Item>


            <Form.Item
                name="password"
                label="Password"
                hasFeedback
            >
                <Input.Password disabled={!passwordChange} />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password disabled={!passwordChange} />
            </Form.Item>



            <Form.Item
                name="address"
                label="Address"
                rules={[
                    {
                        required: true,
                        message: 'Please input your address',
                    },
                ]}
            >
                <Input.TextArea showCount maxLength={500} />
            </Form.Item>



            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
export default ProfileForm;