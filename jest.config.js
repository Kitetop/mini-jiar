const esModules = ['lodash-es'].join('|');
const config = {
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testRegex: ".*.(test|spec).(j|t)s[x]?$",
  transform: {
    '^.+\\.jsx?$': 'babel-jest', //这个是jest的默认配置
    '^.+\\.tsx?$': 'ts-jest', //typescript转换
  },
  transformIgnorePatterns: [],
};

module.exports = config;
