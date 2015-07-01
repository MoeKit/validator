
# 基本用法

- order: 1
---

> 存在`name`或者`data-valid`属性时，此元素需要则做查询  
> `required`属性用于必填校验, 无定义校验规则时默认非空校验


```html
<input type="text" name="account" required placeholder="账号（不能为空）"/>
<input type="text" name="password" placeholder="密码（可以为空）"/>
```

<link rel="stylesheet" type="text/css" href="./../src/style.css">
<div id="JS_form">
	<div class="form-item">
		<span class="type-name">账号：</span>
		<input type="text" name="account" required placeholder="账号（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">密码：</span>
		<input type="text" name="password" placeholder="密码（非必填）"/>
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
	alert(type+"不能为空");
});
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````


