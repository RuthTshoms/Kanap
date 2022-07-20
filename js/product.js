// Extraire l'id //
let params = new URL(document.location).searchParams; // - parcourir et afficher les param de la page
// console.log(document.location); // OK
let id = params.get("id"); // récupérer la valeur de l'id attribuée à la variable id //
// console.log(id); // OK

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
      document.querySelector("#colors").innerHTML += `<option value="">${couleurs}</option>` // à chaque itération, les valeur contenues dans couleurs seront insérées au dom 
    }
  }

}
recupererId();


// _________ G E S T I O N    D U    PA N I E R  ________ //

// Récupération des données sélectionnées par l'utilisateur et envoi du panier  //

// Sélection des éléments auxquels on veut accéder //
let optionCouleur = document.querySelector('#colors');
// console.log(optionCouleur);

let quantite = document.querySelector('#quantity');
// console.log(quantite);

let button = document.querySelector('button');
// console.log(button);

// Création de l'évènement et envoyer du panier //
button.addEventListener('click', (e) => {
  e.preventDefault(); // permet de ne pas effectuer l'action comme elle devrait l'être - ici, ne réactualisera pas la page au clic sur ajouter au panier 

  // Stocker les choix de l'utilisateur dans une variable (choix = valeur) //
  let choixCouleur = optionCouleur.value;
  // console.log(choixCouleur);
  let choixQuantite = quantite.value;
  // console.log(choixQuantite);

  // Récupération des valeurs du formulaire //
  let produit = { // création d'un objet avec ses clés et ses valeurs 
    id: id,
    quantite: choixQuantite,
    couleur: choixCouleur,
    prix: donneesId.price,
  }
  console.log(produit);

  // Création du localStorage avec setItem // 
  let canapeLocalStorage = JSON.parse(localStorage.getItem("produit")); // convertir les données dans le localstorage en format JSON en objet javascript //
  // console.log(canapeLocalStorage);

  if (canapeLocalStorage) { // Si le produit (présence d'une clé) est déjà présent dans le localStorage //


  }
  else { // Si n'y a pas de produit dans le localstorage, création d'une clé //
    canapeLocalStorage = []; // création d'un tableau vide - localstorage vide // 
    canapeLocalStorage.push(produit); // ajouter dans le tableau la variable contenant les choix de l'utilisateur //
    localStorage.setItem("produit", JSON.stringify(canapeLocalStorage)); // envoie dans le localstorage les données en créant de la clé (produit) + conversion de l'objet js en format json des valeurs du produit 
    // console.log(canapeLocalStorage);
  }

});

  // à la fin : location.href = "cart.html" ? ;