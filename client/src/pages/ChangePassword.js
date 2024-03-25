import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Input } from "antd";
import { changePassword } from "../redux/actions/userActions";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";

function ChangePassword({ match }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  function onFinish(values) {
    values._id = user._id;

    dispatch(changePassword(values));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form
            initialValues={user}
            className="bs1 p-2"
            layout="vertical"
            onFinish={onFinish}
          >
            <h3>Change Password</h3>

            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="password"
              label="New Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-right">
              <button className="btn1">Change Password</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default ChangePassword;
