/**
 * Space tokens for consistent spacing throughout the application
 */

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type Space = keyof typeof space;