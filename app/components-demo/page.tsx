"use client"

import * as React from "react"
import { InputField } from "@/components/input-field"
import { DataTable, type Column } from "@/components/data-table"

type User = {
  id: number
  name: string
  email: string
  role: string
}

const sampleData: User[] = [
  { id: 1, name: "Nishikant K", email: "nishikant123@.com", role: "Admin" },
  { id: 2, name: "Abhijeet D", email: "abhijeet18@.com", role: "Editor" },
  { id: 3, name: "Nayan K", email: "nayankshirsagar111@.com", role: "Viewer" },
]

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role" },
]

export default function ComponentsDemoPage() {
  const [text, setText] = React.useState("")
  const [size, setSize] = React.useState<'sm' | 'md' | 'lg'>('md')
  const [selected, setSelected] = React.useState<User[]>([])
  const [password, setPassword] = React.useState("")
  const [loadingText, setLoadingText] = React.useState("")
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <main className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen px-4 py-8`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Components</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-medium mb-3">Change Input Size</h2>

        
        <div className="flex gap-2 mb-4">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1 rounded ${
                size === s
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Single InputField */}
        <InputField
          label="Your name"
          placeholder="Enter your name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          helperText="Enter valid input"
          variant="outlined"
          size={size}
          showClearButton
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-medium mb-3">Variants & States:</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Filled"
              placeholder="Filled"
              variant="filled"
              size="md"
              showClearButton
            />
            <InputField
              label="Ghost"
              placeholder="Ghost"
              variant="ghost"
              size="md"
              showClearButton
            />
            <InputField
              label="Password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Use 8+ characters."
              variant="outlined"
              size="md"
              showPasswordToggle
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Invalid"
              placeholder="Invalid"
              invalid
              errorMessage="This field is required."
              variant="outlined"
              size="md"
            />
            <InputField
              label="Disabled"
              placeholder="Disabled"
              disabled
              variant="outlined"
              size="md"
            />
            <InputField
              label="Loading"
              placeholder="Loading..."
              value={loadingText}
              onChange={(e) => setLoadingText(e.target.value)}
              variant="outlined"
              size="md"
              loading
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">DataTable</h2>
        <DataTable
          data={sampleData}
          columns={columns}
          selectable
          selectionMode="multiple"
          rowKey="id"
          onRowSelect={(rows) => setSelected(rows)}
        />
        <p className="mt-3 text-sm text-muted-foreground">
          Selected rows: {selected.map((r) => r.name).join(", ") || "None"}
        </p>
      </section>
    </main>
  )
}
