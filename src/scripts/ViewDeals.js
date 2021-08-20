class ViewDeals {
  constructor(store, template) {
    this.store = store;
    this.template = template;
    this.dealList = document.getElementById("deal-list");
  }

  render(data) {
    if (this.dealList && data.length) {
      const htmlToAppend = this.template.buildDealList(data);
      this.dealList.innerHTML = htmlToAppend;
    }
    if (data.length === 0) {
      const htmlToAppend = this.template.buildNoDealPlaceholder();
      this.dealList.innerHTML = htmlToAppend;
    }
  }

  update(state) {
    this.render(this.store.deals)
  }
}

export default ViewDeals;
