export default function convertDateToThai(date: Date): string {
  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `วันที่ ${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
}
export function convertToDateFormat(
  inputDate: string | undefined | null
): string {
  if (!inputDate) {
    return "";
  }

  const datePart = inputDate.split(" ")[0];
  const dateObj = new Date(datePart);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
