import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type DataTableProps, type Column } from "@/components/data-table"

type User = { id: number; name: string; email: string; role: string }

const sampleData: User[] = [
  { id: 1, name: "Nishikant", email: "Nishikantk12@.com", role: "Admin" },
  { id: 2, name: "Abhijeet", email: "abhijeett18@.com", role: "Editor" },
  { id: 3, name: "Nayan Kshirsagar", email: "nayankshirsagar911@.com", role: "Viewer" },
]

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role" },
]

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof DataTable<User>>

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    rowKey: "id",
  } as DataTableProps<User>,
}

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  } as DataTableProps<User>,
}

export const Empty: Story = {
  args: {
    data: [],
    columns,
    loading: false,
    emptyMessage: "Nothing here yet",
  } as DataTableProps<User>,
}
