import { snakeCase, camelCase } from 'change-case';

const changeCases = {
  'snake': snakeCase,
  'camel': camelCase
};

const changeCaseTo = <T extends object>(obj: T, caseOption: 'snake' | 'camel'): T => {
  const newObj: Record<string, unknown> = {};

  for (const key in obj) {
    const newKey = changeCases[caseOption](key);  
    newObj[newKey] = obj[key];
  }

  return newObj as T;
};

export default changeCaseTo;