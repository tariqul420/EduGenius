"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useState } from "react";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
export default function PaymentModal({ course, userId }) {
  const [isOpen, setIsOpen] = useState(false);

  const alreadyPayment = course?.students?.includes(userId);

  return (
    <Elements stripe={stripePromise}>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          {alreadyPayment ? (
            <Link
              href={`/student/course`}
              className="bg-main hover:bg-main mt-5 inline-block cursor-pointer rounded px-4 py-1.5 text-white transition-colors"
              variant="outline"
            >
              Go To Course
            </Link>
          ) : (
            <button
              className="bg-main hover:bg-main mt-5 inline-block cursor-pointer rounded px-4 py-1.5 text-white transition-colors"
              variant="outline"
              onClick={() => setIsOpen(true)}
            >
              Enrollment
            </button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="px-2.5 md:px-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Payment Authorization</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;re about to purchase <strong>{course.title}</strong> for
              <strong>{course.price}</strong>. Please review your payment
              details before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <CheckOutForm
            course={course}
            userId={userId}
            onPaymentSuccess={() => setIsOpen(false)}
          />
        </AlertDialogContent>
      </AlertDialog>
    </Elements>
  );
}
