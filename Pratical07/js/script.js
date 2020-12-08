function pageLoaded(){

    function FillColor(posX, posY){
        this.color=getRandomColor();
        this.posX=posX;
        this.posY=posY;
        this.height=c.height;
        this.width=c.width/4;
    }

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    widthRect= c.width/4;
    
    var fill1= new FillColor(0,0);
    var fill2= new FillColor(widthRect,0);
    var fill3= new FillColor(widthRect*2,0);
    var fill4= new FillColor(widthRect*3,0);

    var fill =[fill1,fill2,fill3,fill4];
    var but = document.querySelectorAll('.button');

    fill.forEach(elt => { 
        ctx.fillStyle = elt.color;
        ctx.fillRect(elt.posX, elt.posY, elt.width, elt.height);
        });

       
    but.forEach(function (buttons, idx) {
        buttons.addEventListener('click', function() {
            ctx.fillStyle = getRandomColor();
            console.log( ctx.fillStyle);
            ctx.fillRect(fill[idx].posX, fill[idx].posY, fill[idx].width, fill[idx].height);
        });
    });
    
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }


}


