let uniqueIdCounter = 0;

/**
 * Generates a unique class name with a given prefix.
 * @param prefix The prefix for the class name (e.g., "thaana-input").
 * @returns A unique class name string.
 */
export const generateUniqueClassName = (prefix: string): string => {
  uniqueIdCounter += 1;
  return `${prefix}-${uniqueIdCounter}`;
};
