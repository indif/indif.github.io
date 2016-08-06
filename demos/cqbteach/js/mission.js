$(document).ready( function () {

	var container,
		camera, renderer, controls,
		scene, man1, man2, man3;
	var clock = new THREE.Clock();
	var man1Pos = new THREE.Vector3( 28.5, 0, 18.5 ),
		man2Pos = new THREE.Vector3( 28, 0, 22),
		man3Pos = new THREE.Vector3( 27, 0, 20),
		man2EyePos = new THREE.Vector3(),
		man1HeadPos = new THREE.Vector3();
	man2EyePos.copy( man2Pos );
	man2EyePos.y = 1.75;
	man1HeadPos.copy( man1Pos );
	man1HeadPos.y = 1.75;
	var manLoadedNum = 0;

	$( '#missionStage1Man2' ).click( function () {

		$( '#missionSel' ).addClass( 'hide' );
		$( '#3dView' ).removeClass( 'hide' );

		init();

	} );

	function init() {

		container = document.getElementById( '3dView' );

		camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight, 0.1, 200 );
		camera.position.copy( man2EyePos );
		camera.up.set( 0, 1, 0 );
		camera.lookAt( man1HeadPos );

		scene = new THREE.Scene();
		scene.fog = new THREE.Fog( 0xcce0ff, 0, 100 );

		scene.add( new THREE.AmbientLight( 0x666666 ) );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( 1, 1, 1 ).normalize();
		scene.add( light );

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setClearColor( scene.fog.color );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( container.clientWidth, container.clientHeight );
		container.appendChild( renderer.domElement );

		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.options.upAxis = 'Y';
		loader.load( './res/scene/scene.dae', function ( collada ) {

			var model = collada.scene;
			model.scale.set( 0.03, 0.03, 0.03 );
			scene.add( model );

		} );

		man1 = new THREE.BlendCharacter();
		man1.load( './res/marine/marine_anims_core.json', function () {

			man1.scale.set( 0.01, 0.01, 0.01 );
			man1.position.copy( man1Pos );
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
			man2.position.copy( man2Pos );
			scene.add( man2 );
			man2.visible = false;

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
			man3.position.copy( man3Pos );
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
		window.addEventListener( 'keyup', function( event ) {

			if ( event.keyCode === 84 /*T*/ ) {

				toggleControls();
			
			}
		
		});

	}

	function onWindowResize() {

		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( container.clientWidth, container.clientHeight );

		controls.handleResize();
		
	}

	function start() {

		requestAnimationFrame( animate );

		toggleControls();

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

	function toggleControls() {

		if ( !!controls && controls instanceof THREE.FirstPersonControls ) {

			controls.dispose();

			controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.target.copy( man1HeadPos );
			controls.maxDistance = 20;
			controls.maxPolarAngle = Math.PI / 2;

			man2.visible = true;

		} else {

			if ( !!controls ) {

				controls.dispose();

			}

			camera.position.copy( man2EyePos );
			camera.up.set( 0, 1, 0 );
			camera.lookAt( man1HeadPos );

			controls = new THREE.FirstPersonControls( camera, renderer.domElement );
			controls.movementSpeed = 0;
			controls.lookSpeed = 0.05;
			controls.lookVertical = true;
			controls.constrainVertical = true;
			controls.verticalMin = Math.PI * 80 / 180;
			controls.verticalMax = Math.PI * 100 / 180;
			controls.lon = -90;

			man2.visible = false;

		}

	}

} );