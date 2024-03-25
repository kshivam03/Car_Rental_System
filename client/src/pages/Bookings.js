import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Popconfirm } from 'antd'
import Spinner from '../components/Spinner'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteBooking, getAllBookings } from '../redux/actions/bookingActions'
import { getAllUsers } from "../redux/actions/userActions";


function Bookings() { 
    const {bookings} = useSelector(state => state.bookingsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalBookings, setTotalbookings] = useState([])
    const { users } = useSelector((state) => state.usersReducer);
    const [totalUsers, setTotalusers] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllBookings())
    }, [])

    useEffect(() => {
        setTotalbookings(bookings)
    }, [bookings])

    useEffect(() => {
        setTotalusers(users);
    }, [users]);

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <div>
            <table >
                <thead style={{ backgroundColor: "green", color: "white" }}>
                <tr>
                    <th>User</th>
                    <th>Car</th>
                    <th>Booked From</th>
                    <th>Booked To</th>
                    <th>Total Hours</th>
                    <th>Total Amount</th>
                    <th>Driver Required</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {totalBookings?.map((booking) => (
                    <tr key={booking._id}>
                    <td>{(totalUsers.find(user=>user._id==booking.user)).username}</td>
                    <td>{booking.car.name}</td>
                    <td>{booking.bookedTimeSlots.from}</td>
                    <td>{booking.bookedTimeSlots.to}</td>
                    <td>{booking.totalHours}</td>
                    <td>{booking.totalAmount}</td>
                    <td>{booking.driverRequired ? "Yes" : "No"}</td>
                    <td><Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={()=>{dispatch(deleteBooking({bookingid : booking._id}))}}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </DefaultLayout>
    )
}

export default Bookings
