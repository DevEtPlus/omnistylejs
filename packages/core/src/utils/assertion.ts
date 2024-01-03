export function isFunction<
  T extends (...args: any[]) => any = (...args: any[]) => any,
>(value: any): value is T {
  return typeof value === "function";
}

export function isObject<T = any>(value: any): value is Record<keyof T, T> {
  return (
    value != null &&
    (typeof value === "object" || typeof value === "function") &&
    !Array.isArray(value)
  );
}

export function isReadonlyArray<T = any>(
  value: any,
): value is ReadonlyArray<T> {
  return Array.isArray(value);
}
