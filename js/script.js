// *** REQUETE API VIA FETCH *** //

const url = 'http://localhost:3000/api/products';

async function recupererCanape() { // fonction asynchrone *****
  const requete = await fetch(url, { //  attendre que fetch se termine pour récupérer notre requete //
    method: 'GET'
  });

  if (!requete.ok) {
    alert('Un problème est survenu.');
  }
  else {
    let donnees = await requete.json(); // attendre que fetch termine de convertir les données en json pour les récupérer //
    // console.log(donnees); // vérifier que les données demandées nous soient bien retournées (console du navigateur) //

    let kanapHTML = ""; // variable vide qui contiendra chaque ******
    donnees.forEach(function (donnee) { // stockage de l'élément en cours dans la variable "donnees"
      kanapHTML += `<a href="./product.html?id=${donnee._id}"> 
      <article>
        <img src="${donnee.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">${donnee.name}</h3>
        <p class="productDescription">${donnee.description}</p>
      </article>
    </a>` // on ajoute à chaque itération les valeurs des éléments ajoutés dynamiquement

    })
    items.innerHTML = kanapHTML; // reprise du DOM et insertion de kanaHTML à chaque fois (c'est ici que kanapHTml sera changé)

  }

}

recupererCanape();





