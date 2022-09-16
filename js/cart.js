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

    // condition, si ls vide, appeler la fonction //
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
          <p class="deleteItem" canapeId="${produitLocalStorage[i].id}" canapeColor="${produitLocalStorage[i].couleur}">Supprimer</p>
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
      //console.log(btnQuantite);

      
      // Fonction chargée de calculer le prix total du panier //
      let prixTotalPanier = () => {

        // On récupère le prix des produits présent dans le panier grâce à l'id et on additionne les résultat à chaque tour de boucle //
        let prixTotal = 0;
        for (let j in produitLocalStorage) {
          let findPrix = donnees.filter((element) => element._id === produitLocalStorage[j].id); 
          let prix = findPrix[0].price; 
          prixTotal += prix * produitLocalStorage[j].quantite; 
          // push le resultat après chaque boucle //

          console.log(prix); // prix contenus dans le panier 
          //console.log(findPrix[0].price); // prix contenus dans le panier, demander au mentor  
          console.log(produitLocalStorage[j].quantite); // quantité des produits contenues dans le panier 
          console.log(prixTotal); // prix total du panier
          
          let totalQuantite = document.querySelector('#totalPrice').textContent = prixTotal;

        }

      }
      prixTotalPanier();

  

      btnQuantite.forEach((inputQuantite) => { // pour chaque input du panier (variable courante)
    
        inputQuantite.addEventListener('change', function(event) { // on écoute chaque changement différent 
          //console.log(event);
          //console.log(inputQuantite); // affichage de l'input avec son id, sa couleur et sa value = change du btn

            let articleId = inputQuantite.getAttribute('canapeId');
            let articleCouleur = inputQuantite.getAttribute('canapeColor');
            //console.log(articleId);
            //console.log(articleCouleur);

            // Si le produit dont l'état change à un id et une couleur définit // 
            if(articleId !== undefined && articleCouleur !== undefined) {

              let findArticle = produitLocalStorage.find((p) => p.id === articleId && p.couleur === articleCouleur);
              //console.log(findArticle.quantite); // definit l'article pour lequel ajouter la nouvelle valeur 
              
              // Augmenter de 1 //
              let nouvelleQuantite = parseInt(inputQuantite.value);
              //console.log(nouvelleQuantite); // affiche la nouvelle quantité

              // Ajouter la nouvelle valeur à la valeur de l'article trouvé //
              findArticle.quantite = nouvelleQuantite;
              // console.log(findArticle.quantite);
              
              // Ajouter la nouvelle valeur au localstorage 
              localStorage.setItem('produit', JSON.stringify(produitLocalStorage));             
              //console.log(produitLocalStorage);

              // Ajouter la valeur au dom en instantané //
              inputQuantite.setAttribute('value', findArticle.quantite);


              prixTotalPanier();
             
            }


        })

      });

      let supprimerProduit = () => {

        let btnSupprimer = document.querySelectorAll('.deleteItem');
        console.log(btnSupprimer);

        btnSupprimer.forEach((inputSupprimer) => {
          //console.log(inputSupprimer); // NodeList boutons supprimer 

          inputSupprimer.addEventListener('click', function(event) {
            console.log(inputSupprimer); // l'article à supprimer 
            //console.log(event);

            let supprimerArticleId = inputSupprimer.getAttribute('canapeId');
            //console.log(supprimerArticleId);
            let supprimerArticleCouleur = inputSupprimer.getAttribute('canapeColor');
            //console.log(supprimerArticleCouleur);

            let findA = produitLocalStorage.find((p) => p.id === supprimerArticleId && p.couleur === supprimerArticleCouleur);
            //console.log(findA); // renvoie l'article à supprimer 






  

        
          


          })

        });

          
  
  
      }
      supprimerProduit();
    
    }
    changerQuantite();

  }

}
recupererDonneesApi();



// GESTION DU PANIER VIDE OU CONTENANT DES ARTICLES //
let articlePanier = document.querySelector('#cart__items');
//console.log(articlePanier);

let afficherPanier = async () => { 

  if (produitLocalStorage === null) {
    console.log('ok');
   let panierVide =` <p>Votre panier est vide</p>`;
   articlePanier.innerHTML = panierVide;
   }
   else {
    await produitLocalStorage;
   }

}
afficherPanier();


