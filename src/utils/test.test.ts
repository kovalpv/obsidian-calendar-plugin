import generateTable from "@utils/statistic/statistic";

function getArray(start: string, end: string) {
  // Convert start and end dates to Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Generate months between start and end dates
  const currentDate = new Date(startDate);
  const months = [];
  while (currentDate <= endDate) {
    // months.push(currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }));

    const created = Math.ceil(Math.random() * 100);
    const closed = Math.ceil(Math.random() * 100);

    months.push({
      startOfMonth: new Date(currentDate),
      count: created + closed,
      created,
      closed
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return months;
}

test("generate table", () => {
  const values = getArray("2023-10-01", "2025-12-31");

  console.log(generateTable(values));
});
