var expect = require('expect.js');
var Validator = require('validator');
// (function(){
// 	var div = document.createElement("div");
// 	div.id= 'JS_validform';
// 	var input = document.createElement("input");
// 	input.setAttribute("required", "required");
// }());
describe('validator', function() {


	
	it('Validator is a function', function() {
	  	expect(Validator).to.be.a('function');  // add this
	});

	var validator = new Validator();
	it('validator instance Validator', function(){
		
		expect(validator).to.be.an(Validator);
	});

	it('validator has 4 functions', function(){
		expect(validator.on).to.be.a('function');
		expect(validator.emit).to.be.a('function');
		expect(validator.verify).to.be.a('function');
		expect(validator.is).to.be.a('function');
	});

	it('validator.on, validator.verify return value is validator', function(){
		expect(validator.on('error')).to.be.an(Validator)
		expect(validator.on('success')).to.be.an(Validator)
		expect(validator.verify()).to.be.an(Validator)
	});
	

});