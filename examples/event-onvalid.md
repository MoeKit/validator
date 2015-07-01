# 绑定自定义校验事件

- order: 12
---
<link rel="stylesheet" type="text/css" href="./../src/style.css">

## onvalid事件绑定单个校验事件(动态绑定)

```html
<input type="text" name="account" data-valid="account" required placeholder="账号（必填）"/>
```

<div id="JS_form">
	<div class="form-item">
		<span class="type-name">账号：</span>
		<input type="text" name="account" data-valid="account" required placeholder="账号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_onvalid" type="button" value="绑定">绑定</button>	
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit" type="buttom" value="提交">提交</button>	
	</div>
</div>

````javascript
var errorTxt = "账号不能为空";
var Validator = require('validator');
var validate = new Validator({
	"id": "JS_form"
});
validate.on("success", function(){
	alert("验证通过");
});
validate.on("error", function(name){
	var text = name == "account" ? errorTxt : name+"不能为空";
	alert(text);
});

document.querySelector("#JS_onvalid").addEventListener("click", function(){
	validate.onvalid("account", function(val, dom){
		return /^[a-zA-Z0-9]{10,11}$/.test(val);
	}, function(){
		alert("account绑定成功");
		errorTxt = "账号必须是10-11个字母或数字";
	});
}, false);
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````

## 参数custom绑定多个校验事件(静态绑定，初始化时绑定)

```html
<input type="text" name="account" data-valid="account" required placeholder="账号（必填）"/>
<input type="text" name="password" data-valid="password" required placeholder="密码（必填）"/>
```

<div id="JS_form_1">
	<div class="form-item">
		<span class="type-name">账号：</span>
		<input type="text" name="account" data-valid="account" required placeholder="账号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">密码：</span>
		<input type="text" name="password" data-valid="password" required placeholder="密码（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit_1" type="button" value="提交">提交</button>	
	</div>
</div>

````javascript
var Validator = require('validator');
var validate = new Validator({
	"id": "JS_form_1",
	"custom": {
		"account": function(val, dom){
			return /^[a-zA-Z0-9]{4,8}$/.test(val);
		},
		"password": function(val, dom){
			return /^[a-zA-Z][a-zA-Z0-9]{3,7}$/.test(val);
		}
	}
}).on("success", function(){
	alert("验证通过");
}).on("error", function(name){
	var text = name == "account" ? "账号必须是4-8个字母或数字" : 
				name == "password" ? "密码必须是4-8个字母或数字且第1位字符必须是字母" : name+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_1").addEventListener("click", function(){
	validate.verify();
}, false);
````