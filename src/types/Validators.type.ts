export type ValidateFunctionType = () => string | null;

export type Validators<T extends object> = {
  [key in keyof T]: ValidateFunctionType;
}