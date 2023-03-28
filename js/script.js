// set elements as variables (classes, id's, and document's body)
const cursor = document.querySelector('#crosshair');
const startBtn = document.querySelector('.btn .start-btn');
const stopBtn = document.querySelector('.btn .stop-btn');
const container = document.getElementsByClassName("container");
const clownFace = document.getElementById("clownface");
const score = document.querySelector('.score span');
const miss = document.querySelector('#miss-pts');
const bodyHeight = document.body.clientHeight;
const bodyWidth = document.body.clientWidth;
const gridContainer = document.querySelector('.grid-container');
const headerHeight = gridContainer.clientHeight;
const timeLeft = document.getElementById("timeLeft");
const timer = document.getElementById("timer");
const explosion = document.getElementById("explosion");

// when you move the mouse in the browser's window, the crosshair image is used as the mouse cursor according to the document's horizontal and vertical coordinates
window.addEventListener('mousemove', (e) => {
    
    // sets the top and left position of the document's horizontal and vertical coordinates for the crosshair image
    cursor.style.top = e.pageY + "px"
    cursor.style.left = e.pageX + "px"
});

// when you click in the browser's window, animation for the crosshiar is executed and a gunshot audio is played
window.addEventListener('click', () => {
    cursor.style.animation = 'none'
    const gunShot = new Audio('audio/gun-shot.wav');
    gunShot.play();
    
    // executes shoot_effect animation for crosshair once in 1 ns from css
    setTimeout(() => {
        cursor.style.animation = ''
    }, 1)
});

