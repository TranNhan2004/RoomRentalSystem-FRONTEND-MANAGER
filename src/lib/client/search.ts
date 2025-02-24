const normalizedString = (value: string) => {
  return value.replace(' ', '').toLowerCase();
};

export const search = <T extends object>(arr: T[], key: keyof T, value: string): T[] => {
  return [...arr].filter(item => normalizedString(item[key]?.toString() ?? '')
                                  .includes(normalizedString(value)));
};