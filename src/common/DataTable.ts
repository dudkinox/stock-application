export default function initTable(max: string, id?: string) {
  let options = {};
  if (id === "#kay-table") {
    options = { columnDefs: [{ orderable: false, targets: [1] }] };
  }
  options = {
    ...options,
    responsive: false,
    autoWidth: true,
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    bDestroy: false,
    stateSave: true,
    retrieve: true,
    order: [[0, "desc"]],
    language: {
      zeroRecords: "ไม่พบข้อมูล",
      infoEmpty: "ไม่พบข้อมูล",
      infoFiltered: `(กรองจากทั้งหมด ${max} รายการ)`,
      search: "ค้นหา:",
      loadingRecords: "รอสักครู่",
      paginate: {
        first: "หน้าแรก",
        last: "หน้าสุดท้าย",
        next: "ถัดไป",
        previous: "ก่อนหน้า",
      },
    },
    lengthMenu: [
      [5, 10, 25, 50, 100, 200, 500, 1000, -1],
      [5, 10, 25, 50, 100, 200, 500, 1000, "ทั้งหมด"],
    ],
  };

  ($(id ?? "#stock-table") as any).DataTable(options);
}

export function destroyTable(id?: string) {
  ($(id ?? "#stock-table") as any).DataTable().destroy();
}
