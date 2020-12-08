function eventbut(){
    console.log('');
}

function pageLoaded() {

    var progress = true; // the games plays

    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");

    // init all image
    var gamerInput = new GamerInput("None");
    var player = new PlayerObject( "./img/mario.png", 6, 203, 307, 5, 318);
    var playerInvers = new PlayerObject( "./img/mario-invers.png", 6, 203, 307, 5, 318);
    var background = new GameObject("./img/bg.jpg", 1300, 600);
    var win = new GameObject("./img/win.png", 50, 40);
    var flag = new GameObject( "./img/flag.png", 1100, 220);
    var tuyau = new GameObject( "./img/tuyau.png", 500, 420);
    
    // init fonction
    var currentFrame = 0;
    var x = 0;
    var initial = new Date().getTime();

    // init move
    var current;
    var jump= false;
    var way=[];
    var affImage= player.img;
    var move = false;


    // init game
    window.requestAnimationFrame(gameloop);
    window.addEventListener('keyup', input);
    window.addEventListener('keydown', input);

    //init buton
    
    var butTop=document.querySelector('#top');
    butTop.onclick = function(){gamerInput = new GamerInput("Up");};
    //butTop.onmouseup= function(){gamerInput = new GamerInput("None");};

    var butDown=document.querySelector('#down');
    butDown.onmousedown = function(){gamerInput = new GamerInput("Down");};
    butDown.onmouseup= function(){gamerInput = new GamerInput("None");};

    var butLeft=document.querySelector('#left');
    butLeft.onmousedown = function(){gamerInput = new GamerInput("Left");};
    butLeft.onmouseup= function(){gamerInput = new GamerInput("None");};

    var butRight=document.querySelector('#right');
    butRight.onclick = function(){gamerInput = new GamerInput("Right");};
    butRight.onmouseup= function(){gamerInput = new GamerInput("None");};


    

    
    
    // function init object game
    function GameObject(image, posx, posy) {
        this.img = new Image();
        this.img.src= image;
        this.w = posx;
        this.h = posy;
    }

     // function init palyer game   
    function PlayerObject(image, frames, width, height, posx, posy) {
        this.img = new Image();
        this.img.src=image;
        this.frames=frames;
        this.w=width;
        this.h=height;
        this.x = posx;
        this.y = posy;
    }

    function GamerInput(input) {
        this.action = input; 
        console.log(this.action);
    }

    function gameloop() {
        if(progress){
            update();
            draw();
            window.requestAnimationFrame(gameloop);
        }else{
            console.log('win');
        } 
    }

    // function draw all image 
    function draw() {
        if (x < background.w)x += 1;
        else x=0;
        context.drawImage(background.img, x, 0, background.w, background.h, 0, 0, background.w ,background.h); 
        context.save();
        animate(); // call function for animate player
        context.restore();  
        context.drawImage(flag.img, flag.w, flag.h);  
        context.drawImage(tuyau.img, tuyau.w, tuyau.h); 
        if(!progress){
            context.drawImage(win.img, win.w, win.h);
         }
    }
     
    // function animate player 
    function animate() {
        current = new Date().getTime();
        if(move){
            if (current - initial >= 400) { 
                currentFrame = (currentFrame + 1) % player.frames; 
                initial = current; 
                } 
        }
        if(jump){ // if player should jump
            if(way[0]==='right'){
                context.translate(0,-120);
                player.x+=5;
            }
            if(way[0]==='left'){
                context.translate(0,-120);
                player.x-=5;
            }
            jump=false;
        }
        if(player.x>=331 && player.x<=521) player.y=220; // init y player placement
        else player.y=320;

        if(way[0]===way[1]){ // change direction of player 
            if(way[0]==='right')affImage=player.img; 
            if(way[0]==='left')affImage=playerInvers.img;
        }else affImage=playerInvers.img;

        context.drawImage(affImage, (player.img.width / player.frames) * currentFrame, 0, player.w, player.h, player.x, player.y, player.w, player.h);

    }
    
        
    function update() { // function control direction
        console.log(gamerInput.action);
        if(player.x>1030 && player.x<1100){
            progress=false;
        }else{
            if(gamerInput.action === "Left"){
                way.unshift('left'); // add left on tab way
                if(player.y>240){ //level road
                    if(player.x>=510 && player.x<=530)player.x+=0; 
                    else player.x-=5; 
               }else player.x-=5;
            }
            if(gamerInput.action === "Right"){
                way.unshift('right'); // add right on tab way
                if(player.y>240){ //level road
                     if(player.x>=321 && player.x<=331)player.x+=0;
                     else player.x+=5;
                }else player.x+=5;    
            }
            if(gamerInput.action === "Up"){
                jump=true;} // player jump
            if(gamerInput.action === "Down"){
                if(player.y<320) player.y+=5;
            } 
            }
        }
        

    function input(event) {
        move=true;
        if (event.type === "keydown") {
            switch (event.keyCode) {
                case 37: // Left Arrow
                    gamerInput = new GamerInput("Left");
                    break; //Left key
                case 38: // Up Arrow
                    gamerInput = new GamerInput("Up");
                    break; //Up key
                case 39: // Right Arrow
                    gamerInput = new GamerInput("Right");
                    break; //Right key
                case 40: // Down Arrow
                    gamerInput = new GamerInput("Down");
                    break; //Down key
                default:
                    gamerInput = new GamerInput("None"); //No Input
            }
        }else {
            gamerInput = new GamerInput("None"); //No Input
        }
    }

   

    

};

