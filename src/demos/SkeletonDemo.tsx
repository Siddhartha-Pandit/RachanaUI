import Skeleton from "../components/rachanaUI/ui/Skeleton";

/**
 * SkeletonDemo
 *
 * Internal documentation & usage reference for the Skeleton component.
 * This file should be used in Storybook / design-system docs.
 *
 * Rules:
 * - Shows ONLY correct usage patterns
 * - No edge cases or hacks
 * - No custom styling here (handled by docs layout)
 */
export default function SkeletonDemo() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 32 }}>

      {/* ------------------------------------------------------------------ */}
      {/* TEXT SKELETON                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Text Skeleton</h3>
        <p>Used for headings, body text, and labels.</p>

        <Skeleton type="text" lines={1} width="40%" />
        <Skeleton type="text" lines={3} />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RECTANGULAR SKELETON                                               */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Rectangular Skeleton</h3>
        <p>Used for cards, images, charts, and content blocks.</p>

        <Skeleton type="rect" height={160} />
        <Skeleton type="rect" height={80} width="60%" />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CIRCULAR SKELETON                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Circular Skeleton</h3>
        <p>Used for avatars, icons, and status indicators.</p>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Skeleton type="circle" width={32} height={32} />
          <Skeleton type="circle" width={40} height={40} />
          <Skeleton type="circle" width={64} height={64} />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* INLINE / CHIP SKELETON                                             */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Inline / Chip Skeleton</h3>
        <p>Used for badges, tags, pills, and small UI tokens.</p>

        <div style={{ display: "flex", gap: 12 }}>
          <Skeleton type="inline" />
          <Skeleton type="inline" width={56} />
          <Skeleton type="inline" width={88} />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ANIMATION CONTROL                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Animation Control</h3>
        <p>Animation is optional. Static skeletons are preferred when subtlety is required.</p>

        <Skeleton type="rect" height={120} animated={false} />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* REALISTIC LAYOUT EXAMPLE                                          */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h3>Realistic Card Layout</h3>
        <p>Skeleton must match final layout structure 1:1.</p>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: 16,
            maxWidth: 320,
            display: "grid",
            gap: 16
          }}
        >
          <Skeleton type="text" width="60%" />
          <Skeleton type="rect" height={140} />
          <Skeleton type="text" lines={2} />
          <Skeleton type="rect" height={36} width="50%" />
        </div>
      </section>

    </div>
  );
}
