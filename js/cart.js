// RECUPERATION DES ELEMENTS DU LOCALSTORAGE //
let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); // passer de string à objet
console.log(produitLocalStorage);

// RECUPERATION DES DONNEES DE L'API (CELLES QU'ON A PAS DANS LE LS) ET INSERTION DES ELEMENTS DANS LE DOM //
const url = 'http://localhost:3000/api/products'

async function recupererDonneesApi() {  
  const requete = await fetch(url, { 
    method: 'GET'
  });

  if (!requete.ok) {
    alert('Un problème est survenu.');
  }
  else {
    let donnees = await requete.json();
    
    // Fonction chargée de retourner un id de l'api qui aurait un équivalent //
    function findProduit(id) { 
      return donnees.find((produit) => produit._id === id); // le "return sera inséré directement dans le dom avec ciblage de l'élément //
    }

    // fonction ajouterQuantite ici ? //

    // Fonction pour supprimer un produit (même id et même couleur) du panier et du localstorage // 
    //function supprimerProduit(article) {
      //return produitLocalStorage.filter((article) => .id === produit.id && produit.couleur === produit.couleur);
    //}    

    let afficherKanap = "";

    // Intérer dans les objets du localstorage et afficher l'élément souhaité lorsqu'un id équivalent à celui dans le localstorage sera trouvé //
    for(let i in produitLocalStorage) {
      let produitPanier = findProduit(produitLocalStorage[i].id);
      afficherKanap += `
     <article class="cart__item" data-id="${produitLocalStorage[i].id}" data-color="${produitLocalStorage[i].couleur}">
      <div class="cart__item__img">
       <img src="${produitPanier.imageUrl}" alt="Photographie d'un canapé">
     </div>
     <div class="cart__item__content">
       <div class="cart__item__content__description">
        <h2>${produitPanier.name}</h2>
        <p>${produitLocalStorage[i].couleur}</p>
        <p>${produitPanier.price}€</p>
       </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${produitLocalStorage[i].id}" canapeColor="${produitLocalStorage[i].couleur}" value="${produitLocalStorage[i].quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
         </div>
       </div>
     </div></article>
     ` 
    }
    cart__items.innerHTML = afficherKanap; 


    // Fonction pour changer la quantité dans le panier // 
    let changerQuantite = async (afficherPanier) => {
      await afficherPanier;

      let btnQuantite = document.querySelectorAll('.itemQuantity'); // récupération de tout les input => NodeList
      console.log(btnQuantite);

      btnQuantite.forEach((quantite) => { // pour chaque input du panier (variable courante)

        quantite.addEventListener('click', function(event) { // on écoute chaque click sur les input
          console.log(event);
          console.log(quantite); // affichage de l'input avec son id, sa couleur et sa value = click du btn

            let articleId = quantite.getAttribute('canapeId');
            let articleCouleur = quantite.getAttribute('canapeColor');
            console.log(articleId);
            console.log(articleCouleur);

            // Si le produit cliqué à un id et une couleur définit // 
            if(articleId !== undefined && articleCouleur !== undefined) {
              // Pour cet élément, augmenter de 1 //
              let nouvelleQuantite = quantite.value; // incrémentation de +1
              console.log(nouvelleQuantite);

              // Ajouter la nouvelle valeur au localstorage // 
              //produitLocalStorage.quantite = nouvelleQuantite;
              //console.log(produitLocalStorage.quantite);
            }

        })
  
      });
    
    }
    changerQuantite() 
  }
}
recupererDonneesApi();



// GESTION DU PANIER VIDE OU CONTENANT DES ARTICLES //
let articlePanier = document.querySelector('#cart__items');

let afficherPanier = async () => { 

  if (produitLocalStorage === null) {
   let panierVide =` <p>Votre panier est vide</p>`;
   articlePanier.innerHTML = panierVide;
   }
   else {
    await produitLocalStorage;
   }

}
afficherPanier();


