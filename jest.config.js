module.exports = {
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "verbose": true,
  "transform": {
     "^.+\\.js$": "<rootDir>/jest.transform.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.jsx?$",
  "moduleFileExtensions": ["js", "json", "jsx"],
  "moduleNameMapper":{
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "coverageThreshold": {
      "global": {
          "branches": 30,
          "functions": 90,
          "lines": 90,
          "statements": 90
      }
  },
  setupFilesAfterEnv: ['./rtl.setup.js']
}