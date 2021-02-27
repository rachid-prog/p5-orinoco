let imageAfficher              =  document.querySelector(".image");
let inforationProduit         =  document.querySelector(".table");


//champs selecte chifre de 0 à 20.
let nombre = document.querySelector("#nombre");
for(let i=0;i<=20;i++){
    nombre.innerHTML+="<option value='"+i+"'>"+i+"</option>"
}
//recupere code et url de l'article sélectionner.
let parametre = new URLSearchParams(location.search);
let url = parametre.get("url");
let id  = parametre.get("code");
let plus =parametre.get("plus")

fetch(url)
    .then(rep => rep.json())
    .then(data => {
        for(let i =0;i<data.length;i++){
            if(id === data[i]._id && data[i].colors){                                
                imageAfficher.src=data[i].imageUrl;
                inforationProduit.innerHTML = "<tr><td class='h3'>"+data[i].name+"</td></tr>"+
                "<tr><td class='h5'>"+data[i].description+"</td></tr>"+            
                "<tr><td>"+data[i].colors+"</td></tr>"+              
                "<tr><td>"+data[i].price+" &euro;</td></tr>";          
              
            }
            else if(id === data[i]._id && data[i].lenses){
                imageAfficher.src=data[i].imageUrl;
                inforationProduit.innerHTML = "<tr><td class='h3'>"+data[i].name+"</td></tr>"+
                "<tr><td class='h5'>"+data[i].description+"</td></tr>"+            
                "<tr><td>"+data[i].lenses+"</td></tr>"+              
                "<tr><td>"+data[i].price+" &euro;</td></tr>";
            }
            else if(id === data[i]._id && data[i].varnish){
                imageAfficher.src=data[i].imageUrl;
                inforationProduit.innerHTML = "<tr><td class='h3'>"+data[i].name+"</td></tr>"+
                "<tr><td class='h5'>"+data[i].description+"</td></tr>"+            
                "<tr><td>"+data[i].varnish+"</td></tr>"+              
                "<tr><td>"+data[i].price+" &euro;</td></tr>";
            }
           
        }
        
        
    })
    .catch(err = function () {        
             console.log("Erreur");         
    })


// let produitsPresCommander   = document.querySelector(".produitsPresCommander");
// let image                   = document.querySelector(".image");
// let table                   = document.querySelector("table");
// let prixTotale              = document.querySelector(".prixTotale");
// let nombreArticle           = document.querySelector('#nombre');
// let ajouterAuPanier         = document.querySelector(".ajouterAuPanier ");
// let form                    = document.querySelector("form");
// let commander               = document.querySelector(".commander");
// let panier                  = document.querySelector(".panier");
// //Récupération id de l'article
// var idString =location.search;
// let idTableau =idString.split("=");
// let id = idTableau[1];
// //Conversion en objet 
// let idObjet = JSON.parse(localStorage.getItem(id));
// //Affichage article selectionner:
// image.src = idObjet.imageUrl
// table.innerHTML = "<tr><td>"+idObjet.name+"</td></tr>"+
//                 "<tr><td>"+idObjet.description+"</td></tr>"+
//                 "<tr><td>"+idObjet.price+" &euro;</td></tr>";

// nombreArticle.addEventListener('input',function(){
//     prixTotale.innerHTML = nombreArticle.value * idObjet.price;
// });
// //Sauvgarder les commander
// let articleCommander={};
// commander.addEventListener("click",function(){               
//         articleCommander.nom    = idObjet.name;
//         articleCommander.id     = idObjet._id;
//         articleCommander.image  = idObjet.imageUrl;
//         articleCommander.prixT  = nombreArticle.value * idObjet.price;
//         localStorage.setItem(idObjet.name,JSON.stringify(articleCommander));   
//     });

// //Compteur d'article
// let cpt = 0   
// let tab=[];
// let articlePresent = ["Norbert","Arnold", "Gustav","Garfunkel","Lenny and Carl"];
// for(let i=0;i<localStorage.length;i++){
//     tab.push(localStorage.key(i));
// }
// for(let i=0;i<articlePresent.length;i++){
//   if(tab.includes(articlePresent[i])){
//       cpt++;
//   }
// }
// localStorage.setItem("cmpteur",cpt)
// panier.innerHTML=cpt

























