export const flattenObject = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  let res: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      res = { ...res, ...flattenObject(value as Record<string, unknown>) };
    } else {
      res[key] = value;
    }
  }
  return res;
};
