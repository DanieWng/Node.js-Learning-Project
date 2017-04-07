#Express.js 学习 - Day2: 4.x 路由

##疑惑

在官网文档中看到有`app.use()`和`app.get()`一起使用的情况，但这两个都是进行处理http请求工作，那么它们的区别又是什么呢？ 这个让我这个后端菜鸟很是绕头，完全不能理解的说。Google了一些其他人的博客，不能说不能全理解了吧，但也是很糊涂。幸好看到了这篇文章消除了我的疑惑。<https://blog.gtwang.org/programming/learn-to-use-the-new-router-in-expressjs-4/>

###Express.js 3.x

首先我们要知道Express 3.x时是怎么处理路由的呢？

```javascript
app.get('/sample', function(req, res) {
  res.send('this is a sample!');
});
```

是的！！！ 你没看错，让我们头疼的函数居然是3.x的老方法... 前端啊！！！

###Express.js 4.x

那么另外的`app.use(path, router)`方法是不是就是4.x以后的方法了？

是的。恭喜答对了......

在4.x增加了Router功能，让我们更加方便地将不同功能的路由区分开来，分别建立不同的`Router`组件，以不同的路径套用到应用中。

```javascript
// 建立 Router 物件
var router = express.Router();

// 首頁路由 (http://localhost:3000)
router.get('/', function(req, res) {
  res.send('home page!');
});

// 另一張網頁路由 (http://localhost:8080/about)
router.get('/about', function(req, res) {
  res.send('about page!');
});

// 將路由套用至應用程式
app.use('/', router);
```

1. 首先声明一个`Router`对象
2. 编写了两个路由规则，分别对应`'/'`和`'/about'`路径的get请求
3. 将这个`Router`对象添加到我们的应用中

那么当我们访问`http://localhost:3000`和`http://localhost:3000/about`这两个页面时，即会通过`Router`对象处理。

将路由添加到应用时，还可以指定路由的基础路径，例如我们将基础路径设置为`/app`时：

```
app.use('/app', router);
```

我们访问页面的URL就变更为`http://localhost:3000/app`和`http://localhost:3000/app/about`了。

###路由规则响应顺序

由添加到应用的顺序决定，即先加入的先响应。所以假如有多个相同路径的请求时，也只会响应第一个。

###示例代码：

```
// --------------------------------------------
// 建立基本的路由规则
// Express.js 3.x 添加路由规则
app.get('/', function(req, res, next){
  res.send("app.get -> main");
});

app.get('/hello', function(req, res, next){
  res.send("app.get -> hello");
});

// Express.js 4.x 使用Router功能
var router1 = express.Router();

router1.get('/', function(req, res){
  res.send('4.x router -> /');
});

router1.get('/hello', function(req, res){
  res.send('4.x router -> /hello');
});

app.use('/', router1);

var router2 = express.Router();

router2.get('/', function(req, res){
  res.send('4.x router -> /app');
});

router2.get('/hello', function(req, res){
  res.send('4.x router -> /app/hello');
})

app.use('/app', router2);

// --------------------------------------------
```

##路由中间件(Route Middleware)

Express的middleware功能可以让请求（request）在被处理之前，先执行一些预操作，例如检查使用者是否有登录或者记录一些使用者的浏览资料等等，凡事需要在实际处理请求之前要做的工作，都可以使用middleware来处理。

示例代码中就是一个简单的middleware，它会在每一个请求被处理之前，输出一行记录到终端上：

```javascript
// --------------------------------------------
// 路由中间件的理解

var router3 = express.Router();

router3.use(function(req, res, next){
  console.log('请求预操作: ', req.method, req.url);
  next();
});

router3.get('/', function(req, res){
  res.send('/middleware');
});

app.use('/middleware', router3);

// --------------------------------------------
```

这样当任何符合`router3`的访问请求时，都会先通过预处理在继续。

![](http://on59v8vyx.bkt.clouddn.com/Jietu20170406-154422.jpg)

在使用middleware时必须要注意函数位置要在routes之前，程序在执行时会依据middleware和routes的先后顺序来执行。

##路由参数(Route with Parameters)

路由规则除了使用固定的字符串外，还可以包含会变动的参数。

示例中将`name`作为输入的变量，并根据使用者输入的字段打印：

```
// --------------------------------------------
// 理解路由规则中的参数
var router4 = express.Router();

router4.get('/hello/:name', function(req, res){
  res.send('hello ' + req.params.name + '!');
});

app.use(router4);

// --------------------------------------------
```

![](http://on59v8vyx.bkt.clouddn.com/Jietu20170406-155634.jpg)

###验证参数

有时候需要对传入的参数进行筛选或验证，例如输入的字符串是否是合法的名称等，这时候就可以使用`.param()`这个专门用来处理参数的middleware：

```
// --------------------------------------------
// 理解路由规则中的参数
var router4 = express.Router();

router4.param('name', function(req, res, next, name){

  // add your code
  // ...

  console.log("doing name valodations on " + name);
  
  // 当验证成功时，将其存储在req
  req.name = name;

  next();

})

router4.get('/hello/:name', function(req, res){
  res.send('hello ' + req.name + '!');
});

app.use(router4);

// --------------------------------------------
```

终端：

![](http://on59v8vyx.bkt.clouddn.com/Jietu20170406-160426.jpg)


这样当每次又`:name`参数传入时，就会先执行这里新增的middleware，经过验证确定没问题之后，再将传入的名称存储到`req`中，再传给`.get`路由，所以在`.get`路由中我们也将`req.params.name`改为了`req.name`。

##第三种新增路由方法

除了使用`express.Router()`的方式来建立路由之外，我们也可以使用`app.route`直接在应用上新增路由，这种方式是`Router`的简略缩写，语法看起来跟传统的`app.get`类似。

使用`app.route`有个好处是可以让我们一次针对一个路由新增好几个动作，例如我们想要使用**GET**显示登录名单，并且使用**POST**处理表单。

```
app.route('/login')

  // 顯示登入表單 (GET http://localhost:3000/login)
  .get(function(req, res) {
    res.send('this is the login form');
  })

  // 處理登入表單 (POST http://localhost:3000/login)
  .post(function(req, res) {
    console.log('processing');
    res.send('processing the login form!');
  });
```

这样就可以让应用在`/login`这个路由上将**GET**和**POST**分开处理，这样的写法也可以算是方便简洁。
