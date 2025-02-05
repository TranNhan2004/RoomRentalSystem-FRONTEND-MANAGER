import { snakeCase, camelCase } from 'change-case';

const changeCases = {
  'snake': snakeCase,
  'camel': camelCase
};

const changeCaseTo = (obj: Record<string, unknown>, caseOption: 'snake' | 'camel'): Record<string, unknown> => {
  const newObj: Record<string, unknown> = {};

  for (const key in obj) {
    const snakeKey = changeCases[caseOption](key);  
    newObj[snakeKey] = obj[key]; 
  }

  return newObj;
};

export default changeCaseTo;