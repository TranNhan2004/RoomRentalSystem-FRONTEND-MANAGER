const formatDate = (date: Date | null | undefined, format: 'ymd' | 'dmy' | 'mdy'): string => {
  if (!date) {
    date = new Date();
  }

  const formattedDate = new Date(date).toISOString().split('T')[0]; 
  const [year, month, day] = formattedDate.split('-');
  
  switch (format) {
    case 'dmy':
      return `${day}-${month}-${year}`;
    case 'mdy':
      return `${month}-${day}-${year}`;
    case 'ymd':
    default:
      return formattedDate;
  }
};

export default formatDate;