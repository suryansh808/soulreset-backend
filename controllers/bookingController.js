import crypto from "crypto";
import { razorpay } from "../utils/razorpay.js";
import { sendSuccessMail, sendFailureMail } from "../utils/paymentMailer.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `sr_${Date.now()}`,
    });

    return res.status(200).json(order);

  } catch (error) {
    console.error("Order Creation Error:", error);
    return res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingData,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await sendFailureMail(bookingData);
      return res.status(400).json({ success: false });
    }

    await sendSuccessMail({
      ...bookingData,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
};
