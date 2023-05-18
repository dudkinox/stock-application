export const DayDurationArray = [
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
  "อาทิตย์",
];

export const MonthDurationArray = [
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

export const WeekDurationArray = [
  "สัปดาห์ที่ 1",
  "สัปดาห์ที่ 2",
  "สัปดาห์ที่ 3",
  "สัปดาห์ที่ 4",
];

export function MapDuration(duration: string): string[] {
  switch (duration) {
    case "วัน":
      return DayDurationArray;
    case "เดือน":
      return MonthDurationArray;
    case "สัปดาห์":
      return WeekDurationArray;
    default:
      return DayDurationArray;
  }
}
