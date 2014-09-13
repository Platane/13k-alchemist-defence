renderer.renderParticule = function( entity , z , t ){

	var tmp1 = this.proj({ x:entity.x-map.width/2 , y:entity.y-map.height/2 , z:-entity.h*0.23  }),
		tmp

	this.ctx.beginPath()
	this.ctx.moveTo( tmp1.x , tmp1.y )
	for( var i=0;i<entity.traine.length;i++ ){
		tmp = this.proj({ x:entity.traine[i].x-map.width/2 , y:entity.traine[i].y-map.height/2 , z:-entity.traine[i].h*0.23  })
		this.ctx.lineTo(tmp.x,tmp.y)
	}
	this.ctx.strokeStyle= 'red'
	this.ctx.lineWidth= 2
	this.ctx.stroke()

	this.ctx.beginPath()
	this.ctx.arc( tmp1.x , tmp1.y , 4 , 0 ,  Math.PI*2 )
	this.ctx.fillStyle= 'red'
	this.ctx.fill()

}