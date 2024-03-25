import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";
import { useParams } from 'react-router-dom';

function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const [totalcars, settotalcars] = useState([]);
  const { carid } = useParams();

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id == carid));
    }
  }, [cars]);

  // function onFinish(values) {
  //   values._id = car._id;

  //   dispatch(editCar(values));
  //   console.log(values);
  // }

  const [image1, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  function onFinish(values) {

    const formDataToSend = new FormData();

    formDataToSend.append("_id", car._id);
    formDataToSend.append("name", values.name);
    formDataToSend.append("capacity", values.capacity);
    formDataToSend.append("fuelType", values.fuelType);
    formDataToSend.append("rentPerHour", values.rentPerHour);
    formDataToSend.append("image1", image1);
    
    dispatch(editCar(formDataToSend));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                label="Car Name"
                name="name"
                rules={[{ required: true, message: "Please enter a name!" }]}
              >
                <Input
                  id="name"
                  name="name"
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
                />
              </Form.Item>
              {/* <img src={require(`../images/${car.image}`)} className='carimg'/> */}
              <Form.Item
                label="Upload Car Image"
                name="image1"
                rules={[{ message: "Please upload an image!" }]}
              >
                <input
                  type="file"
                  id="image1"
                  name="image1"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginLeft: "10px" }}
                />
              </Form.Item>
              <div className="text-right">
                <button className="btn1">Edit Car</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
