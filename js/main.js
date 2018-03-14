function $(id){
	return document.getElementById(id);
}
//可见区域宽高
function view(){
    return {
        w: document.documentElement.clientWidth || document.body.clientWidth,
        h: document.documentElement.clientHeight || document.body.clientHeight
    };
}
function getStyle(obj,sName){
    return (obj.currentStyle||getComputedStyle(obj,'false'))[sName];
}
//DOM加载完成 window.onload开始
window.onload = function(){
    var aSection = document.getElementsByTagName('section');
    var oNav = $('nav');
    var oNavUl = $('navUl');
    var aAnchor = oNavUl.getElementsByTagName('a');
    var bReady = true;
    var scrollTopOld = document.documentElement.scrollTop || document.body.scrollTop;
    var h5Content = $('h5Content');
    var jsContent = $('jsContent');


    //控制section的高度
    changeSec();
    function changeSec(){
    	function change(){
	    	for (var i = 0; i < aSection.length; i++) {
                aSection[i].style.height = view().h + 'px';
	    	}
	    }
	    change();
	    window.addEventListener('resize',change,false);
    }

    //出现导航条
    showNav();
    function showNav(){
        if(scrollTopOld>60){
            oNav.style.top = 0;
        }else{
            oNav.style.top = -60 + 'px';
        }
    }
    //导航条
    nav();
    function navChange(index){
        for (var i = 0; i < aAnchor.length; i++) {
            aAnchor[i].className = '';
        }
        aAnchor[index].className = 'active';
    }
    function nav(){
    	for (var i = 0; i < aAnchor.length; i++) {
    		(function(index){
    			aAnchor[i].onclick = function(){
    				moveHTML(index);
                    navChange(index);
    			};
    		})(i);
    	}
    	function moveHTML(index){
            bReady = false;
    		var obj = document.documentElement || document.body;
    		var start = document.documentElement.scrollTop || document.body.scrollTop;
    		var dis = index*view().h - start;
    		var n = 0,count = 35;
    		clearInterval(obj.timer);
    		obj.timer = setInterval(function(){
    			n++;
    			var a = 1 - n/count;
    			var cur = start + dis*(1-Math.pow(a,3));
    			document.documentElement.scrollTop = document.body.scrollTop = cur;
    			if(n == count){
    				clearInterval(obj.timer);
                    bReady = true;
    			}
    		}, 30);
    	}
    }
    //页面滚动时
    window.addEventListener('scroll',function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var navIndex = Math.floor((scrollTop+100)/view().h);
        var showIndex = Math.ceil((scrollTop-150)/view().h);
        //页面向下时以showIndex为准， 页面向上是以navIndex为准
        //document.title = showIndex + '|' + navIndex;
        //document.title = scrollTopOld + '|' + scrollTop;
        switch( showIndex ){
            case 0:
                break;
            case 1:
                //skills();
                break;
        }
        //控制导航菜单
        if(bReady){
            navChange(navIndex);
        }
        //出现导航条
        showNav();
        scrollTopOld = scrollTop;
    },false);

    //skills区
    skills();
    function skills(){
        var oSkill = $('skills_right');
        var aSpan = oSkill.getElementsByTagName('span');
        var parentW = parseFloat(getStyle(oSkill,'width'));

        var data = [
            { width: 85, speed: 8},
            { width: 80, speed: 6},
            { width: 70, speed: 5},
            { width: 65, speed: 5}
        ];
        for(var i = 0; i < aSpan.length; i++){
            aSpan[i].width = 10;
            (function(index){
                clearInterval(aSpan[i].timer);
                aSpan[i].timer = setInterval(function(){
                    aSpan[index].width += data[index].speed;
                    aSpan[index].style.width = aSpan[index].width + 'px';
                    aSpan[index].innerHTML = (aSpan[index].width/parentW*100).toFixed(0) + '%';
                    if((aSpan[index].width/parentW*100).toFixed(0) >= data[index].width){
                        clearInterval(aSpan[index].timer);
                        aSpan[index].width = 10;
                        aSpan[index].innerHTML = data[index].width + '%';
                    }
                },30);
            })(i);
        }
    }

    //h5作品区
    createH5Works();
    function createH5Works(){
        var data = [
            {"img":"img/h5/buyu.png","href":"works/h5/canvasbuyu/buyu.html","text":"canvas捕鱼达人"},
            {"img":"img/h5/3Dpic.png","href":"works/h5/3dpic/3D图片环.html","text":"3D图片环"},
            {"img":"img/h5/3dworkshow.png","href":"works/h5/3dpic/3D作品展示.html","text":"3D作品展示"},
            {"img":"img/h5/3dboom.png","href":"works/h5/3dpic/3D爆炸.html","text":"3D爆炸"},
            {"img":"img/h5/3dpage.png","href":"works/h5/3dpic/3D翻页效果.html","text":"3D翻页效果"},
            {"img":"img/h5/canvasscreen.png","href":"works/h5/canvas屏保.html","text":"canvas屏保"},
            {"img":"img/h5/css3click.png","href":"works/h5/CSS3时钟.html","text":"CSS3时钟"},
            {"img":"img/h5/cube.png","href":"works/h5/旋转立方体.html","text":"旋转立方体"},
            {"img":"img/h5/typing.png","href":"works/h5/打字效果.html","text":"打字效果"}
        ];
        for(var i = 0; i < data.length; i++){
            var oLi = document.createElement('li');
            oLi.innerHTML = '<img src="'+data[i].img+'" alt="'+data[i].text+'">\
                <a href="'+data[i].href+'" target="_blank">'+data[i].text+'</a>';
            h5Content.appendChild(oLi);
        }
    }

    //js作品区
    createJsWorks();
    function createJsWorks(){
        var data = [
            {"img":"img/js/googleapp.png","href":"works/js/googleApps/googleapps.html","text":"GoogleApps"},
            {"img":"img/js/loop.png","href":"works/js/googleApps/无缝滚动.html","text":"无缝滚动"},
            {"img":"img/js/accordion.png","href":"works/js/googleApps/手风琴.html","text":"手风琴效果"},
            {"img":"img/js/applemenu.png","href":"works/js/applemenu/AppleMenu.html","text":"苹果菜单"},
            {"img":"img/js/dragbanner.png","href":"works/js/dragbanner/拖拽放大广告.html","text":"拖拽放大banner"},
            {"img":"img/js/opacity.png","href":"works/js/分块运动/分块运动随机透明.html","text":"分块运动随机透明"},
            {"img":"img/js/skew.png","href":"works/js/分块运动/分块运动斜着动.html","text":"分块运动斜着动"},
            {"img":"img/js/navmenu.png","href":"works/js/弹性导航.html","text":"弹性导航"},
            {"img":"img/js/waterfall.png","href":"works/js/无限瀑布流.html","text":"无限瀑布流"}
        ];
        for(var i = 0; i < data.length; i++){
            var oLi = document.createElement('li');
            oLi.innerHTML = '<a href="'+data[i].href+'" target="_blank">\
                <img src="'+data[i].img+'" alt="'+data[i].text+'" />\
                <span>'+data[i].text+'</span></a>';
            jsContent.appendChild(oLi);
        }
        //穿墙效果
        var aLi = jsContent.children;
        for(var i = 0; i < aLi.length; i++){
            hoverGo(aLi[i]);
        }
        //判断移入的方向
        function hoverDir(obj,oEvent){
            var w = obj.offsetWidth;
            var h = obj.offsetHeight;
            var x = (obj.offsetLeft + w/2-oEvent.clientX) * ( w > h ? ( h/w ) : 1 );
            var y = (obj.offsetTop + h/2-oEvent.clientY-scrollTopOld) * ( h > w ? ( w/h ) : 1 );
            return Math.round(((Math.atan2(y,x)*180/Math.PI)+180)/90)%4;
        }
        function hoverGo(obj){
            var oS = obj.getElementsByTagName('span')[0];
            obj.onmouseover=function(ev){
                var oEvent = ev||event;
                var oFrom = oEvent.fromElement||oEvent.relatedTarget;
                if(obj.contains(oFrom))return;
                var dir = hoverDir(obj,oEvent);
                //根据方向重新设定遮罩层位置
                switch(dir){
                    case 0:
                        oS.style.left = '300px';
                        oS.style.top = 0;
                        break;
                    case 1:
                        oS.style.left = 0;
                        oS.style.top = '140px';
                        break;
                    case 2:
                        oS.style.left = '-300px';
                        oS.style.top = 0;
                        break;
                    case 3:
                        oS.style.left = 0;
                        oS.style.top = '-140px';
                        break;
                }
                startMove(oS,{top:0,left:0});
            };
            obj.onmouseout=function(ev){
                var oEvent = ev||event;
                var oTo = oEvent.toElement||oEvent.relatedTarget;
                if(obj.contains(oTo))return;
                var dir = hoverDir(obj,oEvent);
                //根据移除的方向遮罩层进行相应的运动
                switch(dir){
                    case 0:
                        startMove(oS,{left:300,top:0});
                        break;
                    case 1:
                        startMove(oS,{left:0,top:140});
                        break;
                    case 2:
                        startMove(oS,{left:-300,top:0});
                        break;
                    case 3:
                        startMove(oS,{left:0,top:-140});
                        break;
                }
            };
        }

    }

    //联系方式区
    contact();
    function contact(){
        var arr = ['','Name','Email','Phone Number','Message'];
        var aInp = $('contact_right').children;

        for(var i = 1; i < aInp.length-1; i++){
            (function(index){
                aInp[i].onfocus = function(){
                    this.value = '';
                };
                aInp[i].onblur = function(){
                    if(this.value == ''){
                        this.value = arr[index];
                    }
                };
            })(i);
        }

        aInp[aInp.length-1].onclick = function(){
            if(confirm('测试版本，没有数据库，暂不能提交，确定提交吗？')){
                window.open('http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=CDA5PTA9MT88Pkh5eSZrZ2U');
            }
        };

        
    }

};
//window.onload结束

