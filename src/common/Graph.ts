import { Chart } from "chart.js/auto";
export default function InitGraph() {
  $(function () {
    const areaChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "กำไร",
          backgroundColor: "rgba(60,141,188,0.9)",
          borderColor: "rgba(60,141,188,0.8)",
          pointRadius: false,
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(60,141,188,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(60,141,188,1)",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
        {
          label: "จำนวนเครื่อง",
          backgroundColor: "rgba(210, 214, 222, 1)",
          borderColor: "rgba(210, 214, 222, 1)",
          pointRadius: false,
          pointColor: "rgba(210, 214, 222, 1)",
          pointStrokeColor: "#c1c7d1",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    const barChartCanvas = ($("#barChart") as any).get(0).getContext("2d");
    const barChartData = JSON.parse(JSON.stringify(areaChartData));
    const temp0 = areaChartData.datasets[0];
    const temp1 = areaChartData.datasets[1];
    barChartData.datasets[0] = temp1;
    barChartData.datasets[1] = temp0;

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      datasetFill: false,
    };

    new Chart(barChartCanvas, {
      type: "bar",
      data: barChartData,
      options: barChartOptions,
    });
  });
}
