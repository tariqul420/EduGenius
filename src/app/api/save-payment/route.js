
import dbConnect from '@/lib/dbConnect';
import Payment from '@/models/payment';

export async function POST(request) {
  try {
    const paymentData = await request.json();

    // Validate required fields
    if (!paymentData.courseId || !paymentData.userId || !paymentData.transactionId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await dbConnect()

    // Create new payment record
    const newPayment = new Payment({
      courseId: paymentData.courseId,
      courseTitle: paymentData.courseTitle,
      userId: paymentData.userId,
      userEmail: paymentData.userEmail,
      userName: paymentData.userName,
      transactionId: paymentData.transactionId,
      originalPrice: paymentData.originalPrice,
      discountRate: paymentData.discountRate || 0,
      finalPrice: paymentData.finalPrice,
      paymentStatus: paymentData.paymentStatus || 'completed',
      paymentDate: paymentData.date || new Date(),
      courseDetails: paymentData.courseDetails || {}
    });

    await newPayment.save();

    return new Response(JSON.stringify({ 
      success: true,
      paymentId: newPayment._id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving payment:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}