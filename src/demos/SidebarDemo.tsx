// src/demos/SidebarDemo.tsx

import { useState } from "react";
import type { CSSProperties } from "react";

import Resizable from "../components/rachanaUI/ui/Resizable";

import Navbar, {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  NavbarBrand,
  NavbarSection,
  NavbarActions,
  NavbarSidebarToggle,
} from "../components/rachanaUI/ui/SidebarNavbar";

export default function SidebarDemo() {
  const [active, setActive] = useState("dashboard");

  return (
    <SidebarProvider>
      {/* ================= WHOLE APP SHELL ================= */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* =============== LEFT: RESIZABLE SIDEBAR =============== */}
        <Resizable
          mode="layout" // behaves like a flex item, not floating
          initialWidth={260}
          minWidth={72}
          maxWidth={420}
          disabledHandles={{
            left: true,
            top: true,
            bottom: true,
            "top-left": true,
            "top-right": true,
            "bottom-left": true,
            "bottom-right": true,
            // right handle stays enabled → resize from right side only
          }}
        >
          <Sidebar>
            <SidebarHeader>
              <strong style={{ fontSize: 14 }}>Navigation</strong>
            </SidebarHeader>

            <SidebarContent>
              {/* -------- Platform -------- */}
              <SidebarGroup label="Platform">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      active={active === "dashboard"}
                      onClick={() => setActive("dashboard")}
                    >
                      🏠 Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      active={active === "playground"}
                      onClick={() => setActive("playground")}
                    >
                      🧪 Playground
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      active={active === "models"}
                      onClick={() => setActive("models")}
                    >
                      🤖 Models
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      active={active === "docs"}
                      onClick={() => setActive("docs")}
                    >
                      📚 Documentation
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>

              {/* -------- Projects -------- */}
              <SidebarGroup label="Projects" defaultOpen={false}>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      active={active === "design"}
                      onClick={() => setActive("design")}
                    >
                      🎨 Design Engineering
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      active={active === "marketing"}
                      onClick={() => setActive("marketing")}
                    >
                      📢 Sales & Marketing
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    👤 shadcn
                    <span style={{ opacity: 0.6, marginLeft: 6 }}>
                      m@example.com
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>🚪 Log out</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
        </Resizable>

        {/* =============== RIGHT: NAVBAR + MAIN CONTENT =============== */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0, // allows proper shrinking when sidebar grows
          }}
        >
          {/* NAVBAR NOW BELONGS TO THE RIGHT COLUMN */}
          <Navbar>
            <NavbarSection align="left">
              <NavbarSidebarToggle />
              <NavbarBrand title="Rachana UI" subtitle="Design System" />
            </NavbarSection>

            <NavbarSection align="right">
              <NavbarActions>
                <button style={iconButtonStyle}>🔔</button>
                <button style={iconButtonStyle}>⚙️</button>
                <button style={iconButtonStyle}>👤</button>
              </NavbarActions>
            </NavbarSection>
          </Navbar>

          {/* MAIN CONTENT */}
          <main
            style={{
              flex: 1,
              padding: 40,
              background: "var(--background)",
            }}
          >
            <h1>{activeLabel(active)}</h1>
            <p style={{ maxWidth: 600, color: "var(--text-secondary)" }}>
              Drag the right edge of the sidebar to resize it.  
              The navbar and content area shrink and grow with the sidebar,
              like shadcn’s app shell.
            </p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

/* ================= Helpers ================= */

function activeLabel(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

const iconButtonStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
  padding: 6,
};
