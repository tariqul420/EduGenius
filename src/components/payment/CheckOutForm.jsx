"use client";

import { savePayment, savePaymentIntent } from "@/lib/actions/payment.action";
import { useUser } from "@clerk/nextjs";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AlertTriangle, CheckCircle, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AlertDialogCancel } from "../ui/alert-dialog";

export default function CheckOutForm({
  course,
  userId,
  path,
  onPaymentSuccess,
}) {
  const { user } = useUser();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { discount, price, title, _id: courseId } = course;

  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Calculate discounted price
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  // Format numbers to 2 decimal places
  const formatPrice = (amount) => parseFloat(amount.toFixed(2));

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const paymentInfo = await savePaymentIntent({
          amount: Math.round(formatPrice(discountedPrice) * 100),
          currency: "usd",
          metadata: {
            courseId,
            userId,
            originalPrice: price,
            discountApplied: discount,
          },
        });

        setClientSecret(paymentInfo.clientSecret);
      } catch (err) {
        setError("Failed to initialize payment");
      }
    };

    if (price && userId) {
      createPaymentIntent();
    }
  }, [price, userId, courseId, discount, discountedPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true);
    setError("");

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
        type: "card",
        card,
      });

      if (paymentMethodError) {
        throw paymentMethodError;
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.primaryEmailAddress?.emailAddress || "anonymous",
              name: user?.fullName || "anonymous",
            },
          },
        });

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save payment data to your database
        const paymentData = {
          transactionId: paymentIntent.id,
          course: courseId,
          student: userId,
        };

        await savePayment({
          paymentData,
          path,
        });

        // Close the modal on success
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg border p-2 md:p-4">
          <h3 className="mb-2 font-medium">Payment Details</h3>
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

        <div className="dark:bg-dark-bg rounded-lg border p-4">
          <h3 className="mb-2 font-medium">Order Summary</h3>
          <div className="flex items-center justify-between">
            <span>Course:</span>
            <span className="max-w-[60%] text-right font-medium">{title}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Original Price:</span>
            <span className="font-medium">${price.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <>
              <div className="mt-2 flex justify-between">
                <span>Discount ({discount}%):</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  -${formatPrice((price * discount) / 100).toFixed(2)}
                </span>
              </div>
              <div className="my-2 border-t"></div>
            </>
          )}

          <div className="mt-2 flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span className="text-primary dark:text-primary-light">
              ${formatPrice(discountedPrice).toFixed(2)}
            </span>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
            <div className="text-sm text-red-600 dark:text-red-400">
              <strong>Error:</strong> <span>{error}</span>
            </div>
          </div>
        )}

        {transactionId && (
          <div className="flex items-start gap-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <CheckCircle className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
            <div className="text-sm text-green-600 dark:text-green-400">
              <strong>Transaction ID:</strong> <span>{transactionId}</span>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-2">
          <AlertDialogCancel className="rounded-md border px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            Cancel
          </AlertDialogCancel>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || paymentLoading}
            className={`rounded-md px-4 py-2 font-medium text-white ${
              !stripe || !clientSecret || paymentLoading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-main hover:bg-dark-main dark:bg-dark-bg dark:hover:bg-dark-hover cursor-pointer"
            }`}
          >
            {paymentLoading ? (
              <span className="flex items-center">
                <LoaderCircle className="animate-spin" />
                Processing...
              </span>
            ) : (
              `Pay $${formatPrice(discountedPrice).toFixed(2)}`
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
