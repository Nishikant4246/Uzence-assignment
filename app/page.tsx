import Link from "next/link"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-pretty text-2xl font-semibold">React Component Development Assignment</h1>
      <p className="mt-2 text-muted-foreground">
        This project contains two reusable components: InputField and DataTable.
      </p>
      <div className="mt-6">
        <Link
          href="/components-demo"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          View Components 
        </Link>
      </div>
    </main>
  )
}
