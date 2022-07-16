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

// Création évènement qui enverra dans le local storage la couleur et la quantité choisie // 
let button = document.querySelector('button');

button.addEventListener('click', () => {
  //localStorage 


  // à la fin : location.href = "cart.html";
});


// Création du localStorage avec setItem // 

let canapeLocalStorage = JSON.parse(localStorage.getItem('canape'));

if(canapeLocalStorage) { // Vérifier si le produit (clé) est déjà présent dans le localStorage //


}
else { //  
  canapeLocalStorage = [];
  canapeLocalStorage.push();
  console.log(canapeLocalStorage);
}

