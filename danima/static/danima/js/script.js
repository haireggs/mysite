window.onload=function(){
	var startBtn=document.getElementById('start');
	
	startBtn.onclick=function(){
		this.style.display='none';
		Game.init();	//游戏开始
	}
}

var Game={
	enemy: {	//敌人数据
		e1: {style: 'bee1', blood: 1, speed: 5, score: 1},
		e2: {style: 'bee2', blood: 2, speed: 7, score: 2}
	},

	gk: [
		{
			eMap: [
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e1','e1','e1','e1','e2','e2','e1','e1','e1','e1',
				'e1','e1','e1','e1','e2','e2','e1','e1','e1','e1',
				'e1','e1','e1','e1','e2','e2','e1','e1','e1','e1',
				'e1','e1','e1','e1','e2','e2','e1','e1','e1','e1'
			],
			column: 10,
			iSpeedX: 10,
			iSpeedY: 1,
			times: 3500
		},
		{
			eMap: [
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e1','e2','e1','e2','e1','e1','e2','e1','e2','e1',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e1','e2','e1','e2','e1','e1','e2','e1','e2','e1',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2'
			],
			column: 10,
			iSpeedX: 13,
			iSpeedY: 1,
			times: 2500
		},
		{
			eMap: [
				'e2','e2','e2','e2','e1','e1','e2','e2','e2','e2',
				'e2','e2','e2','e2','e1','e1','e2','e2','e2','e2',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e2','e2','e2','e2','e1','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e1','e1','e2','e2','e2','e2'
			],
			column: 10,
			iSpeedX: 15,
			iSpeedY: 2,
			times: 2000
		},
		{
			eMap: [
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e1','e1','e1','e1','e2','e2','e1','e1','e1','e1',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2'
			],
			column: 10,
			iSpeedX: 20,
			iSpeedY: 3,
			times: 1000
		},
	],

	init: function(){	//初始化
		this.oParent=document.getElementById('stage');
		this.createScore();
		this.createShooter();
		this.createEnemy(0);
		this.iNow=0;	//第几关卡
	},

	createScore: function(){	//积分的创建
		var oS=document.createElement('div');
		oS.id='score';
		oS.innerHTML='积分：<span>0<span>';
		this.oParent.appendChild(oS);
		this.oScroe=oS.getElementsByTagName('span')[0];
	},

	createEnemy: function(iNow){	//创建敌人
		if(this.oUl){
			clearInterval(this.oUl.timer);
			this.oParent.removeChild(this.oUl);
		}
		document.title="第"+parseInt(iNow+1)+"关";
		var gk=this.gk[iNow];
		var oUl=document.createElement('ul');
		var beePosition=[];
		oUl.id='bees';
		oUl.style.width=gk.column*40+'px';
		this.oParent.appendChild(oUl);
		oUl.style.left=(this.oParent.offsetWidth-oUl.offsetWidth)/2+'px';
		for(var i=0;i<gk.eMap.length;i++){
			var bee=document.createElement('li');
			bee.className=this.enemy[gk.eMap[i]].style;
			bee.blood=this.enemy[gk.eMap[i]].blood;
			bee.speed=this.enemy[gk.eMap[i]].speed;
			bee.score=this.enemy[gk.eMap[i]].score;
			oUl.appendChild(bee);
		}
		this.oUl=oUl;
		this.bees=oUl.getElementsByTagName('li');
		for(var i=0;i<this.bees.length;i++){
			beePosition.push([this.bees[i].offsetLeft,this.bees[i].offsetTop]);
			
		}
		
		for(var i=0;i<this.bees.length;i++){
			this.bees[i].style.float='none';
			this.bees[i].style.position='absolute';
			this.bees[i].style.left=beePosition[i][0]+'px';
			this.bees[i].style.top=beePosition[i][1]+'px';
		}
		this.runEnemy(gk);
	},

	runEnemy: function(gk){	//移动敌人
		var This=this;
		var L=0;
		var R=This.oParent.offsetWidth-This.oUl.offsetWidth;
		this.oUl.timer=setInterval(function(){
			if(This.oUl.offsetLeft>R || This.oUl.offsetLeft<L){
				gk.iSpeedX*=-1;
			}
			This.oUl.style.left=This.oUl.offsetLeft+gk.iSpeedX+'px';
			This.oUl.style.top=This.oUl.offsetTop+gk.iSpeedY+'px';
		},200);
		var timer1=setInterval(function(){
			This.oneBeeFly();
		},gk.times);
		
	},

	createShooter: function(){	//创建射手
		var oSh=document.createElement('div');
		oSh.id='shooter';
		this.oParent.appendChild(oSh);
		oSh.style.left=(this.oParent.offsetWidth-oSh.offsetWidth)/2+"px";
		oSh.style.top=this.oParent.offsetHeight-oSh.offsetHeight+"px";
		this.oSh=oSh;
		this.runShooter();	
	},

	runShooter: function(){
		var This=this;
		var timer=null;
		var iNum=0;
		document.onkeydown=function(k){
			//alert(k.keyCode);
			var ev=k || window.event;
			if(!timer){
				if(ev.keyCode==37){
					iNum=1;
				}
				else if(ev.keyCode==39){
					iNum=2;
				}
				timer=setInterval(move,30);
				//alert(k.keyCode);
			}		
		}
		document.onkeyup=function(k){
			var ev=k || window.event;
			clearInterval(timer);
			timer=null;
			iNum=0;
			if(ev.keyCode==32){
				This.createBullet();
			}
		}
		function move(){
			if(iNum==1){
				This.oSh.style.left=This.oSh.offsetLeft-20+'px';
			}
			else if(iNum==2){
				This.oSh.style.left=This.oSh.offsetLeft+20+'px';
			}
		}
	},
	
	createBullet: function(){	//子弹的创建
		var oB=document.createElement('div');
		oB.className='bullet';
		this.oParent.appendChild(oB);
		//alert(this.oSh.offsetLeft);
		oB.style.left=this.oSh.offsetLeft+this.oSh.offsetWidth/2-1+'px';
		oB.style.top=this.oSh.offsetTop-oB.offsetHeight+'px';
		this.runBullet(oB);
	},

	runBullet: function(oB){	//子弹运行
		var This=this; 
		var timer=null;
		timer=setInterval(function(){
			oB.style.top=oB.offsetTop-10+'px';
			if(oB.offsetTop+oB.offsetHeight<0){
				clearInterval(timer);
				This.oParent.removeChild(oB);
			}
			//alert(This.bees.length);
			for(var i=0;i<This.bees.length;i++){
				var bee=This.bees[i];

				if(This.collisionJudge(bee,oB)){
					This.oParent.removeChild(oB);
					clearInterval(timer);
					bee.blood--;
					if(bee.blood<=0){
						clearInterval(bee.timer);
						This.oUl.removeChild(bee);
						This.oScroe.innerHTML=parseInt(This.oScroe.innerHTML)+bee.score;
						if(This.bees.length==0){
							This.iNow++;
							console.log("iNow:"+This.iNow);
							This.createEnemy(This.iNow);
						}
					}	
				}
			}
			
		},10);
	},

	collisionJudge: function(oM,oN){	//碰撞判断，若碰撞返回true
		var a=oM.offsetLeft+this.oUl.offsetLeft;
		var b=oM.offsetTop+this.oUl.offsetTop;
		var w1=oM.offsetWidth;
		var h1=oM.offsetHeight;
		var x=oN.offsetLeft;
		var y=oN.offsetTop;
		var w2=oN.offsetWidth;
		var h2=oN.offsetHeight;
		if(x>a-w2 && x<a+w1 && y>b-h2 && y<b+h1){ 
			return true;
		}
		else{
			return false;
		};
	},

	oneBeeFly: function(){	//随机下飞
		var This=this;
		var bees=this.bees;
		var bee=bees[Math.floor(Math.random()*bees.length)];
		console.log(bee);
		
		bee.timer=setInterval(function(){
			var s=bee.speed;
			var a=This.oSh.offsetLeft+This.oSh.offsetWidth/2;
			var b=This.oSh.offsetTop+This.oSh.offsetHeight/2;
			var x=bee.offsetLeft+bee.offsetWidth/2+This.oUl.offsetLeft;
			var y=bee.offsetTop+bee.offsetHeight/2+This.oUl.offsetTop;

			var A=a-x;
			var B=b-y;
			var C=Math.sqrt(A*A+B*B);
			bee.style.left=bee.offsetLeft+A/C*s+'px';
			bee.style.top=bee.offsetTop+B/C*s+'px';
			if(This.collisionJudge(bee,This.oSh)){
				clearInterval(bee.timer);
				alert("被尼玛打死了!");
				This.oUl.removeChild(bee);
				window.location.reload();
			}
		},30);
	},
}