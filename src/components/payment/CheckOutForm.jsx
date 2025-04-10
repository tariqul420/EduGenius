"use client";
import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useUser } from "@clerk/nextjs";
import { AlertDialogCancel } from "../ui/alert-dialog";
import { AlertTriangle, CheckCircle } from "lucide-react"; 

export default function CheckOutForm({ payInfo }) {
  const { userId, user } =  useUser();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const {
    level,
    discount,
    price,
    language,
    duration,
    instructor,
    title,
    id: courseId,
  } = payInfo;
  
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Calculate discounted price
  const discountedPrice = discount > 0 
    ? price * (1 - discount / 100)
    : price;
  
  // Format numbers to 2 decimal places
  const formatPrice = (amount) => parseFloat(amount.toFixed(2));

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(formatPrice(discountedPrice) * 100), // Convert to cents
            currency: 'usd',
            metadata: {
              courseId,
              userId,
              originalPrice: price,
              discountApplied: discount
            }
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError('Failed to initialize payment');
        console.error(err);
      }
    };

    if (price && userId) {
      createPaymentIntent();
    }
  }, [price, userId, courseId, discount, discountedPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true);
    setError('');

    if (!stripe || !elements) {
      setPaymentLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setPaymentLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (paymentMethodError) {
        throw paymentMethodError;
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.emailAddresses[0]?.emailAddress || 'anonymous',
            name: user?.fullName || 'anonymous',
          }
        }
      });

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        
        // Save payment data to your database
        const paymentData = {
          courseId,
          courseTitle: title,
          originalPrice: price,
          discountRate: discount,
          finalPrice: formatPrice(discountedPrice),
          userId,
          userEmail: user?.emailAddresses[0]?.emailAddress,
          userName: user?.fullName,
          transactionId: paymentIntent.id,
          paymentStatus: 'completed',
          date: new Date().toISOString(),
          courseDetails: {
            level,
            language,
            duration,
            instructor
          }
        };

        const response = await fetch('/api/save-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData)
        });

        if (!response.ok) {
          setError("Payment was successful but we couldn't save your records. Please contact support.");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Payment Details</h3>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <div className="dark:bg-dark-bg border p-4 rounded-lg">
          <h3 className="font-medium mb-2">Order Summary</h3>
          <div className="flex justify-between">
            <span>Course:</span>
            <span className="font-medium">{title}</span>
          </div>
          
          <div className="flex justify-between mt-2">
            <span>Original Price:</span>
            <span className="font-medium">${price.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <>
              <div className="flex justify-between mt-2">
                <span>Discount ({discount}%):</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  -${formatPrice(price * discount / 100).toFixed(2)}
                </span>
              </div>
              <div className="border-t my-2"></div>
            </>
          )}
          
          <div className="flex justify-between font-semibold mt-2">
            <span>Total Amount:</span>
            <span className="text-primary dark:text-primary-light">
              ${formatPrice(discountedPrice).toFixed(2)}
            </span>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <AlertTriangle className="text-red-600 dark:text-red-400 h-5 w-5 mt-0.5" />
            <div className="text-red-600 dark:text-red-400 text-sm">
              <strong>Error:</strong> <span>{error}</span>
            </div>
          </div>
        )}

        {transactionId && (
          <div className="flex items-start gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <CheckCircle className="text-green-600 dark:text-green-400 h-5 w-5 mt-0.5" />
            <div className="text-green-600 dark:text-green-400 text-sm">
              <strong>Transaction ID:</strong> <span>{transactionId}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-2">
          <AlertDialogCancel className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
            Cancel
          </AlertDialogCancel>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || paymentLoading}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              !stripe || !clientSecret || paymentLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-main hover:bg-dark-main cursor-pointer dark:bg-dark-bg dark:hover:bg-dark-hover"
            }`}
          >
            {paymentLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : `Pay $${formatPrice(discountedPrice).toFixed(2)}`}
          </button>
        </div>
      </form>
    </section>
  );
}
