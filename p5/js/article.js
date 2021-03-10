let imageAfficher       =  document.querySelector(".image");
let inforationProduit   =  document.querySelector(".table");
let contenuPanier       = document.querySelector(".contenuPanier");
let ajouterAuPanier     = document.querySelector(".ajouterAuPanier");
let panier =document.querySelector(".panier"); 
let articleCommander;                  
//champs selecte chifre de 0 à 20.
let nombre = document.querySelector("#nombre");
for(let i=0;i<=20;i++){
    nombre.innerHTML+="<option value='"+i+"'>"+i+"</option>"
}
//recupere code et url de l'article sélectionner.
let parametre = new URLSearchParams(location.search);
let url = parametre.get("url");
let id  = parametre.get("code");
fetch(url)
    .then(rep => rep.json())
    .then(data => {
        for(let i =0;i<data.length;i++){
            if(id === data[i]._id && data[i].colors){                                
                imageAfficher.src=data[i].imageUrl;
                inforationProduit.innerHTML = "<tr><td class='h3'>"+data[i].name+"</td></tr>"+
                "<tr><td class='h5'>"+data[i].description+"</td></tr>";
                "<tr";
                for(let j =0;j<data[i].colors.length;j++){           
                    inforationProduit.innerHTML += "<td>"+
                    "<input type='radio' name='coleur' name='coleur"+ i + "'> "+data[i].colors[j]+" </td>";                 
                } 
                "</tr>";          
                inforationProduit.innerHTML+="<tr><td class='h4'>"+data[i].price+" &euro;</td></tr>";
                
                
                                                                           
                ajouterAuPanier.addEventListener("click",function(){
                    let tabInfos = [{prixUnArticle:data[i].price/100},{article:nombre.value},{nom:data[i].name}];                    
                    localStorage.setItem(data[i]._id,JSON.stringify(tabInfos));
                    contenuPanier.innerHTML= JSON.parse(localStorage.getItem(id))[1].article;          
                                       
                        let totaleArticle =0;                       
                        for(let i=0;i<data.length;i++){
                            for(let j=0;j<localStorage.length;j++){
                                if(localStorage.key(j)===data[i].name){                                    
                                  totaleArticle+=Number(JSON.parse(localStorage.getItem(id))[1].article);                                    
                                }                                 
                            }

                        }
                                           
                });        
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
if(localStorage.getItem(id)){
    contenuPanier.innerHTML= JSON.parse(localStorage.getItem(id))[1].article;
}else{
    contenuPanier.innerHTML="0";
}

















