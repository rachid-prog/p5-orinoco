let panier = document.querySelector(".panier");
let prixTotale = document.querySelector(".totalePrix");
let articlesAfficher = document.querySelector(".articles");
function suprimerArticle(delId){
    localStorage.removeItem(delId);
    location.reload()
}
function retirerUnArticle(valeur,id){  
    let obj = JSON.parse(localStorage.getItem(id));  
    obj[1].article=valeur;
    nombreTotaleArticle = 0;
    prix=0;
    localStorage.setItem(id,JSON.stringify(obj));
    for(let i=0;i<localStorage.length;i++){
        nombreTotaleArticle += Number(JSON.parse(localStorage.getItem(localStorage.key(i)))[1].article);
        prix+=JSON.parse(localStorage.getItem(localStorage.key(i)))[0].prixUnArticle*JSON.parse(localStorage.getItem(localStorage.key(i)))[1].article
    }
    panier.innerHTML=nombreTotaleArticle;
    prixTotale.innerHTML=prix;
}
//Appel API
fetch("http://localhost:3000/api/teddies")
    .then(rep=>rep.json())
    .then(data=>{
        for(let i=0;i<data.length;i++){
            for(let j=0;j<localStorage.length;j++){
                if(data[i]._id == localStorage.key(j)){
                    articlesAfficher.innerHTML+="<img class='img-fluid img-thumbnail col-4 mt-2' src='"+
                    data[i].imageUrl+"'>"+
                    "<div class='col-8'><table class='table table-dark mt-4 text-center'>"+
                    "<tr><td>Nom</td><td>Prix</td><td colspan='2'>Quantité</td>"+
                    "<tr><td>"+data[i].name+"</td>"+
                    "<td>"+data[i].price/100+" &euro;</td>"+
                    "<td><input onclick=\"retirerUnArticle(this.value"+",'"+data[i]._id+"')\" type='number'class='w-25 text-center ml-4' min='0' value='"+
                    JSON.parse(localStorage.getItem(data[i]._id))[1].article+"'></td>"+
                    "<td><span class='btn btn-info' onclick=\"suprimerArticle("+"'"+data[i]._id+"')\">"+
                    "<i class='fas fa-trash-alt'></i></td></tr></span>"+
                    "</div>";                    
                }
            }
        }
    })
    .catch(err = function () {
        console.log("Erreur");
    })
//Afficher totale du article a acheter:
let nombreTotaleArticle = 0;
let prix =0;
for(let i=0;i<localStorage.length;i++){
    nombreTotaleArticle += Number(JSON.parse(localStorage.getItem(localStorage.key(i)))[1].article);
    prix+=JSON.parse(localStorage.getItem(localStorage.key(i)))[0].prixUnArticle*JSON.parse(localStorage.getItem(localStorage.key(i)))[1].article
}
panier.innerHTML=nombreTotaleArticle; 
//Prix totale
prixTotale.innerHTML=prix;
//Validation formulaire:
let texte    = document.querySelectorAll(".texte");//[nom-prenom-ville]
let nomReg = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
for(let i=0;i<texte.length;i++){
    texte[i].addEventListener("input",function(){
       
        if(nomReg.test(this.value)){
            this.classList.add("is-valid")
            this.classList.remove("is-invalid")
        }
        else{
            this.classList.remove("is-valid")
            this.classList.add("is-invalid")
        }
    })
}

//Validation de la commande:
let tabId=[];//Idetifiant des commandes.
for(let i=0;i<localStorage.length;i++){
    tabId.push(localStorage.key(i));
}
   
// let hidden = document.querySelector(".hidden")
let form = document.querySelector("#forms")   
let validerCommande =document.querySelector(".validerCommande")
let prenom  = document.querySelector("#lName");
let nom     = document.querySelector("#fName");
let email   = document.querySelector("#email");
let adresse = document.querySelector("#adresse");
let ville   = document.querySelector("#pays");
let numerCommande = document.querySelector(".numerCommande");
let hidden = document.querySelector('.hidden')
let informationDuCommande = {
                            "contact" : {
                                "firstName": "",
                                "lastName" : "",
                                "address"  : "",
                                "city"     : "",
                                "email"    : ""
                                },
                                "products": tabId
}
validerCommande.addEventListener("click",(e)=>{
    if(localStorage.length!=0){
        e.preventDefault()
        informationDuCommande.contact.firstName=nom.value;
        informationDuCommande.contact.lastName=prenom.value;
        informationDuCommande.contact.address=adresse.value;
        informationDuCommande.contact.city=ville.value;
        informationDuCommande.contact.email=email.value;
        fetch("http://localhost:3000/api/teddies/order",{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(informationDuCommande)
                }
                )
                .then(rep=>rep.json())
                .then(data=>{
                    localStorage.clear();
                    numerCommande.innerHTML="<table class='table text-center mt-4' ><tr><td>Merci "+ prenom.value+"</td></tr>"+
                    "<tr class='table-warning'><td> Votre commande N°</td></tr>"+
                    "<tr><td>"+data.orderId+"</td></tr>"+
                    "<tr><td> est validée <span class='btn btn-success'><i class='fas fa-check'></i><span></td></tr>"+
                    "<tr><td><button  class='btn btn-info'><a href='index.html'>Retour à l'acceuil</a></button></td></tr></table><div>"
                    articlesAfficher.innerHTML="";
                    hidden.innerHTML="";
                    numerCommande.parentNode.classList.remove("col-md-6");
                    panier.innerHTML="0";

                })
                .catch(err=>console.log("Erreur"));
            }

           
           
    
})
if(localStorage.length==0){
    numerCommande.innerHTML="<h1 class='my-5'>Orinico</h1><h2 class='my-5'>Votre panier est vide</h2>";
    hidden.innerHTML="";
}

    
    
    
    
   



    




