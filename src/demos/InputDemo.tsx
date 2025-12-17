"use client";

import * as React from "react";
import { Input, PhoneInput } from "../components/rachanaUI/ui/Input";

/* ============================================================================
   TYPES
============================================================================ */
type Country = {
  code: string;
  dialCode: string;
  flag: string;
  label: string;
};

/* ============================================================================
   DATA (DEMO ONLY)
============================================================================ */
const COUNTRIES: Country[] = [
  { code: "IN", dialCode: "+91", flag: "🇮🇳", label: "India" },
  { code: "US", dialCode: "+1", flag: "🇺🇸", label: "United States" },
  { code: "NP", dialCode: "+977", flag: "🇳🇵", label: "Nepal" }
];

/* ============================================================================
   DEMO
============================================================================ */
export default function InputDemo() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState<Country>(COUNTRIES[0]);

  const fullPhoneNumber = `${country.dialCode}${phone}`;

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
        Input Component Demo
      </h1>

      {/* ================= BASIC INPUTS ================= */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Basic Inputs
        </h2>

        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helper="This will be displayed publicly"
          fullWidth
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helper="We'll never share your email"
          fullWidth
        />
      </section>

      {/* ================= INPUT SIZES ================= */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Input Sizes
        </h2>

        <Input label="Small" size="sm" placeholder="Small input" />
        <Input label="Medium" size="md" placeholder="Medium input" />
        <Input label="Large" size="lg" placeholder="Large input" />
      </section>

      {/* ================= PREFIX & SUFFIX ================= */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Prefix & Suffix
        </h2>

        <Input
          label="Amount"
          type="number"
          prefix={<span>₹</span>}
          suffix={<span>INR</span>}
          placeholder="0.00"
          fullWidth
        />

        <Input
          label="Website"
          prefix={<span>https://</span>}
          placeholder="example.com"
          fullWidth
        />
      </section>

      {/* ================= VALIDATION ================= */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Validation States
        </h2>

        <Input
          label="Username"
          placeholder="username"
          helper="Must be at least 4 characters"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error="Password is too weak"
        />
      </section>

      {/* ================= PHONE INPUT ================= */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500 }}>
          Phone Input
        </h2>

        <PhoneInput
          label="Phone number"
          countries={COUNTRIES}
          country={country}
          onCountryChange={setCountry}
          value={phone}
          onChange={setPhone}
          helper="Select country and enter phone number"
          fullWidth
        />

        <PhoneInput
          label="Phone (error)"
          countries={COUNTRIES}
          country={country}
          onCountryChange={setCountry}
          value={phone}
          onChange={setPhone}
          error="Invalid phone number"
          fullWidth
        />

        {/* DEBUG OUTPUT */}
        <div style={{ fontSize: 14, color: "#555" }}>
          <div>
            <strong>Country:</strong> {country.label} ({country.dialCode})
          </div>
          <div>
            <strong>Phone:</strong> {phone || "—"}
          </div>
          <div>
            <strong>Full value:</strong>{" "}
            {fullPhoneNumber || "—"}
          </div>
        </div>
      </section>
    </div>
  );
}
