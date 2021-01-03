import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  //Test for Criteria 1
  it("should return all deals when no filters applied", () => {
    // Arrange
    const sut = new Store();
    sut.setDeals(mockData.deals);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  // Test for Criteria 2
  it("should return 4 broadband only deals when filtering by broadband", () => {
    // Arrange
    const sut = new Store()
    sut.setDeals(mockData.deals)
    sut.setProductFilter("broadband")
    // Act
    const result = sut.deals
    // Assert
    expect(result.length).toEqual(4)
  });

  // Test for Criteria 3
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

  // Test for Criteria 4
  it("should return 1 deal for broadband and mobile only when filtering by broadband AND mobile", () => {
    // Arrange
    const sut = new Store()
    sut.setDeals(mockData.deals)
    sut.setProductFilter("broadband")
    sut.setProductFilter("mobile")
    // Act
    const result = sut.deals
    // Assert
    expect(result.length).toEqual(1)
  })

  // Test for Criteria 5
  it("should return 1 deal for Sky only when filtering by sky", () => {
    // Arrange
    const sut = new Store()
    sut.setDeals(mockData.deals)
    sut.setProviderFilter(1)
    // Act
    const result = sut.deals
    // Assert
    expect(result.length).toEqual(1)
  })



}

);
