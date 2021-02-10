let mainElement= document.querySelector(".main")
let element = document.createElement("div")
element.setAttribute("class","row mt-3 ")
mainElement.append(element);
let search= document.querySelector(".search")
let searchElement = document.querySelector(".in")
search.addEventListener("click",(e)=>{
    searchApi(searchElement.value)
});
let element1;
async function searchApi(val){
       try{
        let searchResult = await fetch("http://api.tvmaze.com/search/shows?q="+ val)
        let data = await searchResult.json();
        element.innerHTML="";
        for(let i=0;i< data.length;i++){
        if(data[i].show.image !== null)
        createBox(data[i])  
        }
    }
        catch(e){
            console.log(e)
        }
        
}



function createBox(data1){ 
    let element1 = document.createElement("div")
    element1.setAttribute("class"," card mr-3 mt-4")
    let div1 =  document.createElement("div")
    div1.setAttribute("class","p-2 card-img-overlay bg-dark")
    div1.style.color="white"
    let p1 =  document.createElement("p")
    let p2 =  document.createElement("p")
    let p3 =  document.createElement("p")
    let p4 =  document.createElement("p")
    let p5 =  document.createElement("p") 
    let p6 =  document.createElement("p")
    im= createImage(data1.show.image.medium)
    element1.addEventListener("mouseenter",(e)=>{
     fillInfo(p1,"Name",data1.show.name)
     fillInfo(p2,"Language",data1.show.language)
     fillInfo(p3,"Genre",data1.show.genres)
     fillInfo(p4,"Rating",Object.values(data1.show.rating))
     if(data1.show.network !== null)
     fillInfo(p5,"Network",data1.show.network.name)
     if(data1.show.premiered !== null)
     fillInfo(p6,"premiered",data1.show.premiered)
     element1.append(div1);
     div1.append(p1,p2,p3,p4,p5,p6)
    })
    element1.addEventListener("mouseleave",(e)=>{
        div1.remove();   
    })    
    element.append(element1)
    element1.append(im);
}

//creates image element 
function createImage(imgData){

     let image1 =  document.createElement("img")
     image1.setAttribute("class"," card-img")
     image1.setAttribute("src",imgData)
     return image1;
}

function fillInfo(element,title,dat){
    element.setAttribute("class","card-text")
    if(dat === null || dat === "")
    element.innerHTML= title+": "+"NA";
    else
    element.innerHTML= title+": "+dat;
    element.style.fontSize= "15px";     
}
