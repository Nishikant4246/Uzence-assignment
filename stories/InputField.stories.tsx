import type { Meta, StoryObj } from "@storybook/react"
import { InputField, type InputFieldProps } from "@/components/input-field"

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: { control: { type: "select" }, options: ["filled", "outlined", "ghost"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    clearable: { control: "boolean" },
    passwordToggle: { control: "boolean" },
    type: { control: { type: "select" }, options: ["text", "password", "email", "number"] },
  },
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof InputField>

export const Playground: Story = {
  args: {
    label: "Label",
    placeholder: "Enter something...",
    helperText: "Helper text",
    variant: "outlined",
    size: "md",
    clearable: true,
    passwordToggle: true,
  } as InputFieldProps,
}

export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Please enter a valid email.",
  },
}

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    helperText: "Use at least 8 characters",
  },
}
