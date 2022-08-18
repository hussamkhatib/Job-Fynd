class APIFilters {
  query: any;
  constructor(query: any) {
    this.query = query;
  }
  sort(): this {
    const { id, desc } = this.query;
    if (!id && !desc) return this;
    const splitId = id.replace(".", "_").split("_");
    const orderBy = assign(splitId, desc ? "desc" : "asc");

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

function assign(keyPath: string[], value: string) {
  let obj: Record<string, any> = {};
  const lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
  return obj;
}
