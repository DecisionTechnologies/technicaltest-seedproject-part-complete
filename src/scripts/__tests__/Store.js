import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  //Filter for Criteria 1
  it("should return all deals when no filters applied", () => {
    // Arrange
    const sut = new Store();
    sut.setDeals(mockData.deals);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });
  // Filter for Criteria 2
  it("should return 4 broadband only deals when filtering by broadband", () => {
    // Arrange
    const sut = new Store()
    sut.setDeals(mockData.deals)
    sut.setProductFilter("broadband")
    // Act
    const result = sut.deals
    // Assert
    expect(result.length).toEqual(4)
  })
  // Filter for Criteria 3
  it("should return 4 deals for broadband and tv only when filtering by broadband AND tv", () => {
    // Arrange
    const sut = new Store()
    sut.setDeals(mockData.deals)
    sut.setProductFilter("broadband")
    sut.setProductFilter("tv")
    // Act
    const result = sut.deals
    // Assert
    expect(result.length).toEqual(4)
  })

}

);
