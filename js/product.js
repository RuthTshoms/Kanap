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
    // console.log(donnees); //vérifie que les infos complètes du produit nous soient bien retournées OK //

    document.querySelector('.item__img').innerHTML = `<img src="${donneesId.imageUrl}" alt="Photographie d'un canapé"></img>`;
    document.querySelector('#title').innerHTML = `<h1 id="title">${donneesId.name}</h1>`;
    document.querySelector('#price').innerHTML = `<p>Prix : <span id="price">${donneesId.price}</span>€</p>`;
    document.querySelector('#description').innerHTML = `<p id="description">${donneesId.description}</p>`;

    let couleurCanape = donneesId.colors;

    
    // console.log(couleurCanape);

    // for (couleurCanape = 0; couleurCanape > 0; couleurCanape++) {
    // console.log(couleurCanape); // dom + valeur dynamique 
    // document.querySelector('#colors').innerHTML = `<option value=${donneesId.colors}>vert</option>`;
    // }

    // function afficherCouleur(choixCouleurs = couleurCanape) { // choixCouleurs = couleurCanape
    //  let couleurs = "";

    //  for (const valeur in choixCouleurs) {
        //couleurs += `<option value=${choixCouleurs.colors}</option>
        //<option value=${choixCouleurs.colors}</option>`
      //  console.log(valeur);
     // }
      // colors.innerHTML = couleurs;

    //}
    // afficherCouleur();

  }

}
recupererId();