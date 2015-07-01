
# 内置规则 - 日期

- order: 7
---

> data-valid：校验规则名称，已有内置规则  

<link rel="stylesheet" type="text/css" href="./../src/style.css">


## 内置规则 - datetime
> `date`: 日期-年月日，格式：2015-02-02 || 2015/02/02  
> `time`: 时间-时分秒，格式：09:00:00  
> `datatime`: 日期时间-年月日时分秒，格式：2015-02-02 09:00:00 || 2015/02/02 09:00:00

```html
<input type="text" name="date" data-valid="date" required placeholder="日期（必填）"/>
<input type="text" name="time" data-valid="time" required placeholder="时间（必填）"/>
<input type="text" name="datetime" data-valid="datetime" required placeholder="日期时间（必填）"/>
```

<div id="JS_form_3">
	<div class="form-item">
		<span class="type-name">日期：</span>
		<input type="text" name="date" data-valid="date" required placeholder="日期（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">时间：</span>
		<input type="text" name="time" data-valid="time" required placeholder="时间（必填）"/>
	</div>
	<div class="form-item">
		<span class="type-name">日期时间：</span>
		<input type="text" name="datetime" data-valid="datetime" required placeholder="日期时间（必填）"/>
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
	var text = type == "date" ? "日期格式不对" :
				type == "time" ? "时间格式不对" :
				type == "datetime" ? "日期时间格式不对" : type+"不能为空";
	alert(text);
});
document.querySelector("#JS_submit_3").addEventListener("click", function(){
	validate.verify();
}, false);
````