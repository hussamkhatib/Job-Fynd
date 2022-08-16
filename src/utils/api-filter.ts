class APIFilters {
  query: any;
  constructor(query: any) {
    this.query = query;
  }
  sort(): this {
    if (!this.query?.id && !this?.query?.desc) return this;
    let orderBy;
    if (this.query.id.includes("_")) {
      if (this.query.id.startsWith("_count")) {
        const id = this.query.id.split("_")[2];
        orderBy = {
          [id]: {
            _count: this.query.desc ? "desc" : "asc",
          },
        };
      } else {
        const [field, id] = this.query.id.split("_");
        orderBy = {
          [field]: {
            [id]: this.query.desc ? "desc" : "asc",
          },
        };
      }
    } else
      orderBy = {
        [this.query.id]: this.query.desc ? "desc" : "asc",
      };

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
