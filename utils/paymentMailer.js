import { sendEmail } from "./mailer.js";

/**
 * SUCCESS PAYMENT EMAIL
 * Sent ONLY after Razorpay signature verification
 */
export const sendSuccessMail = async (data) => {
  const {
    name,
    phone,
    email,
    packageName,
    foodPreference,
    arrivalDate,
    amount,
    paymentId,
    orderId,
  } = data;

  const html = `
    <h2>✅ Payment Successful — Soul Reset 2026</h2>

    <h3>Participant Details</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>

    <h3>Booking Details</h3>
    <p><strong>Package:</strong> ${packageName}</p>
    <p><strong>Food Preference:</strong> ${foodPreference}</p>
    <p><strong>Arrival Date:</strong> ${arrivalDate}</p>

    <h3>Payment Details</h3>
    <p><strong>Amount Paid:</strong> ₹${amount}</p>
    <p><strong>Payment ID:</strong> ${paymentId}</p>
    <p><strong>Order ID:</strong> ${orderId}</p>

    <hr />
    <p>This is a system-generated confirmation email.</p>
  `;

  // Admin notification
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "[SOULRESET2026] Payment Successful",
    html,
  });

  // Optional: User confirmation
  await sendEmail({
    to: email,
    subject: "Your Soul Reset 2026 Booking Is Confirmed",
    html,
  });
};

/**
 * FAILED PAYMENT EMAIL
 * Sent ONLY when signature verification fails
 */
export const sendFailureMail = async (data) => {
  const {
    name,
    email,
    phone,
    packageName,
    amount,
  } = data;

  const html = `
    <h2>❌ Payment Failed — Soul Reset 2026</h2>

    <p>A payment attempt was made but could not be verified.</p>

    <h3>Attempted Booking Details</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Package:</strong> ${packageName}</p>
    <p><strong>Amount:</strong> ₹${amount}</p>

    <hr />
    <p>Manual follow-up may be required.</p>
  `;

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "[SOULRESET2026] Payment Failed",
    html,
  });
};
