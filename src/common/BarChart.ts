import Chart from "chart.js/auto";

export default function initChart(id?: string, dataPaidCount?:any, dataOutstandingCount?:any, dataCompletedCount?:any) {
    $(function () {
        const areaChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: "ชำระแล้ว",
                    backgroundColor: "rgba(54, 162, 235, 0.9)",
                    borderColor: "rgba(54, 162, 235, 0.8)",
                    pointRadius: false,
                    pointColor: "#3b8bba",
                    pointStrokeColor: "rgba(54, 162, 235, 1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(54, 162, 235, 1)",
                    data: dataPaidCount,
                },
                {
                    label: "ค้างชำระ",
                    backgroundColor: "rgba(255, 206, 86, 0.9)",
                    borderColor: "rgba(255, 206, 86, 0.8)",
                    pointRadius: false,
                    pointColor: "rgba(255, 206, 86, 1)",
                    pointStrokeColor: "#c1c7d1",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: dataOutstandingCount,
                },
                {
                    label: "ชำระหมดแล้ว",
                    backgroundColor: "rgba(75, 192, 192, 0.9)",
                    borderColor: "rgba(75, 192, 192, 0.8)",
                    pointRadius: false,
                    pointColor: "rgba(75, 192, 192, 1)",
                    pointStrokeColor: "#c1c7d1",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: dataCompletedCount,
                },
            ],
        };

        const barChartCanvas = ($(id ?? "#barChart") as any).get(0).getContext("2d");
        const barChartData = $.extend(true, {}, areaChartData);
        const temp0 = areaChartData.datasets[0];
        const temp1 = areaChartData.datasets[1];
        const temp2 = areaChartData.datasets[2];
        barChartData.datasets[0] = temp0;
        barChartData.datasets[1] = temp1;
        barChartData.datasets[2] = temp2;

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

export function destroyTable(id?: string) {
    ($(id ?? "#stock-table") as any).DataTable().destroy();
}
