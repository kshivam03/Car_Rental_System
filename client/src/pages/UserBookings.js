import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";

function UserBookings() {

  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
        {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>
    
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
         
            {bookings.filter(o=>o.user==user._id).map((booking) => {
             return <Row gutter={16} className="bs1 mt-3 text-left">
                <Col lg={6} sm={24} className="mt-3">
                    <p style={{color:"red"}}><b>{booking.car.name}</b></p>
                    <p><b>Total hours :</b> {booking.totalHours}</p>
                    <p><b>Rent per hour :</b> {booking.car.rentPerHour}</p>
                    <p><b>Total amount :</b> {booking.totalAmount}</p>
                </Col>

                <Col lg={12} sm={24} className="mt-3">
                <p><b>Transaction Id :</b> {booking.transactionId}</p>
                <p><b>From :</b> {booking.bookedTimeSlots.from}</p>
                <p><b>To :</b> {booking.bookedTimeSlots.to}</p>
                <p><b>Date of booking :</b> {moment(booking.createdAt).format('MMM DD yyyy')}</p>
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                    <img style={{borderRadius:5}} src={require(`../images/${booking.car.image}`)}  height="140" className="p-2"/>
                </Col>
              </Row>;
            })}
          
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
