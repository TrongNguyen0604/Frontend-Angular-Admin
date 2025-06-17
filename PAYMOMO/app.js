require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const crypto = require("crypto");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const {
  MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY,
  MOMO_PARTNER_CODE,
  MOMO_REDIRECT_URL,
  MOMO_IPN_URL,
} = process.env;

if (!MOMO_ACCESS_KEY || !MOMO_SECRET_KEY || !MOMO_PARTNER_CODE) {
  console.error("❌ Missing MOMO_… env variables!");
  process.exit(1);
}

app.post("/payment", async (req, res) => {
  try {
    // 1. Chuẩn bị dữ liệu
    const orderInfo = "pay with MoMo";
    const requestType = "payWithMethod";
    const amount = req.body.amount?.toString() || "0";
    const orderId = MOMO_PARTNER_CODE + Date.now();
    const requestId = orderId;
    const extraData = "";
    const autoCapture = true;
    const lang = "vi";

    // 2. Tạo rawSignature
    const rawSignature = [
      `accessKey=${MOMO_ACCESS_KEY}`,
      `amount=${amount}`,
      `extraData=${extraData}`,
      `ipnUrl=${MOMO_IPN_URL}`,
      `orderId=${orderId}`,
      `orderInfo=${orderInfo}`,
      `partnerCode=${MOMO_PARTNER_CODE}`,
      `redirectUrl=${MOMO_REDIRECT_URL}`,
      `requestId=${requestId}`,
      `requestType=${requestType}`,
    ].join("&");

    console.log("--- RAW SIGNATURE ---");
    console.log(rawSignature);

    // 3. Tạo signature HMAC SHA256
    const signature = crypto
      .createHmac("sha256", MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest("hex");

    console.log("--- SIGNATURE ---");
    console.log(signature);

    // 4. Định nghĩa body gửi đến MoMo
    const requestBody = {
      partnerCode: MOMO_PARTNER_CODE,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl: MOMO_REDIRECT_URL,
      ipnUrl: MOMO_IPN_URL,
      lang,
      requestType,
      autoCapture,
      extraData,
      orderGroupId: "", // nếu có
      signature,
    };

    // 5. Gửi request đến MoMo
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("MoMo response:", response.data);

    // 6. Trả payUrl cho frontend
    return res.json({ payUrl: response.data.payUrl });
  } catch (error) {
    console.error(
      "Error during payment request:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ error: "Payment request failed", detail: error.response?.data });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
