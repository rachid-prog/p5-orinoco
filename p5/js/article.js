let afficherArticleSelectionner = document.querySelector(".afficherArticleSelectionner");
let panierArticle = document.querySelector('.panierArticle');
let prixFinaleDesArticles = 0;
//initialiser la valeur du panier
panierArticle.innerHTML="0";
//nom de l'article et nombre article commander est sauvgarder.
function nombreUnArticle(nom,nombre){
    localStorage.setItem(nom,nombre);    
}
//Afficher le nombre article a commander
function ajouterAuPanier(nom){//nom est une chaine de caractère
    panierArticle.innerHTML=localStorage.getItem(nom);
    console.log(localStorage.getItem(nom));
    
}
if(localStorage.getItem("article")==null){
    afficherArticleSelectionner.innerHTML="<div class='col-12 '><p class='h1 my-5'>Article n\'existe pas</p>"+
    "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"+
        " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the "+
        " leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset "+
       " sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>";
}
else{
    let article = JSON.parse(localStorage.getItem("article"));          
    fetch(article.lien)
        .then(rep=>rep.json())
        .then(data=>{
            for(let i=0;i<data.length;i++){
                if(data[i]._id == article.id){
                    afficherArticleSelectionner.innerHTML="<div class='col-12 card shadow-lg'><img class='img-fluid  rounded' src='"+data[i].imageUrl+"'>"+ 
                    "<div class='col-12 m-2 h4'><strong>"+data[i].name+"</strong></div><div class='col-12 m-2 '>"+data[i].description+"</div>"+
                    "<div class='col-12 m-2 text-danger h2'>"+data[i].price/100+"&euro;</div><div class='input-group input-group-sm mb-3'><div class='input-group-prepend'>"+
                    "<span class='input-group-text' id='inputGroup-sizing-sm'>Quantité</span></div>"+
                    "<input onclick='nombreUnArticle(\""+data[i].name+"\",this.value)' type='number' class='form-control' aria-label='Small' aria-describedby='inputGroup-sizing-sm' min='0' value='"+localStorage.getItem(data[i].name)+"'></div>"+
                    "<div class='col-12'><button onclick='ajouterAuPanier(\""+data[i].name+"\")' class='btn btn btn-secondary m-4'>Ajouter au panier</button><button class='btn btn-info'><a href='../index.html'>Reour à l'acceuil</a></button></div>"; 
                    panierArticle.innerHTML=localStorage.getItem(data[i].name);
               }
            }
        })
        

}


