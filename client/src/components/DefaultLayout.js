import React from "react";
import "../index.css";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu1 = (
    <Menu>
      {JSON.parse(localStorage.getItem("user")).username !==
        "admin@gmail.com" && (
        <Menu.Item>
          <a href="/">Home</a>
        </Menu.Item>
      )}
      {JSON.parse(localStorage.getItem("user")).username ===
        "admin@gmail.com" && (
        <Menu.Item>
          <a href="/admin">Home</a>
        </Menu.Item>
      )}
      {JSON.parse(localStorage.getItem("user")).username !==
        "admin@gmail.com" && (
        <Menu.Item>
          <a href="/userbookings">My Bookings</a>
        </Menu.Item>
      )}
      <Menu.Item>
        <a href="/changepassword">Change Password</a>
      </Menu.Item>
      {JSON.parse(localStorage.getItem("user")).username ===
        "admin@gmail.com" && (
        <Menu.Item>
          <a href="/users">Users</a>
        </Menu.Item>
      )}
      {JSON.parse(localStorage.getItem("user")).username ===
        "admin@gmail.com" && (
        <Menu.Item>
          <a href="/bookings">Bookings</a>
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li style={{ color: "orangered" }}>Logout</li>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify-center>
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <Link to={JSON.parse(localStorage.getItem("user")).username!=="admin@gmail.com" ? "/" : "/admin"} style={{ color: "orangered" }}>
                  CarSy
                </Link>
              </h1>
              <Dropdown overlay={menu1} placement="bottom">
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <Row>
          <Col span={12}>
            <p>&copy; {new Date().getFullYear()} CarSy. All Rights Reserved.</p>
          </Col>
          <Col span={12}>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DefaultLayout;
