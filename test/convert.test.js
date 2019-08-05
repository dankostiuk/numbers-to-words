const assert = require("assert");
const Converter = require("../src/convert");

let converter = null;
describe("Testing Converter.convertNumberToWords functionality", () => {
  beforeEach(() => {
    converter = new Converter();
  });

  describe("Valid numerical inputs", function() {
    it("Zero -> 0, should return expected output", () => {
      let number = "0";
      let result = converter.convertNumberToWords(number);
      assert.equal(result, "Zero");
    });

    it("Simple positive number -> 5624321, should return expected output", () => {
      let number = 5624321;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Five million six hundred and twenty four thousand three hundred and twenty one"
      );
    });

    it("Simple positive number -> 12341234, should return expected output", () => {
      let number = 12341234;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Twelve million three hundred and forty one thousand two hundred and thirty four"
      );
    });

    it("Simple positive number -> 15000000, should return expected output", () => {
      let number = 15000000;
      let result = converter.convertNumberToWords(number);
      assert.equal(result, "Fifteen million");
    });

    it("Simple positive number -> 13012, should return expected output", () => {
      let number = 13012;
      let result = converter.convertNumberToWords(number);
      assert.equal(result, "Thirteen thousand and twelve");
    });

    it("Simple positive number -> 17, should return expected output", () => {
      let number = 17;
      let result = converter.convertNumberToWords(number);
      assert.equal(result, "Seventeen");
    });

    it("Large positive number -> 2147483647, should return expected output", () => {
      let number = 2147483647;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Two billion one hundred and forty seven million four hundred and eighty three thousand six hundred and forty seven"
      );
    });

    it("Simple negative number -> -600500, should return expected output", () => {
      let number = -600500;
      let result = converter.convertNumberToWords(number);
      assert.equal(result, "Negative six hundred thousand five hundred");
    });

    it("Large negative number -> -2147483648, should return expected output", () => {
      let number = -2147483648;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Negative two billion one hundred and forty seven million four hundred and eighty three thousand six hundred and forty eight"
      );
    });

    it("Test 'and' occurences -> 2101202345, should return expected output", () => {
      let number = 2101202345;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Two billion one hundred and one million two hundred and two thousand three hundred and forty five"
      );
    });

    it("Test 'and' occurences -> 12000002, should return expected output", () => {
      let number = 12000002;
      let result = converter.convertNumberToWords(number);
      assert.equal(result, "Twelve million and two");
    });

    it("Test 'and' occurences -> 1000000016, should return expected output", () => {
      let number = 1000000016;
      let result = converter.convertNumberToWords(number);
      assert.equal(result, "One billion and sixteen");
    });
  });

  describe("Invalid inputs", function() {
    it("Greater than permitted range -> 2147483648, should return expected message", () => {
      let number = 2147483648;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Number must be within range -2147483648 to 2147483647."
      );
    });

    it("Less than permitted range -> -21474836478, should return expected message", () => {
      let number = -21474836478;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Number must be within range -2147483648 to 2147483647."
      );
    });

    it("Float value -> 123.456, should return expected output", () => {
      let number = 123.456;
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Invalid input! Please enter a positive or negative value containing only digits (e.g. 4321) or 'q' to quit: "
      );
    });

    it("Value contains non numeric values -> '223asdf', should return expected output", () => {
      let number = "223asdf";
      let result = converter.convertNumberToWords(number);
      assert.equal(
        result,
        "Invalid input! Please enter a positive or negative value containing only digits (e.g. 4321) or 'q' to quit: "
      );
    });
  });
});
