"use client";

import * as React from "react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "../components/rachanaUI/ui/Drawer";

export default function DrawerDemo() {
  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>Drawer</h2>
      <p style={subheadingStyle}>
        Responsive drawer that adapts to device size automatically.
        <br />
        <strong>Mobile:</strong> Bottom · <strong>Tablet:</strong> Right ·{" "}
        <strong>Desktop:</strong> Left
      </p>

      {/* ------------------------------------------------------------------
          BASIC DRAWER (UNCONTROLLED)
      ------------------------------------------------------------------ */}
      <section style={sectionStyle}>
        <h3>Basic Drawer</h3>

        <Drawer defaultOpen={false}>
          <DrawerTrigger>
            <button style={buttonStyle}>Open Drawer</button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>User Settings</DrawerTitle>
              <DrawerDescription>
                Manage your account and preferences
              </DrawerDescription>

              <DrawerClose>✕</DrawerClose>
            </DrawerHeader>

            <DrawerBody>
              <label style={labelStyle}>
                Name
                <input style={inputStyle} placeholder="Enter name" />
              </label>

              <label style={labelStyle}>
                Email
                <input style={inputStyle} placeholder="Enter email" />
              </label>
            </DrawerBody>

            <DrawerFooter>
              <DrawerClose>
                <button style={ghostButtonStyle}>Cancel</button>
              </DrawerClose>
              <button style={primaryButtonStyle}>Save</button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      {/* ------------------------------------------------------------------
          CONTROLLED DRAWER
      ------------------------------------------------------------------ */}
      <section style={sectionStyle}>
        <h3>Controlled Drawer</h3>

        <ControlledDrawer />
      </section>
    </div>
  );
}

/* ============================================================================
   CONTROLLED EXAMPLE
============================================================================ */

function ControlledDrawer() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <button style={buttonStyle} onClick={() => setOpen(true)}>
        Open Controlled Drawer
      </button>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            Configure alerts and messages
          </DrawerDescription>

          <DrawerClose>✕</DrawerClose>
        </DrawerHeader>

        <DrawerBody>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label>
              <input type="checkbox" /> Email notifications
            </label>
            <label>
              <input type="checkbox" /> Push notifications
            </label>
            <label>
              <input type="checkbox" /> SMS alerts
            </label>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <button
            style={ghostButtonStyle}
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <button style={primaryButtonStyle}>Apply</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ============================================================================
   DEMO STYLES (DEV ONLY)
============================================================================ */

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 32,
};

const headingStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 600,
};

const subheadingStyle: React.CSSProperties = {
  color: "#666",
};

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 24,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #ddd",
  cursor: "pointer",
  background: "#fff",
};

const primaryButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 8,
  border: "none",
  background: "#2371E7",
  color: "#fff",
  cursor: "pointer",
};

const ghostButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const inputStyle: React.CSSProperties = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #ccc",
};
