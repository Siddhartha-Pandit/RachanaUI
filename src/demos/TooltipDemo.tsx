import React, { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "../components/rachanaUI/ui/Tooltip";

/**
 * Demo written STRICTLY according to the given Tooltip implementation
 * (no controlled open, no align, no maxWidth props)
 */
export default function TooltipDemo() {
  const [delay, setDelay] = useState(120);
  const [longPress, setLongPress] = useState(500);
  const [disableOnMobile, setDisableOnMobile] = useState(false);

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <h2 className="text-2xl font-semibold">Tooltip Demo</h2>

      <TooltipProvider
        delayDuration={delay}
        longPressDuration={longPress}
        disableOnMobile={disableOnMobile}
      >
        {/* Provider controls */}
        <section className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium">Provider settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Hover delay (ms)</label>
              <input
                type="number"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              />

              <label className="text-sm">Long press duration (ms)</label>
              <input
                type="number"
                value={longPress}
                onChange={(e) => setLongPress(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              />

              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={disableOnMobile}
                  onChange={(e) => setDisableOnMobile(e.target.checked)}
                />
                Disable tooltip on mobile
              </label>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Hover or focus on desktop</p>
              <p>• Long press on mobile / tablet</p>
              <p>• Press Esc to dismiss</p>
            </div>
          </div>
        </section>

        {/* Basic placement examples */}
        <section className="space-y-6">
          <h3 className="text-lg font-medium">Placement</h3>

          <div className="flex flex-wrap gap-6">
            <Tooltip>
              <TooltipTrigger>
                <button className="px-3 py-2 border rounded">Top</button>
              </TooltipTrigger>
              <TooltipContent side="top">Top tooltip</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <button className="px-3 py-2 border rounded">Bottom</button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <button className="px-3 py-2 border rounded">Left</button>
              </TooltipTrigger>
              <TooltipContent side="left">Left tooltip</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <button className="px-3 py-2 border rounded">Right</button>
              </TooltipTrigger>
              <TooltipContent side="right">Right tooltip</TooltipContent>
            </Tooltip>
          </div>
        </section>

        {/* Inline text example */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Inline content</h3>

          <p className="text-sm">
            Hover over the{' '}
            <Tooltip>
              <TooltipTrigger>
                <span className="underline cursor-help">highlighted text</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                Inline tooltip explanation
              </TooltipContent>
            </Tooltip>
            {' '}to see more information.
          </p>
        </section>

        {/* Rich content example */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Rich tooltip content</h3>

          <Tooltip>
            <TooltipTrigger>
              <button className="px-4 py-2 rounded bg-black text-white">
                Hover me
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="space-y-1">
                <strong>Tooltip title</strong>
                <p className="text-sm">
                  This tooltip contains multiple elements and wraps naturally
                  based on CSS.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </section>
      </TooltipProvider>
    </div>
  );
}
