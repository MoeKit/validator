var expect = require('expect.js');
var $ = require("jquery");
var Validator = require('validator');
describe('validator', function() {

	it('参数为空', function() {
		var validator = new Validator();
	});

	it('参数是json格式且为空', function() {
		var validator = new Validator({});
	});
	it('参数是json, id = JS_validform', function() {
		var validator = new Validator({
			"id": "JS_validform"
		});
	});
	it('设置自定义验证事件', function() {
		var validator = new Validator({
			"custom": {
				"qq": "^\d{4,11}$"
			}
		});
	});
	it('设置校验失败时不自动获取焦点', function() {
		var validator = new Validator({
			"isFocus": false
		});
	});
	it('设置校验结果显示在类名中', function() {
		var validator = new Validator({
			"showOnClass": "validator-success-word"
		});
	});
	it('设置跳过校验过程，直接校验通过', function() {
		var validator = new Validator({
			"pass": true
		});
	});
	it('设置完整的参数,json格式', function() {
		var validator = new Validator({
			"id": "JS_validform",
			"custom": {
				"qq": "^\d{4,11}$"
			},
			"isFocus": false,
			"showOnClass": "validator-success-word",
			"pass": true
		});
	});
	it('开始校验表单', function() {
		new Validator().verify();
	});
	it('is事件直接校验', function() {
		expect(new Validator().is("number",1234)).to.be(true);
	});
	it('is事件直接校验，容错测试-参数为空', function() {
		expect(new Validator().is()).to.be(false);
	});
	it('is事件直接校验，容错测试-设置不存在校验类型', function() {
		expect(new Validator().is("fe")).to.be(false);
	});
	it('校验内置规则-number', function() {
		expect(new Validator().is("number", 20150702)).to.be(true);
		expect(new Validator().is("number", 20150702.2)).to.be(true);
		expect(new Validator().is("number", -20150702.2)).to.be(true);
		expect(new Validator().is("number", "string")).to.be(false);
		expect(new Validator().is("number", "string666")).to.be(false);
	});
	it('校验内置规则-int', function() {
		expect(new Validator().is("int", 20150702)).to.be(true);
		expect(new Validator().is("int", 20150702.2)).to.be(false);
	});
	it('校验内置规则-mobile', function() {
		expect(new Validator().is("mobile", 18620065910)).to.be(true);
		expect(new Validator().is("mobile", 12620065910)).to.be(false);
	});
	it('校验内置规则-phone', function() {
		expect(new Validator().is("phone", "020-89899291")).to.be(true);
		expect(new Validator().is("phone", "20-89899291")).to.be(false);
	});
	it('校验内置规则-mobilephone', function() {
		expect(new Validator().is("mobilephone", 18620065910)).to.be(true);
		expect(new Validator().is("mobilephone", "020-89899291")).to.be(true);
		expect(new Validator().is("mobilephone", 12220065910)).to.be(false);
		expect(new Validator().is("mobilephone", "20-8989929")).to.be(false);
	});
	it('校验内置规则-zipcode', function() {
		expect(new Validator().is("zipcode", 123456)).to.be(true);
		expect(new Validator().is("zipcode", 1234)).to.be(false);
	});
	it('校验内置规则-email', function() {
		expect(new Validator().is("email", "test1001@qq.com")).to.be(true);
		expect(new Validator().is("email", "test1001@qq")).to.be(false);
	});
	it('校验内置规则-date', function() {
		expect(new Validator().is("date", "2015-07-02")).to.be(true);
		expect(new Validator().is("date", "2015/07/02")).to.be(true);
		expect(new Validator().is("date", "2015+07-02")).to.be(false);
		expect(new Validator().is("date", "2015/07+02")).to.be(false);
	});
	it('校验内置规则-time', function() {
		expect(new Validator().is("time", "09:05:05")).to.be(true);
		expect(new Validator().is("time", "09:05-05")).to.be(false);
	});
	it('校验内置规则-datetime', function() {
		expect(new Validator().is("datetime", "2015-07-02 09:05:05")).to.be(true);
		expect(new Validator().is("datetime", "2015/07/02 09:05:05")).to.be(true);
		expect(new Validator().is("datetime", "2015+07+02 09:05:05")).to.be(false);
		expect(new Validator().is("datetime", "2015/07/02 09-05-05")).to.be(false);
	});
	it('校验内置规则-idcard', function() {
		expect(new Validator().is("idcard", 310000197308225797)).to.be(true);
		expect(new Validator().is("idcard", 414699080)).to.be(false);
	});
	it('校验内置规则-url', function() {
		expect(new Validator().is("url", "http://bbs.bozhong.com")).to.be(true);
		expect(new Validator().is("url", "iamurl")).to.be(false);
	});
	it('校验内置规则-wechatid', function() {
		expect(new Validator().is("wechatid", "a123456")).to.be(true);
		expect(new Validator().is("wechatid", "A1234w6")).to.be(true);
		expect(new Validator().is("wechatid", "a123_456")).to.be(true);
		expect(new Validator().is("wechatid", "a123-456")).to.be(true);
		expect(new Validator().is("wechatid", "a1_3-456")).to.be(true);
		expect(new Validator().is("wechatid", "123a567")).to.be(false);
		expect(new Validator().is("wechatid", "12-4567")).to.be(false);
		expect(new Validator().is("wechatid", "12345_7")).to.be(false);
	});
	it('设置并校验min,max规则', function() {
		$("body").append('<div id="JS_min_max" style="display: none;"><input type="text" name="account" min="3" max="7" value="12345" required /></div>');
		new Validator({
			"id": "JS_min_max"
		}).on("error", function(name) {
			expect(false).to.be(true);
		}).verify(function(){
			expect(true).to.be(true);
		});
		$("body").append('<div id="JS_min_max_1" style="display: none;"><input type="text" name="account" min="3" max="7" value="123456789" required /></div>');
		new Validator({
			"id": "JS_min_max_1"
		}).on("error", function(name) {
			expect(true).to.be(true);
		}).verify(function(){
			expect(false).to.be(true);
		});
	});
	it('设置并校验pattern规则', function() {
		$("body").append('<div id="JS_pattern" style="display: none;"><input type="text" name="account" data-valid="account" pattern="^[a-zA-Z0-9]{3,7}$" value="12345" required /></div>');
		new Validator({
			"id": "JS_pattern"
		}).on("error", function(name) {
			expect(false).to.be(true);
		}).verify(function(){
			expect(true).to.be(true);
		});
		$("body").append('<div id="JS_pattern_1" style="display: none;"><input type="text" name="account" data-valid="account" pattern="^[a-zA-Z0-9]{3,7}$" value="123456789" required /></div>');
		new Validator({
			"id": "JS_pattern_1"
		}).on("error", function(name) {
			expect(true).to.be(true);
		}).verify(function(){
			expect(false).to.be(true);
		});
	});

	it('绑定自定义校验事件', function() {
		new Validator().onvalid("qq", function(val, dom) {
			return /^\d{4,11}$/.test(val);
		});
	});
	it('校验自定义校验事件', function() {
		var validator = new Validator().onvalid("qq", function(val, dom) {
			return /^\d{4,11}$/.test(val);
		});
		expect(validator.is("qq", 414699080)).to.be(true);
		expect(validator.is("qq", 310000197308225797)).to.be(false);
		var validator_1 = new Validator({
			"custom": {
				"qq": function(val) {
					return /^\d{4,11}$/.test(val);
				}
			}
		});
		expect(validator_1.is("qq", "3344556677")).to.be(true);
		expect(validator_1.is("qq", "33445566778899001122")).to.be(false);
	});
	it('解绑校验事件并校验', function() {
		expect(new Validator().is("number", 1234)).to.be(true);
		expect(new Validator().offvalid("number").is("number", 1234)).to.be(false);
	});
	it('设置校验通过回调', function() {
		new Validator().on("success", function() {});
	});
	it('设置校验通过回调', function() {
		new Validator().on("error", function() {});
	});
	it('触发校验通过的回调事件', function() {
		$("body").append('<div id="JS_trigger_success" style="display: none;"></div>');
		new Validator({
			"id": "JS_trigger_success"
		}).on("success", function() {
			expect(true).to.be(true);
		}).on("error", function() {
			expect(false).to.be(true);
		}).verify();
	});
	it('触发校验失败的回调事件', function() {
		$("body").append('<div id="JS_trigger_error" style="display: none;"><input name="test" required /></div>');
		new Validator({
			"id": "JS_trigger_error"
		}).on("success", function() {
			expect(false).to.be(true);
		}).on("error", function() {
			expect(true).to.be(true);
		}).verify();
	});
	it('使用链式事件', function() {
		new Validator()
			.onvalid("qq", function() {
				return true;
			})
			.offvalid("int")
			.on("success", function() {})
			.on("error", function() {})
			.verify()
			.is("number", 1234);
	});
});