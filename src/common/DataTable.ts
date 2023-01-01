export default function initTable() {
  ($("#stock-table") as any).DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
    bDestroy: false,
    stateSave: true,
    retrieve: true,
    order: [[0, "desc"]],
    language: {
      zeroRecords: "ไม่พบข้อมูล",
      search: "ค้นหา:",
      loadingRecords: "รอสักครู่",
      paginate: {
        first: "หน้าแรก",
        last: "หน้าสุดท้าย",
        next: "ถัดไป",
        previous: "ก่อนหน้า",
      },
    },
  });
}
