// RECUPERATION DES ELEMENTS DU LOCALSTORAGE //
let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); // passer de string à objet
//console.log(produitLocalStorage);

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

 

    // Fonction chargée de modifier la quantité dans le panier // 
    let changerQuantite = async (afficherPanier) => {
      await afficherPanier;


      // Fonction chargée de calculer le prix total du panier //
      let prixTotalPanier = () => {

        // On récupère le prix des produits présent dans le panier grâce à l'id et on additionne les résultat à chaque tour de boucle //
        let prix = 0;
        for (let j in produitLocalStorage) {
          let findPrix = donnees.filter((element) => element._id === produitLocalStorage[j].id); 
          let prixUnitaire = findPrix[0].price; 
          prix += prixUnitaire * produitLocalStorage[j].quantite; 

          //console.log(prixUnitaire); // prix contenus dans le panier 
          //(findPrix[0].price); prix contenus dans le panier 
          //console.log(produitLocalStorage[j].quantite); // quantité des produits contenues dans le panier 
          //console.log(prixTotal); // prix total du panier
          
          let prixTotal = document.querySelector('#totalPrice').textContent = prix;
        }

      }
      prixTotalPanier();


      // Fonction chargée d'afficher la quantité totale de produits // (à l'affichage et au fur et à mesure qu'on + ou - la qt)
      let totalProduits = () => {

        let quantite = 0;
        for (let k in produitLocalStorage) {
          let quantiteProduits = quantite +=  produitLocalStorage[k].quantite; // on cumule la quantité de chaque produit à chaque tour de boucle 
          //console.log(quantiteProduits); // quantité totale de produits

          let quantiteTotale = document.querySelector('#totalQuantity').textContent = quantiteProduits;
          //console.log(quantiteTotale);
        }
      }
      totalProduits();


    
      // Fonction chargée de récupérer les attributs  pour cibler un produit //

      let recupererProduit = (elem) => {
          return {
            id: elem.getAttribute('canapeId'),
            couleur: elem.getAttribute('canapeColor'),
          }
      }

      
      let btnQuantite = document.querySelectorAll('.itemQuantity');
    
      btnQuantite.forEach((inputQuantite) => { // pour chaque input du panier (variable courante)
    
        inputQuantite.addEventListener('change', function(event) { // on écoute chaque changement différent 
          //console.log(event);
          console.log(inputQuantite); // affichage de l'input avec son id, sa couleur et sa value = change du btn
          let produitClique = recupererProduit(inputQuantite);
          console.log(produitClique.id); // on récupère l'id cliqué
          console.log(produitClique.couleur); // on récupère la couleur cliquée



          // Si le produit dont l'état change à un id et une couleur définit // 
          if(produitClique.id !== undefined && produitClique.couleur !== undefined) { 
            
            let findArticle = produitLocalStorage.find((p) => p.id === produitClique.id && p.couleur === produitClique.couleur);
            //console.log(findArticle.quantite); // definit l'article pour lequel ajouter la nouvelle valeur
              
              // Augmenter de 1 //
              let nouvelleQuantite = parseInt(inputQuantite.value);
              //console.log(nouvelleQuantite); // affiche la nouvelle quantité

              // Ajouter la nouvelle valeur à la valeur de l'article trouvé //
              findArticle.quantite = nouvelleQuantite;
              console.log(findArticle.quantite);
              
              // Ajouter la nouvelle valeur au localstorage 
              localStorage.setItem('produit', JSON.stringify(produitLocalStorage));             
              //console.log(produitLocalStorage);

              // Ajouter la valeur au dom en instantané //
              inputQuantite.setAttribute('value', findArticle.quantite);

              prixTotalPanier();
              totalProduits();
             
            }

        })

      });       

       
      // Fonction chargée de supprimer un produit //
      let supprimerProduit = () => {

        let btnSupprimer = document.querySelectorAll('.deleteItem'); // à deplacer au dessus de la fonction recupererProduit
        //console.log(btnSupprimer);

        btnSupprimer.forEach((inputSupprimer) => {
          //console.log(inputSupprimer); // NodeList boutons supprimer 

          inputSupprimer.addEventListener('click', function(event) {
            console.log(inputSupprimer); // l'article à supprimer (juste visuel)

            let produitClique = recupererProduit(inputSupprimer); // Est-ce une bonne pratique ?
            //console.log(produitClique); // l'article à supprimer 


            // Supprimer le produit cliqué du tableau d'objet produitlocalstorage 
            let nouveauPanier = produitLocalStorage.filter((a) => a.id !== produitClique.id || a.couleur !== produitClique.couleur);
            //console.log(nouveauPanier); // retourne un nouveau tableau des produits à conserver 

            // Envoyer le nouveau panier (tableau) au localstorage
            localStorage.setItem("produit", JSON.stringify(nouveauPanier));

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

let afficherPanier = async () => { 

  let articlePanier = document.querySelector('#cart__items');
    //console.log(articlePanier);

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

//if(produitLocalStorage === null) {
 // afficherPanier()
//}





// ************************************** FORMULAIRE DE CONTACT ******************************* //

// La validation des champs //

// Sélection des éléments du DOM 
const prenom = document.querySelector('#firstName');
const nom = document.querySelector('#lastName');
const adresse = document.querySelector('#address');
const ville = document.querySelector('#city');
const email = document.querySelector('#email');
let btnCommander = document.querySelector('#order');

console.log(prenom);
console.log(nom);
console.log(adresse);
console.log(ville);
console.log(email);
console.log(btnCommander);

// Regex : entre (), inclure l'entiereté de l'expression (cf prenom et ville)

// prénom et nom : [a-zA-Z]+([-|\sa-zA-Z]+)
// >>> (min, maj lettres accentuées autant de fois que nécessaire) (espace ou trait d'union) 

// adresse : [0-9]{1,4}(,)\s(rue|avenue|boulevard|impasse|chemin)\s[a-zA-Z]+(\s|-)[a-zA-Z]+(,\s)[0-9]{5}\s[a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+([\sa-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+|[-a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+){1,}

// ville : [a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+([\sa-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+|[-a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+|[_a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+){1,}
// >>> (min, maj accentués autant de *) (espace, trait d'union) (1 ou plusieur repet)

//email : [a-zA-Z]+(\.[a-zA-Z]+|-[a-zA-Z]+|_[a-zA-Z]+|[a-zA-Z]+)@[a-zA-Z]+\.[a-zA-Z]+

