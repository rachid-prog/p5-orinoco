//Déclarer les variables
let ours = document.querySelectorAll(".ours");
let prixO = document.querySelectorAll(".prixO");
let nomO = document.querySelectorAll(".nomO");
let produits = document.querySelector(".produits");
let a = document.querySelectorAll(".infos");
let objetAcheter;

//Vérification paramétre du url.
let url;
let parametre = new URLSearchParams(location.search);
if(parametre.has('id')){
    url =  parametre.get('id');
}
else{
    url="http://localhost:3000/api/teddies";
}
//API request:
fetch(url)
    .then(rep => rep.json())
    .then(data => {
        for (let i = 0; i < ours.length; i++) {
            ours[i].src = data[i].imageUrl;
            prixO[i].innerHTML = data[i].price + " &euro;";
            nomO[i].innerHTML = "<strong>" + data[i].name + "</strong>";//nomOurs
                   

        }
        for (let j = 0; j < a.length; j++) {
            a[j].addEventListener("click", function () {
                localStorage.setItem(data[j]._id,JSON.stringify(data[j]));
                this.href="produits.html?code="+data[j]._id+"&url="+url;
            });
        }
    })
    .catch(err = function () {
        for (let i = 0; i < ours.length; i++) {
             ours[i].src = "images/erreur.jpg";
         }
    })

    



