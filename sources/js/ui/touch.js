var touch = new (function(canvas){


// poly oritend clock
var contains = function( poly , p ){

	if( false )
		(function(){
			var ctx = document.getElementById('canvas2').getContext('2d')

			ctx.save()
			
			ctx.clearRect(0,0,200,200)
			
			ctx.translate( 100 , 100 )

			ctx.strokeStyle="#333"
			ctx.lineWidth = 1

			ctx.beginPath()
			ctx.rect(-100,-100,200,200)
			ctx.stroke()

			ctx.beginPath()
			ctx.moveTo(  poly[0].x    ,  poly[0].y   )
			for(var i=poly.length;i--;)
				ctx.lineTo(  poly[i].x    ,  poly[i].y   )
			ctx.stroke()

			ctx.beginPath()
			ctx.moveTo( 0,0 )
			ctx.lineTo( p.x , p.y )
			ctx.arc( p.x , p.y , 2, 0 ,Math.PI*2)
			ctx.stroke()

			ctx.restore()
		})()



	var ref = ( poly[0].x - poly[1].x ) * ( poly[2].y - poly[1].y ) - ( poly[0].y - poly[1].y ) * ( poly[2].x - poly[1].x )

	var a = poly[0],b

	for(var i=poly.length;i--;){
		b = a
		a = poly[i]


		var dot = ( a.y - b.y ) * ( p.x - a.x ) + ( b.x - a.x ) * ( p.y - a.y )
		
		if( Math.abs( dot ) > 0.0000001 && dot * ref > 0 )
			return false
	}

	return true
}

;(function(){
	var poly = [
		{x: 1,y: 1},
		{x: 1,y:-1},
		{x:-1,y:-1},
		{x:-1,y: 1},
	]
	if( contains( poly , {x:0,y:0}) !== true )
		console.log( "fail" )
	if( contains( poly , {x:2,y:0}) !== false )
		console.log( "fail" )

	poly = poly.reverse()

	if( contains( poly , {x:0,y:0}) !== true )
		console.log( "fail" )
	if( contains( poly , {x:2,y:0}) !== false )
		console.log( "fail" )


	var poly = [
		{ x: -22.62741699796952 , y: -88.3330048809536 },
		{ x: -67.88225099390856 , y: -68.6976682936512 },
		{ x: -22.62741699796952 , y: -49.06233170634881 },
		{ x: 22.62741699796952 , y: -68.6976682936512 },
	]

	if( contains( poly , {x: -32, y: -68}) !== true )
		console.log( "fail" )

	poly = poly.reverse()

	if( contains( poly , {x: -32, y: -68}) !== true )
		console.log( "fail" )


	var poly = [
		{ x: 0 , y: -19.635336587302394 },
		{ x: -45.25483399593904 , y: 0 },
		{ x: 0 , y: 19.635336587302394 },
		{ x: 45.25483399593904 , y: 0 },
	]

	if( contains( poly , {x: -11, y: -6}) !== true )
		console.log( "fail" )

	poly = poly.reverse()

	if( contains( poly , {x: -11, y: -6}) !== true )
		console.log( "fail" )
	
})()



this.collide = function(p){

	// TODO dichotomy this stuff up 
	// is this event possible?
	// I dont think so tim

	
	for(var i=0;i<renderer.zbuffer.length;i++){

		if( renderer.zbuffer[i].type != 'tile' )
			continue

		var h = map.get(  renderer.zbuffer[i].x , renderer.zbuffer[i].y ).h
		var faces = renderer.cubePoly( renderer.zbuffer[i].x , renderer.zbuffer[i].y , h )

		if( contains( faces[0] , p ) )
			return renderer.zbuffer[i]

		
		for(var j=1;j<faces.length;j++)
			if( contains( faces[j] , p ) )
				return	
		
	}
}


})(document.getElementById('canvas'))