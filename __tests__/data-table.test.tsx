import { render, screen, fireEvent, within } from "@testing-library/react"
import { DataTable, type Column } from "@/components/data-table"
import { vi } from "vitest"

type Row = { id: number; name: string; age: number }

const data: Row[] = [
  { id: 1, name: "Nayan", age: 40 },
  { id: 2, name: "Nishikant", age: 25 },
  { id: 3, name: "Abhijeet", age: 30 },
]

const columns: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
]

describe("DataTable", () => {
  it("renders headers and rows", () => {
    render(<DataTable data={data} columns={columns} rowKey="id" />)
    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: /age/i })).toBeInTheDocument()
    expect(screen.getAllByRole("row")).toHaveLength(data.length + 1)
  })

  it("sorts by column on header click", () => {
    render(<DataTable data={data} columns={columns} rowKey="id" />)
    const nameHeader = screen.getByRole("columnheader", { name: /name/i })
    fireEvent.click(nameHeader) // asc
    const rows = screen.getAllByRole("row").slice(1)
    const firstCell = within(rows[0]).getByRole("cell", { name: /alice/i })
    expect(firstCell).toBeInTheDocument()
  })

  it("selects rows when selectable", () => {
    const onRowSelect = vi.fn()
    render(<DataTable data={data} columns={columns} rowKey="id" selectable onRowSelect={onRowSelect} />)
    const checkbox = screen.getAllByRole("checkbox")[1]
    fireEvent.click(checkbox)
    expect(onRowSelect).toHaveBeenCalled()
  })
})
