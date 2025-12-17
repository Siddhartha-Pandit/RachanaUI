"use client";

import { useState } from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarInput,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../components/rachanaUI/ui/Sidebar";

/* =========================================================
   DEMO PAGE
========================================================= */

export default function SidebarDemo() {
  const [active, setActive] = useState<
    | "dashboard"
    | "projects"
    | "tasks"
    | "team"
    | "reports"
    | "weekly"
    | "monthly"
    | "settings"
    | "profile"
  >("dashboard");

  return (
    <SidebarProvider
      defaultOpen
      side="left"
      collapsible="icon"
    >
      {/* ================= SIDEBAR ================= */}
      <Sidebar>
        {/* ---------- HEADER ---------- */}
        <SidebarHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SidebarTrigger />
            <strong style={{ fontSize: 14 }}>Rachana UI</strong>
          </div>
        </SidebarHeader>

        <SidebarSeparator />

        {/* ---------- CONTENT ---------- */}
        <SidebarContent>
          {/* Search */}
          <div style={{ padding: "0 8px 8px" }}>
            <SidebarInput placeholder="Search…" />
          </div>

          {/* ---------- GROUP: WORKSPACE ---------- */}
          <SidebarGroup defaultOpen>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>

            <SidebarGroupAction
              title="Add workspace"
              onClick={() => alert("Add workspace")}
            >
              ＋
            </SidebarGroupAction>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "dashboard"}
                    onClick={() => setActive("dashboard")}
                  >
                    📊 <span className="label">Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "projects"}
                    onClick={() => setActive("projects")}
                  >
                    📁 <span className="label">Projects</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "tasks"}
                    onClick={() => setActive("tasks")}
                  >
                    ✅ <span className="label">Tasks</span>
                  </SidebarMenuButton>

                  <SidebarMenuAction
                    title="Quick add task"
                    onClick={() => alert("Quick add task")}
                  >
                    ＋
                  </SidebarMenuAction>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* ---------- GROUP: MANAGEMENT ---------- */}
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "team"}
                    onClick={() => setActive("team")}
                  >
                    👥 <span className="label">Team</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={active === "reports"}
                    onClick={() => setActive("reports")}
                  >
                    📈 <span className="label">Reports</span>
                  </SidebarMenuButton>

                  {/* ---------- SUB MENU ---------- */}
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={active === "weekly"}
                        onClick={() => setActive("weekly")}
                      >
                        Weekly
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={active === "monthly"}
                        onClick={() => setActive("monthly")}
                      >
                        Monthly
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* ---------- GROUP: LOADING ---------- */}
          <SidebarGroup>
            <SidebarGroupLabel>Loading</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuSkeleton />
              <SidebarMenuSkeleton />
              <SidebarMenuSkeleton />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* ---------- FOOTER ---------- */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={active === "settings"}
                onClick={() => setActive("settings")}
              >
                ⚙️ <span className="label">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={active === "profile"}
                onClick={() => setActive("profile")}
              >
                👤 <span className="label">Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* ================= MAIN CONTENT ================= */}
      <SidebarInset>
        <div
          style={{
            padding: "var(--space-6)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <h1 style={{ fontSize: "var(--type-h3)" }}>
            {active.charAt(0).toUpperCase() + active.slice(1)}
          </h1>

          <p style={{ maxWidth: 640, color: "var(--text-secondary)" }}>
            This demo shows your custom sidebar system with:
            resize, collapsible groups, mobile off-canvas, submenu,
            keyboard shortcut, and layout-safe content shifting.
          </p>

          <div
            style={{
              height: 220,
              borderRadius: "var(--radius-lg)",
              background: "var(--color-neutral-100)",
              boxShadow: "var(--shadow-1)",
            }}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
