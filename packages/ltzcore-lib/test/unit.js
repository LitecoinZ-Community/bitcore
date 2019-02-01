'use strict';

var should = require('chai').should();
var expect = require('chai').expect;

var bitcore = require('..');
var errors = bitcore.errors;
var Unit = bitcore.Unit;

describe('Unit', function() {

  it('can be created from a number and unit', function() {
    expect(function() {
      return new Unit(1.2, 'LTZ');
    }).to.not.throw();
  });

  it('can be created from a number and exchange rate', function() {
    expect(function() {
      return new Unit(1.2, 350);
    }).to.not.throw();
  });

  it('no "new" is required for creating an instance', function() {
    expect(function() {
      return Unit(1.2, 'LTZ');
    }).to.not.throw();

    expect(function() {
      return Unit(1.2, 350);
    }).to.not.throw();
  });

  it('has property accesors "LTZ", "mLTZ", "uLTZ", "bits", and "satoshis"', function() {
    var unit = new Unit(1.2, 'LTZ');
    unit.LTZ.should.equal(1.2);
    unit.mLTZ.should.equal(1200);
    unit.uLTZ.should.equal(1200000);
    unit.bits.should.equal(1200000);
    unit.satoshis.should.equal(120000000);
  });

  it('a string amount is allowed', function() {
    var unit;

    unit = Unit.fromLTZ('1.00001');
    unit.LTZ.should.equal(1.00001);

    unit = Unit.fromMilis('1.00001');
    unit.mLTZ.should.equal(1.00001);

    unit = Unit.fromMillis('1.00001');
    unit.mLTZ.should.equal(1.00001);

    unit = Unit.fromBits('100');
    unit.bits.should.equal(100);

    unit = Unit.fromSatoshis('8999');
    unit.satoshis.should.equal(8999);

    unit = Unit.fromFiat('43', 350);
    unit.LTZ.should.equal(0.12285714);
  });

  it('should have constructor helpers', function() {
    var unit;

    unit = Unit.fromLTZ(1.00001);
    unit.LTZ.should.equal(1.00001);

    unit = Unit.fromMilis(1.00001);
    unit.mLTZ.should.equal(1.00001);

    unit = Unit.fromBits(100);
    unit.bits.should.equal(100);

    unit = Unit.fromSatoshis(8999);
    unit.satoshis.should.equal(8999);

    unit = Unit.fromFiat(43, 350);
    unit.LTZ.should.equal(0.12285714);
  });

  it('converts to satoshis correctly', function() {
    /* jshint maxstatements: 25 */
    var unit;

    unit = Unit.fromLTZ(1.3);
    unit.mLTZ.should.equal(1300);
    unit.bits.should.equal(1300000);
    unit.satoshis.should.equal(130000000);

    unit = Unit.fromMilis(1.3);
    unit.LTZ.should.equal(0.0013);
    unit.bits.should.equal(1300);
    unit.satoshis.should.equal(130000);

    unit = Unit.fromBits(1.3);
    unit.LTZ.should.equal(0.0000013);
    unit.mLTZ.should.equal(0.0013);
    unit.satoshis.should.equal(130);

    unit = Unit.fromSatoshis(3);
    unit.LTZ.should.equal(0.00000003);
    unit.mLTZ.should.equal(0.00003);
    unit.bits.should.equal(0.03);
  });

  it('takes into account floating point problems', function() {
    var unit = Unit.fromLTZ(0.00000003);
    unit.mLTZ.should.equal(0.00003);
    unit.bits.should.equal(0.03);
    unit.satoshis.should.equal(3);
  });

  it('exposes unit codes', function() {
    should.exist(Unit.LTZ);
    Unit.LTZ.should.equal('LTZ');

    should.exist(Unit.mLTZ);
    Unit.mLTZ.should.equal('mLTZ');

    should.exist(Unit.bits);
    Unit.bits.should.equal('bits');

    should.exist(Unit.satoshis);
    Unit.satoshis.should.equal('satoshis');
  });

  it('exposes a method that converts to different units', function() {
    var unit = new Unit(1.3, 'LTZ');
    unit.to(Unit.LTZ).should.equal(unit.LTZ);
    unit.to(Unit.mLTZ).should.equal(unit.mLTZ);
    unit.to(Unit.bits).should.equal(unit.bits);
    unit.to(Unit.satoshis).should.equal(unit.satoshis);
  });

  it('exposes shorthand conversion methods', function() {
    var unit = new Unit(1.3, 'LTZ');
    unit.toLTZ().should.equal(unit.LTZ);
    unit.toMilis().should.equal(unit.mLTZ);
    unit.toMillis().should.equal(unit.mLTZ);
    unit.toBits().should.equal(unit.bits);
    unit.toSatoshis().should.equal(unit.satoshis);
  });

  it('can convert to fiat', function() {
    var unit = new Unit(1.3, 350);
    unit.atRate(350).should.equal(1.3);
    unit.to(350).should.equal(1.3);

    unit = Unit.fromLTZ(0.0123);
    unit.atRate(10).should.equal(0.12);
  });

  it('toString works as expected', function() {
    var unit = new Unit(1.3, 'LTZ');
    should.exist(unit.toString);
    unit.toString().should.be.a('string');
  });

  it('can be imported and exported from/to JSON', function() {
    var json = JSON.stringify({amount:1.3, code:'LTZ'});
    var unit = Unit.fromObject(JSON.parse(json));
    JSON.stringify(unit).should.deep.equal(json);
  });

  it('importing from invalid JSON fails quickly', function() {
    expect(function() {
      return Unit.fromJSON('¹');
    }).to.throw();
  });

  it('inspect method displays nicely', function() {
    var unit = new Unit(1.3, 'LTZ');
    unit.inspect().should.equal('<Unit: 130000000 satoshis>');
  });

  it('fails when the unit is not recognized', function() {
    expect(function() {
      return new Unit(100, 'USD');
    }).to.throw(errors.Unit.UnknownCode);
    expect(function() {
      return new Unit(100, 'LTZ').to('USD');
    }).to.throw(errors.Unit.UnknownCode);
  });

  it('fails when the exchange rate is invalid', function() {
    expect(function() {
      return new Unit(100, -123);
    }).to.throw(errors.Unit.InvalidRate);
    expect(function() {
      return new Unit(100, 'LTZ').atRate(-123);
    }).to.throw(errors.Unit.InvalidRate);
  });

});
