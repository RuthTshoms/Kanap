// Extraire l'id //
let params = new URL(document.location).searchParams; // - parcourir et afficher les param de la page
// console.log(document.location); // 
let id = params.get("id"); // récupérer la valeur de l'id attribuée à la variable id //
// console.log(id); // 

// Affichage du produit (objet) sélectionné par l'id en faisant une requête fetch //
var donneesId; // portée globale de la variable qui sera réutilisée 

async function recupererId() {
  const requete = await fetch(`http://localhost:3000/api/products/${id}`, { // récupérer dynamiquement l'id de l'élément pour lequel on effectue une requete
    method: 'GET'
  });
  // console.log(requete); // afficher l'id dans la console - "status 200" requete OK (status 400 >> erreur ) //

  if (!requete.ok) {
    alert('Un problème est survenu.');
  }
  else { // 
    donneesId = await requete.json(); // portée globale de la variable //
    // console.log(donneesId); //vérifie que les infos complètes du produit nous soient bien retournées //

    // création dynamique de balises et insertions de l'élément (img) de la requete json dans le dom //
    document.querySelector('.item__img').innerHTML = `<img src="${donneesId.imageUrl}" alt="Photographie d'un canapé"></img>`;
    document.querySelector('#title').textContent = donneesId.name;
    document.querySelector('#price').textContent = donneesId.price;
    document.querySelector('#description').textContent = donneesId.description;


    let couleurCanape = donneesId.colors; // on met l'objet colors de notre requete.JSON dans une variable 
    // console.log(couleurCanape); // affiche les couleurs des canapés


    for (let couleurs of couleurCanape) { // la boucle doit parcourir l'objet colors et stocké les valeur dans la variable couleur
      // console.log(`${couleurs}`);
      document.querySelector("#colors").innerHTML += `<option value=${couleurs}>${couleurs}</option>` // à chaque itération, les valeurs contenues dans couleurs seront insérées au dom  
    } 
  }
}
recupererId();


// _________ G E S T I O N    D U    PA N I E R  ________ //

// Récupération des données sélectionnées par l'utilisateur et envoi du panier  //

let optionCouleur = document.querySelector('#colors');
// console.log(optionCouleur);

let quantite = document.querySelector('#quantity');
// console.log(quantite);

let button = document.querySelector('button');
// console.log(button);

// Permettre à ces variables d'être accessibles dans les conditions de quantité et de couleur
let choixQuantite;
let choixCouleur;

// Création d'un évènement qui déclenche l'envoi au panier //
button.addEventListener('click', (e) => {
  e.preventDefault(); // permet de ne pas effectuer l'action comme elle devrait l'être - ici, ne réactualisera pas la page au clic sur ajouter au panier 

  // Stocker les choix de l'utilisateur dans une variable (choix = valeur) //
  choixCouleur = optionCouleur.value;
  // console.log(choixCouleur);
  choixQuantite = parseInt(quantite.value);
  // console.log(choixQuantite);

  // Récupération des valeurs du formulaire (clé: valeur) //
  let optionProduit = {
    id: id,
    quantite: choixQuantite,
    couleur: choixCouleur,
  }
  // console.log(optionProduit);


  // ********** CREATION DU LOCALSTORAGE ********** //
  let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); // string > objet complexe  //
  // console.log(produitLocalStorage);


  // Fonction pour ajouter un produit sélectionné dans le localstorage avec confirmation de commande  //
  let ajouterProduitLocalStorage = () => {
    produitLocalStorage.push(optionProduit);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); // (objet > string)
    confirm("Votre commande de" + " " + choixQuantite + " " + donneesId.name + " " + choixCouleur + " vient d'être ajoutée au panier. Pour consulter votre panier, cliquer sur OK");
    console.log(produitLocalStorage); // à enlever à la fin du projet 
  }

  // Empêcher l'ajout d'un produit non conforme au localstorage en exprimant ce qu'on souhaite dans le localstorage //
  if (choixQuantite >= 1 && choixQuantite <= 100 && choixQuantite && choixCouleur !== '') {

  // Si le panier comporte au moins 1 article  //
  if (produitLocalStorage) {
    let resultatFind = produitLocalStorage.find((p) => p.id === optionProduit.id && p.couleur === choixCouleur);

    // Si le produit commandé est déjà dans le panier, augmenter juste la quantité  //
    if (resultatFind) {
      resultatFind.quantite += optionProduit.quantite;
      // Empêcher la possibilité d'ajouter une quantité de produit supp à 100 en plusieurs clic //
      if (resultatFind.quantite <= 100) { 
      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      confirm("Votre commande de" + " " + choixQuantite + " " + donneesId.name + " " + choixCouleur + " vient d'être ajoutée au panier. Pour consulter votre panier, cliquer sur OK");
      }
      // Si le produit commandé n'est pas dans le panier//
    } else {
      ajouterProduitLocalStorage(); 
      // console.log(produitLocalStorage);
    }
  }
  // Si le panier est vide //
  else {
    produitLocalStorage = []; // création d'un tableau vide - localstorage vide // 
    ajouterProduitLocalStorage();
  }
} else {
alert('Veuillez choisir une couleur et/ou une quantité comprise entre 1 et 100.');
}

});

