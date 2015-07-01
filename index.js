"use strict";
var Events = require('eventor');
var Validator = function(option){
	return this.init(option)
}
Events.mixTo(Validator)
Validator.prototype.init = function(option){
	var _this = this
	option = option || {}
	this.id = option.id || ''
	this.dom = document.getElementById(this.id) || document
	this.validator = this.dom.querySelectorAll('[data-valid], [name]')
	this.custom = {}
	this.showOnClass = option.showOnClass || "validator-info"
	this.pass = option.pass || false
	this.isFocus = option.isFocus || true
	this.reg = {
		number: /^-?\d+(\.\d+)?$/, // 数字 22, 22.2 => true; 22. => false;
		int: /^-?\d+$/, // 整数
		mobile: /^1[3,4,5,7,8][0-9]{9}$/, // 手机号码 13800138000
		phone: /^((\d{3}|\d{4})-(\d{7}|\d{8}))|((\d{3}|\d{4})-(\d{7}|\d{8})-\d{4})$/, // 电话号码 020-34343434
		mobilephone: /^(1[3,4,5,7,8][0-9]{9})|((\d{3}|\d{4})-(\d{7}|\d{8}))|((\d{3}|\d{4})-(\d{7}|\d{8})-\d{4})$/,
		zipcode: /^[1-9]\d{5}(?!\d)$/, // 邮政编码 560310
		email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, // 邮箱 123456@qq.com
		date: /^(19\d{2}|2\d{3})[-\/](0[0-9]|1[0-2])[-\/]([0-2][0-9]|3[0-1])$/, // 日期-年月日 2015-02-03 2015/02/03
		time: /^(([0-1][0-9])|(2[0-3]))(:[0-5][0-9]){1,2}$/, // 日期-时分秒 12:50 12:50:23
		datetime: /^(19\d{2}|2\d{3})[-\/](0[0-9]|1[0-2])[-\/]([0-2][0-9]|3[0-1])\s([0-1][0-9]|2[0-3])(:[0-5][0-9]){1,2}$/,
		idcard: /^\d{18}|(\d{17}(\d|X|x))$/, // 只允许18位的身份证
		url: /^((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#]?)$/
	}
	// reg转为custom 
	for( var i in _this.reg ){
		_this.custom[i] = (function(){
			var key = i;
			return function(val, dom){ return _this.reg[key].test(val) }
		}())
	}
	// 初始化参数custom存入custom
	if( option.custom instanceof Object ){
		for( var i in option.custom ){
			this.custom[i] = option.custom[i];
		}
	}
	// pattern存入type并转为custom
	var pattern = this.dom.querySelectorAll('[pattern]');
	for(var i=0; i<pattern.length; i++){
		var type = pattern[i].getAttribute("data-valid");
		if( !!type ){
			this.reg[type] = new RegExp(pattern[i].getAttribute("pattern"));
			this.custom[type] = (function(){
				var key = type;
				return function(val, dom){ return _this.reg[key].test(val) }
			}())
		}
	}
	// 收集自定义事件
	// this.on("onvalid", function(_Type, cb){
	// 	_this.custom[_Type] = cb
	// });
	// this.on("offvalid", function(_Type){
	// 	_this.custom[_Type] && delete _this.custom[_Type]
	// });

	// for( var i=0; i<_this.validator.length; i++ ){
	// 	_this.validator[i].addEventListener("blur",function(){
	// 		_this.verifyOne(this,false);
	// 	},false);
	// }
	this.eventListener();
	return this
}
// 如果存在兄弟类名showOnClass，则获取焦点时移除showOnClass的值
Validator.prototype.eventListener = function(){
	var _this = this;
	for( var i=0; i<=_this.validator.length-1; i++ ){
		if( (!!_this.validator[i].getAttribute("data-alt") || !!_this.validator[i].getAttribute("data-hint")) 
				&& !!_this.validator[i].parentNode.querySelector("."+_this.showOnClass) ){
			_this.validator[i].ind = i;
			_this.validator[i].addEventListener("focus", function(){
				_this.validator[this.ind].parentNode.querySelector("."+_this.showOnClass).innerText = "";
			}, false);
		}
	}
	return _this;
}
// 收集自定义事件
Validator.prototype.onvalid = function(_Type, cb, cb1){
	this.custom[_Type] = cb;
	this.custom[_Type] && cb1 && cb1();
	return this;
}
// 移除自定义事件
Validator.prototype.offvalid = function(_Type, cb){
	this.custom[_Type] && delete this.custom[_Type] && cb && cb();
	return this;
}
Validator.prototype.verify = function(cb, bool){
	try{
		var _this = this;
		for( var i=0; i<=_this.validator.length; i++ ){
			// 验证直至最后一个没有异常退出，证明验证通过，执行success
			if( i == _this.validator.length || bool === true || _this.pass === true ){
				!!cb ? cb() : _this.emit("success")
				break
			}
			if( _this.verifyOne( _this.validator[i], true ) ){
				break
			}
		}
		return _this;
	} catch(err){
		throw err;
	}
}
// 对每一个表单元素进行验证
Validator.prototype.verifyOne = function(verify_dom, isFocus){
	var _this = this;
	// 是否需要验证
	var _Required = verify_dom.getAttribute("required")
	var _Required = _Required === "" ? "required" : _Required;
	// 验证类型
	var _Type = verify_dom.getAttribute("data-valid")
	// 验证便签字段
	var _Field = verify_dom.getAttribute("name") || "name"
	// 验证的值
	var _Val = verify_dom.value;
	// 验证的值的最小长度
	var _Min = verify_dom.getAttribute("min")
	// 验证的值的最大长度
	var _Max = verify_dom.getAttribute("max")
	// 验证失败显示的文案
	var _Alt = verify_dom.getAttribute("data-alt")
	// 验证成功显示的文案
	var _Hint = verify_dom.getAttribute("data-hint")
	// 自定义正则验证
	var _Pattern = verify_dom.getAttribute("pattern")

	/*
	 * 表单验证不通过的条件，如下：
	 */
	var dom = verify_dom.parentNode.querySelectorAll("."+_this.showOnClass);
	if( (!!_Required || !!_Val) && !_this.requiredVerify(_Type, _Val, _Min, _Max, verify_dom) ){
		
		if( !!_Alt ){
			if( dom.length > 0 && !!dom[0] ){
				dom[0].raw = (dom[0].raw === "" || (!!dom[0].raw && dom[0].raw.length>0)) ? dom[0].raw : dom[0].innerText;
				dom[0].innerText = _Alt;
			} else {
				_this.emit("error", _Field, verify_dom, _Alt)
				if( _this.isFocus === true && isFocus === true ){ verify_dom.focus() }
			}
		} else {
			_this.emit("error", _Field, verify_dom) 
			if( _this.isFocus === true && isFocus === true ){ verify_dom.focus() }
		}
		return true
	} else {
		if( dom.length > 0 && !!dom[0] ){
			dom[0].raw = !!dom[0].raw ? dom[0].raw : dom[0].innerText;
			dom[0].innerText = _Hint || (dom[0].raw || "");
		}
	}
	return false
}
Validator.prototype.requiredVerify = function(type, val, min, max, dom){
	if( !!type && !!this.custom[type] ){
		if( !!this.custom[type](val, dom) ){
			return isBelongRange(val,min,max) ? true : false;
		} else return false;
	} else {
		if( !!val ){
			return isBelongRange(val,min,max) ? true : false;
		} else return false;
	}
	function isBelongRange(val, min, max){
		if( !min && !max ) return true;
		val = val.replace(/[^\x00-\xff]/g,"**");
		console.log( val.length,min,max, val.length<=max );
		return (!!min && !!max ? (val.length>=min && val.length<=max?true: false) : ((!!min&&val.length>=min) || (!!max&&val.length<=max)?true: false) )
	}
}
Validator.prototype.is = function(type, val, min, max, dom){
	if( !this.custom[type] ){
		console.log(type+"对应的验证规则不存在");
		return false;
	}
	return this.requiredVerify(type, val, min, max, dom);
}
module.exports = Validator