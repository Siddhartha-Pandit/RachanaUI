import { useCallback, useRef, useState } from "react";
import "./Slider.css";

interface SliderProps {
    value?: number[];
    defaultValue?: number[];
    min?: number;
    max?: number;
    step?: number;
    showTicks?: boolean;
    showTooltip?: boolean;
    showLabels?: boolean;
    disabled?: boolean;
    formatLabel?: (v: number) => string;
    onChange?: (value: number[]) => void;
    className?: string;
    [key: string]: unknown;
}

interface SliderOutputProps {
    value: number[];
    formatLabel?: (v: number) => string;
}

function SliderOutput({ value, formatLabel }: SliderOutputProps) {
    const fmt = formatLabel ?? ((v: number) => String(v));
    return (
        <div className="slider-output">
            {value.length === 1 ? (
                <span className="slider-output-value">{fmt(value[0])}</span>
            ) : (
                <span className="slider-output-value">
                    {fmt(value[0])}
                    <span className="slider-output-sep">–</span>
                    {fmt(value[1])}
                </span>
            )}
        </div>
    );
}

function Slider({
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    showTicks = false,
    showTooltip = true,
    showLabels = true,
    disabled = false,
    formatLabel,
    onChange,
    className = "",
    ...props
}: SliderProps) {
    const isControlled = value !== undefined;
    const initialValue = value ?? defaultValue ?? [0];
    const [internal, setInternal] = useState<number[]>(initialValue);
    const current = isControlled ? (value as number[]) : internal;
    const isRange = current.length === 2;

    const [dragging, setDragging] = useState<number | null>(null);
    const [hovering, setHovering] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const fmt = formatLabel ?? ((v: number) => String(v));

    const clamp = (v: number) => Math.min(max, Math.max(min, v));

    const snap = (v: number) => {
        const stepped = Math.round((v - min) / step) * step + min;
        return parseFloat(clamp(stepped).toFixed(10));
    };

    const toPercent = (v: number) => ((v - min) / (max - min)) * 100;

    const fromClientX = useCallback(
        (clientX: number): number => {
            if (!trackRef.current) return min;
            const rect = trackRef.current.getBoundingClientRect();
            const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
            return snap(pct * (max - min) + min);
        },
        [min, max, step]
    );

    const update = useCallback(
        (thumbIndex: number, newVal: number) => {
            const next = [...current];
            if (isRange) {
                if (thumbIndex === 0) {
                    next[0] = Math.min(newVal, current[1] - step);
                } else {
                    next[1] = Math.max(newVal, current[0] + step);
                }
            } else {
                next[0] = newVal;
            }
            if (!isControlled) setInternal(next);
            onChange?.(next);
        },
        [current, isRange, isControlled, step, onChange]
    );

    const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        const val = fromClientX(e.clientX);

        if (!isRange) {
            update(0, val);
            setDragging(0);
            return;
        }

        const d0 = Math.abs(val - current[0]);
        const d1 = Math.abs(val - current[1]);
        const thumb = d0 <= d1 ? 0 : 1;
        update(thumb, val);
        setDragging(thumb);
    };

    const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragging === null || disabled) return;
        update(dragging, fromClientX(e.clientX));
    };

    const handleTrackPointerUp = () => {
        setDragging(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, thumbIndex: number) => {
        if (disabled) return;
        const delta = e.shiftKey ? step * 10 : step;
        const cur = current[thumbIndex];
        let next = cur;

        if (e.key === "ArrowRight" || e.key === "ArrowUp") next = clamp(cur + delta);
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = clamp(cur - delta);
        if (e.key === "Home") next = min;
        if (e.key === "End") next = max;

        if (next !== cur) {
            e.preventDefault();
            update(thumbIndex, next);
        }
    };

    const tickValues = showTicks
        ? Array.from(
            { length: Math.round((max - min) / step) + 1 },
            (_, i) => min + i * step
        )
        : [];

    const tooltipVisible = (i: number) =>
        showTooltip && (hovering === i || dragging === i);

    return (
        <div
            className={[
                "slider-root",
                disabled ? "slider-root--disabled" : "",
                showTicks ? "slider-root--ticks" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            {...props}
        >
            {showLabels && (
                <div className="slider-minmax">
                    <span>{fmt(min)}</span>
                    <span>{fmt(max)}</span>
                </div>
            )}

            <div
                ref={trackRef}
                className={`slider-track ${dragging !== null ? "slider-track--dragging" : ""}`}
                onPointerDown={handleTrackPointerDown}
                onPointerMove={handleTrackPointerMove}
                onPointerUp={handleTrackPointerUp}
            >
                <div className="slider-track-bg" />

                {isRange ? (
                    <div
                        className="slider-fill"
                        style={{
                            left: `${toPercent(current[0])}%`,
                            width: `${toPercent(current[1]) - toPercent(current[0])}%`,
                        }}
                    />
                ) : (
                    <div
                        className="slider-fill"
                        style={{ width: `${toPercent(current[0])}%` }}
                    />
                )}

                {showTicks &&
                    tickValues.map((tv, i) => {
                        const inRange = isRange
                            ? tv >= current[0] && tv <= current[1]
                            : tv <= current[0];
                        return (
                            <div
                                key={i}
                                className={`slider-tick ${inRange ? "slider-tick--active" : ""}`}
                                style={{ left: `${toPercent(tv)}%` }}
                            />
                        );
                    })}

                {current.map((val, i) => (
                    <div
                        key={i}
                        className={[
                            "slider-thumb",
                            dragging === i ? "slider-thumb--dragging" : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        style={{ left: `${toPercent(val)}%` }}
                        role="slider"
                        aria-valuemin={i === 0 ? min : current[0] + step}
                        aria-valuemax={i === 1 ? max : (current[1] ?? max) - step}
                        aria-valuenow={val}
                        aria-disabled={disabled}
                        tabIndex={disabled ? -1 : 0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            if (!disabled) setDragging(i);
                        }}
                        onMouseEnter={() => setHovering(i)}
                        onMouseLeave={() => setHovering(null)}
                        onFocus={() => setHovering(i)}
                        onBlur={() => setHovering(null)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                    >
                        {tooltipVisible(i) && (
                            <div className="slider-tooltip">{fmt(val)}</div>
                        )}
                    </div>
                ))}
            </div>

            {showTicks && (
                <div className="slider-tick-labels">
                    {tickValues.map((tv, i) => (
                        <div
                            key={i}
                            className="slider-tick-label"
                            style={{ left: `${toPercent(tv)}%` }}
                        >
                            {fmt(tv)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Slider.Output = SliderOutput;

export default Slider;