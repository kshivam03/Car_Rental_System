import axios from "axios";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

export const bookCar = (reqObj) => async (dispatch) => {

    dispatch({ type: "LOADING", payload: true });

    try {
        const stripe = await loadStripe("pk_test_51O1CutSGqPg6c6luAjxcMCJeCHMgxKCrwsRItYCKmCwUokiFES57JDrwCu0IVsEo8wXQgILpGwotTknuHeb0Fi1Q00VXid84E0");

        const res = await fetch("/api/bookings/bookcar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({
                items: [reqObj]
            })
        });

        const session = await res.json();
        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false });
        message.error('Something went wrong, Please try again later');
    }
};

export const getAllBookings = () => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/bookings/getallbookings');
        dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false })
    }

};

export const deleteBooking = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/bookings/deletebooking', reqObj);

        dispatch({ type: 'LOADING', payload: false })
        message.success('Booking deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}