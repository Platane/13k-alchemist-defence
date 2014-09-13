var towerPool=new (function(){

	this.towers = []

	this.addTower = function( x , y , type ){

		var tower = {
			type : type,
			r : dataTower[ type ].reload,
			x : x,
			y : y
		}

		this.towers.push( tower )
		map.get( x , y ).tower = tower
	}

	this.removeTower = function( x , y ){
		for( var i=this.towers.length;i--;)
			if( map.get( x , y ).tower == this.towers[i] ){
				this.towers.splice( i , 1 )
				map.get( x , y ).tower = null
			}
	}

	this.fire = function( tower ){




		// determine a target
		var rad = dataTower[ tower.type ].radiusSq + map.get( tower.x , tower.y ).h * map.get( tower.x , tower.y ).h
		var target,tx,ty
		for( var i=0;i<spartanPool.spartans.length;i++ ){

			target = spartanPool.spartans[ i ]

			var x=target.x - tower.x,
				y=target.y - tower.y

			var dd = x*x + y*y


			if( dd < rad && target.path.length > 2 )
				break
		}

		if( !target )
			return

		switch( dataTower[ tower.type ].fireClass ){
			case 'bell' : 
				// determine the future position
				var t = Math.sqrt( dd ) * 0.02 / 0.2 * 1.2

				var o = target,i=0

				while( true ){
					var dx = target.path[i].x - o.x,
						dy = target.path[i].y - o.y

					var l = Math.sqrt( dx*dx + dy*dy )

					if( t < l ){
						tx = o.x + dx / l * t
						ty = o.y + dy / l * t
						break
					}

					i++
					t -= l

					if( i==target.path.length )
						return
				}

				particulePool.add( tower.x + 0.5 , tower.y + 0.5 , tx , ty , null , function(){

					target.health -= dataTower[ tower.type ].damage

					target.shake = 5

					renderer.shake(3);

				})
			break

			case 'pull' :

				for( var i=0;i<spartanPool.spartans.length;i++ ){

					target = spartanPool.spartans[ i ]

					if( target.x |0 == tower.x ){

						var sens = target.y - tower.y > 0 ? 1 : -1

						var x = target.x|0

						for( var y = 0; y<3 ; y ++ ){
							var y = target.y|0 + y*sens
							if( mat.get( x , y ).h > 1 )
								target.path = this.alter ( map.aStar( target.x|0 , target.y|0 + y*sens  ) , 0.1 + Math.random() * 0.8 , 0.1 + Math.random() * 0.8 )


					}
						}
				}



		}

		


		tower.r = dataTower[ tower.type ].reload
	}

	this.tick = function( k ){

		for( var i=this.towers.length;i--;){

			if( this.towers[ i ].r -- <= 0 ){
				// fire
				this.fire( this.towers[i] )
			}
		}
	}

})();