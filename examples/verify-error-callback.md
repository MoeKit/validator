# 校验失败回调

- order: 10
---

<link rel="stylesheet" type="text/css" href="./../src/style.css">
> 利用on事件绑定`error`事件，事件带`name`, `dom`, `alt`参数( `alt`对应`data-alt`属性 )  


## 校验失败回调 - name
> 利用`name`参数自定义校验失败处理机制

```html
<input type="text" name="url" data-valid="url" required placeholder="网址（必填）"/>
```

<div id="JS_form">
	<div class="form-item">
		<span class="type-name">网址：</span>
		<input type="text" name="url" data-valid="url" required placeholder="网址（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit" type="buttom" value="提交">提交</button>	
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
validate.on("error", function(name){
	var text = name == "url" ? "网址格式不对" : name+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````


## 校验失败回调 - alt
> 校验失败时，属性`data-alt`的值会返回给error事件中的alt参数

```html
<input type="text" name="url" data-valid="url" data-alt="网址千万要正确~" required placeholder="网址（必填）"/>
```

<div id="JS_form_1">
	<div class="form-item">
		<span class="type-name">网址：</span>
		<input type="text" name="url" data-valid="url" data-alt="网址千万要正确~" required placeholder="网址（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name"></span>
		<button class="demo-btn" id="JS_submit_1" type="buttom" value="提交">提交</button>	
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
validate.on("error", function(name, dom, alt){
	alert(alt);
});
document.querySelector("#JS_submit_1").addEventListener("click", function(){
	validate.verify();
}, false);
````


## 校验失败回调 - validator-info
> 校验失败并且存在校验元素的兄弟`validator-info`类名时，则error事件失效，同时属性`data-alt`的值会返回给`validator-info`类

```html
<input type="text" name="url" data-valid="url" data-alt="网址一定要100%正确哦~" required placeholder="网址（必填）"/>
<span class="validator-info"></span>
```

<div id="JS_form_2">
	<div class="form-item">
		<span class="type-name">网址：</span>
		<input type="text" name="url" data-valid="url" data-alt="网址一定要100%正确哦~" required placeholder="网址（必填）"/>
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
validate.on("success", function(){
	alert("验证通过");
});
validate.on("error", function(name, dom, alt){
	alert(alt);
});
document.querySelector("#JS_submit_2").addEventListener("click", function(){
	validate.verify();
}, false);
````

