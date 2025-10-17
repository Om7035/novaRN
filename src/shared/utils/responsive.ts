/**
 * Responsive utility functions
 * Provides helpers for responsive design
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Default guideline sizes for iPhone 14 Pro
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

/**
 * Scales a size relative to screen width
 */
export const scale = (size: number): number => (width / guidelineBaseWidth) * size;

/**
 * Scales a size relative to screen height
 */
export const verticalScale = (size: number): number => (height / guidelineBaseHeight) * size;

/**
 * Scales a size with a modifier factor for better visual results
 */
export const moderateScale = (size: number, factor: number = 0.5): number => 
  size + (scale(size) - size) * factor;

/**
 * Checks if the device is in landscape mode
 */
export const isLandscape = (): boolean => width > height;

/**
 * Checks if the device is a tablet
 */
export const isTablet = (): boolean => {
  const aspectRatio = width / height;
  return width >= 768 && (aspectRatio > 1.6 || aspectRatio < 0.6);
};