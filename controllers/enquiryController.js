import { sendEmail } from "../utils/mailer.js";

export const submitEnquiry = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const html = `
      <h3>New Soul Reset Enquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "[SOULRESET2026] New Enquiry",
      html,
      headers: {
        "X-Project": "SoulReset2026",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully",
    });

  } catch (error) {
    console.error("SMTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};
