turkSetAssignmentID();

var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
var mouseClickPosition =[];
var imgObj = new Image();
imgObj.onload = function(){
    renderGraphic()
}
var searchParam = new URLSearchParams(window.location.search)
var image1Value = searchParam.get("image")
// console.log(document.getElementById("image").src)
console.log(image1Value)

// imgObj.src="https://floydesk.com/wp-content/uploads/2019/10/p1.jpg"
imgObj.src=image1Value

// var imagePath = turkGetParam('image');
// document.getElementById('myImage').src = imagePath;
// turkSetAssignmentID();

canvas.addEventListener("mousedown", function(evt){
    var mousePos = getMousePos(evt);
    mouseClickPosition.push(mousePos);
    renderGraphic();
    console.log(mouseClickPosition);
    var dots = mouseClickPosition.map((value)=> ["{"+value.xCoord,value.yCoord+"}"]);
    document.querySelector("#imageDots").value = dots;


},false)

function getMousePos(evt){
    var mousePosX = evt.clientX;
    var mousePosY = evt.clientY;
    var rect = canvas.getBoundingClientRect()
    var xCoord = mousePosX - rect.left
    var yCoord = mousePosY - rect.top

    return {xCoord, yCoord}
}

function renderGraphic(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imgObj,0,0)
    var width = 5;
    var height = 5;
    
    context.fillStyle = "rgba(0, 0, 255, 0.6)";

    if(mouseClickPosition.length > 0){
        for (i = 0; i < mouseClickPosition.length; i++){
            var nowPos = mouseClickPosition[i]
            context.fillRect(nowPos.xCoord,nowPos.yCoord,width,height);
            if(i==0){
                context.beginPath();
                
            }else if(i>0){
                var prevPos = mouseClickPosition[i-1]
                context.moveTo(prevPos.xCoord, prevPos.yCoord)
                context.lineTo(nowPos.xCoord, nowPos.yCoord)
                context.strokeStyle='rgba(255, 0, 0, 0.5)';
                context.lineWidth = 4;
                context.lineCap = 'round';
                context.stroke()
                
            }
        }
        
    }

}
document.querySelector("#undo").addEventListener("click",function(evt){
    mouseClickPosition.pop()
    renderGraphic()

})

