renderer.renderTower = function(x,y,h,entity,z){

	this.ctx.fillStyle= '#'+( 1221313 + (x*x*17%131)*12121 + (y*y*y%127)*123121  + x * 1231 + y * 421 ).toString(16).substr(0,6)
	
	var v = ((1-z)*255)<<0
	this.ctx.strokeStyle= 'rgb('+ v + ','+ v + ','+ v + ')'
	this.ctx.lineWidth= 0.1
	this.ctx.lineCap= 'round'

	h*=0.23
	x-=map.width/2
	y-=map.height/2
	var d=0.2,k=0.6

	var faces = []

	if( this.rotationClass >> 1 == 1 )

			faces.push([
				renderer.proj({x:x+d , y:y+d, z:-h  }),
				renderer.proj({x:x+d , y:y+1-d, z:-h  }),
				renderer.proj({x:x+d , y:y+1-d, z:-h-k   }),
				renderer.proj({x:x+d , y:y+d, z:-h-k   })
			])

	else

			faces.push([
				renderer.proj({x:x+1-d , y:y+d, z:-h  }),
				renderer.proj({x:x+1-d , y:y+1-d, z:-h  }),
				renderer.proj({x:x+1-d , y:y+1-d, z:-h-k   }),
				renderer.proj({x:x+1-d , y:y+d, z:-h-k   })
			])
		

	if( this.rotationClass == 1 || this.rotationClass == 2 )

			faces.push([
				renderer.proj({x:x+d , y:y+d, z:-h  }),
				renderer.proj({x:x+1-d , y:y+d, z:-h  }),
				renderer.proj({x:x+1-d , y:y+d, z:-h-k  }),
				renderer.proj({x:x+d , y:y+d, z:-h-k  })
			])

	else

			faces.push([
				renderer.proj({x:x+d , y:y+1-d, z:-h  }),
				renderer.proj({x:x+1-d , y:y+1-d, z:-h  }),
				renderer.proj({x:x+1-d , y:y+1-d, z:-h-k  }),
				renderer.proj({x:x+d , y:y+1-d, z:-h-k  })
			])
	

	faces.unshift([
		renderer.proj({x:x+d, y:y+d, z:-h-k}),
		renderer.proj({x:x+1-d, y:y+d, z:-h-k}),
		renderer.proj({x:x+1-d, y:y+1-d, z:-h-k}),
		renderer.proj({x:x+d, y:y+1-d, z:-h-k})
	])

	this.ctx.beginPath()

	
	for(var i=faces.length;i--;)
		this.poly( faces[i] )

	this.ctx.fill()
	this.ctx.stroke()

}