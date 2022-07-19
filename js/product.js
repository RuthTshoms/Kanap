// Extraire l'id //
let params = new URL(document.location).searchParams; // - parcourir et afficher les param de la page
// console.log(document.location); // OK
let id = params.get("id"); // récupérer la valeur de l'id attribuée à la variable id //
// console.log(id); // OK

// Affichage du produit (objet) sélectionné par l'id en faisant une requête fetch //
async function recupererId() {
  const requete = await fetch(`http://localhost:3000/api/products/${id}`, { // récupérer dynamiquement l'id de l'élément pour lequel on effectue une requete
    method: 'GET'
  });
  // console.log(requete); // afficher l'id dans la console - "status 200" requete OK (status 400 >> erreur ) //


  if (!requete.ok) {
    alert('Un problème est survenu.');
  }
  else { // 
    let donneesId = await requete.json();
    // console.log(donnees); //vérifie que les infos complètes du produit nous soient bien retournées //

    // création dynamique de balises et insertions de d'objets de la requete json dans le dom //
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


// Mettre le choix de l'utilisateur dans une variable (ou introduire les éléments en params directe) // 
let choixUtilisateur = {
  nom: donneesId.name,
 };

console.log(choixUtilisateur);



// Création évènement qui enverra dans le local storage la couleur et la quantité choisie // 
let button = document.querySelector('button');

button.addEventListener('click', (e) => {
  // console.log(e);

  // Création du localStorage avec setItem // 
  let canapeLocalStorage = JSON.parse(localStorage.getItem("produit")); // convertir les données dans le localstorage en format JSON en objet javascript //
  // console.log(canapeLocalStorage);
 
 if(canapeLocalStorage) { // Si le produit (présence d'une clé) est déjà présent dans le localStorage //
 

 }
 else { // Si n'y a pas de produit dans le localstorage, création d'une clé //
   canapeLocalStorage = []; // création d'un tableau vide - localstorage vide // 
   canapeLocalStorage.push(); // changer param *** ajouter dans le tableau toutes les données du produit, sélection du l'utilisateur //
   localStorage.setItem("produit", JSON.stringify(canapeLocalStorage)); // envoie dans le localstorage les données en créant de la clé (produit) + conversion de l'objet js en format json des valeurs du produit 
   console.log(canapeLocalStorage);
 }

  // à la fin : location.href = "cart.html";
});