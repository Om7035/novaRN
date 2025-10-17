# UI Components

This directory contains reusable UI components for building consistent user interfaces.

## Available Components

- **[Button](button.tsx)**: Customizable button with multiple variants and sizes
- **[Card](card.tsx)**: Container component with rounded corners and shadow
- **[Checkbox](checkbox.tsx)**: Checkbox with label
- **[Collapsible](collapsible.tsx)**: Collapsible section with toggle
- **[IconSymbol](icon-symbol.tsx)**: Cross-platform icon component
- **[Input](input.tsx)**: Text input with label and error handling
- **[Alert](alert.tsx)**: Alert messages with different types (success, error, warning, info)
- **[Loading](loading.tsx)**: Loading indicator with optional message
- **[Modal](modal.tsx)**: Modal component with overlay

## Usage

Import components from the ui directory:

```tsx
import { Button, Card, Input } from '@/components/ui';
```

## Customization

All components support styling through the `style` prop and follow the theme system for consistent colors across light and dark modes.