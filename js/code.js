//Déclarer les variables
let ours        = document.querySelectorAll(".ours");
let camera      = document.querySelectorAll(".camera");
let meuble      = document.querySelectorAll(".meuble");
let prixO       = document.querySelectorAll(".prixO");
let prixC       = document.querySelectorAll(".prixC");
let prixM       = document.querySelectorAll(".prixM");
let nomO        = document.querySelectorAll(".nomO"); 
let produits    = document.querySelectorAll(".produits");
let hidden      = document.querySelector(".hidden"); 
let imageHidden = document.querySelector(".imageHidden");
let description = document.querySelector('.description');
let table       = document.querySelector(".table");
let somme       = document.querySelector(".somme");
let prixInput   = document.querySelector("#prixInput");
let pannier     = document.querySelector(".pannier");




//Intéroger le serveur et attendre la réponse:
let tableuUrl=['http://localhost:3000/api/teddies','http://localhost:3000/api/cameras','http://localhost:3000/api/furniture'];
    fetch(tableuUrl[0])
        .then(rep=>rep.json())
        .then(data=>{
            for(let i = 0;i<ours.length;i++){
              ours[i].src = data[i].imageUrl;
              prixO[i].innerHTML= data[i].price + " &euro;";
              nomO[i].innerHTML= "<strong>"+data[i].name+"</strong>";
            }            
        })
        .catch(err=>console.log(err))

        fetch(tableuUrl[1])
        .then(rep=>rep.json())
        .then(data=>{
            for(let i = 0;i<camera.length;i++){
             camera[i].src = data[i].imageUrl;             
             
            }
            
        })
        .catch(err=>console.log(err))

        fetch(tableuUrl[2])
        .then(rep=>rep.json())
        .then(data=>{
            for(let i = 0;i<meuble.length;i++){
             meuble[i].src = data[i].imageUrl;
             
            }
            
        })
        .catch(err=>console.log(err))

//Ecouter les événements:
let infos = document.querySelectorAll(".infos");
for(let i = 0; i<infos.length;i++){
    
    infos[i].addEventListener("click",function(){
        hidden.classList.remove("hidden");//Afficher le div cacher
        //cacher les div de la classe produits
        for(let j=0;j<produits.length;j++){
            produits[j].classList.add('hidden');
        }
        let parent = this.parentNode;   
        imageHidden.src =parent.children[0].src;
        
        fetch(tableuUrl[0])
            .then(rep=>rep.json())
            .then(data=>{                          
                 table.innerHTML =
                    "<tr><td>Nom</td><td>"+data[i].name+"</td></tr>"+
                    "<tr><td>Prix</td><td>"+data[i].price+"</td></tr>"+
                    "<tr><td>description</td><td>"+data[i].description+"</td></tr>"+
                    "<tr><td>Coleur</td><td>"+data[i].colors+"</td></tr>";
                    prixInput.addEventListener("change",function(){
                            somme.innerHTML= Number(prixInput.value)* data[i].price ;
                            
                    });
                    pannier.addEventListener("click",function(){
                        
                       localStorage.setItem("id0",data[i]._id);
                        
                        

                     });
                             
            } 
                     
        )
        .catch(err=>console.log(err))        

    });
}





    