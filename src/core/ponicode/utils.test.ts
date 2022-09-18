import * as utils from '../utils';
// @ponicode
describe('utils.isEmpty', () => {
  test('undefined', () => {
    const result = utils.isEmpty(undefined);
    expect(result).toBe(true);
  });

  test('null', () => {
    const result = utils.isEmpty(null);
    expect(result).toBe(true);
  });

  test('[]', () => {
    const result: boolean = utils.isEmpty([]);
    expect(result).toBe(true);
  });

  test('{}', () => {
    const result = utils.isEmpty({});
    expect(result).toBe(true);
  });

  test(`''`, () => {
    const result = utils.isEmpty('');
    expect(result).toBe(true);
  });

  test(`' '`, () => {
    const result = utils.isEmpty(' ');
    expect(result).toBe(false);
  });

  test('0', () => {
    const result = utils.isEmpty(0);
    expect(result).toBe(false);
  });

  test(`"0"`, () => {
    const result = utils.isEmpty('0');
    expect(result).toBe(false);
  });
});
