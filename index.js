document.addEventListener('DOMContentLoaded', function () {
	var title = document.querySelector('#title');
	var boxDuck = document.querySelector('.boxDuck');
	var foot    = document.querySelector('.foot');
	var wrapper = document.querySelector('.wrapper');
	var cartridges = document.querySelectorAll('.cartridge');
	var audio  = document.getElementById('audio');

	var maxCartrides = cartridges.length;
	var numCartr = 0;
	var	maxH = parseInt(getComputedStyle(wrapper).height) - parseInt(getComputedStyle(foot).height) - 200;
	var	maxW = parseInt(getComputedStyle(wrapper).width) - 100;
	var numDeadDuck = 0;
	var DuckTimer = [];
	var gOver = false;

	var ducks = document.querySelectorAll('.duck');
	var nDucks = ducks.length;

	var dog = document.querySelector('.dog');

	setTimeout(function () {
  		dog.classList.add('dog_walk');
 	});

  	setTimeout(function () {
   		dog.classList.remove('dog_walk');
   		dog.classList.add('dog_jump');

   		setTimeout(function () {
   			game(nDucks);

   			setTimeout(function () {
   				if (!gameOver) {
    			gameOver();
   				}
   				var title2 = document.createElement('div');
				title2.classList = 'title2';
				title2.textContent = 'КОНЕЦ ИГРЫ!'
				wrapper.appendChild(title2);
  			}, 10100);

    	},1200);

  	}, 4000);

  	
	function game(numDuck){

	wrapper.addEventListener('click', function (ev) {

		if(maxCartrides > 0){
			audio.pause();
			audio.currentTime = 0;
			audio.play();
			--maxCartrides;
		    cartridges[numCartr].classList.remove('cartridge');
		    ++numCartr;
		} else{
			gOver = true;
			gameOver();
		}
	});

	for (let i = 0; i < numDuck; i++){

		ducks[i].addEventListener('click', function (ev) {
			if (ev.target.classList.contains('duck_fly') && maxCartrides > 0) {
		    	clearInterval(DuckTimer[i]);
		    	removeFly(ev.target); 
		    	ev.target.classList.add('dead');
		    	ev.target.style.bottom = -200 + 'px';
		    	numDeadDuck++;
	  		}
		});

		randomXY(ducks[i]); 

		var Timer = setInterval(function () {
	 		randomXY(ducks[i]); 
		}, 1500);

		DuckTimer.push(Timer);
	}

	 function flyDerect(duckk, nX, nY ){
	    removeFly(duckk);
		if ( nX < parseInt(getComputedStyle(duckk).left) ) {
			if ( nY <= parseInt(getComputedStyle(duckk).bottom) ) {
				duckk.classList.add('duck_fly_top_left');
			}else{
				duckk.classList.add('duck_fly_left');
			}
		}else{
			if ( nY <= parseInt(getComputedStyle(duckk).bottom)) {
				duckk.classList.add('duck_fly_top_right');
			} else {
				duckk.classList.add('duck_fly_right');
			}
		}
	}

	function randomXY(duc) {
		var X = Math.random() * maxW;
		var Y = Math.random() * maxH;
		flyDerect(duc, X, Y);
		duc.style.left = X + 'px';
		duc.style.bottom = Y + 'px';  
	};
	};

	function removeFly(cl) {
		cl.classList.remove('duck_fly_top_right');
		cl.classList.remove('duck_fly_left');
		cl.classList.remove('duck_fly_right');
		cl.classList.remove('duck_fly_top_left');
	};

	function gameOver(){
		for(let n = 0; n < DuckTimer.length; n++){
				clearInterval(DuckTimer[n]);
			}
		setTimeout(function () {
			for (let i = 0; i < nDucks; i++){
				if(!ducks[i].classList.contains('dead')){
					removeFly(ducks[i]); 
		    		ducks[i].classList.add('fall');
		    		ducks[i].style.bottom = -200 + 'px';
				}
			}
		}, 1000);

		dog.classList.remove('dog_jump');
		dog.classList.remove('dog');

		 if(numDeadDuck){
		 	dog.classList.add('dogDuck');
		 } else{
		 	dog.classList.add('dogNull');
		 }

		title.textContent =  numDeadDuck * 10 + ' очков из ' + nDucks*10;


	};

	
});
