import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-interactions"],
  staticDirs: ["../public"],
}
export default config
