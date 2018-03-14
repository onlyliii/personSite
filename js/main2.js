function addClass(obj, sClass) {
	if (obj.className) {
		var reg = new RegExp("\\b" + sClass + "\\b", "g");
		if (obj.className.search(reg) == -1) {
			obj.className += " " + sClass;
		}
	} else {
		obj.className = sClass;
	}
}
function removeClass(obj, sClass) {
	if (obj.className) {
		var reg = new RegExp("\\b" + sClass + "\\b", "g");
		if (obj.className.search(reg) != -1) {
			obj.className = obj.className.replace(reg, "").replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
			if (!obj.className) {
				obj.removeAttribute("class");
			}
		}
	} else {
		return;
	}
}
function rnd(n, m) {
	return parseInt(n + Math.random() * (m - n));
}
function a2d(n) {
	return n * Math.PI / 180;
}

//添加事件绑定
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
}
//删除事件绑定
function removeEvent(obj,sEv,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(sEv,fn,false);
    }else{
        obj.detachEvent('on'+sEv,fn);
    }
}
//添加鼠标滚轮事件
function addWheel(obj,fn){
    function fnWheel(ev){
        var oEvent = ev || event;
        var bDir = true;//true表示向下  false表示向上
        if(ev.wheelDelta){
            if(ev.wheelDelta<0){
                bDir = true;
            }else{
                bDir = false;
            }
        }else{
            if(ev.detail>0){
                bDir = true;
            }else{
                bDir = false;
            }
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
//DOM加载完成 window.onload
window.onload = function(){
	//控制section的高度
    var aSec = document.getElementsByTagName('section');
    function change(){
    	for (var i = 0; i < aSec.length; i++) {
        	aSec[i].style.height = viewHeight() + 'px';
    	}
    }
    change();
    window.addEventListener('resize',change,false);
    //页面滚动时出现导航条
    window.addEventListener('scroll',function(){
    	var oNav = document.getElementById('nav');
    	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    	if(scrollTop>60){
    		oNav.style.top = 0;
    	}else{
    		oNav.style.top = -60 + 'px';
    	}
    },false);



	//我的技能
	$(function(){
		$('#skill1').waterbubble({
			radius: 100,//水球半径
			//lineWidth: 5,//边框宽度
			data: 0.9,//数据多少
			waterColor: 'rgba(0, 255, 255, 1)',//水球颜色
			txt: 'JavaScript',//显示文本
			textColor: '#f09',//文本颜色
			font: 'bold 30px arial',//设置字体
			wave: true,//是否显示波纹
			animation: true//是否显示动画
		});
		$('#skill2').waterbubble({
			radius: 100,
			data: 0.8,
			waterColor: 'rgba(180, 255, 0, 1)',//水球颜色
			txt: 'HTML&CSS',//显示文本
			font: 'bold 30px arial',//设置字体
		});
		$('#skill3').waterbubble({
			radius: 100,
			data: 0.75,
			waterColor: 'rgba(0, 180, 255, 1)',//水球颜色
			txt: 'JQUERY',//显示文本
			font: 'bold 30px arial',//设置字体
		});
		$('#skill4').waterbubble({
			radius: 100,
			data: 0.8,
			waterColor: 'rgba(180, 0, 255, 1)',//水球颜色
			txt: 'HTML5&CSS3',//显示文本
			font: 'bold 30px arial',//设置字体
		});
	});

};

/*function $(id) {
 return document.getElementById(id);
 }*/

function viewWidth() {//获取可视区的宽度
    return window.innerWidth || document.documentElement.clientWidth;
}

function viewHeight() {//获取可视区的高度
    return window.innerHeight || document.documentElement.clientHeight;
}