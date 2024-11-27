import {generateRandomProgress, generateRandomTime} from './loadingBarUtils';

describe('Random Value Generators', () => {
  it('generateRandomProgress should return a value between 10 and 39', () => {
    const result = generateRandomProgress();
    expect(result).toBeGreaterThanOrEqual(10);
    expect(result).toBeLessThanOrEqual(39);
  });

  it('generateRandomTime should return a value between 100 and 399', () => {
    const result = generateRandomTime();
    expect(result).toBeGreaterThanOrEqual(100);
    expect(result).toBeLessThanOrEqual(399);
  });
});
