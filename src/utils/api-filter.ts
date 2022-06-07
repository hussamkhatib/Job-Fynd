class APIFilters {
  query: any;
  constructor(query: any) {
    this.query = query;
  }
  pagination(): this {
    const take = this.query?.limit ? parseInt(this.query.limit, 10) : 10;
    const p = this.query?.page ? parseInt(this.query.page, 10) : 1;
    const skip = p === 1 ? 0 : (p - 1) * (this.query?.limit || 10);
    this.query = { skip, take };
    return this;
  }
}
export default APIFilters;
