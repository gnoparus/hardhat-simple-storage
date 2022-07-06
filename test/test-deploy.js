const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory;
  let simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it("Should start with favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert.equal(currentValue.toString(), expectedValue);
    expect(currentValue.toString()).to.equal(expectedValue);
  });
  it("Should update when we call store", async function () {
    const expectedValue = "555";
    const txResponse = await simpleStorage.store(expectedValue);
    await txResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("Should have 1 person after add", async function () {
    const expectedValue1 = "name1";
    const expectedValue2 = "1";
    const txResponse = await simpleStorage.addPerson(
      expectedValue1,
      expectedValue2
    );
    await txResponse.wait(1);
    const currentValue = await simpleStorage.people(0);
    assert.equal(currentValue[1], expectedValue1);
    assert.equal(currentValue[0], expectedValue2);

    const currentFav = await simpleStorage.nameToFavoriteNumber(expectedValue1);
    assert.equal(currentFav, expectedValue2);
  });
});
