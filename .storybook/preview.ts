import type { Preview } from "@storybook/react"
import "../app/globals.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
    a11y: { element: "#root", manual: false },
  },
}
export default preview
