##Node.js 爬虫学习 - Superagent

####请求基础：
* 请求方式（RequestType）
	1. get
	2. post
	3. pull
	4. delete

* 设置Content-Type

* 参数设置
	1. get(query)
	2. pos(send)
	
* 查询字符串

* 响应属性Response

请求函数示例：

```
request.get('/search?')
		.end(function(err, res){
		
		});
```

其他的参考文档：</br>
<https://visionmedia.github.io/superagent/>
<https://cnodejs.org/topic/5378720ed6e2d16149fa16bd>



