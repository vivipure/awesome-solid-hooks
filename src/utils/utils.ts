export function isNoop(value: any)  {
  return typeof value === "undefined" || value === null;
}
