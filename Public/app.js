if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
}

var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0, 0, 0);
var camera = new BABYLON.ArcRotateCamera("camera1",0,0,0, new BABYLON.Vector3(0,0,0), scene);
//camera.setPosition(new BABYLON.Vector3(0,0,0));
camera.setPosition(new BABYLON.Vector3(-1.5,0.5,0));
camera.radius=2;
//camera.attachControl(canvas);

var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 0, 0), scene);
light.intensity = 0.5;

var planes = [];
var dynamics = [];
var mats = [];
var contexts = [];
var img  = [];
var imageData = [];
var data = [];
const s0=0,n0=128,s1=1,n1=180,s2=1,n2=145;
var p;
var planes0,planes1,planes2;

planes0 = planes1 = planes2 = false;

for (var k=0;k<3;k++)
{
    img[k] = [];
    imageData[k] = [];
    contexts[k] = [];
    dynamics[k] = [];
    mats[k] = [];
    planes[k] = [];
    data[k] = [];
}

function newPlane(name, size, px, py, pz, sx, sy, sz, rx, ry, rz) {
    p = BABYLON.MeshBuilder.CreatePlane(name, size, scene);
    p.position = new BABYLON.Vector3(px, py, pz);
    p.scaling = new BABYLON.Vector3(sx, sy, sz);
    p.rotation = new BABYLON.Vector3(rx, ry, rz);
    return p;
}

//parent planes
p0 = newPlane("plane0", 1, 0, 0, 0.325, 1, 1, 1, 0,Math.PI/4,0);
p1 = newPlane("plane1", 1, 0, 0, 0, 1,1,1, 0, Math.PI/2, 0);
p2 = newPlane("plane2", 1, 0, 0, 0, 1, 1, 1, Math.PI, Math.PI/2, 0);
p0.isVisible = p1.isVisible = p2.isVisible = false;

planes[0] = createImages(s0, n0, "Sagittal/JeffT1_", 0, 0, p0, 0);
planes[1] = createImages(s1, n1, "SlicerImages/Axial/IMG", 0, 0, p1, 1);
planes[2] = createImages(s2, n2, "SlicerImages/Coronal/IMG", 0, 0, p2, 2);

// creating planes with MRI images as dynamic textures

function createImages(r1, r2, src, x, y,p,j) {

    for (var i = r1; i<r2; i++) {
        img[j][i]  = new Image();
        img[j][i].src = src+i+".jpg";
        img[j][i].num = i;

        img[j][i].onload = function () {
            var i = this.num;
            dynamics[j][i] = new BABYLON.DynamicTexture("d"+j+i, {width:img[j][i].width,height:img[j][i].height}, scene, true);
            contexts[j][i] = dynamics[j][i].getContext();
            contexts[j][i].drawImage(this, x,y, img[j][i].width, img[j][i].height,0,0,img[j][i].width,img[j][i].height);
            dynamics[j][i].update();
            imageData[j][i] = contexts[j][i].getImageData(0, 0, img[j][i].width, img[j][i].height);
            data[j][i] = imageData[j][i].data;

            for (var k = 0; k < data[j][i].length; k += 4) {
                if(data[j][i][k]  < 25 && data[j][i][k + 1] < 25 && data[j][i][k + 2] < 25) {
                    data[j][i][k + 3] = 0;
                }
            }

            contexts[j][i].putImageData(imageData[j][i], 0, 0);
            dynamics[j][i].update();

            mats[j][i] = new BABYLON.StandardMaterial("m"+j+i, scene);
            mats[j][i].emissiveTexture = dynamics[j][i];
            mats[j][i].opacityTexture = dynamics[j][i];
            mats[j][i].backFaceCulling = false;

            planes[j][i] = BABYLON.MeshBuilder.CreatePlane("plane" +j+i,1, scene);
            planes[j][i].material = mats[j][i];
            planes[j][i].parent=p;
            planes[j][i].checkCollisions = true;
            planes[j][i].position.z= i/200-0.325;
        }
    }
    return planes[j];
}

function sag() {

    planes0 = true;
    planes1 = planes2 = false;

    for(var i=s0;i<n0;i++)
    {
        planes[0][i].isVisible = true;
    }

    for(var i=s1;i<n1;i++)
    {
        planes[1][i].isVisible = false;
    }

    for(var i=s2;i<n2;i++)
    {
        planes[2][i].isVisible = false;
    }
}


function axial() {

    planes1=true;
    planes0 = planes2 = false;

    for(var i=s0;i<n0;i++)
    {
        planes[0][i].isVisible = false;
    }

    for(var i=s1;i<n1;i++)
    {
        planes[1][i].isVisible = true;
    }

    for(var i=s2;i<n2;i++)
    {
        planes[2][i].isVisible = false;
    }
}

function coronal() {

    planes2 = true;
    planes1 = planes0 = false;

    for(var i=s0;i<n0;i++)
    {
        planes[0][i].isVisible = false;
    }

    for(var i=s1;i<n1;i++)
    {
        planes[1][i].isVisible = false;
    }

    for(var i=s2;i<n2;i++)
    {
        planes[2][i].isVisible = true;
    }
}


