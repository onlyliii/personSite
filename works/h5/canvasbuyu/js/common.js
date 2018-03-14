//所有资源
var JSON = {};

//加载游戏资源
function readImage(arr,fnSucc,fnLoading){
	var count = 0;
	var oImg;

	for (var i = 0; i < arr.length; i++) {
		oImg = new Image();
		(function(index){
			oImg.onload = function(){
				count++;
				//保存oImg对象
				JSON[arr[index]] = this;
				fnLoading && fnLoading(count,arr.length);
				if(count == arr.length){
					fnSucc && fnSucc();
				}
			};
		})(i);
		oImg.src = 'img/'+arr[i]+'.png';
	}
}
//弧度转角度
function a2d(n){
	return n/Math.PI*180;
}
//角度转弧度
function d2a(n){
	return n/180*Math.PI;
}
//随机数
function rnd(n,m){
	return parseInt(Math.random()*(m - n)+n);
}