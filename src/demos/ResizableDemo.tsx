import Resizable from "../components/rachanaUI/ui/Resizable";

/**
 * ResizableDemo
 *
 * Internal documentation demo for the Resizable component.
 * Demonstrates correct and recommended usage patterns only.
 */
export default function ResizableDemo() {
  return (
    <div
      style={{
        padding: 32,
        position: "relative",
        height: 600,
        border: "1px dashed var(--border)",
        overflow: "hidden",
        display: "grid",
        gap: 40,
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* BASIC RESIZABLE                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Basic Resizable</h3>
        <p>Element can be resized freely from all sides and corners.</p>

        <Resizable initialLeft={40} initialTop={60}>
          <Panel title="Basic" />
        </Resizable>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MIN / MAX CONSTRAINTS                                              */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Min / Max Constraints</h3>
        <p>Resizing is constrained by minimum and maximum sizes.</p>

        <Resizable
          initialLeft={420}
          initialTop={60}
          minWidth={200}
          minHeight={120}
          maxWidth={400}
          maxHeight={300}
        >
          <Panel title="Min: 200×120, Max: 400×300" />
        </Resizable>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DISABLED HANDLES                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Disabled Handles</h3>
        <p>Disable specific edges or corners.</p>

        <Resizable
          initialLeft={40}
          initialTop={320}
          disabledHandles={{
            top: true,
            left: true,
            "top-left": true,
          }}
        >
          <Panel title="Top & Left Disabled" />
        </Resizable>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PANEL / SIDEBAR STYLE                                              */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Panel / Sidebar Style</h3>
        <p>
          Typical use case for panels or sidebars 
          (resize from one edge only).
        </p>

        <Resizable
          initialLeft={420}
          initialTop={320}
          initialHeight={220}
          initialWidth={260}
          minWidth={180}
          maxWidth={420}
          disabledHandles={{
            top: true,
            bottom: true,
            left: true,
            "top-left": true,
            "top-right": true,
            "bottom-left": true,
            "bottom-right": true,
          }}
        >
          <Panel title="Right-edge resize only" />
        </Resizable>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Demo Helper UI                                                             */
/* -------------------------------------------------------------------------- */

function Panel({ title }: { title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 12,
        boxSizing: "border-box",
        background: "var(--surface)",
        borderRadius: 6,
        boxShadow: "var(--shadow-1)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <strong>{title}</strong>
      <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
        Resize from allowed edges
      </span>
    </div>
  );
}
