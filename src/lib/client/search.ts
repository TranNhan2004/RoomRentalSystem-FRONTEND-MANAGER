const normalizedString = (value: string) => {
  return value.trim().replaceAll(' ', '').toLowerCase();
};

export const search = <T extends object>(arr: T[], key: keyof T, value: string): T[] => {
  return [...arr].filter(item => {
    return normalizedString(item[key]?.toString() ?? '').includes(normalizedString(value));
  });
};