import React, { useState } from "react";
import { Col, Row, Form, Input, Upload, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../redux/actions/carsActions";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";

function AddCar() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    fuelType: "",
    rentPerHour: "",
    image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  function onFinish(values) {
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("capacity", formData.capacity);
    formDataToSend.append("fuelType", formData.fuelType);
    formDataToSend.append("rentPerHour", formData.rentPerHour);
    formDataToSend.append("image", formData.image);

    dispatch(addCar(formDataToSend));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <div>
            <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
              <h3>Add New Car</h3>
              <hr />
              <Form.Item
                label="Car Name"
                name="name"
                rules={[{ required: true, message: "Please enter a name!" }]}
              >
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Sitting Capacity"
                name="capacity"
                rules={[
                  { required: true, message: "Please enter the capacity!" },
                ]}
              >
                <Input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Fuel Type"
                name="fuelType"
                rules={[
                  { required: true, message: "Please enter a fuel type!" },
                ]}
              >
                <Input
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Rent Per Hour"
                name="rentPerHour"
                rules={[
                  {
                    required: true,
                    message: "Please enter the rent per hour!",
                  },
                ]}
              >
                <Input
                  type="number"
                  id="rentPerHour"
                  name="rentPerHour"
                  value={formData.rentPerHour}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Upload Car Image"
                name="image"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginLeft: "10px" }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddCar;
