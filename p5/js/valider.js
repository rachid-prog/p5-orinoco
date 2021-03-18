let commandeAccepter = document.querySelector(".commandeAccepter");
let informationUtilisateur =JSON.parse(localStorage.getItem("infosUtilisateur")) ;
let informationDuCommande = {
    "contact" : {
        "firstName": "",
        "lastName" : "",
        "address"  : "",
        "city"     : "",
        "email"    : ""
        },
        "products": [""]
}
informationDuCommande.contact.firstName=informationUtilisateur[0];
informationDuCommande.contact.lastName=informationUtilisateur[1];
informationDuCommande.contact.address=informationUtilisateur[2];
informationDuCommande.contact.city=informationUtilisateur[3];
informationDuCommande.contact.email=informationUtilisateur[4];
informationDuCommande.products=JSON.parse(localStorage.getItem('id'));
fetch("http://localhost:3000/api/teddies/order",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(informationDuCommande)
})
.then(rep=>rep.json())
.then(data=>{
        commandeAccepter.innerHTML="<div class='col-12 my-4 shadow-lg p-3 mb-5 bg-white rounded'><p class='h1'> Bonjour "+informationDuCommande.contact.firstName+"</p>"+
        "<p class='h4 my-4'>Nous avons bien enregistré votre commande et nous vous remercions de votre confiance</p>"+
        "<p class='h4 my-4'>Récapitutif de commnade:</p>"+
        "<p class='h4 my-4'>Commande N°: "+data.orderId+"</p>"+
        
        "<button onclick='effacer()' class='btn btn-info my-4'><a href='../index.html'>Retour à l\'accueil</a></button></div>";
        

        
})
.catch(err=>console.log("Erreur"));
localStorage.removeItem('somme');
function effacer(){
    localStorage.clear();
}








