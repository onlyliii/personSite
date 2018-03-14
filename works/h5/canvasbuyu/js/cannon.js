
//炮
var CANNON_SIZE=[
	null,
	{w: 74, h: 74},
	{w: 74, h: 76},
	{w: 74, h: 76},
	{w: 74, h: 83},
	{w: 74, h: 85},
	{w: 74, h: 90},
	{w: 74, h: 94}
];

function Cannon(type){
	this.type = type;
	this.x = 444;
	this.y = 570;
	this.w = CANNON_SIZE[this.type].w;
	this.h = CANNON_SIZE[this.type].h;
	this.rotate = 0;
	this.cur = 0;
}

Cannon.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x, this.y);
	gd.rotate(d2a(this.rotate));
	gd.drawImage(JSON['cannon'+this.type], 0, this.cur*this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
	gd.restore();
};

Cannon.prototype.emitChange = function() {
	var _this = this;

	//开定时器前先清定时器
	clearInterval(this.timer);
	this.timer = setInterval(function(){
		_this.cur++;
		if(_this.cur == 5){
			_this.cur = 0;
			clearInterval(_this.timer);
		}
	}, 100);

};
