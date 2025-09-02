"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  selectionMode?: "single" | "multiple"
  rowKey?: keyof T
  className?: string
  emptyMessage?: string
  ariaLabel?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  selectionMode = "multiple",
  rowKey,
  className,
  emptyMessage = "No data to display",
  ariaLabel = "Data table",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const getRowKey = React.useCallback(
    (row: T, index: number) => {
      const k = rowKey ? String(row[rowKey]) : row.id !== undefined ? String(row.id) : String(index)
      return k
    },
    [rowKey],
  )

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data
    const col = columns.find((c) => c.key === sortKey)
    if (!col) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const va = a[col.dataIndex]
      const vb = b[col.dataIndex]
      if (va == null && vb == null) return 0
      if (va == null) return sortDir === "asc" ? -1 : 1
      if (vb == null) return sortDir === "asc" ? 1 : -1
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va
      }
      return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va))
    })
    return copy
  }, [data, sortKey, sortDir, columns])

  const allVisibleKeys = React.useMemo(() => sortedData.map((row, i) => getRowKey(row, i)), [sortedData, getRowKey])
  const allSelectedOnPage = selectable && allVisibleKeys.length > 0 && allVisibleKeys.every((k) => selected.has(k))

  const toggleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"))
        return prev
      }
      setSortDir("asc")
      return key
    })
  }

  const updateSelection = (next: Set<string>) => {
    setSelected(next)
    if (onRowSelect) {
      const selectedRows: T[] = []
      next.forEach((k) => {
        const match = sortedData.find((r, idx) => getRowKey(r, idx) === k)
        if (match) selectedRows.push(match)
      })
      onRowSelect(selectedRows)
    }
  }

  const toggleRow = (key: string) => {
    const next = new Set(selected)
    if (selectionMode === "single") {
      next.clear()
      next.add(key)
    } else {
      if (next.has(key)) next.delete(key)
      else next.add(key)
    }
    updateSelection(next)
  }

  const toggleAll = () => {
    if (selectionMode === "single") return
    if (allSelectedOnPage) {
      const next = new Set(selected)
      allVisibleKeys.forEach((k) => next.delete(k))
      updateSelection(next)
    } else {
      const next = new Set(selected)
      allVisibleKeys.forEach((k) => next.add(k))
      updateSelection(next)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative overflow-x-auto rounded-md border border-input">
        <table className="w-full text-sm" role="table" aria-label={ariaLabel}>
          <thead className="bg-muted" role="rowgroup">
            <tr role="row">
              {selectable && (
                <th scope="col" role="columnheader" className="w-10 px-2 py-2 text-left">
                  {selectionMode === "multiple" ? (
                    <input
                      aria-label={allSelectedOnPage ? "Deselect all rows" : "Select all rows"}
                      type="checkbox"
                      className="h-4 w-4 accent-foreground"
                      checked={allSelectedOnPage}
                      onChange={toggleAll}
                    />
                  ) : (
                    <span className="sr-only">Row selection</span>
                  )}
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  role="columnheader"
                  aria-sort={sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  className={cn(
                    "px-3 py-2 text-left font-medium text-foreground whitespace-nowrap select-none",
                    col.sortable && "cursor-pointer",
                  )}
                  onClick={() => toggleSort(col.key, col.sortable)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <span aria-hidden="true" className="text-muted-foreground">
                        {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody role="rowgroup">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={`s-${i}`} role="row" className="border-t border-input">
                  {selectable && (
                    <td className="px-2 py-3">
                      <div className="h-4 w-4 rounded bg-muted animate-pulse" />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.key} className="px-3 py-3">
                      <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              <tr role="row" className="border-t border-input">
                <td
                  role="cell"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-3 py-6 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => {
                const key = getRowKey(row, idx)
                const isSelected = selected.has(key)
                return (
                  <tr
                    key={key}
                    role="row"
                    className={cn("border-t border-input hover:bg-muted/50", isSelected && "bg-muted/70")}
                  >
                    {selectable && (
                      <td role="cell" className="px-2 py-2 align-middle">
                        <input
                          type={selectionMode === "single" ? "radio" : "checkbox"}
                          aria-label={isSelected ? "Deselect row" : "Select row"}
                          className="h-4 w-4 accent-foreground"
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                        />
                      </td>
                    )}
                    {columns.map((c) => (
                      <td key={c.key} role="cell" className="px-3 py-2 align-middle whitespace-nowrap">
                        {String(row[c.dataIndex] ?? "")}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
