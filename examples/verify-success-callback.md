# 校验成功回调

- order: 11
---

<link rel="stylesheet" type="text/css" href="./../src/style.css">
> 利用on事件绑定`success`事件
> 利用verify事件的参数做回调事件

## 校验成功回调 - success

```html
<input type="text" name="account" required placeholder="账号（必填）"/>
```

<div id="JS_form">
	<div class="form-item">
		<span class="type-name">账号：</span>
		<input type="text" name="account" required placeholder="账号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit" type="button" value="提交">提交</button>	
	</div>
</div>

````javascript
var Validator = require('validator');
var validate = new Validator({
	"id": "JS_form"
});
validate.on("success", function(){
	alert("我在on.success验证通过");
});
validate.on("error", function(name){
	var text = name == "account" ? "账号是必填的" : name+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````


## 校验成功回调 - verify

```html
<input type="text" name="account" required placeholder="账号（必填）"/>
```

<div id="JS_form_1">
	<div class="form-item">
		<span class="type-name">账号：</span>
		<input type="text" name="account" required placeholder="账号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit_1" type="button" value="提交">提交</button>	
	</div>
</div>

````javascript
var Validator = require('validator');
var validate = new Validator({
	"id": "JS_form_1"
});
validate.on("success", function(){
	alert("我在on.success验证通过");
});
validate.on("error", function(name){
	var text = name == "account" ? "账号是必填的" : name+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_1").addEventListener("click", function(){
	validate.verify(function(){
		alert("我在verify验证通过了");
	});
}, false);
````


## 校验成功回调 - data-hint
> 校验成功并且存在校验元素的兄弟`validator-info`类名时，属性`data-hint`的值会返回给`validator-info`类

```html
<input type="text" name="account" required placeholder="账号（必填）"/>
<span class="validator-info"></span>
```

<div id="JS_form_2">
	<div class="form-item">
		<span class="type-name">账号：</span>
		<input type="text" name="account" data-hint="通过data-hint来显示校验通过" required placeholder="账号（必填）"/>
		<span class="type-view validator-info"></span>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit_2" type="button" value="提交">提交</button>	
	</div>
</div>

````javascript
var Validator = require('validator');
var validate = new Validator({
	"id": "JS_form_2"
});
validate.on("error", function(name){
	var text = name == "account" ? "账号是必填的" : name+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_2").addEventListener("click", function(){
	validate.verify();
}, false);
````



