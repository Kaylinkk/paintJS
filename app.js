const canvas =document.getElementById("jsCanvas");
const context =canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = document.getElementsByClassName("canvas")[0].innerWidth;
canvas.height = document.getElementsByClassName("canvas")[0].innerHeight;

const INITIAL_COLOR = "#2c2c2c";

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle =INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;




let painting = false;
let filling = false;


function stopPainting(event){
    painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        context.beginPath();
        context.moveTo(x,y);
    } else{
        context.lineTo(x,y);
        context.stroke();
    }
  
}

function changeColorClick(event){
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
}


function handleRangeChange(event){
    const brush = event.target.value;
    context.lineWidth = brush;
    context.fillStyle = brush;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "paint"
      
    }
}


function handleCanvasClick(){
    if(filling){
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
   
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href= image;
    link.download ="PaintingJS";
    link.click();
    
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove );
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
      //click: all lick action accors (proessed, released)
    //mousedown: fired the moment the button is intially pressed
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);

}

Array.from(colors).forEach(color=>color.addEventListener("click",changeColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick );
}

if(save){
    save.addEventListener("click", handleSaveClick);
}