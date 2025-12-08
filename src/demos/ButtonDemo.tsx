import Button from "../components/rachanaUI/ui/Button";

/**
 * ButtonDemo
 *
 * Internal documentation / usage reference for Button.
 * This demo shows ONLY supported and recommended patterns.
 *
 * Notes:
 * - Buttons handle their own loading + disabled behavior
 * - Layout/styling here is for documentation clarity only
 */
export default function ButtonDemo() {
  return (
    <div
      style={{
        padding: 32,
        display: "grid",
        gap: 40
      }}
    >

      {/* ------------------------------------------------------------------ */}
      {/* PRIMARY BUTTONS                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Primary Buttons</h3>
        <p>Main call-to-action buttons.</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary" size="sm">Primary Small</Button>
          <Button variant="primary">Primary Medium</Button>
          <Button variant="primary" size="lg">Primary Large</Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECONDARY BUTTONS                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Secondary Buttons</h3>
        <p>Used for supporting or secondary actions.</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="secondary" size="sm">Secondary Small</Button>
          <Button variant="secondary">Secondary Medium</Button>
          <Button variant="secondary" size="lg">Secondary Large</Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* GHOST BUTTONS                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Ghost Buttons</h3>
        <p>Low-weight actions with minimal emphasis.</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="ghost" size="sm">Ghost Small</Button>
          <Button variant="ghost">Ghost Medium</Button>
          <Button variant="ghost" size="lg">Ghost Large</Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DESTRUCTIVE BUTTONS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Destructive Buttons</h3>
        <p>Used for dangerous or irreversible actions.</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="destructive" size="sm">Delete</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="destructive" size="lg">Delete</Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LOADING STATE                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Loading State</h3>
        <p>Button shows spinner and blocks interaction.</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="secondary" loading>Loading</Button>
          <Button variant="ghost" loading>Loading</Button>
          <Button variant="destructive" loading>Loading</Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DISABLED STATE                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Disabled State</h3>
        <p>Button is visible but non-interactive.</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="ghost" disabled>Disabled</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FULL WIDTH                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Full Width</h3>
        <p>Used in mobile layouts, forms, and drawers.</p>

        <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
          <Button fullWidth variant="primary">Submit</Button>
          <Button fullWidth variant="secondary">Cancel</Button>
        </div>
      </section>

    </div>
  );
}
