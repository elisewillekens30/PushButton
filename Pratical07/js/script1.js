function pageLoaded() {

    var progress = true;

    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");
    
    var gamerInput = new GamerInput("None");
    var player = new GameObject("Player", "./img/mario.png");
    var playerInvers = new GameObject("Player", "./img/mario-invers.png");
    var background = new GameObject("Bg", "./img/bg.jpg");
    var flag = new GameObject("Flag", "./img/flag.png");
    var tuyau = new GameObject("Tuyau", "./img/tuyau.png");
    var win = new GameObject("Win", "./img/win.png");

    var playerWay = [player, playerInvers];

    var frames = 6;
    var currentFrame = 0;
    var x = 0;
    var initial = new Date().getTime();
    var current;

    player.x=5;
    player.y=318;

    var jump= false;

    //var changeWay=false;
    
   
    window.requestAnimationFrame(gameloop);
    window.addEventListener('keyup', input);
    window.addEventListener('keydown', input);
    

    function GameObject(name, image) {
        this.name = name;
        this.img = new Image();
        this.img.addEventListener('load', function() {
            console.log('load image');
        }, false);
        this.img.src= image;
        this.x = 0;
        this.y = 0;
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

    function GamerInput(input) {
        this.action = input; 
    }

    function draw() {
        if (x < 1300)x += 1;
        else x=0;
        context.drawImage(background.img, x, 0, 1300, 600, 0, 0, 1300 ,600); 
        context.save();
        animate();
        context.restore();  
        context.drawImage(flag.img, 1100, 220);  
        context.drawImage(tuyau.img, 500, 420); 
        if(!progress){
            context.drawImage(win.img, 50, 40);
         }
    }
        
    function animate() {
        current = new Date().getTime();
        if (current - initial >= 400) { 
            currentFrame = (currentFrame + 1) % frames; 
            initial = current; 
            } 
        if(jump){
            context.translate(20,-120);
            player.x+=20;
            jump=false;
        }
        if(player.x>=331&&player.x<=521)player.y=220;
        else player.y=320;
        
        context.drawImage(player.img, (player.img.width / 6) * currentFrame, 0, 203, 307, player.x, player.y, 203, 307);
        console.log(player.x + " " + player.y);
    }
    
        
    function update() {
        if(player.x>1030&&player.x<1100){
            progress=false;
        }else{
            if(gamerInput.action === "Left"){
                if(player.y>240){ //level route
                    if(player.x>=510 && player.x<=530)player.x+=0; 
                    else player.x-=5; 
               }else player.x-=5;
            }
            if(gamerInput.action === "Right"){
                if(player.y>240){ //level route
                     if(player.x>=321 && player.x<=331)player.x+=0;
                     else player.x+=5;
                }else player.x+=5;    
            }
            if(gamerInput.action === "Up"){
                jump=true;}
            if(gamerInput.action === "Down"){
                if(player.y<320) player.y+=5;
            } 
            }
        }
        

    function input(event) {
       //console.log("Keycode: " + event.keyCode);
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
                    break; //Down key*/
                default:
                    gamerInput = new GamerInput("None"); //No Input
            }
        } else {
            gamerInput = new GamerInput("None"); //No Input
        }
    }

};