//随机数
function rnd(n, m) {
    return parseInt(n + Math.random() * (m - n));
}
//添加鼠标滚轮事件
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false); //高版本浏览器
    }else{
        obj.attachEvent('on'+sEv,fn);   //ie系列
    }
}
function addWheel(obj,fn){
    function fnWheel(ev){
        var oEvent = ev || event;
        var bDir = true;//true表示向下  false表示向上
        if(ev.wheelDelta){
            bDir = ev.wheelDelta < 0; //chrome ie
        }else{
            bDir = ev.detail > 0;   //firefox
        }
        fn && fn(bDir);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }

    if(window.navigator.userAgent.indexOf('Firefox')!=-1){
        addEvent(obj,'DOMMouseScroll',fnWheel);
    }else{
        addEvent(obj,'mousewheel',fnWheel);
    }
}

//move框架

function startMove(obj,json,options){
	options = options||{};
	options.duration = options.duration||700;
	options.easing = options.easing||'ease-out';
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'top':
					start[name] = obj.offsetTop;
					break;
				case 'left':
					start[name] = obj.offsetLeft;
					break;
				case 'width':
					start[name] = obj.offsetWidth;
					break;
				case 'height':
					start[name] = obj.offsetHeight;
					break;
				case 'opacity':
					start[name] = 1;
					break;
				case 'borderWidth':
					start[name] = 0;
					break;
			}
		}
		dis[name] = json[name] - start[name];
	}
	var count = Math.floor(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var cur = start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			
			if(name=='opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name] = cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();
		}
	},30);
}
