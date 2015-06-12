
# Demo

---

## Normal usage

<link rel="stylesheet" type="text/css" href="./../src/style.css">
````html

<form id="JS_form">
	<span>
		<input type="text" data-valid="account" pattern="^[a-zA-Z]{4,8}$" data-alt="账号必须4-8个英文" data-hint="您已验证通过" value="" name="accountnumber" required placeholder="账号（限制4-8个英文）"/>
		<em class="validform-info"> 对账号做必填自定义验证</em>
	</span>
	<span>
		<input type="text" name="name" data-alt="姓名必须7-20个字符" min="7" max="20" required value="" placeholder="姓名"/>
		 
	</span>
	<span>
		<input type="text" data-valid="testcode" name="ctest" placeholder="测试码（非必填，限制3-8个数字）"/>
		 
	</span>
	<span>
		<input type="text" data-valid="phone" required name="phone" data-alt="固定电话格式不对020-1245656" value="" placeholder="固定电话"/>
		<em class="validform-info"> 内置验证电话号码</em>
	</span>
	<span>
		<input type="text" data-valid="mobile" required name="mobile" placeholder="手机号码" value=""/>
		 对手机号码做必填内置验证
	</span>
	<span>
		<input type="text" name="wechat" placeholder="微信账号"/>
		 对微信账号做动态验证的新增、移除
		<label><input type="checkbox" name="listencheckbox"/>required</label>
		<label><input type="checkbox" name="listencheckbox"/>data-valid</label>
	</span>
	<span>
		<button id="Jd_btn" type="button" >验证（from success）</button>
		<button id="Jd_btn_1" type="button" >验证（from verify）</button>
	</span>
	<span>
		<input type="text" data-valid="qq" name="qq_easy" pattern="^\d+$" placeholder="qq号码"/>
		<input type="text" placeholder="min" id="JS_min" style="width: 50px;"/>
		<input type="text" placeholder="max" id="JS_max" style="width: 50px;"/>
		 简单的对qq号码做验证
	</span>
	<span>
		<button id="Jd_btn_2" type="button" >使用验证规则对单一值进行验证</button>
	</span>
</from>
````

````javascript
var Validator = require('validator');
var validator = new Validator({
	id: "JS_form",
	custom: {
		testcode: function(val){
			return /^\d{3,8}$/.test(val)
		}
	}
});
validator.on("error", function(name, dom, alt){
	if( !!alt ){
		alert(alt);
		return false;
	}
	switch(name){
		case "name": alert("姓名必须7-20个字符"); break;
		case "ctest": alert("测试码必须是3-8个数字"); break;
		case "mobile": alert("手机号码格式不对：如13800138000"); break;
		case "accountnumber": alert("账号必须是4-8个字母"); break;
		case "url": alert("url必须是一个地址类型"); break;
		case "wechat": alert("非空或者是4-8个(数字加字母)"); break;
		default: alert(name+" error");
	}
});
validator.on("success", function(){
	alert("验证通过，来自validator.on.success");
});

document.getElementById("Jd_btn").onclick = function(){
	validator.verify();
}
document.getElementById("Jd_btn_1").onclick = function(){
	validator.verify(function(){
		alert("验证通过，来自validator.verify");
	});
}
var lc = document.querySelectorAll("input[name='listencheckbox']");
lc[0].onchange = function(){
	lc_fn()
}
lc[1].onchange = function(){
	lc_fn()
}
function lc_fn(){
	var wechat = document.querySelector('input[name="wechat"]');
	if( !!lc[0].checked ){
		wechat.setAttribute("required", "required");
	} else {
		wechat.removeAttribute("required");
	}
	if( !!lc[1].checked ){
		wechat.setAttribute("data-valid", "wechat");
		validator.emit("onvalid", "wechat", function(val,dom){
			return /^[a-zA-Z0-9]{4,8}$/.test(val);
		});
	} else {
		wechat.removeAttribute("data-valid");
		validator.emit("offvalid", "wechat");
	}
	alert("绑定成功");
}
document.getElementById("Jd_btn_2").onclick = function(){
	var qq = document.querySelector('input[name="qq_easy"]').value;
	var min = document.getElementById("JS_min").value;
	var max = document.getElementById("JS_max").value;
	alert('validator.is("qq",'+qq+','+min+','+max+')=' + validator.is("qq", qq, min, max ));
}
````