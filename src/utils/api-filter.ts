class APIFilters {
  query: any;
  constructor(query: any) {
    this.query = query;
  }
  pagination(): this {
    const take = this.query?.limit ? parseInt(this.query.limit, 10) : 10;
    const p = this.query?.offset ? parseInt(this.query.offset, 10) : 0;
    const skip = p === 0 ? 0 : p * (this.query?.limit || 10);
    this.query = { skip, take };
    return this;
  }
}
export default APIFilters;
