let panier =document.querySelector('.panier');
let articles  =document.querySelector(".articles");
let totalePrix    = document.querySelector(".totalePrix");
let calculePrixTotale=0;
let p =document.querySelectorAll("p");
//API request:
fetch('http://localhost:3000/api/teddies')
    .then(rep => rep.json())
    .then(data => {
        
        for(let i=0;i<data.length;i++){
            for(let j=0;j<localStorage.length;j++){
               if(data[i]._id == localStorage.key(j)){                    
                    articles.innerHTML+="<img class='img-fluid img-thumbnail col-4 mt-2' src='"+data[i].imageUrl+"'>"+
                    "<div class='col-8'><table class='table table-dark mt-4 text-center'>"+
                    "<tr><td>Nom</td><td>Prix</td><td>Quantité</td>"+
                    "<tr><td>"+data[i].name+"</td>"+
                    "<td>"+data[i].price/100+" &euro;</td>"+
                    "<td><input type='number' class='w-25 text-center' min='0' value='"+localStorage.getItem(data[i]._id)+"'>"+
                    "</td></tr>"+                                  
                    "</div>";
                    articles.append(btn) ; 
                    calculePrixTotale+=(Number(localStorage.getItem(data[i]._id))*(data[i].price/100));                    

                } 
                
            }
        }
        localStorage.setItem("prixTotale",calculePrixTotale);
    })
    .catch(err = function () {
       console.log("erreur")
    })
//Vérification formulaire:
let texte    = document.querySelectorAll(".texte");
let mail     = document.querySelector("#email")
let nomReg = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let mailReg = /^([a-zA-Z0-9_-])+([.]?[a-zA-Z0-9_-]{1,})*@([a-zA-Z0-9-_]{2,}[.])+[a-zA-Z]{2,3}/
for(let i=0;i<texte.length;i++){
    texte[i].addEventListener("input",function(){
        console.log(this.value)
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

//Afficher nombre totale d'article dans le panier:
panier.innerHTML=localStorage.getItem("totale")
totalePrix.innerHTML=localStorage.getItem('prixTotale');


//Création du bouton suprimer
let btn = document.createElement('button');
btn.textContent="suprimer";
btn.className="btn btn-info col-12 suprimer";

btn[0].addEventListener("click",function(){
    console.log("test");
})











