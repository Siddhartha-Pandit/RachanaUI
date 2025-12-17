"use client";

import * as React from "react";
import OTPInput from "../components/rachanaUI/ui/OTPInput";

export default function OTPInputDemo() {
  const [otp, setOtp] = React.useState("");
  const [otpError, setOtpError] = React.useState<string | undefined>();

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 720,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 32
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>
        OTP Input Demo
      </h1>

      {/* ======================================================
          BASIC OTP INPUT
      ====================================================== */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Numeric OTP
        </h2>

        <OTPInput
          label="Enter OTP"
          length={6}
          value={otp}
          onChange={(val) => {
            setOtp(val);
            setOtpError(undefined);
          }}
          onComplete={(val) => {
            if (val !== "123456") {
              setOtpError("Invalid OTP");
            } else {
              alert("OTP verified successfully");
            }
          }}
          helperText="We’ve sent a 6-digit code to your phone"
          error={otpError}
        />
      </section>

      {/* ======================================================
          ALPHANUMERIC OTP
      ====================================================== */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Alphanumeric OTP
        </h2>

        <OTPInput
          label="Verification code"
          length={4}
          inputType="alphanumeric"
          helperText="Enter the 4-character code"
          onComplete={(val) => {
            console.log("Completed:", val);
          }}
        />
      </section>

      {/* ======================================================
          DISABLED OTP
      ====================================================== */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Disabled OTP
        </h2>

        <OTPInput
          label="OTP (disabled)"
          value="1234"
          length={4}
          disabled
        />
      </section>
    </div>
  );
}
