# 解绑校验事件

- order: 14
---
<link rel="stylesheet" type="text/css" href="./../src/style.css">

## offvalid事件解绑校验事件(动态解绑)

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
		<button class="demo-btn" id="JS_offvalid" type="button" value="解绑">解绑</button>	
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit" type="button" value="提交">提交</button>	
	</div>
</div>

````javascript
var Validator = require('validator');
var validate = new Validator({
	"id": "JS_form",
	"custom": {
		"account": function(val, dom){
			return /^[a-zA-Z0-9]{4,8}$/.test(val);
		}
	}
});
validate.on("success", function(){
	alert("验证通过");
});
validate.on("error", function(name){
	var text = name == "account" ? "账号必须是4-8个字母或数字" : name+"不能为空";
	alert(text);
});
document.querySelector("#JS_offvalid").addEventListener("click", function(){
	validate.offvalid("account", function(){
		alert("account解绑成功");
	});
}, false);
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````
