import buildPieChart from "./pitchart";

export type MonthStatistics = {
  readonly startOfMonth: Date;
  readonly count: number;
  readonly created: number;
  readonly closed: number;
};

export type MonthStatisticsArray = MonthStatistics[];

function getQuarter(date: Date) {
  return Math.ceil((date.getMonth() + 1) / 3);
}

function getMonthQuarterIndex(date: Date) {
  return date.getMonth() % 3;
}

function distinct(year: number, index: number, years: number[]) {
  return years.indexOf(year) === index;
}

function svgElementToString(svgElement: SVGElement) {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgElement);
}

function getYears(values: MonthStatisticsArray) {
  return values
    .map((x) => x.startOfMonth.getFullYear())
    .filter(distinct)
    .sort()
    .reverse();
}

function getYearQuarters(values: MonthStatisticsArray): Record<number, number[]> {
  const years = getYears(values);
  return years.reduce((prev, currentYear) => {
    return {
      ...prev,
      [currentYear]: values
        .filter((x) => x.startOfMonth.getFullYear() === currentYear)
        .map((x) => getQuarter(x.startOfMonth))
        .filter(distinct)
        .sort()
        .reverse()
    };
  }, {});
}

function generateTable(values: MonthStatisticsArray) {
  const years = getYears(values);
  const yearMonths = getYearQuarters(values);

  const htmlTable = ['<table style="width: 100%;"><tbody>'];
  for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
    const year = years[yearIndex];
    const quarters = yearMonths[year];

    htmlTable.push(`<tr><td colSpan="4" style="text-align: center; vertical-align: middle;">${year}</td></tr>`);

    for (let quarterIndex = 0; quarterIndex < quarters.length; quarterIndex++) {
      const quarter = quarters[quarterIndex];

      const months = values.filter(
        (x) => x.startOfMonth.getFullYear() === year && getQuarter(x.startOfMonth) === quarter
      );

      const titles = ["", "", ""];
      const row1 = ["", "", ""];
      const row1Title = ["", "", ""];
      const row2 = ["", "", ""];
      months.forEach((month) => {
        const monthIndex = getMonthQuarterIndex(month.startOfMonth);
        titles[monthIndex] = month.startOfMonth.toLocaleString("default", { month: "long" });
        row1[monthIndex] = `${month.created}/${month.closed} (${month.count})`;
        row1Title[monthIndex] =
          `Осталось ${month.count - month.closed}.\nСоздано ${month.created}.\nВыполнено ${month.closed}.\nВсего ${month.count}.`;
        row2[monthIndex] = svgElementToString(
          buildPieChart({
            size: 40,
            diameter: 30,
            radius: 15,
            dataset: {
              label: "",
              data: [(month.created / month.count) * 100, (month.closed / month.count) * 100],
              color: ["var(--color-red)", "var(--color-green)"]
            }
          })
        );
      });

      htmlTable.push(
        [
          "<tr>",
          `<td rowSpan="3" style="text-align: center; vertical-align: middle;">Q${quarter}</td>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[0]}">${titles[0]}</td>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[1]}">${titles[1]}</td>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[2]}">${titles[2]}</td>`,
          "</tr>"
        ].join("")
      );
      htmlTable.push(
        [
          `<tr>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[0]}">${row1[0]}</td>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[1]}">${row1[1]}</td>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[2]}">${row1[2]}</td>`,
          `</tr>`
        ].join("")
      );
      htmlTable.push(
        [
          `<tr>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[0]}">${row2[0]}</td>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[1]}">${row2[1]}</td>`,
          `<td style="text-align: center; vertical-align: middle;" title="${row1Title[2]}">${row2[2]}</td>`,
          `</tr>`
        ].join("")
      );
    }
  }

  htmlTable.push("</tbody></table>");

  return htmlTable.join("");
}

export default generateTable;
