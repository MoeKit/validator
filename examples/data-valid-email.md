
# 内置规则 - 邮箱

- order: 6
---

> data-valid：校验规则名称，已有内置规则  

<link rel="stylesheet" type="text/css" href="./../src/style.css">


## 内置规则 - email
> `email`: 邮箱  

```html
<input type="text" name="email" data-valid="email" required placeholder="邮箱（必填）"/>
```

<div id="JS_form_3">
	<div class="form-item">
		<span class="type-name">邮箱：</span>
		<input type="text" name="email" data-valid="email" required placeholder="邮箱（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit_3" type="button" value="提交">提交</button>	
	</div>
</div>

````javascript
var Validator = require('validator');
var validate = new Validator({
	"id": "JS_form_3"
});
validate.on("success", function(){
	alert("验证通过");
});
validate.on("error", function(type){
	var text = type == "email" ? "邮箱格式不对" : type+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_3").addEventListener("click", function(){
	validate.verify();
}, false);
````