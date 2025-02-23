export const sort = <T extends object>(arr: T[], key: keyof T, ascending: boolean) => {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0; 
  });
};