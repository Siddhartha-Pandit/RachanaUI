import React, { useState } from "react";
import Overlay from "../components/rachanaUI/ui/Overlay";

/**
 * OverlayDemo
 *
 * Internal documentation / usage reference.
 * Demonstrates correct Overlay usage patterns only.
 *
 * Notes:
 * - Overlay is always paired with a blocking surface (modal, drawer, loader)
 * - Focus + scroll management are handled by the parent, not Overlay
 */
export default function OverlayDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [blockingOpen, setBlockingOpen] = useState(false);

  return (
    <div style={{ padding: 32, display: "grid", gap: 32 }}>
      
      {/* ------------------------------------------------------------------ */}
      {/* MODAL OVERLAY (Dismissible — Medium Intensity)                     */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Modal Overlay (Dismissible)</h3>
        <p>
          Standard overlay used with modals or dialogs.
          Clicking the overlay dismisses the surface.
        </p>

        <button onClick={() => setModalOpen(true)}>
          Open Modal Overlay
        </button>

        <Overlay
          open={modalOpen}
          intensity="medium"
          dismissible
          onClick={() => setModalOpen(false)}
        />

        {modalOpen && (
          <div
            style={{
              position: "fixed",
              zIndex: 50,
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                padding: 24,
                borderRadius: "var(--radius-md)",
                width: 320
              }}
            >
              <h4>Modal Surface</h4>
              <p>This surface lives ABOVE the overlay.</p>
              <button onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DRAWER OVERLAY (Low Intensity)                                    */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Drawer / Sheet Overlay (Low Intensity)</h3>
        <p>
          Used for side sheets and drawers.
          Lower opacity keeps spatial context visible.
        </p>

        <button onClick={() => setDrawerOpen(true)}>
          Open Drawer Overlay
        </button>

        <Overlay
          open={drawerOpen}
          intensity="low"
          dismissible
          onClick={() => setDrawerOpen(false)}
        />

        {drawerOpen && (
          <div
            style={{
              position: "fixed",
              zIndex: 50,
              top: 0,
              right: 0,
              height: "100vh",
              width: 320,
              background: "var(--surface)",
              padding: 24
            }}
          >
            <h4>Drawer Surface</h4>
            <p>Overlay softly dims background content.</p>
            <button onClick={() => setDrawerOpen(false)}>Close</button>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BLOCKING OVERLAY (High Intensity)                                 */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Blocking Overlay (High Intensity)</h3>
        <p>
          Used during destructive actions or full-page loading.
          Overlay does not respond to clicks.
        </p>

        <button onClick={() => setBlockingOpen(true)}>
          Show Blocking Overlay
        </button>

        <Overlay
          open={blockingOpen}
          intensity="high"
          dismissible={false}
        />

        {blockingOpen && (
          <div
            style={{
              position: "fixed",
              zIndex: 50,
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                padding: 24,
                borderRadius: "var(--radius-md)",
                width: 320,
                textAlign: "center"
              }}
            >
              <h4>Blocking State</h4>
              <p>Background interaction is fully disabled.</p>
              <button onClick={() => setBlockingOpen(false)}>Dismiss</button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
