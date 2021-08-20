import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null,
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    return new Filter(this.state);
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

class Filter {
  constructor(state) {
    this.state = state;

    // Ideally this would be a bit more dynamic
    // get the whole list of filters from a data-layer etc.
    // - note we're ignore the 'Phone' product type here
    this.productFilters = ["broadband", "tv", "mobile"];

    // We need to bind the functions to this so we can access the state
    // within the context of the array filter functions
    this.filterProduct = this.filterProduct.bind(this);
    this.filterProvider = this.filterProvider.bind(this);

    return this.filterByState();
  }

  filterByState() {
    return this.state.deals
      .filter(this.filterProduct)
      .filter(this.filterProvider);
  }

  filterProduct(deal) {
    const checkedFilters = this.state.productFilters || [];
    const uncheckedFilters = this.productFilters.filter(
      (f) => !checkedFilters.includes(f)
    );

    /*
    Handle empty case - nothing selected
    should return everything
    */
    if (checkedFilters.length === 0) {
      return true;
    }

    /*
    Handle filtering by product
    */
    // Check if any of the types match our selected filter (.some())
    // if so - perform logical AND (.every()) across the set to tell us if all the filters are found
    const inclusionFilter = checkedFilters.every((filter) =>
      deal.productTypes.some((type) => new RegExp(filter, "i").test(type))
    );

    // Now check that the deal doesn't include any products we don't have checked
    // The inner .every() checks that the filter is not matching the productType and this is the case for all the productTypes
    // The outer .every() logically ANDs the filters together to make sure all the filters are not found
    const exclusionFilter = uncheckedFilters.every((filter) =>
      deal.productTypes.every((type) => !new RegExp(filter, "i").test(type))
    );

    
    // Finally we need to AND the two results together
    // Basically if both are True - our filter is a productType,
    // and no excluded filters are in our deal, then it should be returned
    return inclusionFilter && exclusionFilter;
  }

  filterProvider(deal) {
    // Handle empty case - nothing selected
    // should return everything
    if (!this.state.providerFilter) {
      return true;
    }

    return deal.provider.id === this.state.providerFilter;
  }
}

export default Store;
