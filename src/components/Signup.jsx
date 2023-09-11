import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Container } from "semantic-ui-react";
import { Formik} from 'formik'
import * as Yup from 'yup'

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};



const Signup = () => (

    <Container
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height:"300px" }}
    >
        <Formik initialValues={{
            username: "",
            email: "",
            password: "",
            cPassword: "",
        }}
        validationSchema={Yup.object({
            username: Yup.string().required("Please input your username!"),
            email: Yup.string().email("Invalud email").required("Please input your email!"),
            password: Yup.string().required("Please input your password!"),
            cPassword: Yup.string().required("Please input your confirme password!")
        })

        }
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
        onSubmitCapture={formik.handleSubmit}
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
          <Input onBlur={formik.handleBlur} value={formik.values.username} onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: `${fromik.errorInfo.user}`,
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
          label="Confirme Password"
          name="cPassword"
          rules={[
            {
              required: true,
              message: "Please input your confirme password!",
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
       </Formik>
    </Container>
       
     
  
);
export default Signup;
