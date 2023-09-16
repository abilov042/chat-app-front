import React from "react";
import { Button, Form, Input } from "antd";
import { Container } from "semantic-ui-react";
import { UserService } from "../services/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [data, setData] = useState({});

  const navigate = useNavigate();
  
  const onFinish = (values) => {
    let userService = new UserService();
    
    userService.postUserSignin(values).then(response => {setData(response.data)
     
      if (response.status == 200) {
       
       console.log(response.data);
       
       navigate("/");
     } else {
       console.log(response.data);
       console.log("Bad request");
     }
   
     }).catch(err => console.log(err));
   
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


// import { useFormik } from 'formik';
// import React, { useState } from 'react'
// import * as Yup from 'yup'
// import { Button, Container, Form, Label } from 'semantic-ui-react'
// import { UserService } from '../services/userService';
// import { useNavigate } from 'react-router-dom';


// export default function LogIn() {

//   const userService = new UserService();
//   const navigate = useNavigate();
//   const [data, setData] = useState({});

  


//   const formik = useFormik(
//     {
//       initialValues: {
//         username: "",
//         password: "",
//       },
//       validationSchema: Yup.object({
//         username: Yup.string().required("Required"),
//         password: Yup.string().required("Required"),
//       }),
//       onSubmit: (values) => {
//         userService.postUserSignin(values).then(response => {
          
//           // setData(result.data)
//           if (response.status == 200) {
//             // console.log(data);
//               navigate("/")
//           }
          

//         })
//       }
//     }
//   )

//   return (
//     <div> <Container style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "200px" }}>
//       <Form onSubmit={formik.handleSubmit} style={{ width: "400px" }} >

//         <Form.Field>
//           <label>Username</label>
//           <input
//             id='username'
//             placeholder='Username'
//             type='text'
//             onChange={formik.handleChange}
//             value={formik.values.username}
//             onBlur={formik.handleBlur}

//           />
//           {formik.touched.username && formik.errors.username ? <Label pointing basic color='red' mini>{formik.errors.username}</Label> : null}
//         </Form.Field>
//         <Form.Field>
//           <label>Password</label>
//           <input
//             id='password'
//             placeholder='Password'
//             type='password'
//             onChange={formik.handleChange}
//             value={formik.values.password}
//             onBlur={formik.handleBlur}

//           />
//           {formik.touched.password && formik.errors.password ? <Label pointing basic color='red' mini>{formik.errors.password}</Label> : null}
//         </Form.Field>

//         <Button type='submit' primary>Submit</Button>
//         {!data.success ? <p>{data.message}</p> : null}

//       </Form>

//     </Container></div>
//   )
// }
