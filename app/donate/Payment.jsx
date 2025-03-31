"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BaseUrl } from '../BaseUrl';
import '../Payment.css'; // Create a CSS file for additional styles
import { BreadCrumb } from '../DoctorDashboard/BreadCrumb';

const Payment = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // snackbar message

  const [loggedInUser, setLoggedInUser] = useState({}); // user details
  const { bookingId, name, email, contact, amount } = props; // user details

  useEffect(() => {
    // Load user details from local storage immediately
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setLoggedInUser(userDetails);
      } else {
        // Using random data if no user details are found
        setLoggedInUser({
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9876543210',
        });
      }
    };
    loadUserDetails();
  }, []);

  const validateCoupon = () => {
    const validCoupons = {
      'DISCOUNT10': 10,
      'DISCOUNT20': 20,
      'SAVE50': 50,
      'FIRST100': 90,
    };

    if (validCoupons[couponCode]) {
      const discountValue = validCoupons[couponCode];
      setDiscount(discountValue < 100 ? amount * (discountValue / 100) : discountValue);
      setSnackbarMessage('Coupon applied successfully!');
      setCouponCode(''); // Reset coupon code
    } else {
      setSnackbarMessage('Invalid coupon code');
      setDiscount(0);
    }
    setSnackbarOpen(true);
  };

  const payNow = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/donations/createOrder`, {
        amount: 300,
        currency: 'INR',
        receipt: bookingId,
        notes: {
          name: name,
          email: email,
          contact: contact,
          message: 'Random Message',
        },
      });

      const order = response.data;
      const options = {
        key: 'rzp_test_l0gnUnaG8U4VmM',
        amount: (amount - discount) * 100,
        currency: order.currency,
        name: 'Dklean HealthCare',
        description: 'Donation Transaction',
        order_id: order.id,
        callback_url: `${BaseUrl}/api/donations/payment-success`,
        prefill: {
          name: name,
          email: email,
          contact: contact,
        },
        theme: {
          color: '#F37254',
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(`${BaseUrl}/api/donations/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.status === 'ok') {
              localStorage.setItem('paymentData', JSON.stringify({
                patientId: '12345', // Random patient ID
                name: name,
                amount: (amount - discount),
                bookingId: bookingId,
                email: email,
              }));
              window.location.href = '/payment-success';
            } else {
              setSnackbarMessage('Payment verification failed');
              setSnackbarOpen(true);
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setSnackbarMessage('Error verifying payment');
            setSnackbarOpen(true);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error creating order:', error);
      setSnackbarMessage('Error creating order');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="payment-container">
      <BreadCrumb first="Patient Dashboard" second="Appointment Booking" firstLink="/pdash" secondLink="/selectDis" />
      <Typography variant="h4" gutterBottom>
        Please Complete the Payment to Book Your Appointment
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalIsOpen(true)}
        startIcon={<i className="fas fa-shopping-cart" />}
        sx={{ animation: 'pulse 2s infinite' }}
      >
        Checkout
      </Button>

      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="checkout-modal-title"
        aria-describedby="checkout-modal-description"
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
            margin: 'auto',
            mt: '5%',
          }}
          role="dialog"
        >
          <Typography id="checkout-modal-title" variant="h6" component="h2" gutterBottom>
            Checkout Details
          </Typography>
          <Typography variant="body1"><strong>BookingId:</strong> {bookingId}</Typography>
          <Typography variant="body1"><strong>Name:</strong> {loggedInUser.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {loggedInUser.email}</Typography>
          <Typography variant="body1"><strong>Contact:</strong> {loggedInUser.contact}</Typography>
          <Typography variant="body1"><strong>Original Amount:</strong> ₹{amount}</Typography>
          <Typography variant="body1"><strong>Discount:</strong> ₹{discount}</Typography>
          <Typography variant="h6" gutterBottom><strong>Total Amount:</strong> ₹{amount - discount}</Typography>

          <TextField
            label="Coupon Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button variant="outlined" color="secondary" onClick={validateCoupon} fullWidth>
            Apply Coupon
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={payNow}
            fullWidth
            sx={{ mt: 2 }}
            endIcon={<i className="fas fa-credit-card" />}
          >
            Pay and Book the Slot
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default Payment;
