class Login{
//	构造函数
	constructor (btn){
		this.btn = document.querySelector(btn);
		this.container = document.querySelector("#container");
		this.showDiv = document.querySelector("#showDiv");	
		
		this.nowTime = this.getTime(new Date());
//		调用函数
		this.bindEvents();
	}
//	给发布按钮绑定事件
	bindEvents () {
		var _this = this;
		_this.btn.onclick = function () {
			//console.log(_this);
			_this.container.innerHTML ='<h4>用户发布</h4>'+
			'<a id="closeBtn" class="close_btn" href="javascript:;">×</a>'+
			'<p><label>用户名：<input id="username" type="text"></label></p>'+
			'<p><textarea id="textArea" rows="3" cols="55"></textarea></p>'+
			'<p><button id="loginBtn" class="logonBtn" type="button">点击发布</button></p>';
			tools.showCenter(_this.container);
			_this.modal = document.createElement("div");
			_this.modal.className = "modal";
			document.body.appendChild(_this.modal);
		}
		
		//删除
		this.container.onclick = function (e) {
			var target = e.target || e.srcElement;
			_this.judgeID(target);
		}
		//点击右键，创建菜单
		/*this.showDiv.onmouseenter = function () {
			if(_this.ul) _this.ul.remove();
			_this.stopBehavior();
			
			//if(e.button)_this.ul.remove();
		}
		this.showDiv.onmouseleave = function (e) {
			//document.onclick = function () {
				if(_this.ul) _this.ul.remove();
			//}
		}*/
		this.showDiv.oncontextmenu = e =>{
			this.ul = document.createElement("ul");
			//事件兼容
			e = e ||event;
			//阻止默认行为
			if(e.preventDefault){
				e.preventDefault();
			}
			else{
				window.event.returnValue = false;
			}
			//在页面显示li内容
			this.ul.innerHTML = "<li>增加</li><li>修改</li><li class = 'del'>删除</li>";
			document.body.appendChild(this.ul);
//			if(this.ul) this.ul.remove();
			console.log(this.showDiv);
			console.log(this.ul);
			this.ul.onclick = e => {
				let target = e.target || e.srcElement;
				console.log(target.className);
				if(target.className === "del"){
					//console.log(_this.showDiv);
					this.div.remove();
					this.ul.remove();
				}
			}
			
		}
		this.showDiv.onmouseleave = function (e) {
			document.onclick = function () {
				if(_this.ul) _this.ul.remove();
			}
		}
		
		
	}
	
	judgeID (target) {
		if(target.id === "closeBtn") {
			this.container.style.display = "none";
			document.body.removeChild(this.modal);
		}else if(target.id === "loginBtn"){
			this.container.style.display = "none";
			document.body.removeChild(this.modal);
			//把这些属性都挂在全局上面
			this.div = document.createElement("div");
			this.div.className = "temp";
			this.username = document.querySelector("#username").value;
			this.textArea = document.querySelector("#textArea").value;
			let str  = this.username  + "&nbsp;" + "在"+ this.nowTime +"发布的消息是：" + "&nbsp;" + this.textArea;
			this.div.innerHTML = str;
			this.showDiv.appendChild(this.div);
		}
	}

	getTime (date){
		let year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hours = date.getHours(),
			min = date.getMinutes(),
			second = date.getSeconds();
		return year + "年" + month + "月" + day + "号" + hours + "时"+ min + "分"+ second + "秒"; 
	}
	
	stopBehavior () {
		/*this.ul = document.createElement("ul");
		
		this.showDiv.oncontextmenu = e =>{
			//事件兼容
			e = e ||event;
			//阻止默认行为
			if(e.preventDefault){
				e.preventDefault();
			}
			else{
				window.event.returnValue = false;
			}
			//在页面显示li内容
			this.ul.innerHTML = "<li>增加</li><li>修改</li><li class = 'del'>删除</li>";
			document.body.appendChild(this.ul);
			
			console.log(this.showDiv);
			console.log(this.ul);
			this.ul.onclick = e => {
				let target = e.target || e.srcElement;
				
				if(target.nodeName === "DEL"){
					//console.log(_this.showDiv);
					this.showDiv.remove();
				}
			}
			
		}*/
		
	}
	
	
}
