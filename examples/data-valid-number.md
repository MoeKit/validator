
# 内置规则 - 数字

- order: 3
---

> data-valid：校验规则名称，已有内置规则  

<link rel="stylesheet" type="text/css" href="./../src/style.css">


## 内置规则 - number
> `number`: 数字，可以是整数，也可以是浮点数，也可以是负数

```html
<input type="text" name="price" data-valid="number" required placeholder="价格（必填）"/>
```

<div id="JS_form">
	<div class="form-item">
		<span class="type-name">QQ号码：</span>
		<input type="text" name="price" data-valid="number" required placeholder="价格（必填）"/>
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
	var text = type == "price" ? "价格必须是数字" : type+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````


## 内置规则 - int
> `int`: 只能是整数

```html
<input type="text" name="qq" data-valid="int" required placeholder="QQ号码（必填）"/>
```

<div id="JS_form_1">
	<div class="form-item">
		<span class="type-name">QQ号码：</span>
		<input type="text" name="qq" data-valid="number" required placeholder="QQ号码（必填）"/>
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
	var text = type == "qq" ? "qq必须是数字" : type+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_1").addEventListener("click", function(){
	validate.verify();
}, false);
````