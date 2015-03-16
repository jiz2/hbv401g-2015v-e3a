"use strict";

chai.use(sinonChai);
var expect = chai.expect;
var assert = require('assert');
var should = chai.should();

var fs = require('fs');
var vm = require('vm');

var path = 'public/javascripts/Result.js';
var code = fs.readFileSync(path);
vm.runInThisContext(code);

path = 'public/javascripts/Search.js';
code = fs.readFileSync(path);
vm.runInThisContext(code);
//var resultFile = require("public/javascripts/Result.js");
//require('public/javascripts/MainSite.js');
//require('public/javascripts/Search.js');

describe('search testing', function(){
	before(function(){
		Result.programmes = [];
	});

	it('no programmes at start', function(){
		expect(Result.programmes.length).to.equal(0);
    });
	
	it('search works', function(){
		Search.searchQuery("test");
		console.log(Search);
		sinon.assert.calledOnce(console.log);
		expect(Result.programmes.length).to.not.equal(0);
    });
	
	after(function(){
		Result.programmes = [];
	});
});