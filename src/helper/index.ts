export const getFirstLetterofFirstAndMiddleName = (str: string) =>
  str
    .split(" ")
    .slice(0, 2)
    .map((a) => a[0])
    .join("");
