"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
var expect = chai.expect;
chai.use(sinonChai);

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
	  //Test numbers that are indeed not members ef [1,2,4]
	  [0,3,5].map(function(n) {
		  [1,2,4].indexOf(n).should.equal(-1);
      });
    });
  })
})
