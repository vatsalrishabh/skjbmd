"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const IdCardDownload = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [docType, setDocType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async () => {
    if (!mobile || !docType) return alert("कृपया सभी फ़ील्ड भरें");
    if (mobile.length !== 10)
      return alert("कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BaseUrl}/api/download/identityCard`,
        { mobile, docType }
      );

      if (res.data.status === "requirePayment") { // if backend sends this
        console.log(res.data)
        setAmount(res.data.amount);
        setPaymentRequired(true);
      } else if (res.data.status === "otp-sent") {
        console.log(res.data)
        setOpenModal(true);
      } else {
        alert("कोई समस्या हुई");
      }
    } catch (err) {
  if (err.response) {
    console.log(err.response.data); // 👈 server's response
    alert("त्रुटि: " + err.response.data.message);
  } else {
    console.log(err);
    alert("सर्वर से संपर्क करने में समस्या हुई");
  }
    }
  };

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BaseUrl}/api/download/initiatePayment`,
        { mobile, docType }
      );
      const { orderId, amount } = res.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: amount * 100, // in paise
        currency: "INR",
        name: "SKJBMD",
        description: "ID Card Payment",
        order_id: orderId,
        handler: async function (response) {
          const verifyRes = await axios.post(
            `${process.env.NEXT_PUBLIC_BaseUrl}/api/download/verifyPayment`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              payment_status: "success",
              mobile,
              docType,
            }
          );

          if (verifyRes.data.success) {
            alert("भुगतान सफल, OTP भेजा जा रहा है...");
            console.log(verifyRes.data.data);
            setPaymentRequired(false);
             
          } else {
            alert("भुगतान सत्यापन विफल");
          }
        },
        prefill: {
          contact: mobile,
        },
        theme: {
          color: "#8f1b1b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("भुगतान आरंभ करने में त्रुटि");
    }
  };

const handleOtpSubmit = async () => {
  if (otp.length !== 6) {
    return alert("6 अंकों का OTP दर्ज करें");
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BaseUrl}/api/download/verifyOtp`,
      { mobile, otp }
    );

    if (res.data.success) {
      setUserDetails(res.data.userDetails);
      console.log(res.data);

      const encodedData = encodeURIComponent(JSON.stringify(res.data.data));

      if (docType === "id-card") {
        router.push(`/idcard?data=${encodedData}`);
      } else {
        router.push(`/appletter?data=${encodedData}`);
      }
    } else {
      alert("गलत OTP");
    }

  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      alert("त्रुटि: " + err.response.data.message);
    } else {
      console.log(err);
      alert("सर्वर से संपर्क करने में समस्या हुई|");
    }
  }
};



  return (
    <div className="w-full">
      {/* the left  */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-6 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-[#8f1b1b] text-center mb-6">
            डॉक्युमेंट डाउनलोड करें
          </h2>

          <TextField
            label="मोबाइल नंबर"
            fullWidth
            margin="normal"
            value={mobile}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, ""); // non-digits हटाएं
              if (val.length <= 10) setMobile(val);
            }}
            inputProps={{
              inputMode: "tel", // मोबाइल कीबोर्ड पर नंबर pad खोले
              pattern: "[0-9]{10}", // वैधता pattern
              maxLength: 10,
            }}
          />

          <TextField
            select
            label="डॉक्युमेंट चुनें"
            fullWidth
            margin="normal"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          >
            <MenuItem value="id-card">पहचान पत्र (ID कार्ड)</MenuItem>
            <MenuItem value="niyukti-patra">नियुक्ति पत्र</MenuItem>
          </TextField>

          <Button
            variant="contained"
            fullWidth
            className="!mt-4"
            style={{ backgroundColor: "#8f1b1b", color: "white" }}
            onClick={handleSubmit}
          >
            OTP भेजें
          </Button>
        </motion.div>

        {/* OTP Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h6" gutterBottom>
              OTP दर्ज करें
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="6 अंकों का OTP"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // केवल अंक
                if (val.length <= 6) setOtp(val);
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]{6}",
                maxLength: 6,
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleOtpSubmit}
              style={{ backgroundColor: "#8f1b1b", color: "white" }}
            >
              सत्यापित करें
            </Button>
          </Box>
        </Modal>

        {userDetails && (
          <motion.div
            className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-bold text-[#8f1b1b] mb-2">
              उपयोगकर्ता विवरण
            </h3>
            <pre className="text-sm text-left">
              {JSON.stringify(userDetails, null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
      {/* the left ends  */}

      {/* the right  */}
      <div className="lg:w-1/2 w-full "></div>
      {/* the right ends  */}

      {/* the modal not right not left the payment modal */}
      <Modal open={paymentRequired} onClose={() => setPaymentRequired(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ color: "black" }}>
            भुगतान आवश्यक
          </Typography>
          <Typography sx={{ color: "black" }}>
            ₹{amount} का भुगतान करें पहचान पत्र डाउनलोड करने के लिए
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handlePayment}
            style={{ backgroundColor: "#8f1b1b", color: "white" }}
          >
            भुगतान करें
          </Button>
        </Box>
      </Modal>
      {/* the modal not right not left the payment modal */}
    </div>
  );
};

export default IdCardDownload;
