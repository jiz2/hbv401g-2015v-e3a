describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      [1,2,4].indexOf(5).should.equal(-1);
      [1,2,4].indexOf(3).should.equal(-1);
      [1,2,4].indexOf(0).should.equal(-1);
    })
  })
})
