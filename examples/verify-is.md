# 直接校验是否符合规则

- order: 15
---

<link rel="stylesheet" type="text/css" href="./../src/style.css">

## is事件直接通过number规则来校验输入值  

<div class="form-item">
	<span class="type-name"></span>
	<input type="text" id="JS_val" placeholder="校验数字"/>
</div>
<div class="form-item">
	<span class="type-name"></span>
	<button class="demo-btn" id="JS_submit" type="buttom" value="校验">校验</button>	
</div>

````javascript
var Validator = require('validator');
var validate = new Validator();
document.querySelector("#JS_submit").addEventListener("click", function(){
	alert( validate.is("number", document.getElementById("JS_val").value) );
}, false);
````

## is事件直接通过mobilephone规则来校验输入值  

<div class="form-item">
	<span class="type-name"></span>
	<input type="text" id="JS_val_1" placeholder="校验联系电话"/>
</div>
<div class="form-item">
	<span class="type-name"></span>
	<button class="demo-btn" id="JS_submit_1" type="buttom" value="校验">校验</button>	
</div>

````javascript
var Validator = require('validator');
var validate = new Validator();
document.querySelector("#JS_submit_1").addEventListener("click", function(){
	alert( validate.is("mobilephone", document.getElementById("JS_val_1").value) );
}, false);
````
