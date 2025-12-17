"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose
} from "../components/rachanaUI/ui/Sheet"; // adjust path if needed

export default function SheetDemo() {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);
  const [openFull, setOpenFull] = useState(false);

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Sheet Component Demo</h1>
      <p style={subtitleStyle}>
        Slide-over panel for secondary tasks, settings, and contextual actions.
      </p>

      {/* ACTION BUTTONS */}
      <div style={buttonRowStyle}>
        <button onClick={() => setOpenRight(true)}>Open Right Sheet</button>
        <button onClick={() => setOpenLeft(true)}>Open Left Sheet</button>
        <button onClick={() => setOpenBottom(true)}>Open Bottom Sheet</button>
        <button onClick={() => setOpenFull(true)}>Open Full Sheet</button>
      </div>

      {/* RIGHT SHEET */}
      <Sheet
        open={openRight}
        onOpenChange={setOpenRight}
        placement="right"
        size="md"
        resizable
      >
        <SheetHeader>
          <SheetTitle>Profile Settings</SheetTitle>
          <SheetDescription>
            Manage your personal information and preferences.
          </SheetDescription>

          <SheetClose onClick={() => setOpenRight(false)}>✕</SheetClose>
        </SheetHeader>

        <SheetBody>
          <label style={labelStyle}>
            Name
            <input style={inputStyle} placeholder="Enter name" />
          </label>

          <label style={labelStyle}>
            Email
            <input style={inputStyle} placeholder="Enter email" />
          </label>
        </SheetBody>

        <SheetFooter>
          <button onClick={() => setOpenRight(false)}>Cancel</button>
          <button className="primary">Save</button>
        </SheetFooter>
      </Sheet>

      {/* LEFT SHEET */}
      <Sheet
        open={openLeft}
        onOpenChange={setOpenLeft}
        placement="left"
        size="lg"
      >
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Quick access menu</SheetDescription>
          <SheetClose onClick={() => setOpenLeft(false)}>✕</SheetClose>
        </SheetHeader>

        <SheetBody>
          <ul style={listStyle}>
            <li>Dashboard</li>
            <li>Projects</li>
            <li>Tasks</li>
            <li>Reports</li>
          </ul>
        </SheetBody>
      </Sheet>

      {/* BOTTOM SHEET */}
      <Sheet
        open={openBottom}
        onOpenChange={setOpenBottom}
        placement="bottom"
        size="half"
        resizable
      >
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>
            Frequently used shortcuts
          </SheetDescription>
          <SheetClose onClick={() => setOpenBottom(false)}>✕</SheetClose>
        </SheetHeader>

        <SheetBody>
          <div style={gridStyle}>
            <button>Create Task</button>
            <button>Upload File</button>
            <button>Invite User</button>
            <button>Generate Report</button>
          </div>
        </SheetBody>
      </Sheet>

      {/* FULL SCREEN SHEET */}
      <Sheet
        open={openFull}
        onOpenChange={setOpenFull}
        placement="right"
        size="full"
        closeOnOutsideClick={false}
      >
        <SheetHeader>
          <SheetTitle>Project Details</SheetTitle>
          <SheetDescription>
            Full-screen experience for complex workflows
          </SheetDescription>
          <SheetClose onClick={() => setOpenFull(false)}>✕</SheetClose>
        </SheetHeader>

        <SheetBody>
          <p>
            This sheet uses <strong>size="full"</strong>.  
            Ideal for editors, dashboards, or long forms.
          </p>

          <textarea
            style={textareaStyle}
            placeholder="Write detailed content here..."
          />
        </SheetBody>

        <SheetFooter>
          <button onClick={() => setOpenFull(false)}>Close</button>
          <button className="primary">Publish</button>
        </SheetFooter>
      </Sheet>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SIMPLE DEMO STYLES (for clarity only)
--------------------------------------------------------------------------- */

const pageStyle: React.CSSProperties = {
  padding: 32,
  fontFamily: "system-ui"
};

const titleStyle: React.CSSProperties = {
  fontSize: 28,
  marginBottom: 4
};

const subtitleStyle: React.CSSProperties = {
  color: "#666",
  marginBottom: 24
};

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap"
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginBottom: 16
};

const inputStyle: React.CSSProperties = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 12
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 12
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 200,
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ccc"
};
