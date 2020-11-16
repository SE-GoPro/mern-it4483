import React, {useEffect} from "react";
import to from "await-to-js"
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import StyleLoginForm from "./index.style";
import { Typography } from "antd";
import { withRouter } from "react-router-dom";
import userService from "@services/userService"
import auth from "@utils/auth"
import useBaseHook from "@hooks/BaseHooks"
const { Title } = Typography;

const LoginForm = ({ history }) => {
  const {notify, getData} = useBaseHook();
  const onFinish = async (values) => {
    let [error, user = {} ] = await to(userService().login(values));
    if(error){
      notify(error.message, "", "error");
      return;
    }
    console.log("user ", user)
    notify("Đăng nhập thành công", "", "success")
    auth().setAuth(user)
    history.push("/")
  };

  return (
    <StyleLoginForm>
      <Title level={2}>Hệ thống giám sát bằng Drone</Title>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="admin@example.com"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="123456"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lưu tài khoản</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href='#'>
            Quên mật khẩu
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </StyleLoginForm>
  );
};

export default withRouter(LoginForm);
