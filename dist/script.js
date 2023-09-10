const canvas=document.querySelector("canvas");
toolBtns=document.querySelectorAll(".tool");
ctx=canvas.getContext("2d");
clearbtn=document.querySelector(".clear-canvas");
const saveImg=document.querySelector(".save-img"),

fillcolor=document.querySelector("#fill-color");
slider=document.querySelector("#slide");
colorBtns=document.querySelectorAll(".colors .option");
colorPicker=document.querySelector(".colors #color-picker");






let isDrawing=false;
let burshWidth=5;
let prevMosueX;
let prevMosueY,snapShot;
selectedTool="brush",
selectedColor="#000";
window.addEventListener("load",()=>
{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    setCanvasBackground();

})

const drawRect=(e)=>
{
    if(!fillcolor.checked)
    {
        ctx.strokeRect(e.offsetX,e.offsetY,prevMosueX-e.offsetX,prevMosueY-e.offsetY);

    }
    else
    ctx.fillRect(e.offsetX,e.offsetY,prevMosueX-e.offsetX,prevMosueY-e.offsetY);


}

const drawCircle=(e)=>
{
    ctx.beginPath(); //creating new path để draw hình tròn
    let radius=Math.sqrt(Math.pow(prevMosueX-e.offsetX,2)+Math.pow(prevMosueY-e.offsetY,2)) //e.offset vị trí chuột hiện tại
ctx.arc(prevMosueX,prevMosueY,radius,0,2*Math.PI);
fillcolor.checked?ctx.fill():ctx.stroke();
}

const drawTriangle=(e)=>
{
    ctx.beginPath(); //creating new path
    ctx.moveTo(prevMosueX,prevMosueY); //moving triangle
    ctx.lineTo(e.offsetX,e.offsetY); //creating a frist line according to the mouse
    ctx.lineTo(prevMosueX*2-e.offsetX,e.offsetY);//tạo 2 canh tam giác
    ctx.closePath(); //closing lại path tạo bởi  2 cạnh => the third linie draw automatically
    fillcolor.checked?ctx.fill():ctx.stroke();
}

const startDraw=(e)=>
{
    isDrawing=true;
    prevMosueX=e.offsetX; // vị trí chuột trước đó
    prevMosueY=e.offsetY;
    ctx.beginPath(); //fix lỗi di chuọt
    ctx.strokeStyle=selectedColor;
    ctx.fillStyle=selectedColor;

    ctx.lineWidth=burshWidth;
    snapShot=ctx.getImageData(0,0,canvas.width,canvas.height); //tránh hình bị lặp
}
const drawing=(e)=>
{
    if(!isDrawing)
    return;
ctx.putImageData(snapShot,0,0);
if(selectedTool==="brush" ||selectedTool=="eraser")
{
    ctx.strokeStyle=selectedTool==="eraser"?"#fff":selectedColor;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}
else if(selectedTool==="retangle")
{
drawRect(e);
}
else if(selectedTool==="circle")
{
drawCircle(e);
}
else
{
    drawTriangle(e);
}

}



toolBtns.forEach((btn)=>
{
     btn.addEventListener("click",()=>
{
    document.querySelector(".active").classList.remove("active");
    btn.classList.add("active");
    selectedTool=btn.id;
})
})


colorBtns.forEach((btn)=>
{
    btn.addEventListener("click",()=>
    {
    document.querySelector(".options .selected").classList.remove("selected");

    btn.classList.add("selected");
    selectedColor=window.getComputedStyle(btn).getPropertyValue("background-color"); 
    console.log(selectedColor);
    })
})

slider.addEventListener("change",()=>
{
    burshWidth=slider.value;
})


colorPicker.addEventListener("change",()=>
{
    colorPicker.parentElement.style.background=colorPicker.value;
    colorPicker.parentElement.click();
})



clearbtn.addEventListener("click",()=>
{
ctx.clearRect(0,0,canvas.width,canvas.height);
setCanvasBackground();

})

const setCanvasBackground=()=>
{
    ctx.fillStyle="#fff";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle=selectedColor;

}


saveImg.addEventListener("click",()=>
{
const link=document.createElement("a");
link.download=`${Date.now()}.jpg`;
link.href=canvas.toDataURL();
console.log(link.download,link.href);
link.click(); //nhấn vào để dowload
})



canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=>
{
    isDrawing=false;
});
