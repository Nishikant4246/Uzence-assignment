# React Component Development Assignment  

## 📌 Overview  
This project is part of the **React Component Development Assignment**.  
The focus is on building **UI components** with React, TypeScript, TailwindCSS, and Storybook.  

Two components are implemented:  
1. **InputField** – a flexible, accessible input component with validation states.  
2. **DataTable** – a table component with sorting, selection, and loading states.  

🔗 **Live Storybook Preview (Vercel):** [https://uzence-assignment-smoky.vercel.app/](https://uzence-assignment-smoky.vercel.app/)  

---

## 🛠 Tech Stack  
- React  
- TypeScript  
- TailwindCSS  
- Storybook  
- Jest / React Testing Library (for basic tests)  

---

## 🚀 Components  

### 1. InputField  
**Features:**  
- Label, placeholder, helper text, error message  
- States: disabled, invalid, loading  
- Variants: filled, outlined, ghost  
- Sizes: small, medium, large  
- Optional: clear button, password toggle  
- Optional: light & dark theme  

**Props:**  
```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
.
├── __tests__                # Unit tests
├── .next                    # Next.js build output
├── .storybook               # Storybook configuration
│   ├── main.ts
│   └── preview.ts
├── app                      # App-level files (Next.js / routing)
├── components
│   └── ui                   # Reusable UI components
│       ├── data-table.tsx
│       ├── input-field.tsx
│       └── theme-provider.tsx
├── hooks                    # Custom hooks
├── lib                      # Utility functions / helpers
├── public                   # Static assets
├── stories                  # Storybook stories
├── styles                   # Global styles
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── tailwind.config.js
└── README.md
