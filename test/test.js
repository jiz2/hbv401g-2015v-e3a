"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
var expect = require("chai").expect;
var assert = require('assert');
var should = require('chai').should();
//var index = require('./MainSite.js');
var search = require('./Search.js');
var result = require('./Result.js');

describe('search testing', function(){
	before(function(){
		result.programmes = undefined;
	});

	it('no programmes at start', function(){
		expect(result.programmes).to.equal(undefined);
    });
	
	it('search class exists', function(){
		expect(search).to.not.equal(undefined);
    });
	
	it('search can search', function(){
		sinon.assert.calledOnce(search.searchQuery());
    });
	
	after(function(){
		result.programmes = undefined;
	});
});