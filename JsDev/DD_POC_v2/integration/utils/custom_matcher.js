class CustomMatcher {
  constructor() {
    this.customMatchers = {
      toEqualIgnoreCase: function (util, customEqualityTesters) {
        return {
          compare: function (actual, expected) {
            if (expected === undefined) {
              expected = '';
            }
            var result = {};
            result.pass = util.equals(actual.toUpperCase().trim(), expected.toUpperCase().trim(), customEqualityTesters);
            if (result.pass) {
              result.pass = "Expected \"" + actual.toUpperCase().trim() + "\" to be \"" + expected.toUpperCase().trim() + "\" (ignoring cases sensitive)";
              result.message = "Expected " + actual.toUpperCase().trim() + " to be (ignoring cases sensitive) " + expected.toUpperCase().trim() + "";
            } else {
              result.message = "Expected " + actual.toUpperCase().trim() + ", but it is " + expected.toUpperCase().trim() + " (ignoring cases sensitive)";
            }
            return result;
          }
        };
      },
      toEqual: function (util, customEqualityTesters) {
        return {
          compare: function (actual, expected) {
            if (expected === undefined) {
              expected = '';
            }
            var result = {};
            result.pass = util.equals(actual, expected, customEqualityTesters);
            if (result.pass) {
              result.pass = "Expected \"" + actual + "\" to be \"" + expected + "\"";
              result.message = "Expected " + actual + " to be " + expected + "";
            } else {
              result.message = "Expected " + actual + ", but it is " + expected + "";
            }
            return result;
          }
        };
      },
      toContain: function (util, customEqualityTesters) {
        customEqualityTesters = customEqualityTesters || [];
        return {
          compare: function (actual, expected) {
            if (expected === undefined) {
              expected = '';
            }
            var result = {};
            result.pass= util.contains(actual, expected, customEqualityTesters)
            if (result.pass) {
              result.pass = "Expected \"" + actual + "\" to Contain \"" + expected + "\"";
              result.message = "Expected " + actual + " to Contain " + expected + "";
            } else {
              result.message = "Expected " + actual + ", but it is " + expected + "";
            }
            return result;
          }
        };
      },
      toContainSourceCode: function (util, customEqualityTesters) {
        customEqualityTesters = customEqualityTesters || [];
        return {
          compare: function (actual, expected) {
            if (expected === undefined) {
              expected = '';
            }
            var result = {};
            result.pass= util.contains(actual, expected, customEqualityTesters)
            if (result.pass) {
              result.pass = "Source Code Contain \"" + expected + "\"";
              result.message = "Expected " + actual + " to Contain " + expected + "";
            } else {
              result.message = "Source Code not  Contain \"" + expected + "\"";
            }
            return result;
          }
        };
      },
      toContainPdfFile: function (util, customEqualityTesters) {
        customEqualityTesters = customEqualityTesters || [];
        return {
          compare: function (actual, expected) {
            if (expected === undefined) {
              expected = '';
            }
            var result = {};
            result.pass= util.contains(actual, expected, customEqualityTesters)
            if (result.pass) {
              result.pass = "PDF file Contain \"" + expected + "\"";
              result.message = "Expected " + actual + " to Contain " + expected + "";
            } else {
              result.message = "PDF file not  Contain \"" + expected + "\"";
            }
            return result;
          }
        };
      },
      toContainIgnoreCase: function (util, customEqualityTesters) {
        customEqualityTesters = customEqualityTesters || [];
        return {
          compare: function (actual, expected) {
            if (expected === undefined) {
              expected = '';
            }
            var result = {};
            result.pass= util.contains(actual.toUpperCase().trim(), expected.toUpperCase().trim(), customEqualityTesters)
            if (result.pass) {
              result.pass = "Expected \"" + actual.toUpperCase().trim() + "\" to Contain \"" + expected.toUpperCase().trim() + "\" (ignoring cases sensitive)";
              result.message = "Expected " + actual.toUpperCase().trim() + " to Contain " + expected.toUpperCase().trim() + "";
            } else {
              result.message = "Expected " + actual.toUpperCase().trim() + ", but it is " + expected.toUpperCase().trim() + " (ignoring cases sensitive)";
            }
            return result;
          }
        };
      }

    };
  }

}
module.exports = new CustomMatcher();