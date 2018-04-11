if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
}

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var camera = new BABYLON.ArcRotateCamera("camera1",0,0,0, new BABYLON.Vector3(0,0,0), scene);
    camera.setPosition(new BABYLON.Vector3(-1.5,0.5,0));
    camera.radius=3;


    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.5;

    var planes = [];
    var dynamics = [];
    var mats = [];
    var contexts = [];
    var img  = [];
    var imageData = [];
    var data = [];
    const s0=1,n0=130,s1=1,n1=53,s2=1,n2=143;
    var p=[];


    function newPlane(i,name,size,px,py,pz,sx,sy,sz,rx,ry,rz)
    {
        p[i] = BABYLON.MeshBuilder.CreatePlane(name,size,scene);
        p[i].position = new BABYLON.Vector3(px,py,pz);
        p[i].scaling = new BABYLON.Vector3(sx,sy,sz);
        p[i].rotation = new BABYLON.Vector3(rx,ry,rz);
        return p[i];
    }

    //parent planes

    p[0] = newPlane(0,"plane0",1,0,0,1.5,0.6,0.6,0.6,0,0,0);
    p[1] = newPlane(1,"plane1",1,-0.5,0,0,1,1,1,0,0,0);
    p[2] = newPlane(2,"plane2",1,0,0,-1.5,0.6,0.6,0.6,0,0,Math.PI);

    p[0].isVisible = p[1].isVisible = p[2].isVisible = false;

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

    planes[0]=createImages(0,s0,n0,"SlicerImages/Saggital/IMG",0,0,0,0);
    planes[1]=createImages(1,s1,n1,"SlicerImages/Axial/IMG",0,0,0,0);
    planes[2]=createImages(2,s2,n2,"SlicerImages/Coronal/IMG",0,0,0,0);


    // creating planes with MRI images as dynamic textures

    function createImages(j,r1,r2,src,width,height,x,y)
    {

        for (var i = r1; i<r2; i++) {
            img[j][i]  = new Image();
            img[j][i].src = src+i+".jpg";
            img[j][i].Nbr = i;

            img[j][i].onload = function () {
                var i = this.Nbr;
                dynamics[j][i] = new BABYLON.DynamicTexture("d"+j+i, {width:img[j][i].width+width,height:img[j][i].height+height}, scene, true);
                contexts[j][i] = dynamics[j][i].getContext();
                contexts[j][i].drawImage(this, x,y, img[j][i].width+width, img[j][i].height+height,0,0,img[j][i].width+width,img[j][i].height+height);
				console.log("Updated");
                dynamics[j][i].update();
                imageData[j][i] = contexts[j][i].getImageData(0, 0, img[j][i].width+width, img[j][i].height+height);
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

                planes[j][i] = BABYLON.MeshBuilder.CreatePlane("plane" +j+i,1, scene);
                planes[j][i].material = mats[j][i];
                mats[j][i].backFaceCulling = false;
                planes[j][i].parent=p[j];
                planes[j][i].checkCollisions = true;

                if(j==0)
                {
                    planes[j][i].position.z= i/200-0.32;
                }
                else if(j==1)
                {
                    planes[j][i].rotation.y = Math.PI/2;
                    planes[j][i].position.x=i/200;
                    planes[j][i].position.z=-0.1;
                }
                else if(j==2)
                {
                    planes[j][i].position.x = i/200;
                    planes[j][i].rotation.y = -Math.PI/2;
                    planes[j][i].position.z= 0.1;
                }
            }
        }
        return planes[j]
    }


	function sag_zoom(){

        for (var i = s0; i<n0; i++)
        {
            planes[0][i].isVisible = true;
        }
        p[0].position = new BABYLON.Vector3(-0.5,0.4,0);
        p[0].scaling = new BABYLON.Vector3(1.5,1.5,1.5);
        p[0].rotation.y = Math.PI/2;

        for (var i = s1; i<n1; i++)
        {
            planes[1][i].isVisible = false;
        }

        for (var i = s2; i<n2; i++)
        {
            planes[2][i].isVisible = false;
        }

        canvas.removeEventListener("pointerdown",rmv_pd1,true);
        canvas.removeEventListener("pointermove",rmv_pm1,true);
        canvas.removeEventListener("pointerdown",rmv_pd2,true);
        canvas.removeEventListener("pointermove",rmv_pm2,true);
        canvas.addEventListener("pointerdown",rmv_pd,true);
        canvas.addEventListener("pointermove",rmv_pm,true);
	}

 

   function axial_zoom(){

        for (var i = s0; i<n0; i++)
        {
            planes[0][i].isVisible = false;
        }
        for (var i = s1; i<n1; i++)
        {
            planes[1][i].isVisible = true;
        }

        p[1].scaling = new BABYLON.Vector3(1,1,1);
        p[1].position = new BABYLON.Vector3(-0.5,0,0);
        for (var i = s2; i<n2; i++)
        {
            planes[2][i].isVisible = false;
        }

        canvas.removeEventListener("pointerdown",rmv_pd,true);
        canvas.removeEventListener("pointermove",rmv_pm,true);
        canvas.removeEventListener("pointerdown",rmv_pd2,true);
        canvas.removeEventListener("pointermove",rmv_pm2,true);
        canvas.addEventListener("pointerdown",rmv_pd1,true);
        canvas.addEventListener("pointermove",rmv_pm1,true);
   }
   
	function crl_zoom() {


        for (var i = s0; i<n0; i++)
        {
            planes[0][i].isVisible = false;
        }
        for (var i = s1; i<n1; i++)
        {
            planes[1][i].isVisible = false;
        }
        for (var i = s2; i<n2; i++)
        {
            planes[2][i].isVisible = true;
        }
        p[2].position = new BABYLON.Vector3(-0.5,0.4,0);
        p[2].scaling = new BABYLON.Vector3(1.2,1.2,1.2);

        canvas.removeEventListener("pointerdown",rmv_pd,true);
        canvas.removeEventListener("pointermove",rmv_pm,true);
        canvas.removeEventListener("pointerdown",rmv_pd1,true);
        canvas.removeEventListener("pointermove",rmv_pm1,true);
        canvas.addEventListener("pointerdown",rmv_pd2,true);
        canvas.addEventListener("pointermove",rmv_pm2,true);

    }
	
	function reset_scene(){

           // camera.detachControl(canvas);
			resetSagittal(s0,n0);
			resetAxial(s1,n1);
			resetCoronal(s2,n2);
		
	}

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
        currentRotation.x = p[0].rotation.x;
        currentRotation.y = p[0].rotation.y;
        clicked = true;
    }

    function rmv_pm(evt) {
        if (!clicked) {
            return;
        }
        p[0].rotation.y = currentRotation.y - (evt.clientX - currentPosition.x) / 100;
        p[0].rotation.x = currentRotation.x + (evt.clientY - currentPosition.y) / 100;
    }

    function rmv_pd1(evt) {
        currentPosition.x = evt.clientX;
        currentPosition.y = evt.clientY;
        currentRotation.x = p[1].rotation.x;
        currentRotation.y = p[1].rotation.y;
        clicked = true;
    }

    function rmv_pm1(evt) {
        if (!clicked) {
            return;
        }
        p[1].rotation.y = currentRotation.y - (evt.clientX - currentPosition.x) / 100;
        p[1].rotation.x = currentRotation.x + (evt.clientY - currentPosition.y) / 100;
    }

    function rmv_pd2(evt) {
        currentPosition.x = evt.clientX;
        currentPosition.y = evt.clientY;
        currentRotation.x = p[2].rotation.x;
        currentRotation.y = p[2].rotation.y;
        clicked = true;
    }

    function rmv_pm2(evt)
    {
        if (!clicked) {
            return;
        }
        p[2].rotation.y = currentRotation.y - (evt.clientX - currentPosition.x)/100 ;
        p[2].rotation.x = currentRotation.x + (evt.clientY - currentPosition.y)/100 ;
		
    }

    canvas.addEventListener("pointerup", rmv_pu,true);

    function resetSagittal(r1,r2)
    {
        p[0].position = new BABYLON.Vector3(0,0,1.5);
        p[0].rotation =  new BABYLON.Vector3(0, 0, 0);
        p[0].scaling = new BABYLON.Vector3(0.8,0.8,0.8);
        for(var i=r1;i<r2;i++)
        {
            planes[0][i].position.z= i/200-0.32;
            planes[0][i].position.x=0;
            planes[0][i].isVisible = true;
        }
    }

    function resetAxial(r1,r2)
    {
        p[1].position = new BABYLON.Vector3(-0.5,0,0);
        p[1].rotation = new BABYLON.Vector3(0, 0, 0);
        p[1].scaling = new BABYLON.Vector3(0.6,0.6,0.6);
        for(var i=r1;i<r2;i++)
        {
            planes[1][i].isVisible = true;
            planes[1][i].rotation.y = Math.PI/2;
            planes[1][i].position.x=i/200;
            planes[1][i].position.z=-0.1;
        }
    }

    function resetCoronal(r1,r2)
    {
        p[2].position = new BABYLON.Vector3(0,0,-1.5);
        p[2].rotation = new BABYLON.Vector3(0,0,Math.PI);
        p[2].scaling = new BABYLON.Vector3(0.8,0.8,0.8);
        for(var i=r1;i<r2;i++)
        {
            planes[2][i].isVisible = true;
            planes[2][i].position.x = i/200;
            planes[2][i].rotation.y = -Math.PI/2;
            planes[2][i].position.z= 0.1;
        }
    }

    /* Event Triggers for rotation */

		function rotate_sag(){
			
			reset_scene();
			canvas.removeEventListener("pointerdown",rmv_pd1,true);
			canvas.removeEventListener("pointermove",rmv_pm1,true);
			canvas.removeEventListener("pointerdown",rmv_pd2,true);
			canvas.removeEventListener("pointermove",rmv_pm2,true);
			canvas.addEventListener("pointerdown",rmv_pd,true);
			canvas.addEventListener("pointermove",rmv_pm,true);
			
		}


		function rotate_axial() {
			
			reset_scene();
			canvas.removeEventListener("pointerdown",rmv_pd,true);
			canvas.removeEventListener("pointermove",rmv_pm,true);
			canvas.removeEventListener("pointerdown",rmv_pd2,true);
			canvas.removeEventListener("pointermove",rmv_pm2,true);
			canvas.addEventListener("pointerdown",rmv_pd1,true);
			canvas.addEventListener("pointermove",rmv_pm1,true);
			
		}

		function rotate_coronal() {
			
			reset_scene();
			canvas.removeEventListener("pointerdown",rmv_pd,true);
			canvas.removeEventListener("pointermove",rmv_pm,true);
			canvas.removeEventListener("pointerdown",rmv_pd1,true);
			canvas.removeEventListener("pointermove",rmv_pm1,true);
			canvas.addEventListener("pointerdown",rmv_pd2,true);
			canvas.addEventListener("pointermove",rmv_pm2,true);
			
		}
		
	var currentSlice=0;
    var currentSlice1=0;
    var currentSlice2=1;
	
		function sag_img(){
			
			for(var i=s0;i<n0;i++)
			{
				planes[0][i].isVisible = true;
			}
			if(planes[0][currentSlice]) {
				planes[0][currentSlice].position.x = 0;
			}
			if(document.getElementById("sag_num").value)
			currentSlice=document.getElementById("sag_num").value;
			planes[0][currentSlice].position.x=-0.5;
				return currentSlice;
		}
		
		function axial_img(){
			
			for(var i=s1;i<n1;i++)
			{
				planes[1][i].isVisible = true;
			}
			if(planes[1][currentSlice1]) {
				planes[1][currentSlice1].position.z = -0.1;
			}
			if(document.getElementById("axial_num").value)
			currentSlice1=document.getElementById("axial_num").value;
			planes[1][currentSlice1].position.z=0.7;
			return currentSlice1;
		}
		
		function coronal_img(){
			for(var i=s2;i<n2;i++)
			{
				planes[2][i].isVisible = true;
			}

			if(planes[2][currentSlice2]) {
				planes[2][currentSlice2].position.z = 0.1;
			}
			if(document.getElementById("coronal_num").value)
			currentSlice2=document.getElementById("coronal_num").value;
			planes[2][currentSlice2].position.z = 0.6;
			return currentSlice2;
		}
		
		function first(){
			currentSlice=sag_img();
			
			for(var i=s0;i<currentSlice;i++)
            {
                planes[0][i].isVisible = false;
            }
            for(var i=currentSlice;i<n0;i++)
            {
                planes[0][i].isVisible = true;
            }
		}
		
		function first1(){
			currentSlice1=axial_img();
			for(var i=s1;i<currentSlice1;i++)
            {
                planes[1][i].isVisible = false;
            }
            for(var i=currentSlice1;i<n1;i++)
            {
                planes[1][i].isVisible = true;
            }
			
		}
		
		function first2(){
			currentSlice1=coronal_img();
			for(var i=s2;i<currentSlice2;i++)
            {
                planes[2][i].isVisible = false;
            }
            for(var i=currentSlice2;i<n2;i++)
            {
                planes[2][i].isVisible = true;
            }
			
		}
		
		function last(){
			currentSlice=sag_img();
			console.log(currentSlice,s0,n0);
			for(var i=currentSlice;i<n0;i++)
            {
                planes[0][i].isVisible = false;
            }
			for(var i=s0;i<=currentSlice;i++)
            {
                planes[0][i].isVisible = true;
            }

		}
		
		function last1(){
			currentSlice1=axial_img();
			for(var i=currentSlice1;i<n1;i++)
            {
                planes[1][i].isVisible = false;
            }
			for(var i=s1;i<=currentSlice1;i++)
            {
                planes[1][i].isVisible = true;
            }
			
		}
		
		function last2(){
			
				currentSlice1=coronal_img();
				
			for(var i=currentSlice2;i<n2;i++)
            {
                planes[2][i].isVisible = false;
            }
			
			for(var i=s2;i<=currentSlice2;i++)
            {
                planes[2][i].isVisible = true;
            }

			
		}
		
   
engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function() { console.log('Service Worker Registered'); });
}*/