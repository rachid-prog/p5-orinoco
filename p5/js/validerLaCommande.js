let panier = document.querySelector('.panier');
let articlesAfficher = document.querySelector('.articlesAfficher');
let listeArticles = [];//listes des noms des articles d'un produit donner par OC.
let lienURL = JSON.parse(localStorage.getItem("article")).lien;//Recuperer le lien d'un objet ici ours http://localhost:3000/api/teddies
let totalePrix = document.querySelector('.totalePrix');
let totaleArticle=0;//Nombre article
let prixTotaleArticle=0;
let texte = document.querySelectorAll(".texte");//formulaire nom+prenom+ville
let adresse = document.querySelector(".adresse");
let nomReg = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let adresseReg=/^[a-zA-Z0-9-\s]{2,100}$/;
let emailReg=/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$/;
let tableauID =[];
let tableauNom=[];
let panierVide = document.querySelector('.panierVide');//Titre pricipale
let hidden = document.querySelector(".hidden");//h2 et formulaire
let form = document.querySelector("#form");
let email = document.querySelector("#email")
let validerCommande = document.querySelector(".validerCommande");
panier.innerHTML=0;
function retirerOuAjouterUnArticle(nbr,nom){//Retirer des articles
    localStorage.setItem(nom,nbr);
    totaleArticle=0;
    for(let i=0;i<localStorage.length;i++){//Calculer le nombre article commander
        for(let j=0;j<listeArticles.length;j++){
            if(localStorage.key(i)==listeArticles[j]){
               totaleArticle+=Number(localStorage.getItem(localStorage.key(i))); 
            }
        }
    }  
    localStorage.setItem("somme",totaleArticle);//Sauvgarder le nombre des articles commander
    panier.innerHTML=localStorage.getItem("somme");
    location.reload();
}
function suprimerArticle(nom){  //Suprimer articles    
    localStorage.setItem("somme",Number(localStorage.getItem("somme"))-Number(localStorage.getItem(nom)));
    localStorage.removeItem(nom);//Suprimer un aticle;
    location.reload();
}  
fetch(lienURL)
    .then(rep=>rep.json())
    .then(data=>{
        for(let i=0;i<data.length;i++){
            listeArticles.push(data[i].name);
        }
      for(let i=0;i<localStorage.length;i++){
            for(let j=0;j<listeArticles.length;j++){                
                if(listeArticles[j]==localStorage.key(i)){         
                         articlesAfficher.innerHTML+= "<tr><td class='h5'>"+localStorage.key(i)+"</td>"+
                        "<td class='h4 text-info'>" + data[j].price / 100 + " &euro;</td>" +
                        "<td><input onclick=\"retirerOuAjouterUnArticle(this.value" + ",'" + localStorage.key(i)+"',"+data[j].price+")\" type='number'class='w-25 text-center ml-4' min='0' value='" + localStorage.getItem(localStorage.key(i)) + "'></td>" +
                        "<td><span class='btn btn-info'><span  onclick=\"suprimerArticle(" + "'" + localStorage.key(i) + "')\"><i class='fas fa-trash-alt'></i></span></td></tr></div>";
                        totaleArticle+=Number(localStorage.getItem(localStorage.key(i)));
                        localStorage.setItem("somme",totaleArticle);
                        prixTotaleArticle+=data[j].price/100 * JSON.parse(localStorage.getItem(localStorage.key(i)));
                        tableauID.push(data[j]._id);
                        tableauNom.push(data[j].name);
                }         
            }             
        }
        localStorage.setItem("prixTotale", prixTotaleArticle);
        localStorage.setItem("id",JSON.stringify(tableauID))
        totalePrix.innerHTML=localStorage.getItem("prixTotale");
        if(tableauNom.length==0){//Afficher un message si le panier est vide
            articlesAfficher.innerHTML="<p class='h1 text-info'>Votre panier est vide</p><img src='../images/panierVide.jpg'>";
            hidden.innerHTML=''
        }
    })
    .catch(err=> console.log("Erreur API"));
panier.innerHTML=localStorage.getItem("somme") ;
let infosUtilisateur=[0,1,2,3];
//Vérification email
email.addEventListener('change', function(){  
   if(emailReg.test(this.value)){      
       this.classList.add("is-valid");
       this.classList.remove("is-invalid");
       infosUtilisateur[4] = email.value
   }
   else{
         this.classList.add("is-invalid");
        this.classList.remove("is-valid");
   }
})
//Vérification nom,prenom et ville
for(let i=0;i<texte.length;i++){
    texte[i].addEventListener('change',function(){
        if(nomReg.test(this.value)){      
            this.classList.add("is-valid");
            this.classList.remove("is-invalid");
            infosUtilisateur[i] = this.value;//sauvgarder nom+prenom+ville
            localStorage.setItem('infosUtilisateur', JSON.stringify(infosUtilisateur));
        }
        else{
              this.classList.add("is-invalid");
             this.classList.remove("is-valid");
        }
        
    })
}
//vérification adresse ville.

adresse.addEventListener("change",function(){
    if(adresseReg.test(this.value)){      
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
        infosUtilisateur[3] = this.value;//sauvgarder adresse ville 
    }
    else{
          this.classList.add("is-invalid");
         this.classList.remove("is-valid");
    }

})












//Validation du formulaire: 
// let infosUtilisateur=[0,1,2,3];
// for (let i = 0; i < texte.length; i++) {//validation :nom+prenom+ville
//         texte[i].addEventListener("input", function (e) {
//             if (nomReg.test(this.value)) {
//                 this.classList.add("is-valid");
//                 this.classList.remove("is-invalid");
//                 infosUtilisateur[i] = this.value;//sauvgarder nom+prenom+ville
//                 localStorage.setItem('infosUtilisateur', JSON.stringify(infosUtilisateur));
                
               
                
//             }
//             else {
//                 this.classList.remove("is-valid");
//                 this.classList.add("is-invalid");
               
                 
                
               
//             }
//         })
// }
// adresse.addEventListener("input", function () {  //validation adresse ville.         
//         if (adresseReg.test(this.value)) {
//             this.classList.add("is-valid");
//             this.classList.remove("is-invalid");
//             infosUtilisateur[3] = this.value;//sauvgarder adresse ville            
//         }
//         else {
//             this.classList.remove("is-valid");
//             this.classList.add("is-invalid");
//             erreur="Non valide";
            
//         }
//     })
// email.addEventListener("input", () => {
//         infosUtilisateur[4] = email.value
        
//     })
    






