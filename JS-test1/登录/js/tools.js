var tools = {
	
//	获取元素的样式
//	@param obj <DOM Object>  要获取的样式的对象
//	@param str <String> 要获取的属性名
	getStyle : function(obj, attr){
		//第一种方式
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[atrr];
		//	第二种方式用if...else
		//第三种方式用try...catch
	},
	/* 给元素设置样式
	 * obj <DOM Object> 要设置样式的元素
	 * attrObj <object> 设置的样式，如 {"width" : "200px", "height" : "300px"}
	 */
	setStyle : function (obj, attrObj) {
		for(var key in attrObj){
			obj.style[key] = attrObj[key];
		}
	},
	
	getBodyDis : function(obj){
		var left = 0, top = 0;
		while(obj.offsetParent){
			left += obj.offsetLeft;
			top += obj.offsetTop;
			//把obj向前移动一步，以便下次计算offsetparent
			obj = obj.offsetParent;
		}
		//返回对象
		return {
			"top" : top,
			"left" :left
		}
	},
	
	getBody : function(){
		return {
			width : document.documentElement.clientWidth ||document.body.clientWidth,
			height:document.documentElement.clientHeight ||document.body.clientHeight
		}
	},
//	添加事件监听
//obj <DOM object> 添加事件监听的对象
// type <string> 事件句柄(不带on) 可以拼接
//fn <function> 事件处理函数
//isCapture <boolean> 是否捕获，默认为false,(IE8+有效)
	
	on : function(obj, type, fn, isCapture){
		isCapture = isCapture || false;
		
		if(window.attachEvent){
			obj.attachEvent("on" + type, fn);
		}else{
			obj.addEventListener(type, fn, isCapture);
		}
	},
	
//	移除事件监听
//obj <DOM objecct> 移除的事件监听对象
//fn <function> 事件处理函数
//isCapture <boolean> 是否捕获(监听是在捕获阶段捕获的，移除也是需要填写true)，默认为false,(IE8+有效)

	off : function(obj, type, fn, isCapture){
		isCapture = isCapture || false;
		if(window.detachEvent){
			obj.detachEvent("on" + type, fn);
		}else{
			obj.removeEventListener(type, fn, isCapture);
		}
	},
	
	//给某个元素绑定鼠标滚轮事件
	//obj <DOM object> 添加事件对象
	//fn <function> 事件处理函数   这个函数有一个参数，参数是一个<boolean> true 向下          false 向上
	
	scroll :function(obj, fn){
		//判断事件有没有效，绑定了事件没有效果值依旧为null，执行else语句
		if(obj.onmousewheel !== undefined){
			obj.onmousewheel = function(){
				e = e || event;
				fn(e.wheelData < 0);
			}
		}
		else{
			obj.addEventListener("DOMMouseScroll", function(e){
				e = e ||event;
				fn(e.detail > 0);
			})
		}
	},
	/*匀速运动
	 *obj <DOM object> 匀速的对象
	 * attr <string> 匀速的属性
	 * time <number> 结束的时间
	 * end <number>  结束的值
	 */
	
	linearMove : function(obj, attr, end, time){
		//清除上一次的定时器
		clearInterval(obj.timer);
		
		//获取起点的值,取的位置可能是小数，需要转成整数
		var start = parseInt(this.getStyle(obj, attr));
		
		//计算总距离
		var distance = end -start;
		//计算所需要的步，以具体0ms为单位，算所需要的步数
		var steps = parseInt(time / 20);
		var speed = distance / steps;
		//设置定时器，规定每隔几秒就走一点
		obj.timer = setInterval(function(){
			start += speed;
			obj.style[attr] = start + "px";
			//到终点的距离小于了一个速度的距离，那么就结束运动
			if(Math.abs(start - end) < Math.abs(speed)){
				clearInterval(obj.timer);
				obj.style[attr] = end + "px";
			}
		}, 20);
	},
	
	//缓冲运动
	/* obj <DOM object> 需要缓冲的对象
	 * attr <string> 需要改变的属性
	 * end <number> 结束的位置
	 */
	move : function(obj, attr, end){
		//清除上一次定时器
		clearInterval(obj.timer);
		
		//获取开始位置
		var start = parseInt(this.getStyle(obj, attr));
		obj.timer = setInterval(function (){
			//中间行驶距离
			var distance = end - start;
			//求速度
			var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);
			//移动开始位置
			start += speed;
			obj.style[attr] = start + "px";
			if(start === end){
				clearInterval(obj.timer);
			}
		}, 20)
		
	},
	
	/* 让元素在窗口范围绝对居中
	 * obj  <DOM Object> 要居中的那个元素
	 */
	
	showCenter : function (obj) {
		obj.style.display = "block";
		let _this = this;
		function center () {
			let _left = (_this.getBody().width - obj.offsetWidth) / 2;
			let _top = (_this.getBody().height - obj.offsetHeight) / 2;
			_this.setStyle(obj, {
				position : "absolute",
				left : _left + "px",
				top : _top + "px"
			});
		};
		center();
		// 窗口大小发生改变的时候重新计算坐标
		window.onresize = center;
	},
	//阻止默认行为
	stop : function () {
		var ul = document.createElement("ul");
			document.querySelector("div").oncontextmenu = function(e){
				e = e || event;
				// 阻止右键默认菜单
				e.preventDefault ?
					e.preventDefault() : 
						window.returnValue = false;
				ul.innerHTML = "<li>复制</li><li>粘贴</li><li>删除</li>";
				document.body.appendChild(ul);
			}
	}
	
}
