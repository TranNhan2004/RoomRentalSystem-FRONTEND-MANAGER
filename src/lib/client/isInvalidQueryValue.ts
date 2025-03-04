export const isValidQueryValue = <T>(value: T) => {
  return value !== undefined && value !== null && value !== "";
};