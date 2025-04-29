interface PieChart {
  readonly size?: number;
  readonly diameter: number;
  readonly radius: number;
  readonly dataset: Dataset;
}

interface Dataset {
  readonly label: string;
  readonly data: number[];
  readonly color: string[];
}

function buildPieChart(chart: PieChart): SVGElement {
  const data = chart.dataset.data;
  const colors = chart.dataset.color;

  // Define SVG namespace
  const svgNS = "http://www.w3.org/2000/svg";

  // Create the SVG element
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");

  if (chart.size) {
    svg.setAttribute("width", String(chart.size)); //"256");
  }

  //
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const part = data[i];
    const angle = (360 * part) / 100;
    const angle_d = 360 - angle;
    const color = colors[i];

    const group = document.createElementNS(svgNS, "g");

    group.setAttribute("fill", "none");

    // group1.setAttribute("stroke-width", "30");
    group.setAttribute("stroke-width", String(chart.diameter));

    group.setAttribute("stroke-dasharray", `${angle} ${angle_d}`);
    group.setAttribute("transform", "translate(50 50)");

    // Circle 1
    const circle = document.createElementNS(svgNS, "circle");
    // circle1.setAttribute("r", "15");
    circle.setAttribute("r", String(chart.radius));

    circle.setAttribute("stroke", color);

    circle.setAttribute("pathLength", "360");
    circle.setAttribute("transform", `rotate(${sum})`);
    group.appendChild(circle);

    svg.appendChild(group);
    sum += angle;
  }
  return svg;
}

export default buildPieChart;
