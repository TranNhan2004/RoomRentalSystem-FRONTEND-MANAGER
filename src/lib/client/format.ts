const normalize = (x: number) => x > 10 ? x : `0${x}`;

export const formatDate = (date: Date | null | undefined, format: 'ymd' | 'dmy' | 'mdy'): string => {
  if (!date) {
    date = new Date();
  }

  date = new Date(date);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (format) {
    case 'dmy':
      return `${normalize(day)}-${normalize(month)}-${year}`;
    case 'mdy':
      return `${normalize(month)}-${normalize(day)}-${year}`;
    case 'ymd':
      return `${year}-${normalize(month)}-${normalize(day)}`;
  }
};

export const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
}).format(value);