// when you click the start button, the game starts
startBtn.addEventListener('click', () => {
    
    // hides start button to prevent user from stacking games on top of one another
    startBtn.style.visibility = "hidden";
    
    // clown image appears 
    clownFace.style.visibility = "visible";
    
    // score (points) reset to zero for new game
    score.innerHTML = '0';
    
    // background set back to default color of webpage
    document.body.style.backgroundColor = '#FFFF77';

    // create variables
    let points = 0;
    points = 0;
    let misses = -1;
    let counter = 0;
    let second;
    let third;
    let fourth;

    // set audio variables
    const music = new Audio('audio/bg-audio.wav');
    const laugh = new Audio('audio/evillaugh.wav');
    const winner = new Audio('audio/youWin.wav');
    // play game audio
    music.play();
    
    // play laugh audio
    laugh.play();

    // reset time bar
    timeLeft.style.width = 0;

    // executes time bar countdown every second (1000 ns)
    const timerBar = setInterval(() => {
        
        // set variable num to a float number
        // gets the inner width of the element timer and divde by 47 because the game lasts about 47 seconds
        let num = parseFloat(timer.clientWidth / 47);

        // timeLeft starts at 0 width and for every second, it adds the variable num to the width, white is the white color, giving it a countdown effect
        // in 47 seconds, it should fill the width
        if (timeLeft.clientWidth < timer.clientWidth) {
            timeLeft.style.width = timeLeft.clientWidth + num + "px";
            
        // if time bar reaches end, stop loop interval of timebar
        } else {
            timeLeft.style.width = timer.clientWidth + "px";
            clearInterval(timerBar);
        }

    }, 1000);


    // executes first move of the clown image after 1 second
    let first = setTimeout(() => {
        
        // calculates x and y variable coordinates as a whole number depending on the size of the browser's window
        let y = Math.floor(Math.random() * window.innerHeight);
        let x = Math.floor(Math.random() * window.innerWidth);

        // if y coordinates is inside the header, add header height to y so that the clown image doesn't move into the header area
        if (y < headerHeight) {
            y += headerHeight;
        }

        // transition the clown face from one coordinate to another in 3 seconds
        clownFace.style.transition = 'left 3s, top 3s';

        // set the clown image x and y coordinate
        clownFace.style.top = y + 'px';
        clownFace.style.left = x + 'px';
    }, 1000);


    // executes a loop to move the clown image from one coordinate to another every 3210 ns (I tried to correlate the different levels with the audio)
    second = setInterval(() => {

        // counter variable will be used to speed up the clown image for different level
        counter++;
        
        // when counter equals 8, second level interval ends and third level interval starts
        if (counter === 8) {

            // second level loop ends
            clearInterval(second);
            
            // executes a loop for third level interval every 1500 ns
            third = setInterval(() => {
                
                // background changes to black
                document.body.style.backgroundColor = 'black';
                counter++
                
                // when counter equals 17, third level interval ends and fourth level interval starts
                if (counter === 17) {


                    // third level loop ends
                    clearInterval(third)
                    
                    // executes a loop for fourth level interval every 1000 ns
                    fourth = setInterval(() => {
                        
                        // executes bg_effect animation for background color once every .5 ns
                        document.body.style.animation = 'none'

                        setTimeout(() => {
                            document.body.style.animation = ''
                        }, .5)

                        counter++
                        
                        // when counter equals 25, fourth level interval ends and game ends
                        if (counter === 25) {

                            // fourth level loop ends
                            clearInterval(fourth)
                            
                            // hides clown image
                            clownFace.style.visibility = "hidden";
                            
                            // sets background color back to default of webpage
                            document.body.style.backgroundColor = '#FF0000';
                            
                            // audio stops
                            music.pause();
                            
                            // audio plays where there's a laugh because you didn't win the game if you got to this part
                            laugh.play();
                            
                            // ends the function banBangFunction
                            window.removeEventListener('click', bangBangFunction, false);
                        }
                        let y = Math.floor(Math.random() * window.innerHeight);
                        let x = Math.floor(Math.random() * window.innerWidth);


                        if (y < headerHeight) {
                            y += headerHeight;
                        }
                        clownFace.style.transition = 'none';
                        clownFace.style.top = y + 'px';
                        clownFace.style.left = x + 'px';
                        clownFace.style.transition = 'none';
                    }, 1000)
                }

                let y = Math.floor(Math.random() * window.innerHeight);
                let x = Math.floor(Math.random() * window.innerWidth);


                if (y < headerHeight) {
                    y += headerHeight;
                }
                clownFace.style.transition = 'left 1s, top 1s';
                clownFace.style.top = y + 'px';
                clownFace.style.left = x + 'px';

            }, 1500)
        }

        let y = Math.floor(Math.random() * window.innerHeight);
        let x = Math.floor(Math.random() * window.innerWidth);


        if (y < headerHeight) {
            y += headerHeight;
        }
        clownFace.style.transition = 'left 3s, top 3s';
        clownFace.style.top = y + 'px';
        clownFace.style.left = x + 'px';

    }, 3210)


    // when you click in the window's browser, you invoke bangBangFunction
    window.addEventListener('click', bangBangFunction);

    // this function adds points and misses to the scoreboard
    function bangBangFunction(e) {
        // set audio laugh
        const laugh = new Audio('audio/evillaugh.wav');
        
        // when you click in the window's browser and don't hit the clown image with the cursor crosshair
        if (e.target != clownFace) {
            // adds 1 to misses
            miss.innerText = ++misses;
        }
        
        // when you click in the window's browser and hit the clown image with the cursor crosshair
        if (e.target === clownFace) {
            
            // executes hit_effect animation on clown image once every 1 ns
            clownFace.style.animation = 'none'

            setTimeout(() => {
                clownFace.style.animation = ''
            }, 1)
            
            // if counter is 7 or less, every hit will count as 1 point and will be added to your score
            if (counter <= 7) {
                laugh.play();
                points += 1;

                // set the text inside the score element to display your points
                score.innerText = points;
            }

            // if counter is between 8 and 16, every hit will count as 5 points and will be added to your score
            if ((counter >= 8) && (counter <= 16)) {
                laugh.play();
                points += 5;

                score.innerText = points;
            }

            // if counter is between 17 and 25, every hit will count as 25 points and will be added to your score
            if ((counter >= 17) && (counter <= 25)) {
                laugh.play();
                points += 25;

                score.innerText = points;
            }
            
            // if your points reach 400 or greater and your misses is 20 or less, you win
            if ((points >= 400) && (misses <= 20)) {
                
                // set audio for explosion image
                const boom = new Audio('audio/boom-boom.wav');
                
                // hides start button
                startBtn.style.visibility = "hidden";
                
                // game music stops
                music.pause();
                
                // explostion audio is played
                boom.play();
                
                // ends all loop intervals 
                clearInterval(second);
                if ((counter >= 8) && (counter <= 16)) {
                    clearInterval(third);
                }
                if ((counter >= 17) && (counter <= 25)) {
                    clearInterval(fourth);
                }
                
                // hides clown image
                clownFace.style.visibility = "hidden";
                
                // sets explosion image to last clown face image coordinates
                explosion.style.top = clownFace.style.top;
                explosion.style.left = clownFace.style.left;
                
                // explosion image appears
                explosion.style.visibility = "visible";
                
                // stops time bar
                clearInterval(timerBar);
                
                // executes boom_effect animation for explosion image once every 1 ns
                explosion.style.animation = 'none'

                setTimeout(() => {
                    explosion.style.animation = ''
                }, 1);
                
                // sets background color to green for winning stage
                document.body.style.backgroundColor = '#00FF00';

                // hides explsion image after 2 seconds
                setTimeout(() => {
                    explosion.style.visibility = "hidden";
                }, 2000);
                
                // winning audio is played
                winner.play();

            }
        }
    }
    

    // stops everything in game
    stopBtn.addEventListener('click', () => {
        
        // game music stops
        music.pause();
        
        // winner music stops (if at that stage)
        winner.pause();
        
        // shows starts button
        startBtn.style.visibility = "visible";
        
        // stops time bar
        clearInterval(timerBar);
        
        // stops bangBangFunction
        window.removeEventListener('click', bangBangFunction, false);
        
        // sets background color back to default of webpage
        document.body.style.backgroundColor = '#FFFF77';
        
        // stops all intervals of clown image movement
        clearInterval(second);
        
        if ((counter >= 8) && (counter <= 16)) {
            clearInterval(third);
        }
        if ((counter >= 17) && (counter <= 25)) {
            clearInterval(fourth);
        }
        
        // hides clown face
        clownFace.style.visibility = "hidden";

    });

})