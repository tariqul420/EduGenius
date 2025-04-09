"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

export default function PaymentModal({ course, userId, path }) {
  // Payment Method ====================
  // recreating the `Stripe` object on every render.
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckOutForm course={course} userId={userId} path={path} />
      </Elements>
    </>
  );
}
