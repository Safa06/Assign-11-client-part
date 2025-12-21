// import axios from "axios";
// import React, { useEffect } from "react";
// import { Link, useSearchParams } from "react-router";
// import { IoBagCheckOutline } from "react-icons/io5";
// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   useEffect(() => {
//     if (sessionId) {
//       axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
//         sessionId,
//       });
//     }
//   }, [sessionId]);
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="bg-white p-10 rounded-lg shadow-lg text-center">
//         <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Payment Successful!
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Thank you for your purchase. Your order is being processed.
//         </p>
//         <Link
//           to="/dashboard/my-orders"
//           className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
//         >
//           Go to My Orders
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;



import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_..."); // your publishable key

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Get client secret from backend
      const { data } = await axios.post(
        "http://localhost:5000/create-payment-intent",
        { amount }
      );

      // 2️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess("Payment Successful!");
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <CardElement className="border p-2 rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : `Pay $${amount / 100}`}
      </button>
      {success && <p className="text-green-700 mt-2">{success}</p>}
    </form>
  );
};

const PaymentSuccess = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default PaymentSuccess;
