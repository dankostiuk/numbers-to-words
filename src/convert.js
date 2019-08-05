const { MAX_INTEGER, ONES, TEENS, TENS } = require("./constants");

class Converter {
  /**
   * Converts numeric input to English words according to requirements.
   *
   * @param {Integer} num number to convert
   */
  convertNumberToWords(num) {
    if (num === "0") {
      return "Zero";
    }

    num = num.toString().replace(/^0+/, "");
    if (!num.match(/^-?\d+$/)) {
      return "Invalid input! Please enter a positive or negative value containing only digits (e.g. 4321) or 'q' to quit: ";
    }

    let negative = false;
    if (num < 0) {
      negative = true;
      num = num * -1;
    }

    if (num > MAX_INTEGER + (negative ? 1 : 0)) {
      return "Number must be within range -2147483648 to 2147483647.";
    }

    let result = "";
    let numArr = num.toString().split("");
    let length = numArr.length;
    for (let i = length - 1; i >= 0; i--) {
      if (i === length - 1) {
        // --- ones
        result = ONES[numArr[i]];
      } else if (i === length - 2) {
        if (numArr[i] === "1") {
          // teens
          result = TEENS[numArr[i + 1]];
        } else {
          // tens
          result = TENS[numArr[i]] + " " + result;
        }
      } else if (
        (i === length - 3 || i === length - 6 || i === length - 9) &&
        numArr[i] !== "0"
      ) {
        // --- hundreds
        result = ONES[numArr[i]] + " hundred " + result;
      } else if (i === length - 4 && numArr[i - 1] !== "1") {
        // --- thousands
        result = ONES[numArr[i]] + " thousand " + result;
      } else if (i === length - 5) {
        if (numArr[i] === "1") {
          // teens
          result = TEENS[numArr[i + 1]] + " thousand " + result;
        } else {
          // tens
          result = TENS[numArr[i]] + " " + result;
        }
      } else if (i === length - 7 && numArr[i - 1] !== "1") {
        // --- millions
        if (result.trim().split(" ")[0] === "thousand") {
          let arr = result.trim().split(" ");
          arr.shift();
          result = arr.join(" ");
        }
        result = ONES[numArr[i]] + " million " + result;
      } else if (i === length - 8) {
        // --- ten millions
        if (numArr[i] === "1" && numArr[i + 1] !== "0") {
          // teens
          if (result.trim().split(" ")[0] === "thousand") {
            let arr = result.trim().split(" ");
            arr.shift();
            result = arr.join(" ");
          }

          result = TEENS[numArr[i + 1]] + " million " + result;
        } else {
          // tens
          result = TENS[numArr[i]] + " " + result;
        }
      } else if (i === length - 10) {
        // --- billions
        if (result.trim().split(" ")[0] === "million") {
          let arr = result.trim().split(" ");
          arr.shift();
          result = arr.join(" ");
        }
        result = ONES[numArr[i]] + " billion " + result;
      }
    }

    return this.formatResultString(result, negative);
  }

  /**
   * Formats the result to remove empty spaces, inserts 'and' to correct places, prepends 'Negative' if negative number.
   * @param {String} result The unformatted converted English-word result.
   * @param {boolean} negative Flag representing if number is negative
   */
  formatResultString(result, negative) {
    let arr = result.split(" ").filter(e => e !== "");

    let andIndexArr = [];
    arr.forEach((e, i) => {
      if (
        e === "hundred" &&
        arr[i + 1] !== undefined &&
        arr[i + 1] !== "thousand" &&
        arr[i + 1] !== "million"
      ) {
        andIndexArr.push(i + 1);
      } else if (
        e === "thousand" &&
        arr[i + 1] !== undefined &&
        arr[i + 2] !== "hundred"
      ) {
        andIndexArr.push(i + 1);
      } else if (
        e === "million" &&
        arr[i + 1] !== undefined &&
        arr[i + 2] !== "thousand" &&
        arr[i + 2] !== "hundred" &&
        arr[i + 3] === undefined
      ) {
        andIndexArr.push(i + 1);
      } else if (
        e === "billion" &&
        arr[i + 1] !== undefined &&
        arr[i + 2] !== "million" &&
        arr[i + 2] !== "thousand" &&
        arr[i + 2] !== "hundred" &&
        arr[i + 3] === undefined
      ) {
        andIndexArr.push(i + 1);
      }
    });
    andIndexArr.reverse().forEach(e => {
      arr.splice(e, 0, "and");
    });
    result = arr.join(" ");

    result = negative ? "negative " + result : result;
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}

module.exports = Converter;
