"use client";

import * as React from "react";
import "../css/Table.css";

/* ============================================================================
   TYPES
============================================================================ */
export type Column<T> = {
  key: string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  width?: number;
};

type SelectionMode = "none" | "single" | "multiple";

/* ============================================================================
   TABLE PRIMITIVES
============================================================================ */
export function Table(props: React.ComponentProps<"table">) {
  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="table" {...props} />
      </div>
    </div>
  );
}

export function TableHeader({
  sticky,
  ...props
}: React.ComponentProps<"thead"> & { sticky?: boolean }) {
  return (
    <thead
      className={sticky ? "table-header sticky" : "table-header"}
      {...props}
    />
  );
}

export function TableBody(props: React.ComponentProps<"tbody">) {
  return <tbody className="table-body" {...props} />;
}

export function TableRow({
  selected,
  frozen,
  style,
  ...props
}: React.ComponentProps<"tr"> & {
  selected?: boolean;
  frozen?: boolean;
}) {
  return (
    <tr
      data-selected={selected ? "true" : undefined}
      data-frozen={frozen ? "true" : undefined}
      style={style}
      className="table-row"
      {...props}
    />
  );
}

export function TableHead({
  frozen,
  ...props
}: React.ComponentProps<"th"> & { frozen?: boolean }) {
  return (
    <th
      className={frozen ? "table-head frozen" : "table-head"}
      {...props}
    />
  );
}

export function TableCell({
  frozen,
  label,
  ...props
}: React.ComponentProps<"td"> & {
  frozen?: boolean;
  label?: string;
}) {
  return (
    <td
      data-label={label}
      className={frozen ? "table-cell frozen" : "table-cell"}
      {...props}
    />
  );
}

/* ============================================================================
   CHECKBOX (supports indeterminate)
============================================================================ */
function Checkbox({
  checked,
  indeterminate,
  onChange
}: {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      className="table-checkbox"
      onClick={onChange}
    >
      {indeterminate ? "–" : checked ? "✓" : ""}
    </button>
  );
}

/* ============================================================================
   DATATABLE
============================================================================ */
export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  selection?: SelectionMode;
  frozenColumns?: number;
  freezeSelectedRows?: boolean;
  getRowId?: (row: T, index: number) => string;
};

export function DataTable<T>({
  data,
  columns,
  selection = "none",
  frozenColumns = 0,
  freezeSelectedRows = true,
  getRowId
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    new Set()
  );

  const getId = (row: T, index: number) =>
    getRowId ? getRowId(row, index) : String(index);

  /* ---------------- Selection Logic ---------------- */

  const allIds = React.useMemo(
    () => data.map(getId),
    [data]
  );

  const allSelected =
    selection !== "none" &&
    selectedIds.size === data.length &&
    data.length > 0;

  const someSelected =
    selection !== "none" &&
    selectedIds.size > 0 &&
    selectedIds.size < data.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allIds));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (selection === "single") {
        next.clear();
        next.add(id);
      } else {
        next.has(id) ? next.delete(id) : next.add(id);
      }
      return next;
    });
  };

  /* ---------------- Row Groups ---------------- */

  const selectedRows = data.filter((r, i) =>
    selectedIds.has(getId(r, i))
  );

  const normalRows = data.filter((r, i) =>
    !selectedIds.has(getId(r, i))
  );

  /* ---------------- Render ---------------- */

  return (
    <Table>
      <TableHeader sticky>
        <TableRow>
          {selection !== "none" && (
            <TableHead frozen>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={toggleAll}
              />
            </TableHead>
          )}

          {columns.map((col, i) => (
            <TableHead
              key={col.key}
              frozen={i < frozenColumns}
              style={{ width: col.width }}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* ================= FROZEN ROWS ================= */}
        {freezeSelectedRows &&
          selectedRows.map((row, index) => {
            const id = getId(row, index);
            return (
              <TableRow
                key={`frozen-${id}`}
                selected
                frozen
                style={{ top: 40 + index * 40 }}
              >
                {selection !== "none" && (
                  <TableCell frozen>
                    <Checkbox
                      checked
                      onChange={() => toggleRow(id)}
                    />
                  </TableCell>
                )}

                {columns.map((col, i) => (
                  <TableCell
                    key={col.key}
                    frozen={i < frozenColumns}
                  >
                    {col.render
                      ? col.render(row)
                      : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

        {/* ================= NORMAL ROWS ================= */}
        {normalRows.map((row, rowIndex) => {
          const id = getId(row, rowIndex);
          const selected = selectedIds.has(id);

          return (
            <TableRow key={id} selected={selected}>
              {selection !== "none" && (
                <TableCell frozen>
                  <Checkbox
                    checked={selected}
                    onChange={() => toggleRow(id)}
                  />
                </TableCell>
              )}

              {columns.map((col, i) => (
                <TableCell
                  key={col.key}
                  frozen={i < frozenColumns}
                >
                  {col.render
                    ? col.render(row)
                    : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
