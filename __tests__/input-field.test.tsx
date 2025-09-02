"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { InputField } from "@/components/input-field"
import { vi } from "vitest"

describe("InputField", () => {
  it("renders label and placeholder", () => {
    render(<InputField label="Name" placeholder="Enter name" />)
    expect(screen.getByLabelText("Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument()
  })

  it("clear button clears the input", () => {
    const onChange = vi.fn()
    render(<InputField label="Name" value="Alice" onChange={onChange} />)
    const clearBtn = screen.getByRole("button", { name: /clear input/i })
    fireEvent.click(clearBtn)
    expect(onChange).toHaveBeenCalled()
  })

  it("toggles password visibility", () => {
    render(<InputField label="Password" type="password" />)
    const toggle = screen.getByRole("button", { name: /show password/i })
    fireEvent.click(toggle)
    expect(screen.getByRole("button", { name: /hide password/i })).toBeInTheDocument()
  })
})
