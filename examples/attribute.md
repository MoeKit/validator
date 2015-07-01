
# 表单属性验证

- order: 2
---

> 校验规则通过表单属性来校验  

<link rel="stylesheet" type="text/css" href="./../src/style.css">

## 一、min、max（中文算两个字符）

> 属性`min`: 最小长度校验  
> 属性`max`: 最大长度校验  

```html
<input type="text" name="student_id" min="8" required placeholder="学号（必填）"/>
<input type="text" name="card_id" max="2" required placeholder="工号（必填）"/>
<input type="text" name="coupon" min="4" max="10" required placeholder="优惠券（必填）"/>
```

<div id="JS_form">
	<div class="form-item">
		<span class="type-name">学号：</span>
		<input type="text" name="student_id" min="8" required placeholder="学号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">工号：</span>
		<input type="text" name="card_id" max="2" required placeholder="工号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">优惠券：</span>
		<input type="text" name="coupon" min="4" max="10" required placeholder="优惠券（必填）"/>
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
	alert("验证通过");
});
validate.on("error", function(type){
	var text = type == "student_id" ? "学号至少是8个字符" :
				type == "card_id" ? "工号不能为空且最多是2个字符" : "优惠券必须是4-10个字符";
	alert(text);
});
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````


## 二、data-valid与pattern

> 属性`data-valid`: 定义校验规则的名称（内置规则请看另外demo）  
> 属性`pattern`: 定义正则校验规则（前提条件：必须存在data-valid属性）  

```html
<input type="text" name="account" data-valid="account" pattern="^[a-zA-Z0-9]{4,8}$" required placeholder="账号（必填）"/>
<input type="text" name="password" pattern="^[a-zA-Z0-9]{3,7}$" required placeholder="密码（非必填）"/>
```
<div id="JS_form_1">
	<div class="form-item">
		<span class="type-name">账号：</span>
		<input type="text" name="account" data-valid="account" pattern="^[a-zA-Z0-9]{4,8}$" required placeholder="账号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">工号：</span>
		<input type="text" name="password" pattern="^[a-zA-Z0-9]{3,7}$" required placeholder="密码（必填）"/>
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
	alert("验证通过");
});
validate.on("error", function(type){
	var text = type == "account" ? "账号必须是4-8个字母或数字" : 
				type == "password" ? "密码不能为空" : "";
	alert(text);
});
document.querySelector("#JS_submit_1").addEventListener("click", function(){
	validate.verify();
}, false);
````


