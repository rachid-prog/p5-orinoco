let url=["http://localhost:3000/api/teddies","http://localhost:3000/api/cameras","http://localhost:3000/api/furniture"];//lien API donner par OC
let titreProduits =["Ours en peluche faits à la main","Caméras vintage","Meubles en chêne"];//Donner par OC
let choixTypeProduit = document.querySelectorAll(".choixTypeProduit");//Sur bouttons navigations[Ours-Caméras-Meubles]
let titre = document.querySelector(".titre");//Titre de produit
let infoProduit=document.querySelector(".infoProduit");//[image-prix-nom]
let panier = document.querySelector(".panier");
let lienPanier = document.querySelector(".lienPanier");
let totale=0;
//initialiser la valeur du panier
panier.innerHTML=0;
let nomArticles =[];
//Sauvgarder l'article selectionner
function sauvgargerArticleSelectionner(idArticle,lien){
        let infoObj={};
        infoObj.id = idArticle;
        infoObj.lien = lien;
        localStorage.setItem("article",JSON.stringify(infoObj));
}
//Afficher chaque produits au click sur boutons navigation
for(let i=0;i<choixTypeProduit.length;i++){
        choixTypeProduit[i].addEventListener("click",function(){
            infoProduit.innerHTML="";//Initialiser valeur contenu a chaque click
            afficher(url[i],titreProduits[i]);
        })
}
// API request:
function afficher(lien,titrePourProduit){
    fetch(lien)
        .then(rep => rep.json())
        .then(data => {
            titre.innerHTML=titrePourProduit;//Afficher le titres des produits
            for(let i=0;i<data.length;i++){
                infoProduit.innerHTML+="<div class='col-12 col-md-2 card m-4'><img class='card-img-top img-fluid'  src='"+data[i].imageUrl+"'>"+
                "<div class='card-body'<p class='h3 card-text'><strong>"+data[i].name+"</strong></p><p class='text-Secondary'>Prix : <stong class='h4 text-danger'>"+data[i].price/100+" &euro;</strong></p>"+
                "<p><button onclick='sauvgargerArticleSelectionner(\""+data[i]._id+"\",\""+lien+"\")' class='btn btn-secondary btn-lg'><a href='page/article.html'>Voir plus</button></a></p></div></div>";                
                nomArticles[i]=data[i].name;               
            }
            //filter le nom du article dans locale storage.
            for(let i=0;i<nomArticles.length;i++){
                for(let j=0;j<localStorage.length;j++){
                    if(localStorage.key(j)===nomArticles[i]){
                            totale+=Number(localStorage.getItem(nomArticles[i]));  
                    }
                }
            }
            //Calculer le nombre du produits commander
            panier.innerHTML=totale;
        })
        .catch(err = function () {
            console.log("Erreur");
        })
 }
//Afficher produits ours a l'ouverture de la page web    
afficher(url[0],titreProduits[0]);









