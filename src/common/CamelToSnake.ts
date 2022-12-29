export default function CamelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, (m) => `_${m[0].toLowerCase()}`);
}

export function camelToSnakeObject(obj: any): any {
  const newObj: any = {};
  for (const key of Object.keys(obj)) {
    newObj[CamelToSnake(key)] = obj[key];
  }
  return newObj;
}
