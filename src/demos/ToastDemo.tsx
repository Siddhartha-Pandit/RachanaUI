import React, { useState } from "react";
import { Toaster, toast } from "../components/rachanaUI/ui/Toast"; // adjust path if your Toast file is located elsewhere

export default function ToastDemo() {
  const positions: Array<
    "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  > = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "top-center",
    "bottom-center"
  ];

  const [position, setPosition] = useState<typeof positions[number]>("top-right");
  const [max, setMax] = useState<number>(3);
  const [title, setTitle] = useState<string>("Hello — this is a toast!");
  const [description, setDescription] = useState<string>("Optional description goes here.");
  const [duration, setDuration] = useState<number | "">(3000);
  const [withAction, setWithAction] = useState<boolean>(true);

  function makeOpts(extra?: { duration?: number | null }) {
    const opts: any = {
      description: description || undefined,
      action: withAction
        ? {
            label: "Undo",
            onClick: () => {
              // demo action
              // keep this side-effect light and safe
              // you can replace with your own logic
              // eslint-disable-next-line no-alert
              alert("Undo clicked");
            }
          }
        : undefined
    };

    if (extra && Object.prototype.hasOwnProperty.call(extra, "duration")) {
      opts.duration = extra.duration;
    } else if (duration === "") {
      // if user cleared the input, keep default behavior from toast implementation
    } else {
      opts.duration = typeof duration === "number" ? duration : undefined;
    }

    return opts;
  }

  function showSuccess() {
    toast.success(title, makeOpts());
  }

  function showError() {
    toast.error(title, makeOpts({ duration: undefined }));
  }

  function showWarning() {
    toast.warning(title, makeOpts());
  }

  function showInfo() {
    toast.info(title, makeOpts());
  }

  function showMessage() {
    toast.message(title, makeOpts());
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Mount the Toaster once. Put this at the root of your app if you prefer. */}
      <Toaster position={position} max={max} />

      <h2 className="text-2xl font-semibold">Toast demo</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm">Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as any)}
            className="border rounded px-2 py-1 w-full"
          >
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <label className="block text-sm">Max toasts</label>
          <input
            type="number"
            min={1}
            value={max}
            onChange={(e) => setMax(Number(e.target.value || 1))}
            className="border rounded px-2 py-1 w-full"
          />

          <label className="block text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />

          <label className="block text-sm">Description (optional)</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />

          <label className="block text-sm">Duration (ms) — empty = use default</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="e.g. 3000"
            className="border rounded px-2 py-1 w-full"
          />

          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={withAction} onChange={(e) => setWithAction(e.target.checked)} />
            <span className="text-sm">Include action button</span>
          </label>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={showSuccess} className="py-2 px-3 rounded shadow-sm hover:opacity-90 bg-green-600 text-white">
              Show success
            </button>

            <button onClick={showError} className="py-2 px-3 rounded shadow-sm hover:opacity-90 bg-red-600 text-white">
              Show error
            </button>

            <button onClick={showWarning} className="py-2 px-3 rounded shadow-sm hover:opacity-90 bg-yellow-500 text-black">
              Show warning
            </button>

            <button onClick={showInfo} className="py-2 px-3 rounded shadow-sm hover:opacity-90 bg-blue-600 text-white">
              Show info
            </button>

            <button onClick={showMessage} className="py-2 px-3 rounded shadow-sm hover:opacity-90 bg-gray-600 text-white col-span-2">
              Show neutral message
            </button>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Tip: place <code>&lt;Toaster /&gt;</code> once in your app (e.g. App.tsx or layout) so all pages can use the imperative API (<code>toast.*</code>).</p>
          </div>
        </div>
      </section>
    </div>
  );
}
