import {vi} from 'vitest';

import {getTimezoneCity} from './overviewMapUtils';

describe('OverviewMapUtils', () => {
  beforeAll(() => {
    Object.defineProperty(navigator, 'language', {
      value: 'en-IE',
      configurable: true,
    });
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      locale: 'en-IE',
      timeZone: 'Europe/Dublin',
      calendar: '',
      numberingSystem: '',
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('retrieves the city name from the timezone string', () => {
    expect(getTimezoneCity()).toEqual('Dublin');
  });
});
