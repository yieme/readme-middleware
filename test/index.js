var expect = require('chai').expect,
    readmeMiddleware

describe('readme-middleware', function() {
  it('should load', function(done) {
    readmeMiddleware = require('..')
    done()
  })

  var expected = ["hello", "world"]
  var expectedString = JSON.stringify(expected)
  it('should eaual ' + expectedString, function(done) {
    var test = readmeMiddleware(expected)
    var json = JSON.stringify(test)
    expect(json).to.equal(expectedString)
    done()
  })
})
