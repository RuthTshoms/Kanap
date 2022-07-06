// Extraire l'id //
let params = new URL(document.location).searchParams; // - parcourir et afficher les param de la page
// console.log(document.location); // OK
let id = params.get("id"); // récupérer la valeur de l'id attribuée à la variable id //
// console.log(id); // OK

// Affichage du produit (objet) sélectionné par l'id en faisant une requête fetch //
async function recupererId() {
  const requete = await fetch(`http://localhost:3000/api/products/${id}`,{ // récupérer dynamiquement l'id de l'élément pour lequel on effectue une requete
    method: 'GET'
  });
  // console.log(requete); // afficher l'id dans la console - "status 200" requete OK (status 400 >> erreur ) //
  

  if (!requete.ok) {
    alert('Un problème est survenu.');
  }
  else { // 
    let donnees = await requete.json();
    // console.log(donnees); //vérifie que les infos complètes du produit nous soient bien retournées OK //
    
    let image = document.querySelector('.item__img');
    let h1 = document.querySelector('#title');
    let prix = document.querySelector('#price');
    let description = document.querySelector('#description');
    
    // console.log(image); // sélection DOM OK
    // console.log(h1); // OK
    // console.log(prix); // OK
    // console.log(description); // OK



  }
}

recupererId();