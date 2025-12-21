import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK); 

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // 1️⃣ get client secret
    const { data } = await axios.post(
      "http://localhost:5000/create-payment-intent",
      {
        amount: price * 100,
      }
    );

    // 2️⃣ confirm payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      alert("Payment successful!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded">
      <CardElement className="border p-2 mb-4" />
      <button
        disabled={!stripe || loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

const PaymentSuccess = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm price={50} />
  </Elements>
);

export default PaymentSuccess;
