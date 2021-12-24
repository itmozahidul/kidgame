
export class Photos{

  crop( url:string, cs:number,psxr:number, psyr:number, psx:number, psy:number, serial:number ){
    var inputImage = new Image();
    console.log("In photo function..");
      return new Promise((resolve,reject)=>{
         try {
          const outputImage = document.createElement("canvas");
          outputImage.setAttribute("style","border: 2px solid black");
          inputImage.onload = ()=>{
            var x = inputImage.naturalWidth;
            var y = inputImage.naturalHeight;
            console.log("x: "+x+", y: "+y);
            var r = x/y; 
            outputImage.width = cs;
            outputImage.height = cs/r;
            const ctx = outputImage.getContext("2d");
            if(psxr>x){psxr=x;}
            if(psyr>y){psyr=y;}
            if(psx>x){psx=x;}
            if(psy>y){psy=y;}
            if((psx/psy)!=r){psy=psx/r;}
            ctx.drawImage(inputImage, psxr,psyr,psx,psy,0,0,cs,cs/r);
            resolve({"data":outputImage, "serial":serial});
            
          }
          inputImage.src=url;
         } catch (error) {
             reject(error);
         }  
          
      
         
      });
  
  }
  cropNotAsync( url:string, cs:number,psxr:number, psyr:number, psx:number, psy:number ):HTMLCanvasElement{
    var inputImage = new Image();
    
       
        const outputImage = document.createElement("canvas");
        outputImage.setAttribute("style","border: 2px solid black");
        inputImage.onload = ()=>{
          var x = inputImage.naturalWidth;
          var y = inputImage.naturalHeight;
          console.log("x: "+x+", y: "+y);
          var r = x/y; 
          outputImage.width = cs;
          outputImage.height = cs/r;
          const ctx = outputImage.getContext("2d");
          if(psxr>x){psxr=x;}
          if(psyr>y){psyr=y;}
          if(psx>x){psx=x;}
          if(psy>y){psy=y;}
          if((psx/psy)!=r){psy=psx/r;}
          ctx.drawImage(inputImage, psxr,psyr,psx,psy,0,0,cs,cs/r);
          
          
        }
        inputImage.src=url;
        return outputImage;
        
    
       
    
  
  }
}