"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
var expect = require("chai").expect;
var assert = require('assert');
var should = require('chai').should();
//require('./MainSite.js');
//require('./Search.js');
var result = require('./Result.js');

describe('search testing', function(){
	before(function(){
		var r = result.get(result);
	});

	it('no programmes at start', function(){
		expect(result.programmes).to.equal(undefined);
    });
	
	after(function(){
		result.programmes = undefined;
	});
});