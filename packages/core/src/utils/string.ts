export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function camelToKebab(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
