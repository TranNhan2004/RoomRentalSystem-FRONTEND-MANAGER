export const objectEquals = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
  for (const key in obj1) {
    if (!obj1.hasOwnProperty(key) || !obj2.hasOwnProperty(key)) {
      return false;
    }
    
    if (typeof obj1[key] !== typeof obj2[key]) {
      return false;
    }

    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
};