#JavaScript

*	函数可以作为其他函数的参数导入

	```
	function say(word) {
  		console.log(word);
	}

	function execute(someFunction, value) {
  		someFunction(value);
	}

	execute(say, "Hello");
	```
	
	不一定必须先定义再使用，也可以直接在函数的参数位置上定义，即匿名函数。
	
	```
	function execute(someFunction, value) {
  		someFunction(value);
	}

	execute(function(word){ console.log(word) }, "Hello");
	```
*	

	