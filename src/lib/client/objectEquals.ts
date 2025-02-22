export const objectEquals = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
  for (const key in obj1) {
    if (!Object.hasOwn(obj2, key)) {
      return false;
    }
    
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
};