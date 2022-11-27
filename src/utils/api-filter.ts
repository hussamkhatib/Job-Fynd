class APIFilters {
  query: any;
  constructor(query: any) {
    this.query = query;
  }
  sort(): this {
    const { id, desc } = this.query;
    if (!id && !desc) return this;
    const splitId = id.replace(".", "_").split("_");
    const orderBy = convertArrayIntoNestedObj(splitId, desc ? "desc" : "asc");

    delete this.query.id;
    delete this.query.desc;
    this.query = { ...this.query, orderBy };
    return this;
  }
  pagination(): this {
    const take = this.query?.pageSize ? parseInt(this.query.pageSize, 10) : 10;
    const p = this.query?.pageIndex ? parseInt(this.query.pageIndex, 10) : 0;
    const skip = p === 0 ? 0 : p * (this.query?.pageSize || 10);
    delete this.query.pageIndex;
    delete this.query.pageSize;
    this.query = { ...this.query, take, skip };
    return this;
  }
}
export default APIFilters;

function convertArrayIntoNestedObj(keyPath: string[], value: string) {
  const result: Record<string, any> = {};
  let nestedObj = result;
  keyPath.forEach((name, i) => {
    if (i === keyPath.length - 1) {
      nestedObj[name] = value;
    } else {
      nestedObj[name] = {};
      nestedObj = nestedObj[name];
    }
  });

  return result;
}
