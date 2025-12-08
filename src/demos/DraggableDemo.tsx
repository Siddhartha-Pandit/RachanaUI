import { useRef } from "react";
import Draggable from "../components/rachanaUI/ui/Draggable";

/**
 * DraggableDemo
 *
 * Internal documentation demo for the Draggable component.
 * Shows correct and recommended usage patterns only.
 */
export default function DraggableDemo() {
  const boundsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        padding: 32,
        display: "grid",
        gap: 48
      }}
    >

      {/* ------------------------------------------------------------------ */}
      {/* FREE DRAG                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Free Drag</h3>
        <p>
          Element can be dragged freely without boundaries.
        </p>

        <div
          style={{
            position: "relative",
            height: 200,
            border: "1px dashed var(--border)"
          }}
        >
          <Draggable initialX={20} initialY={40}>
            <Box label="Free drag" />
          </Draggable>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BOUNDED DRAG                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Bounded Drag</h3>
        <p>
          Drag is constrained within a specific container.
        </p>

        <div
          ref={boundsRef}
          style={{
            position: "relative",
            height: 200,
            border: "1px dashed var(--border)"
          }}
        >
          <Draggable
            mode="bounded"
            bounds={boundsRef}
            initialX={20}
            initialY={40}
          >
            <Box label="Bounded drag" />
          </Draggable>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* GRID DRAG                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Grid Drag</h3>
        <p>
          Element snaps to a fixed grid while dragging.
        </p>

        <div
          style={{
            position: "relative",
            height: 220,
            backgroundSize: "20px 20px",
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), " +
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)"
          }}
        >
          <Draggable
            mode="grid"
            gridSize={20}
            initialX={40}
            initialY={40}
          >
            <Box label="Grid drag" />
          </Draggable>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DRAG HANDLE                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Drag Handle</h3>
        <p>
          Dragging is allowed only from a specific handle area.
        </p>

        <div
          style={{
            position: "relative",
            height: 200,
            border: "1px dashed var(--border)"
          }}
        >
          <Draggable
            dragHandle=".drag-handle"
            initialX={40}
            initialY={40}
          >
            <div
              style={{
                width: 200,
                borderRadius: 8,
                background: "var(--surface)",
                boxShadow: "var(--shadow-1)"
              }}
            >
              <div
                className="drag-handle"
                style={{
                  padding: "8px 12px",
                  cursor: "grab",
                  borderBottom: "1px solid var(--border)",
                  fontWeight: 500
                }}
              >
                Drag here
              </div>
              <div style={{ padding: 12 }}>
                Content inside card <br />
                (not draggable)
              </div>
            </div>
          </Draggable>
        </div>
      </section>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper UI for demo only                                                    */
/* -------------------------------------------------------------------------- */

function Box({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 140,
        height: 56,
        background: "var(--color-primary-500)",
        color: "white",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 500,
        cursor: "grab",
        boxShadow: "var(--shadow-1)"
      }}
    >
      {label}
    </div>
  );
}
