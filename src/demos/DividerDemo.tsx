import React from "react";
import Divider from "../components/rachanaUI/ui/Divider";

/**
 * DividerDemo
 *
 * Internal demo / documentation component.
 * Shows correct usage patterns only.
 * This file uses inline styles ONLY for demo layout correctness.
 */
export default function DividerDemo() {
  const styles = {
    page: {
      padding: "24px",
      maxWidth: "720px"
    },
    section: {
      marginBottom: "32px"
    },
    box: {
      padding: "16px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px"
    },
    label: {
      fontSize: "12px",
      color: "#6b7280"
    },
    list: {
      border: "1px solid #e5e7eb",
      borderRadius: "8px"
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px"
    },
    icon: {
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      backgroundColor: "#d1d5db",
      flexShrink: 0
    },
    row: {
      display: "flex",            // ✅ REQUIRED for vertical divider
      alignItems: "center",        // ✅ gives divider height
      gap: "0"
    },
    note: {
      fontSize: "13px",
      color: "#6b7280",
      marginBottom: "8px"
    }
  } as const;

  return (
    <div style={styles.page}>
      <h2>Divider</h2>
      <p style={styles.note}>
        Structural separator for content grouping. Decorative, non-interactive.
      </p>

      {/* Basic */}
      <section style={styles.section}>
        <h3>Basic</h3>
        <div style={styles.box}>
          <p>Content block A</p>
          <Divider />
          <p>Content block B</p>
        </div>
      </section>

      {/* Spacing */}
      <section style={styles.section}>
        <h3>Spacing Variants</h3>
        <div style={styles.box}>
          <span style={styles.label}>xs</span>
          <Divider spacing="xs" />

          <span style={styles.label}>sm</span>
          <Divider spacing="sm" />

          <span style={styles.label}>md (default)</span>
          <Divider spacing="md" />

          <span style={styles.label}>lg</span>
          <Divider spacing="lg" />

          <span style={styles.label}>xl</span>
          <Divider spacing="xl" />
        </div>
      </section>

      {/* Inset */}
      <section style={styles.section}>
        <h3>Inset Variants</h3>
        <div style={styles.list}>
          <div style={styles.listItem}>
            <span style={styles.icon} />
            <span>List item one</span>
          </div>

          <Divider inset="start" />

          <div style={styles.listItem}>
            <span style={styles.icon} />
            <span>List item two</span>
          </div>

          <Divider inset="start" />

          <div style={styles.listItem}>
            <span style={styles.icon} />
            <span>List item three</span>
          </div>
        </div>
      </section>

      {/* Middle inset */}
      <section style={styles.section}>
        <h3>Middle Inset</h3>
        <div style={styles.box}>
          <p>Section above</p>
          <Divider inset="both" />
          <p>Section below</p>
        </div>
      </section>

      {/* Vertical */}
      <section style={styles.section}>
        <h3>Vertical</h3>
        <div style={styles.row}>
          <span style={{ padding: "0 8px" }}>Item A</span>
          <Divider orientation="vertical" spacing="md" />
          <span style={{ padding: "0 8px" }}>Item B</span>
          <Divider orientation="vertical" spacing="md" />
          <span style={{ padding: "0 8px" }}>Item C</span>
        </div>
      </section>

      {/* Labeled */}
      <section style={styles.section}>
        <h3>Labeled (Advanced)</h3>
        <div style={styles.box}>
          <p>Sign in with email</p>
          <Divider label="OR" decorative={false} spacing="lg" />
          <p>Sign in with Google</p>
        </div>
      </section>

      {/* Accessibility */}
      <section style={styles.section}>
        <h3>Accessibility</h3>
        <p style={styles.note}>
          Below divider exposes <code>role="separator"</code>.
        </p>
        <div style={styles.box}>
          <p>Above</p>
          <Divider decorative={false} />
          <p>Below</p>
        </div>
      </section>
    </div>
  );
}
