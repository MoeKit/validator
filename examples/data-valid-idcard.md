
# 内置规则 - 身份证

- order: 8
---

> data-valid：校验规则名称，已有内置规则  

<link rel="stylesheet" type="text/css" href="./../src/style.css">


## 内置规则 - idcard
> `idcard`: 身份证  

```html
<input type="text" name="idcard" data-valid="idcard" required placeholder="身份证（必填）"/>
```

<div id="JS_form_3">
	<div class="form-item">
		<span class="type-name">身份证：</span>
		<input type="text" name="idcard" data-valid="idcard" required placeholder="身份证（必填）"/>
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
	var text = type == "idcard" ? "身份证格式不对" : type+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_3").addEventListener("click", function(){
	validate.verify();
}, false);
````