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
			console.log(_this);
			_this.container.innerHTML ='<h4>用户登录</h4>'+
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
		tools.stop();
		
	}
	
	judgeID (target) {
		if(target.id === "closeBtn") {
			this.container.style.display = "none";
			document.body.removeChild(this.modal);
		}else if(target.id === "loginBtn"){
			this.container.style.display = "none";
			document.body.removeChild(this.modal);
			//把这些属性都挂在全局上面
			var div = document.createElement("div");
			
			this.username = document.querySelector("#username").value;
			this.textArea = document.querySelector("#textArea").value;
			let str  = this.username  + "&nbsp;" + "在"+ this.nowTime +"发布的消息是：" + "&nbsp;" + this.textArea;
			div.innerHTML = str;
			this.showDiv.appendChild(div);
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
	
	
}
