import Store from "../Store";
import mockData from "../../../public/db.json";

describe("Filters", () => {
  let store;
  beforeEach(() => {
    // This shouldn't change between tests,
    // but just in case, lets reset each time
    store = new Store();
    store.setDeals(mockData.deals);
  });

  describe("no filters applied", () => {
    it("should return all deals when no filters applied", () => {
      expect(store.state.providerFilter).toBeFalsy();
      expect(store.state.productFilters).toHaveLength(0);
      expect(store.deals).toEqual(mockData.deals);
    });
  });

  describe("filters applied", () => {
    describe("product filters", () => {
      it("should return all broadband deals", () => {
        store.setProductFilter("broadband");
        const matchingDeals = mockData.deals.filter(
          (deal) =>
            deal.productTypes.some((type) => /broadband/i.test(type)) &&
            deal.productTypes.includes("Phone") &&
            deal.productTypes.length === 2
        );

        expect(store.state.providerFilter).toBeFalsy();
        expect(store.state.productFilters).toEqual(["broadband"]);

        expect(store.deals).toHaveLength(4);
        expect(store.deals.map((deal) => deal.id)).toEqual(
          matchingDeals.map((deal) => deal.id)
        );
      });

      it("should return all broadband and tv deals", () => {
        store.setProductFilter("broadband");
        store.setProductFilter("tv");
        const matchingDeals = mockData.deals.filter(
          (deal) =>
            deal.productTypes.some((type) => /broadband/i.test(type)) &&
            deal.productTypes.includes("TV") &&
            deal.productTypes.includes("Phone") &&
            deal.productTypes.length === 3
        );

        expect(store.state.providerFilter).toBeFalsy();
        expect(store.state.productFilters).toEqual(["broadband", "tv"]);

        expect(store.deals).toHaveLength(4);
        expect(store.deals.map((deal) => deal.id)).toEqual(
          matchingDeals.map((deal) => deal.id)
        );
      });
    });

    describe('provider filters', () => {
      it("should return sky deals", () => {
        const sky = 1  // ID 1 = Sky
        store.setProviderFilter(sky);
        const matchingDeals = mockData.deals.filter(
          (deal) =>
            deal.provider.id === sky
        );

        expect(store.state.productFilters).toHaveLength(0);
        expect(store.state.providerFilter).toEqual(sky);

        expect(store.deals).toHaveLength(1);
        expect(store.deals.map((deal) => deal.id)).toEqual(
          matchingDeals.map((deal) => deal.id)
        );
      });
    });
  });
});
