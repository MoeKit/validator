
# 内置规则 - 联系号码

- order: 4
---

> data-valid：校验规则名称，已有内置规则  

<link rel="stylesheet" type="text/css" href="./../src/style.css">


## 内置规则 - mobilephone
> `mobile`: 手机号码  
> `phone`: 固定电话  (020-89899291)
> `mobilephone`: 手机号码或者固定电话  

```html
<input type="text" name="mobile" data-valid="mobile" required placeholder="手机号码（必填）"/>
<input type="text" name="phone" data-valid="phone" required placeholder="固定电话（必填）"/>
<input type="text" name="mobilephone" data-valid="mobilephone" required placeholder="联系电话（必填）"/>
```

<div id="JS_form_2">
	<div class="form-item">
		<span class="type-name">手机号码：</span>
		<input type="text" name="mobile" data-valid="mobile" required placeholder="手机号码（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">固定电话：</span>
		<input type="text" name="phone" data-valid="phone" required placeholder="固定电话（必填）"/>
		<span class="type-view">exp: 020-89899291</span>
	</div>
	<div class="form-item">
		<span class="type-name">联系电话：</span>
		<input type="text" name="mobilephone" data-valid="mobilephone" required placeholder="联系电话（必填）"/>
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
validate.on("success", function(){
	alert("验证通过");
});
validate.on("error", function(type){
	var text = type == "mobile" ? "手机号码格式不对" :
				type == "phone" ? "固定电话格式不对" :
				type == "mobilephone" ? "联系电话格式不对" : type+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_2").addEventListener("click", function(){
	validate.verify();
}, false);
````
