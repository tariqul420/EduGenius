"use client";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentModal({course}) {
  // Payment Method ====================
  // recreating the `Stripe` object on every render.
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckOutForm
          payInfo={course}
        />
      </Elements>
    </>
  );
}
