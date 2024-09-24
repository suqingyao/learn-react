const { Workbook } = require('exceljs');

async function main() {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 20 },
    { header: '姓名', key: 'name', width: 20 },
    { header: '出生日期', key: 'birthday', width: 20 },
    { header: '联系电话', key: 'phone', width: 20 },
  ];

  const data = [
    { id: 1, name: '光光', birthday: new Date('1994-07-07'), phone: '13255555555' },
    { id: 2, name: '东东', birthday: new Date('1994-04-14'), phone: '13222222222' },
    { id: 3, name: '小刚', birthday: new Date('1995-08-08'), phone: '13211111111' },
  ];
  worksheet.addRows(data);

  await workbook.xlsx.writeFile('data.xlsx');
}

main();
