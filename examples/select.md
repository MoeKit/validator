
# select标签

- order: 3
---

<link rel="stylesheet" type="text/css" href="./../src/style.css">

## 校验`select`非空  
select里面的option必须设置value，否则select的值会默认用option的text值

```html
<select>
	<option value="">省</option>
	<option value="北京市">北京市</option>
	<option value="广东省">广东省</option>
</select>
```

<div id="JS_form">
	<div class="form-item">
		<span class="type-name">区域：</span>
		<select name="select" required>
			<option value="">省</option>
			<option value="北京市">北京市</option>
			<option value="广东省">广东省</option>
		</select>
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
	var text = type == "select" ? "省是必选的" : "这个是必须的";
	alert(text);
});
document.querySelector("#JS_submit").addEventListener("click", function(){
	validate.verify();
}, false);
````

