import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { useParams } from "react-router-dom";
import { bookCar } from "../redux/actions/bookingActions";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import moment from "moment";
import { message } from "antd";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const { RangePicker } = DatePicker;

function BookingCar() {
  
  const minDate = moment();
  
  const dispatch = useDispatch();

  const { carid } = useParams();

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  
  const [car, setcar] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const disabledDate = (current) => {
    return current && current < minDate;
  };

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);

    if (driver) {
      setTotalAmount(totalAmount + totalHours * 30);
    }
  }, [driver, totalHours]);

  const selectTimeSlots = (dates, dateStrings) => {
    setFrom(dateStrings[0]);
    setTo(dateStrings[1]);
    setTotalHours(dates[1].diff(dates[0], "hours"));
  };

  function bookNow() {
    try {
      const reqObj = {
        user: JSON.parse(localStorage.getItem("user"))._id,
        car: car._id,
        totalHours,
        totalAmount,
        driverRequired: driver,
        bookedTimeSlots: {
          from,
          to,
        },
      };

      dispatch(bookCar(reqObj));
    } catch(error) {
      console.log(error)
    }

    // const reqObj = {
    //   user: JSON.parse(localStorage.getItem("user"))._id,
    //   car: car._id,
    //   totalHours,
    //   totalAmount,
    //   driverRequired: driver,
    //   bookedTimeSlots: {
    //     from,
    //     to,
    //   },
    // };

    // dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          {car &&
          <img
            src={require(`../images/${car.image}`)}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1200"
          />}
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider dashed style={{ borderColor: "black" }}>
            Car Info
          </Divider>
          <div>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>
          <Divider dashed style={{ borderColor: "black" }}>
            Select Time Slots
          </Divider>

          <RangePicker
            disabledDate={disabledDate}
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />

          <br />

          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>

          {from && to && (
            <div>
              <p>Total Hours : {totalHours}</p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h4>Total Amount : {totalAmount}</h4>

              <button className="btn1" onClick={bookNow}>
                Book Now
              </button>
            </div>
          )}
        </Col>
      </Row>

      {car.name && (
        <Modal
          open={showModal}
          closable={false}
          footer={false}
          title="Booked time slots"
        >
          <div className="p-2">
            {car.bookedTimeSlots.map((slot) => {
              return (
                <button className="btn1 mt-2">
                  {slot.from} - {slot.to}
                </button>
              );
            })}

            <div className="text-right mt-5">
              <button className="btn1" onClick={() => setShowModal(false)}>
                CLOSE
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default BookingCar;
