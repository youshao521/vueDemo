import {
  parseTimezoneString,
  toTimezoneString,
} from '../../src/utils';

describe('utils', () => {
  it('parseTimezoneString', () => {
    expect(+parseTimezoneString('2017-06-06 09:00:00.000+08:00')).to.equal(1496710800000);
    expect(+parseTimezoneString('2017-06-06 01:00:00.000Z')).to.equal(1496710800000);
    expect(+parseTimezoneString('2017-06-06 00:00:00.000-01:00')).to.equal(1496710800000);
  });

  it('toTimezoneString', () => {
    expect(toTimezoneString('heyu')).to.equal('');
    expect(toTimezoneString(1496710800000)).to.equal('2017-06-06T09:00:00.000+08:00');
  });
});
