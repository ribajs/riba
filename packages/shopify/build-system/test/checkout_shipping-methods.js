/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/camelcase */
const COUNTRY_CODES = [
  "AR",
  "AU",
  "AT",
  "BS",
  "BY",
  "BR",
  "BN",
  "KH",
  "CA",
  "CL",
  "CN",
  "CO",
  "CR",
  "HR",
  "CZ",
  "DK",
  "DO",
  "EC",
  "SV",
  "FI",
  "FR",
  "GE",
  "DE",
  "GR",
  "GP",
  "GT",
  "GY",
  "HT",
  "HN",
  "HU",
  "IN",
  "ID",
  "IQ",
  "IT",
  "JM",
  "JP",
  "KZ",
  "MY",
  "MX",
  "MZ",
  "NP",
  "NL",
  "NZ",
  "NG",
  "MP",
  "NO",
  "PK",
  "PA",
  "PE",
  "PH",
  "PL",
  "PT",
  "PR",
  "RU",
  "SM",
  "ZA",
  "ES",
  "LK",
  "SE",
  "CH",
  "TW",
  "TJ",
  "TH",
  "TT",
  "TR",
  "UA",
  "GB",
  "US",
  "VE",
  "VN",
];
const assert = require("assert");
require("../src/js/checkout_shipping-methods.js");
// Load all country codes
for (const COUNTRY_CODE of COUNTRY_CODES) {
  require(`../src/js/checkout_exclude-express-postalcodes_${COUNTRY_CODE}.js`);
}

// Disable debugging output
global.rfd.checkout.DEBUG = false;

const isPostalCodeInBlacklist = global.rfd.checkout.isPostalCodeInBlacklist;
const postalCodes = global.rfd.checkout.excludeExpressPostalcodes;

const shouldBeInBlacklist = function (country_code, zip, done) {
  const shippingAddress = {
    country_code,
    zip,
  };
  const isBlacklisted = isPostalCodeInBlacklist(shippingAddress, postalCodes);
  assert.ok(isBlacklisted);
  done();
};

const shouldNotBlacklist = function (country_code, zip, done) {
  const shippingAddress = {
    country_code,
    zip,
  };
  const isBlacklisted = isPostalCodeInBlacklist(shippingAddress, postalCodes);
  assert.ok(!isBlacklisted);
  done();
};

const contryShouldHaveBlacklistPostalCodes = function (country_code) {
  assert.ok(
    Array.isArray(postalCodes[country_code]) &&
      postalCodes[country_code].length > 0
  );
};

describe("utils", function () {
  it("should be globally defined", function () {
    assert.ok(
      global.rfd && global.rfd.utils && typeof global.rfd.utils === "object"
    );
  });

  describe("#getLastNumbers()", function () {
    it('should return the last numbers for "AB1CD2EF34"', function () {
      assert.strictEqual(global.rfd.utils.getLastNumbers("AB1CD2EF34"), 34);
    });
  });

  describe("#getFirstChars()", function () {
    it('should return the first characters for "AB1CD2EF34"', function () {
      assert.strictEqual(global.rfd.utils.getFirstChars("AB1CD2EF34"), "AB");
    });
  });
});

