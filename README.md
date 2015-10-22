# validator [![spm version](https://moekit.com/badge/validator)](https://moekit.com/package/validator)

---

## 说明
> 该模块只用来做表单验证，提供内置验证功能，支持自定义验证事件

## 使用方法
> 1. 存在`data-valid`or`name`属性则有验证规则
> 2. 存在`required`属性，则必须验证规则
> 3. 存在`pattern`属性，同时存在`data-valid`属性时，每次都会用`pattern`的正则规则来验证
> 4. 存在`min`、`max`属性，用于验证长度规则（中文算两个字符）
> 5. 存在`data-alt`属性，验证失败的文案，如果当前标签的sibling存在`validator-info`类名时，该文案会赋值到此sibling中
> 6. 存在`data-hint`属性，验证成功的文案，如果当前标签的sibling存在`validator-info`类名时，该文案会赋值到此sibling中

```html
<div id="JS_form">
	<input class="validator" date-valid="qq" pattern="^\d*$"
		 min="5" max="11" name="qq" data-alt="qq必须是5-11位数字" type="text" />
	<span class="validator-info"></span>
	<button id="JS_submit">提交</button>
</div>
```

## 初始化参数
+ id: 表单id，取不到id对应的dom时默认使用document
+ custom: `Object`用于自定义表单事件，其key值对应验证标签中的[`data-valid`属性]
+ showOnClass：文案显示在类名为showOnClass的sibling上，默认validator-info
+ isFocus: 验证失败后，焦点是否跳到失败节点上，默认true
+ pass: 调试使用，true时直接跳过验证，直接进入验证通过事件，默认false

## 事件机制
+ `on`事件，用于绑定`验证失败事件`，`验证成功事件`
	+ `error` 验证失败回调事件，带参数`function`，其中function返回值有name, dom, alt
	+ `success` 验证通过回调事件，带参数`function`
+ `onvalid`事件，用于绑定`自定义验证事件`，带3个参数
	+ Param 1: `string`自定义验证事件的名称，可用于验证标签中的[`data-valid`属性]
	+ Param 2: `function`函数，其中function带有形参val,dom; 用于绑定自定义验证事件函数，此函数必须带有返回值为true or false
	+ Param 3: `function`函数，成功绑定事件的回调
+ `onvalid`事件，用于解绑`验证事件`，带2个参数
	+ Param 1: `string`验证事件的名称
	+ Param 2: `function`函数，成功绑定事件的回调
+ `verify`事件，用于开始执行验证，验证通过则调用`on`的`success`事件，反之调用`on`的`error`事件
	+ [Param 1]: `function`用于验证通过回调，会阻止`on`的`success`事件的调用
	+ [Param 2]: 调试使用，`true`时直接跳过验证，直接进入验证通过事件
+ `is`事件，简单对一个值进行验证
	+ Param 1: 验证类型，即data-valid的值，也支持自定义验证规则
	+ Param 2: 验证的值
	+ [Param 3]: 验证的值的字符长度最小值min
	+ [Param 4]: 验证的值的字符长度最大值max
	+ [Param 5]: 传入dom对象，专用于自定义验证规则可能使用到的对象

## data-valid属性值介绍
+ number: 只能是数字
+ int: 只能是整数
+ mobile: 手机号码格式
+ phone: 固定电话格式
+ mobilephone: 手机或固话格式
+ zipcode: 邮政编码格式
+ email: 邮箱格式
+ date: 日期格式`2015-01-01` or `2015/01/01`
+ time: 时间格式`11:56` or `11:56:29`
+ datetime: 日期时间格式`2015-01-01 11:56` or `2015-01-01 11:56:29`
+ idcard: 身份证格式 
+ url: 网址格式 
+ wechatid: 微信号（微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头） 

## 规则优先级说明
绑定规则emit("onvalid", func) > pattern属性正则规则 > 初始化参数custom规则 > 内置正则规则