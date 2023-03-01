let speed = 30;
let scale = 0.1;
let canvas;
let ctx;
let logoColor;
let image = {
    x: 200,
    y: 300,
    xspeed: 10,
    yspeed: 10,
    img: new Image()
};
(function main(){
    canvas = document.getElementById("screen");
    ctx = canvas.getContext("2d");
    image.img.src = picture
    var header = document.getElementsByClassName("header")[0];
    canvas.width = window.innerWidth-image.x;
    canvas.height = window.innerHeight-image.y;
    console.log(window.innerWidth);
    console.log(canvas.height);
    console.log(header.offsetHeight);
    update(header);
})();

function update(header) {
    setTimeout(() => {
        checkWindowchange(header);
        ctx.fillStyle= 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = logoColor;
        ctx.fillRect(image.x, image.y, image.img.width*scale, image.img.height*scale);
        ctx.drawImage(image.img, image.x, image.y, image.img.width*scale, image.img.height*scale);
        image.x+=image.xspeed;
        image.y+=image.yspeed;
        checkHitBox();
        update(header);
    }, speed)
}

function checkWindowchange(header) {
    console.log(canvas.width)
    console.log(window.innerWidth)
    if (canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
        canvas.width  = window.innerWidth - 20;
        canvas.height = window.innerHeight - header.offsetHeight;
    }
}

function checkHitBox(){
    if(image.x+image.img.width*scale >= canvas.width || image.x <= 0){
        image.xspeed *= -1;
    }
        
    if(image.y+image.img.height*scale >= canvas.height || image.y <= 0){
        image.yspeed *= -1;
    }    
}