describe("checkout", function () {
  describe("excludeExpressPostalcodes", function () {
    it("should be globally defined", function () {
      assert.ok(
        global.rfd &&
          global.rfd.checkout &&
          typeof global.rfd.checkout.excludeExpressPostalcodes === "object"
      );
    });
  });

  describe("#checkBlacklistExpressPostalCodes()", function () {
    describe("Country code: DE", function () {
      const country_code = "DE";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      it('should blacklist postalcode "18562"', function (done) {
        shouldBeInBlacklist(country_code, "18562", done);
      });
      // 25846 - 25849
      it('should blacklist postalcode "25846"', function (done) {
        shouldBeInBlacklist(country_code, "25846", done);
      });
      it('should blacklist postalcode "25847"', function (done) {
        shouldBeInBlacklist(country_code, "25847", done);
      });
      it('should blacklist postalcode "25848"', function (done) {
        shouldBeInBlacklist(country_code, "25848", done);
      });
      it('should blacklist postalcode "25849"', function (done) {
        shouldBeInBlacklist(country_code, "25849", done);
      });

      it('should NOT blacklist postalcode "18560"', function (done) {
        shouldNotBlacklist(country_code, "18560", done);
      });
    });

    describe("Country code: FR", function () {
      const country_code = "FR";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      it('should blacklist postalcode "5142"', function (done) {
        shouldBeInBlacklist(country_code, "5142", done);
      });

      it('should NOT blacklist postalcode "6000"', function (done) {
        shouldNotBlacklist(country_code, "6000", done);
      });
    });

    describe("Country code: GB", function () {
      const country_code = "GB";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      it('should blacklist postalcode "AB44 1NP"', function (done) {
        shouldBeInBlacklist(country_code, "AB44 1NP", done);
      });
      it('should blacklist postalcode "AB45 1BB"', function (done) {
        shouldBeInBlacklist(country_code, "AB45 1BB", done);
      });
      it('should blacklist postalcode "ZE1 1AA"', function (done) {
        shouldBeInBlacklist(country_code, "ZE1 1AA", done);
      });
      it('should blacklist postalcode "ZE2 1BB"', function (done) {
        shouldBeInBlacklist(country_code, "ZE2 1BB", done);
      });
      it('should blacklist postalcode "ZE3 2CC"', function (done) {
        shouldBeInBlacklist(country_code, "ZE3 2CC", done);
      });
      it('should blacklist postalcode "LA1 5YA"', function (done) {
        shouldBeInBlacklist(country_code, "LA1 5YA", done);
      });
      it('should blacklist postalcode "TR2 5GA"', function (done) {
        shouldBeInBlacklist(country_code, "TR2 5GA", done);
      });

      it('should blacklist pseudo postalcode "ZE 123"', function (done) {
        shouldBeInBlacklist(country_code, "ZE 123", done);
      });
      it('should blacklist pseudo postalcode "ZE"', function (done) {
        shouldBeInBlacklist(country_code, "ZE", done);
      });

      it('should NOT blacklist postalcode "EC1A 1BB"', function (done) {
        shouldNotBlacklist(country_code, "EC1A 1BB", done);
      });
      it('should NOT blacklist postalcode "AB46 1BB"', function (done) {
        shouldNotBlacklist(country_code, "AB46 1BB", done);
      });
      it('should NOT blacklist postalcode "EC2A 4NE"', function (done) {
        shouldNotBlacklist(country_code, "EC2A 4NE", done);
      });

      it('should NOT blacklist pseudo postalcode "QZ32 123"', function (done) {
        shouldNotBlacklist(country_code, "QZ32 123", done);
      });
      it('should NOT blacklist pseudo postalcode "QZ 123"', function (done) {
        shouldNotBlacklist(country_code, "QZ 123", done);
      });
      it('should NOT blacklist pseudo postalcode "QZ 1BB"', function (done) {
        shouldNotBlacklist(country_code, "QZ 1BB", done);
      });
    });

    describe("Country code: NZ", function () {
      const country_code = "NZ";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      it('should blacklist postalcode "9891"', function (done) {
        shouldBeInBlacklist(country_code, "9891", done);
      });
      it('should blacklist postalcode "9892"', function (done) {
        shouldBeInBlacklist(country_code, "9892", done);
      });
      it('should blacklist postalcode "0170"', function (done) {
        shouldBeInBlacklist(country_code, "0170", done);
      });
      it('should blacklist postalcode "0171"', function (done) {
        shouldBeInBlacklist(country_code, "0171", done);
      });
      it('should blacklist postalcode "0172"', function (done) {
        shouldBeInBlacklist(country_code, "0172", done);
      });
      it('should blacklist postalcode "0173"', function (done) {
        shouldBeInBlacklist(country_code, "0173", done);
      });
      it('should blacklist postalcode "0174"', function (done) {
        shouldBeInBlacklist(country_code, "0174", done);
      });
      it('should blacklist postalcode "0175"', function (done) {
        shouldBeInBlacklist(country_code, "0175", done);
      });
      it('should blacklist postalcode "0176"', function (done) {
        shouldBeInBlacklist(country_code, "0176", done);
      });

      it('should blacklist pseudo postalcode "171"', function (done) {
        shouldBeInBlacklist(country_code, "171", done);
      });

      it('should NOT blacklist postalcode "0169"', function (done) {
        shouldNotBlacklist(country_code, "0169", done);
      });
      it('should NOT blacklist postalcode "9894"', function (done) {
        shouldNotBlacklist(country_code, "9894", done);
      });

      it('should NOT blacklist pseudo postalcode "169"', function (done) {
        shouldNotBlacklist(country_code, "169", done);
      });
    });

    describe("Country code: AU", function () {
      const country_code = "AU";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      it('should blacklist postalcode "0822"', function (done) {
        shouldBeInBlacklist(country_code, "0822", done);
      });
      it('should blacklist postalcode "2311"', function (done) {
        shouldBeInBlacklist(country_code, "2311", done);
      });
      it('should blacklist postalcode "4720"', function (done) {
        shouldBeInBlacklist(country_code, "4720", done);
      });

      // 845-847

      it('should blacklist postalcode "845"', function (done) {
        shouldBeInBlacklist(country_code, "845", done);
      });
      it('should blacklist postalcode "846"', function (done) {
        shouldBeInBlacklist(country_code, "846", done);
      });
      it('should blacklist postalcode "847"', function (done) {
        shouldBeInBlacklist(country_code, "847", done);
      });

      it('should NOT blacklist postalcode "0821"', function (done) {
        shouldNotBlacklist(country_code, "0821", done);
      });
      it('should NOT blacklist postalcode "2310"', function (done) {
        shouldNotBlacklist(country_code, "2310", done);
      });
      it('should NOT blacklist postalcode "6604"', function (done) {
        shouldNotBlacklist(country_code, "6604", done);
      });
    });

    describe("Country code: ES", function () {
      const country_code = "ES";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      // 1110-1169

      it('should blacklist postalcode "1110"', function (done) {
        shouldBeInBlacklist(country_code, "1110", done);
      });
      it('should blacklist postalcode "1111"', function (done) {
        shouldBeInBlacklist(country_code, "1111", done);
      });
      it('should blacklist postalcode "1112"', function (done) {
        shouldBeInBlacklist(country_code, "1112", done);
      });
      it('should blacklist postalcode "1113"', function (done) {
        shouldBeInBlacklist(country_code, "1113", done);
      });
      it('should blacklist postalcode "1114"', function (done) {
        shouldBeInBlacklist(country_code, "1114", done);
      });
      it('should blacklist postalcode "1115"', function (done) {
        shouldBeInBlacklist(country_code, "1115", done);
      });
      it('should blacklist postalcode "1116"', function (done) {
        shouldBeInBlacklist(country_code, "1116", done);
      });
      it('should blacklist postalcode "1117"', function (done) {
        shouldBeInBlacklist(country_code, "1117", done);
      });
      it('should blacklist postalcode "1118"', function (done) {
        shouldBeInBlacklist(country_code, "1118", done);
      });
      it('should blacklist postalcode "1119"', function (done) {
        shouldBeInBlacklist(country_code, "1119", done);
      });
      it('should blacklist postalcode "1120"', function (done) {
        shouldBeInBlacklist(country_code, "1120", done);
      });
      it('should blacklist postalcode "1121"', function (done) {
        shouldBeInBlacklist(country_code, "1121", done);
      });

      it('should NOT blacklist postalcode "1109"', function (done) {
        shouldNotBlacklist(country_code, "1109", done);
      });
      it('should NOT blacklist postalcode "1170"', function (done) {
        shouldNotBlacklist(country_code, "1170", done);
      });
    });

    describe("Country code: IT", function () {
      const country_code = "IT";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      it('should blacklist postalcode "00013"', function (done) {
        shouldBeInBlacklist(country_code, "00013", done);
      });
      it('should blacklist postalcode "04020"', function (done) {
        shouldBeInBlacklist(country_code, "04020", done);
      });
      it('should blacklist postalcode "04027"', function (done) {
        shouldBeInBlacklist(country_code, "04027", done);
      });
      it('should blacklist postalcode "06010"', function (done) {
        shouldBeInBlacklist(country_code, "06010", done);
      });
      it('should blacklist postalcode "06020"', function (done) {
        shouldBeInBlacklist(country_code, "06020", done);
      });

      it('should NOT blacklist postalcode "00014"', function (done) {
        shouldNotBlacklist(country_code, "00014", done);
      });
      it('should NOT blacklist postalcode "06019"', function (done) {
        shouldNotBlacklist(country_code, "06019", done);
      });
      it('should NOT blacklist postalcode "06021"', function (done) {
        shouldNotBlacklist(country_code, "06021", done);
      });
    });

    describe("Country code: US", function () {
      const country_code = "US";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      it('should blacklist postalcode "01033"', function (done) {
        shouldBeInBlacklist(country_code, "01033", done);
      });
      it('should blacklist postalcode "01035"', function (done) {
        shouldBeInBlacklist(country_code, "01035", done);
      });
      it('should blacklist postalcode "01036"', function (done) {
        shouldBeInBlacklist(country_code, "01036", done);
      });
      it('should blacklist postalcode "64840"', function (done) {
        shouldBeInBlacklist(country_code, "64840", done);
      });
      it('should blacklist postalcode "64842"', function (done) {
        shouldBeInBlacklist(country_code, "64842", done);
      });
      it('should blacklist postalcode "64843"', function (done) {
        shouldBeInBlacklist(country_code, "64843", done);
      });
      it('should blacklist postalcode "64844"', function (done) {
        shouldBeInBlacklist(country_code, "64844", done);
      });
      it('should blacklist postalcode "99401"', function (done) {
        shouldBeInBlacklist(country_code, "99401", done);
      });

      it('should NOT blacklist postalcode "99400"', function (done) {
        shouldNotBlacklist(country_code, "99400", done);
      });
      it('should NOT blacklist postalcode "99404"', function (done) {
        shouldNotBlacklist(country_code, "99404", done);
      });
    });

    describe("Country code: CA", function () {
      const country_code = "CA";

      it("should have blacklist postalcodes", function () {
        contryShouldHaveBlacklistPostalCodes(country_code);
      });

      // The chars D, F, I, O, Q and U are not used
      // A0A1A0 - A0J1V0 (1A0, 1B0, 1C0, 1E0, 1G0, 1H0, 1J0, 1K0, 1L0, 1M0, 1N0, 1P0, 1R0, 1S0, 1T0, 1V0)

      // (A0A)1A0 - (A0A)1V0
      it('should blacklist postalcode "A0A1A0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1A0", done);
      });
      it('should blacklist postalcode "A0A1B0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1B0", done);
      });
      it('should blacklist postalcode "A0A1C0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1C0", done);
      });
      it('should blacklist postalcode "A0A1E0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1E0", done);
      });
      it('should blacklist postalcode "A0A1G0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1G0", done);
      });
      it('should blacklist postalcode "A0A1H0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1H0", done);
      });
      it('should blacklist postalcode "A0A1J0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1J0", done);
      });
      it('should blacklist postalcode "A0A1K0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1K0", done);
      });
      it('should blacklist postalcode "A0A1L0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1L0", done);
      });
      it('should blacklist postalcode "A0A1M0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1M0", done);
      });
      it('should blacklist postalcode "A0A1N0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1N0", done);
      });
      it('should blacklist postalcode "A0A1P0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1P0", done);
      });
      it('should blacklist postalcode "A0A1R0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1R0", done);
      });
      it('should blacklist postalcode "A0A1S0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1S0", done);
      });
      it('should blacklist postalcode "A0A1T0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1T0", done);
      });
      it('should blacklist postalcode "A0A1V0"', function (done) {
        shouldBeInBlacklist(country_code, "A0A1V0", done);
      });

      // (A0B)1A0 - (A0B)1V0
      it('should blacklist postalcode "A0B1A0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1A0", done);
      });
      it('should blacklist postalcode "A0B1B0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1B0", done);
      });
      it('should blacklist postalcode "A0B1C0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1C0", done);
      });
      it('should blacklist postalcode "A0B1E0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1E0", done);
      });
      it('should blacklist postalcode "A0B1G0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1G0", done);
      });
      it('should blacklist postalcode "A0B1H0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1H0", done);
      });
      it('should blacklist postalcode "A0B1J0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1J0", done);
      });
      it('should blacklist postalcode "A0B1K0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1K0", done);
      });
      it('should blacklist postalcode "A0B1L0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1L0", done);
      });
      it('should blacklist postalcode "A0B1M0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1M0", done);
      });
      it('should blacklist postalcode "A0B1N0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1N0", done);
      });
      it('should blacklist postalcode "A0B1P0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1P0", done);
      });
      it('should blacklist postalcode "A0B1R0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1R0", done);
      });
      it('should blacklist postalcode "A0B1S0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1S0", done);
      });
      it('should blacklist postalcode "A0B1T0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1T0", done);
      });
      it('should blacklist postalcode "A0B1V0"', function (done) {
        shouldBeInBlacklist(country_code, "A0B1V0", done);
      });

      // > (A0A)1V0
      it('should NOT blacklist postalcode "A0A1W0"', function (done) {
        shouldNotBlacklist(country_code, "A0A1W0", done);
      });
      it('should NOT blacklist postalcode "A0A1X0"', function (done) {
        shouldNotBlacklist(country_code, "A0A1X0", done);
      });
      it('should NOT blacklist postalcode "A0A1Y0"', function (done) {
        shouldNotBlacklist(country_code, "A0A1Y0", done);
      });
      it('should NOT blacklist postalcode "A0A1Z0"', function (done) {
        shouldNotBlacklist(country_code, "A0A1Z0", done);
      });

      // A1K0A0 - A1K5A7

      it('should blacklist postalcode "A1K0A0"', function (done) {
        shouldBeInBlacklist(country_code, "A1K0A0", done);
      });

      it('should blacklist postalcode "A1K1A0"', function (done) {
        shouldBeInBlacklist(country_code, "A1K1A0", done);
      });

      it('should blacklist postalcode "A0N1A2"', function (done) {
        shouldBeInBlacklist(country_code, "A0N1A2", done);
      });

      it('should blacklist postalcode "A0N1A2"', function (done) {
        shouldBeInBlacklist(country_code, "A0N1A2", done);
      });
    });
  });
});
