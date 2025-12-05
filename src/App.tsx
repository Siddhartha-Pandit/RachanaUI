import { useEffect, useRef } from "react";
import ThemeToggle from "./components/rachanaUI/theme/ThemeToggle";
import Button from "./components/rachanaUI/ui/Button";
import Spinner from "./components/rachanaUI/ui/Spinner";
import Resizable from "./components/rachanaUI/ui/Resizable";
import Draggable from "./components/rachanaUI/ui/Draggable";
import { Box } from "./components/rachanaUI/ui/Box";

function App() {
  const boundsRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    boundsRef.current = document.body;
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        background: "#f7f7fb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.2rem",
          marginBottom: "50px",
          fontWeight: 700,
          color: "#333",
        }}
      >
        🎯 Rachana UI — Draggable Components Showcase
      </h1>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
        }}
      >
        {/* =============================================================== */}
        {/* 1) DRAGGABLE BOX */}
        {/* =============================================================== */}
        <DemoCard title="1. Draggable Simple Box">
          <Draggable>
            <div style={styles.boxBlue}>
              Simple Box
              <br />
              Drag Me
            </div>
          </Draggable>
        </DemoCard>

        {/* =============================================================== */}
        {/* 2) DRAGGABLE IMAGE */}
        {/* =============================================================== */}
        <DemoCard title="2. Draggable Image">
          <Draggable mode="free">
            <img
              src="https://picsum.photos/160"
              alt="random"
              style={{
                width: 160,
                height: 160,
                borderRadius: 12,
                border: "3px solid #d0d0d0",
                cursor: "grab",
                boxShadow: "0 5px 18px rgba(0,0,0,0.15)",
              }}
            />
          </Draggable>
        </DemoCard>

        {/* =============================================================== */}
        {/* 3) DRAGGABLE CARD */}
        {/* =============================================================== */}
        <DemoCard title="3. Draggable Card">
          <Draggable>
            <div style={styles.card}>
              <h3 style={{ marginBottom: 6 }}>UI Card</h3>
              <p style={{ margin: 0 }}>This entire card is draggable.</p>
            </div>
          </Draggable>
        </DemoCard>

        {/* =============================================================== */}
        {/* 4) DRAGGABLE BUTTON */}
        {/* =============================================================== */}
        <DemoCard title="4. Draggable Button">
          <Draggable>
            <Button size="md">Drag Me</Button>
          </Draggable>
        </DemoCard>

        {/* =============================================================== */}
        {/* 5) FLOATING PANEL (Resizable + Draggable) */}
        {/* =============================================================== */}
        <DemoCard title="5. Floating Panel (Resizable)">
          <Draggable mode="bounded" bounds={boundsRef}>
            <Resizable>
              <div style={styles.panel}>
                <h3>Floating Panel</h3>
                <p>Fully draggable + resizable</p>

                <Spinner variant="primary" />
                <br />
                <ThemeToggle />
              </div>
            </Resizable>
          </Draggable>
        </DemoCard>

        {/* =============================================================== */}
        {/* 6) GRID SNAP DRAG */}
        {/* =============================================================== */}
        <DemoCard title="6. Grid Snapping Drag (50px)">
          <Draggable mode="grid" gridSize={50}>
            <div style={styles.gridBox}>Snap Box</div>
          </Draggable>
        </DemoCard>
        <Draggable dragHandle=".drag-handle">
          <div className="card">
            <div className="drag-handle">⣿</div>
            <p>Some text</p>
          </div>
        </Draggable>
        <Box
  header={<h3>Profile Summary</h3>}
  footer={<div>Footer info here</div>}
>
  This is the content inside the box.
</Box>

      </div>
     
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BEAUTIFUL WRAPPER COMPONENT                                        */
/* ------------------------------------------------------------------ */
const DemoCard = ({ title, children }: any) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: 14,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          marginBottom: 20,
          fontSize: "1.3rem",
          fontWeight: 600,
          color: "#444",
        }}
      >
        {title}
      </h2>

      <div style={{ position: "relative", height: 240 }}>{children}</div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* STYLES                                                             */
/* ------------------------------------------------------------------ */
const styles: any = {
  boxBlue: {
    padding: 25,
    background: "#e5f0ff",
    borderRadius: 12,
    width: 170,
    textAlign: "center",
    fontWeight: 600,
    border: "2px solid #bcd4ff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  card: {
    width: 240,
    padding: 20,
    background: "#fff8e4",
    borderRadius: 12,
    border: "2px solid #f0d78a",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },

  panel: {
    background: "#efffec",
    border: "2px solid #a8d69f",
    padding: 20,
    minWidth: 220,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  },

  gridBox: {
    background: "#f7e1ff",
    padding: 20,
    width: 150,
    textAlign: "center",
    border: "2px solid #e3b0ff",
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
};

export default App;
