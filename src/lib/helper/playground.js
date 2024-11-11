const dateCurrent = new Date('25-10-2024');

const parseDate = params => {
  const { date, format } = params;
  let YYYY = '';
  let MM = '';
  let DD = '';
  let hh = 0;
  let mm = 0;
  switch (format) {
    case 'dd-mm-yyyy':
      [DD, MM, YYYY] = date?.split('-');
      break;
    case 'dd/mm/yyyy':
      [DD, MM, YYYY] = date?.split('/');
      break;
    default:
      break;
  }

  const dateParse = new Date(Date.UTC(YYYY, MM-1, DD, hh, mm));
  return dateParse;
};

const formatDate = params => {
  const { date, format } = params;
  console.log(Date.parse(date), date, new Date(date));
  if (!Date.parse(date)) throw new Error('Invalid Date');

  if (format === 'ISO') {
    return date.toISOString();
  }

  
};

const currParseDate = parseDate({
  date: '25/10/2024',
  format: 'dd/mm/yyyy',
});

console.log()
const date = new Date(Date.UTC(2024, 4-1, 25));

console.log(date?.toISOString())
