
# 非表单元素

- order: 3
---

<link rel="stylesheet" type="text/css" href="./../src/style.css">

## 校验非表单元素
非表单元素必须增加type="form"属性才能模拟表单元素

```html
<div class="simulate-input" id="JS_btnTest" name="myname" value="" type="form" required>(不可编辑)点击我更改状态</div>
```

<div id="JS_form">
	<div class="form-item">
		<span class="type-name">状态：</span>
		<div class="simulate-input" id="JS_btnTest" name="myname" value="" type="form" required>(不可编辑)点击我更改状态</div>
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
	var text = type == "myname" ? "myname的value属性值不能为空" : type + "这个是必须的";
	alert(text);
});
document.querySelector("#JS_btnTest").addEventListener("click", function(){
	if( !this.getAttribute("value") ){
		this.setAttribute("value", "has");
		this.innerHTML = "(不可编辑)我已经更改状态了";
	} else {
		this.setAttribute("value", "");
		this.innerHTML = "(不可编辑)点击我更改状态";
	}
}, false);
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````

