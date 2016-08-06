$(document).ready( function () {

	var container,
		camera, renderer, controls,
		scene, man1, man2, man3;
	var manLoadedNum = 0;
	var clock = new THREE.Clock();

	$( '#missionStage1Man2' ).click( function () {

		$( '#missionSel' ).addClass( 'hide' );
		$( '#3dView' ).removeClass( 'hide' );

		init();

	} );

	function init() {

		container = document.getElementById( '3dView' );

		camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight, 0.1, 200 );
		camera.position.set( 0, 1.75, 0 );
		camera.up.set( 0, 1, 0 );

		scene = new THREE.Scene();
		scene.fog = new THREE.Fog( 0xcce0ff, 0, 100 );

		scene.add( new THREE.AmbientLight( 0x666666 ) );

		var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
		light.position.set( 1, 1, 1 ).normalize();
		scene.add( light );

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setClearColor( scene.fog.color );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( container.clientWidth, container.clientHeight );
		container.appendChild( renderer.domElement );

		controls = new THREE.FirstPersonControls( camera, renderer.domElement );
		controls.movementSpeed = 0;
		controls.lookSpeed = 0.05;
		controls.lookVertical = true;
		controls.constrainVertical = true;
		controls.verticalMin = Math.PI * 80 / 180;
		controls.verticalMax = Math.PI * 100 / 180;
		controls.lon = -90;

		var texLoader = new THREE.TextureLoader();
		var groundTexture = texLoader.load( './res/grasslight-big.jpg' );
		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		groundTexture.repeat.set( 30, 30 );
		groundTexture.anisotropy = 16;
		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 200, 200 ), new THREE.MeshLambertMaterial( { color: 0xffffff, map: groundTexture } ) );
		mesh.position.y = 0;
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;
		scene.add( mesh );

		man1 = new THREE.BlendCharacter();
		man1.load( './res/marine/marine_anims_core.json', function () {

			man1.scale.set( 0.01, 0.01, 0.01 );
			man1.position.set( -1, 0, -3 );
			scene.add( man1 );

			man1.applyWeight( 'idle', 1 );
			man1.applyWeight( 'walk', 0 );
			man1.applyWeight( 'run', 0 );

			man1.play( 'idle', 1 );

			manLoadedNum ++;
			if ( manLoadedNum > 2 ) {

				start();

			}

		} );
		man2 = new THREE.BlendCharacter();
		man2.load( './res/marine/marine_anims_core.json', function () {

			man2.scale.set( 0.01, 0.01, 0.01 );
			man2.position.set( 0, 0, 0 );
			//scene.add( man2 );

			man2.applyWeight( 'idle', 1 );
			man2.applyWeight( 'walk', 0 );
			man2.applyWeight( 'run', 0 );

			man2.play( 'idle', 1 );

			manLoadedNum ++;
			if ( manLoadedNum > 2 ) {

				start();

			}

		} );
		man3 = new THREE.BlendCharacter();
		man3.load( './res/marine/marine_anims_core.json', function () {

			man3.scale.set( 0.01, 0.01, 0.01 );
			man3.position.set( 1, 0, -3 );
			scene.add( man3 );

			man3.applyWeight( 'idle', 1 );
			man3.applyWeight( 'walk', 0 );
			man3.applyWeight( 'run', 0 );

			man3.play( 'idle', 1 );

			manLoadedNum ++;
			if ( manLoadedNum > 2 ) {

				start();

			}
			
		} );	

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( container.clientWidth, container.clientHeight );

		controls.handleResize();

	}

	function start() {

		requestAnimationFrame( animate );

	}

	function animate() {

		requestAnimationFrame( animate );

		var delta = clock.getDelta();

		man1.update( delta );
		man2.update( delta );
		man3.update( delta );

		controls.update( delta );

		renderer.render( scene, camera );

	}

} );