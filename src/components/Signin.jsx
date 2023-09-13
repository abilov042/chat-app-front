import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Container } from "semantic-ui-react";
import { UserService } from "../services/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Signin = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    let userService = new UserService();
    
    let res = userService.postUserSignin(values);

    res.then(response => {setData(response.data)
     setStatus(response.status);
     if (status === 200) {
      console.log("Success:", values);
      console.log(data);
      navigate("/");
    } else {
      console.log(data);
      console.log("Bad request");
    }
  
    }).catch(err => console.log(err))

    
   
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
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
          width: "700px",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Signin
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
export default Signin;
