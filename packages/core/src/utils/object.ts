import { isObject } from "./assertion";

export function mergeDeep<T>(
  target: T,
  source: unknown,
  options: { clone?: boolean } = { clone: true },
): T {
  const output = options.clone ? { ...target } : target;

  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      // Avoid prototype pollution
      if (key === "__proto__" || key === "constructor") {
        continue;
      }

      if (isObject(source[key]) && key in target && isObject(target[key])) {
        // Since `output` is a clone of `target` and we have narrowed `target`
        // in this block we can cast to the same type.
        (output as Record<keyof any, unknown>)[key] = mergeDeep(
          target[key],
          source[key],
          options,
        );
      } else {
        (output as Record<keyof any, unknown>)[key] = source[key];
      }
    }
  }

  return output;
}

export function mergeShallow<T>(acc: T, item: unknown) {
  if (!item) {
    return acc;
  }

  return mergeDeep(acc, item, {
    clone: false,
  });
}
