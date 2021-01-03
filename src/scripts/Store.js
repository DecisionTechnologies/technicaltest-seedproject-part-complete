import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
    this.allDeals = [];
  }

  get deals() {
    return this.filter();
  }

  filter() {
    return this.state.deals;
  }

  setDeals(data) {
    this.state.deals = data;
    this.allDeals = data;
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

    if(!this.state.productFilters.includes("broadband")) return;
    const productFilters = this.state.productFilters;
    const providerFilter = this.state.providerFilter;

    let deals = this.allDeals.filter((deal) => {
      const productTypes = deal.productTypes
        .map((val) => val.toLowerCase())
        .filter((val) => val !== "phone")
        .map((val) => {
          if (val === "fibre broadband") return "broadband";
          return val;
        });

      if (productTypes.sort().join(",") === productFilters.sort().join(",")) {
        if (providerFilter === 3 && productFilters.includes("broadband") && productFilters.includes("tv") ) {
          return deal.provider.id === providerFilter
        }
        return true;
      }

      return false;
    });

    if(productFilters.length > 0) {
      this.state.deals = deals;
    } else {
      this.state.deals = this.allDeals
    }

    this.notify(this.state);
  }

  // setProviderFilter(value = null) {

  //   this.state.providerFilter = value;
  //   const providerFilter = this.state.providerFilter
  //   // Filtering logic for sky
  //   if (providerFilter === 1) {
  //     const deals = this.allDeals.filter((deal) => {
  //       return deal.provider.id === this.state.providerFilter;
  //     });
  //     this.state.deals = deals;
  //   } else {
  //     this.state.deals = this.allDeals;
  //   }

  //   this.notify(this.state);
  // }

  // This works fine
  setDealAgain() {
    const deals = this.allDeals.filter((deal) => {
      return deal.provider.id === this.state.providerFilter;
    });
    this.state.deals = deals;
  }
  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    console.log(value)
    const providerFilter = this.state.providerFilter
    // Filtering logic for sky
    if (providerFilter === 1 ||
    providerFilter === 3 ||
    providerFilter === 42 ||
    providerFilter === 48 ||
    providerFilter === 116)    
    {
      this.setDealAgain()
    // } 
    } else {
        this.state.deals = this.allDeals;
    } 
    this.notify(this.state);
    console.log(this.state)
  }
  
}

export default Store;
