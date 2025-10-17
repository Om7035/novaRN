/**
 * Typography tokens for consistent text styles throughout the application
 */

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    normal: '400',
    medium: '500',
    bold: '700',
  },
  families: {
    regular: 'System',
    heading: 'System',
  },
} as const;

export type FontSize = keyof typeof typography.sizes;
export type FontWeight = keyof typeof typography.weights;
export type FontFamily = keyof typeof typography.families;