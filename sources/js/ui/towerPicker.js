var towerPicker = new (function(canvas){

	this.contextMenu = function(x,y){

	}

	var menu = document.getElementById('menu')

	var currentDrag;
	var lastHover = {x:0,y:0}

	var mousedown = function(){
		currentDrag = this.getAttribute('data-i')

		document.addEventListener('mousemove',mousemove,false)
		document.addEventListener('mouseup',mouseup,false)
	}
	var mouseup = function(){
		document.removeEventListener('mousemove',mousemove,false)
		document.removeEventListener('mouseup',mouseup,false)

		if( lastHover ){
			towerPool.addTower(lastHover.x,lastHover.y,currentDrag)

			map.get(lastHover.x , lastHover.y).hover = false
		}
		
	}
	var mousemove = function( e ){

		if( lastHover )
			map.get(lastHover.x , lastHover.y).hover = false

		if( (lastHover=touch.collide( {x:e.pageX -canvas.width/2 , y:e.pageY - canvas.height/2  } ) ) ){

			map.get(lastHover.x , lastHover.y).hover = true

		}
	}

	this.init = function( dataElement ){
		var html = '<ul>'
		for(var i in dataElement ){
			html+='<li data-i="'+i+'">'+i+'</li>'
		}
		html+='</ul>'
		menu.innerHTML = html

		var lis = menu.querySelectorAll('li')
		for( var i = lis.length;i--;)
			lis[i].addEventListener('mousedown',mousedown,false)
	}

})(document.getElementById('canvas'));