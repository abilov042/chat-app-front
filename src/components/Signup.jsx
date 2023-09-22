import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/userService";


const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const checkPassword = (password, cPassword) => {
  return password === cPassword;
};
const Signup = () => {
  const [checkP, setChckP] = useState({});
  const [checkStatus, setCheckStatus] = useState("");
  const [userRes, setUserRes] = useState("");

  const navigate = useNavigate();

  const onFinish = (values) => {
    if (checkPassword(values.password, values.cPassword)) {
      setChckP({ check: false });
     
      let  userService = new UserService();
      let obj = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
     
       userService 
        .postUserSignup(obj)
        .then((response) => {
          setCheckStatus(response.status);
          setUserRes(response.data); 
          if(checkStatus === 200){
            console.log("success", userRes);
            navigate("/")
          }
          else{
            console.log("bag request");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      
      
      
      
    } else {
      setChckP({ check: true, checkMassage: "Password not same" });
    }
  };

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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
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
        label="Confirm Password"
        name="cPassword"
        rules={[
          {
            required: true,
            message: "Please input your confirm password!",
          },
        ]}
      >
        <Input.Password />
       
      </Form.Item>
       {checkP.check ? <Form.Item><p>{checkP.checkMassage}</p></Form.Item> : null}
      {userRes ? <Form.Item><p>{userRes}</p> </Form.Item> : null}
      {userRes}

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
  );
};
export default Signup;
