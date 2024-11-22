const playground = document.createElement("div");
playground.id = "playground";
playground.style.position = "absolute";
playground.style.zIndex= "-1"
playground.style.background = "black"
playground.style.width = "20000px"; 
playground.style.height = "20000px"; 
playground.style.border = "2px solid black";
document.body.appendChild(playground);
document.body.style.zoom = "100%";

var eyeBall = document.createElement("div");
eyeBall.id = "eyeBall";
eyeBall.style.position = "absolute";
eyeBall.style.height = "50px";
eyeBall.style.width = "50px";
eyeBall.style.background = "blue";
eyeBall.style.borderRadius = "50%";
eyeBall.style.left = "50%";
eyeBall.style.top = "50%";
eyeBall.style.transform = "translate(-50%,-50%)";

playground.appendChild(eyeBall);

function scrollpage(){
    var eyeBallRect = eyeBall.getBoundingClientRect()
    
    if(!(eyeBallRect.right<window.innerWidth -10)){
        window.scrollBy(50, 0);
    }
    if(!(eyeBallRect.top > 10 )){
        window.scrollBy(0,-50);
    }
}


class dotclass {
    constructor(i) {
        this.element = document.createElement("div");
        this.element.id = "dot"+ i;
        this.element.style.zIndex = "-1";
        this.element.style.position = "absolute";
        this.element.style.height = "10px";
        this.element.style.width = "10px";
        this.element.style.background = "red";
        this.element.style.borderRadius = "50%";
        playground.appendChild(this.element);
        this.randomPosition();
    }

    randomPosition() {
        const playgroundRect = playground.getBoundingClientRect();
        const randomX = Math.random() * (playgroundRect.width - 10); 
        const randomY = Math.random() * (playgroundRect.height - 10);
        this.element.style.left = `${randomX}px`;
        this.element.style.top = `${randomY}px`;
    }

    checkOverlap() {
        const eyeBallRect = eyeBall.getBoundingClientRect();
        const dotRect = this.element.getBoundingClientRect();
        return !(eyeBallRect.right < dotRect.left - 20 ||
                 eyeBallRect.left > dotRect.right - 20 ||
                 eyeBallRect.bottom < dotRect.top - 20 ||
                 eyeBallRect.top > dotRect.bottom - 20 
);
    }
    
}

let dots = [];
for (let i = 0; i < 2500; i++) { 
    dots.push(new dotclass(i));
}

document.onmousemove = (event) => {
    const playgroundRect = playground.getBoundingClientRect();
    const x = ((event.clientX - playgroundRect.left) * 100) / playgroundRect.width + "%";
    const y = ((event.clientY - playgroundRect.top) * 100) / playgroundRect.height + "%";
    eyeBall.style.transition = "0s";
    eyeBall.style.left = x;
    eyeBall.style.top = y;
    
    
   
    
   
 
    
    dots.forEach(dot => {
        if (dot.checkOverlap()) {
        
            var currentWidth = parseInt(window.getComputedStyle(eyeBall).width);
            var currentHeight = parseInt(window.getComputedStyle(eyeBall).height);
            eyeBall.style.width = (currentWidth + 5) + "px";
            eyeBall.style.height = (currentHeight + 5) + "px";

          
            dot.randomPosition();
            if(parseInt(eyeBall.style.height)%100 == 0){
                zoompage();
            }
            
        }
    });
};

function scrollpage(){
    const eyeBallRect = eyeBall.getBoundingClientRect()
    
    if(!(eyeBallRect.right< window.innerWidth -100)){
        window.scrollBy(50, 0);
    }
    if(!(eyeBallRect.left > 100)){
        window.scrollBy(-50,0);
    }
    if(!(eyeBallRect.top > 100 )){
        window.scrollBy(0,-50);
    }
    
    if(!(eyeBallRect.bottom < window.innerHeight -100))
    {
        window.scrollBy(0,50);
    }
}
function zoompage(){
   i = document.body.style.zoom;
   i = parseInt(i) - 5 +"%"
   document.body.style.zoom = i;
}

setInterval(scrollpage);