var currentSlice = 0;

function slices(r1,r2,j){
    console.log("inside slices function");
    for(var i=r1;i<r2;i++)
    {
        planes[j][i].isVisible = true;
    }
    if(planes[j][currentSlice]) {
        planes[j][currentSlice].position.x = 0;
    }
    if(document.getElementById("slices").value)
        currentSlice=document.getElementById("slices").value;
    planes[j][currentSlice].position.x=-0.8;
}

function first(r1,r2,j){
   var s = document.getElementById("slices").value;

    for(i=s;i<r2;i++){
        planes[j][i].isVisible = false;
    }

    for(i=r1;i<=s;i++)
    {
        planes[j][i].isVisible = true;
    }
}

function last(r1,r2,j){
    var s = document.getElementById("slices").value;
    for(i=r1;i<s;i++)
    {
        planes[j][i].isVisible = false;
    }
    for(i=s;i<r2;i++){
        planes[j][i].isVisible = true;
    }
}

function firstPart(){
    if(planes0 == true) first(s0,n0,0)
    else if (planes1 == true) first(s1,n1,1)
    else if (planes2 == true) first(s2,n2,2)
}

function lastPart(){
    if(planes0 == true) last(s0,n0,0)
    else if (planes1 == true) last(s1,n1,1)
    else if (planes2 == true) last(s2,n2,2)
}

function chooseSlice(){
    if(planes0 == true) slices(s0,n0,0)
    else if (planes1 == true) slices(s1,n1,1)
    else if (planes2 == true) slices(s2,n2,2)
}

displaySag();

function displaySag() {

    var sag = document.getElementById("sagCanvas");

    var context0 = sag.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function() {
        context0.drawImage(imageObj, 80, 10,126,126);
    };

    var i = document.getElementById("sagittal").value;
    imageObj.src = "SlicerImages/Saggital/IMG"+i+".jpg";
}

displayAxial();

function displayAxial() {

    var axial = document.getElementById("axialCanvas");

    var context1 = axial.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function() {
        context1.drawImage(imageObj, 80, 10,126,126);
    };

    var j = document.getElementById("axial").value;
    imageObj.src = "SlicerImages/Axial_1/IMG"+j+".jpg";
}

displayCoronal();

function displayCoronal() {

    var coronal = document.getElementById("coronalCanvas");

    var context2 = coronal.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function() {
        context2.drawImage(imageObj, 80, 20,126,126);
    };

    var k = document.getElementById("coronal").value;
    imageObj.src = "SlicerImages/Coronal/IMG"+k+".jpg";
}


// events for rotation

var currentPosition={x:0,y:0};
var currentRotation = {x: 0, y: 0};
var clicked = false;

function rmv_pu(evt)
{
    clicked = false;
}

function rmv_pd(evt) {
    currentPosition.x = evt.clientX;
    currentPosition.y = evt.clientY;


    currentRotation.x = p0.rotation.x;
    currentRotation.y = p0.rotation.y;
    clicked = true;
}

function rmv_pm(evt) {
    if (!clicked) {
        return;
    }

    p0.rotation.y = currentRotation.y - (evt.clientX - currentPosition.x) / 100;
    p0.rotation.x = currentRotation.x + (evt.clientY - currentPosition.y) / 100;
}

canvas.addEventListener("pointerdown",rmv_pd,true);
canvas.addEventListener("pointermove",rmv_pm,true);
canvas.addEventListener("pointerup",rmv_pd,true);

var currentPosition1={x:0,y:0};
var currentRotation1 = {x: 0, y: 0};

function rmv_pd1(evt) {
    currentPosition1.x = evt.clientX;
    currentPosition1.y = evt.clientY;
    currentRotation1.x = p1.rotation.x;
    currentRotation1.y = p1.rotation.y;
    clicked = true;
}

function rmv_pm1(evt) {
    if (!clicked) {
        return;
    }

    p1.rotation.y = currentRotation1.y - (evt.clientX - currentPosition1.x) / 100;
    p1.rotation.x = currentRotation1.x + (evt.clientY - currentPosition1.y) / 100;
}

canvas.addEventListener("pointerdown",rmv_pd1,true);
canvas.addEventListener("pointermove",rmv_pm1,true);
canvas.addEventListener("pointerup",rmv_pu,true);

var currentPosition2={x:0,y:0};
var currentRotation2 = {x: 0, y: 0};


function rmv_pd2(evt) {
    currentPosition2.x = evt.clientX;
    currentPosition2.y = evt.clientY;


    currentRotation2.x = p2.rotation.x;
    currentRotation2.y = p2.rotation.y;
    clicked = true;
}

function rmv_pm2(evt) {
    if (!clicked) {
        return;
    }

    p2.rotation.y = currentRotation2.y - (evt.clientX - currentPosition2.x) / 100;
    p2.rotation.x = currentRotation2.x + (evt.clientY - currentPosition2.y) / 100;
}

canvas.addEventListener("pointerdown",rmv_pd2,true);
canvas.addEventListener("pointermove",rmv_pm2,true);
canvas.addEventListener("pointerup",rmv_pu,true);

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
