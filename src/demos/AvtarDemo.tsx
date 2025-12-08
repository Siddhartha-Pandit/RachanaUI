import React from "react";
import Avatar from "../components/rachanaUI/ui/Avatar";

/* ========================================================================= */
/* AVATAR DEMO — ALL PRACTICAL USE CASES                                      */
/* ========================================================================= */

export default function AvatarDemo() {
  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        fontFamily: "var(--font-family-system)",
        background: "var(--color-surface)",
        color: "var(--text-primary)",
      }}
    >
      {/* ====================================================== */}
      {/* 1️⃣ BASIC AVATARS (IMAGE + FALLBACK)                    */}
      {/* ====================================================== */}
      <section>
        <h3>Basic Avatar</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar name="Riya Sharma" src="/img/riya.jpg" />
          <Avatar name="Amit Kumar" /> {/* fallback initials */}
          <Avatar name="SingleName" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 2️⃣ SIZE VARIATIONS                                    */}
      {/* ====================================================== */}
      <section>
        <h3>Sizes</h3>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name="XS User" size="xs" />
          <Avatar name="SM User" size="sm" />
          <Avatar name="MD User" size="md" />
          <Avatar name="LG User" size="lg" />
          <Avatar name="XL User" size="xl" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 3️⃣ SHAPE VARIATIONS                                   */}
      {/* ====================================================== */}
      <section>
        <h3>Shape</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar name="Circle User" />
          <Avatar name="Rounded User" shape="rounded" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 4️⃣ STATUS INDICATORS                                  */}
      {/* ====================================================== */}
      <section>
        <h3>Status</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar name="Online User" status="online" />
          <Avatar name="Away User" status="away" />
          <Avatar name="Busy User" status="busy" />
          <Avatar name="Offline User" status="offline" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 5️⃣ CLICKABLE / INTERACTIVE AVATARS                    */}
      {/* ====================================================== */}
      <section>
        <h3>Clickable Avatar (Profile Menu)</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar
            name="Clickable User"
            clickable
            onClick={() => alert("Open profile menu")}
          />
          <Avatar
            name="Clickable Large"
            size="lg"
            clickable
            onClick={() => alert("Profile clicked")}
          />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 6️⃣ DISABLED STATE                                     */}
      {/* ====================================================== */}
      <section>
        <h3>Disabled</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar name="Disabled User" disabled />
          <Avatar name="Disabled Large" size="lg" disabled />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 7️⃣ LIST ITEM (REAL UI PATTERN)                        */}
      {/* ====================================================== */}
      <section>
        <h3>List / Row Usage</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Riya Sharma" status="online" />
            <div>
              <div>Riya Sharma</div>
              <div style={{ color: "var(--text-secondary)" }}>
                Product Designer
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Amit Kumar" status="away" />
            <div>
              <div>Amit Kumar</div>
              <div style={{ color: "var(--text-secondary)" }}>
                Backend Engineer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 8️⃣ TABLE / ADMIN PANEL                                */}
      {/* ====================================================== */}
      <section>
        <h3>Table Usage</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid var(--border)",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>User</th>
              <th style={{ textAlign: "left", padding: 8 }}>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ padding: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name="Neha Verma" size="sm" />
                  Neha Verma
                </div>
              </td>
              <td style={{ padding: 8 }}>Active</td>
            </tr>

            <tr>
              <td style={{ padding: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name="Rahul Singh" size="sm" disabled />
                  Rahul Singh
                </div>
              </td>
              <td style={{ padding: 8 }}>Inactive</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ====================================================== */}
      {/* 9️⃣ AVATAR GROUP (INLINE STACK)                        */}
      {/* ====================================================== */}
      <section>
        <h3>Avatar Group</h3>

        <div style={{ display: "flex" }}>
          <Avatar name="User One" />
          <Avatar name="User Two" style={{ marginLeft: -8 } as any} />
          <Avatar name="User Three" style={{ marginLeft: -8 } as any} />
          <Avatar name="+3" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 🔟 EMPTY / UNKNOWN USER                                */}
      {/* ====================================================== */}
      <section>
        <h3>Unknown / Empty State</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar name="" />
          <Avatar name="?" />
        </div>
      </section>
    </div>
  );
}