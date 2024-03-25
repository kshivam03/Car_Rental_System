import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import Spinner from "../components/Spinner";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(userRegister(values));
  }

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            data-aos="slide-left"
            data-aos-duration="1500"
            src={require(`../images/car.jpeg`)}
            className="carimg1"
          />
          <h1 className="login-logo">CarSy</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
            id="register"
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter valid email",
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                style={{ backgroundColor: "#333", color: "white" }}
              />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your confirm password",
                },
              ]}
            >
              <Input.Password
                style={{ backgroundColor: "#333", color: "white" }}
              />
            </Form.Item>

            <button className="btn1 mt-2 mb-4">Register</button>

            <br />

            <Link to="/login">Click Here to login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
