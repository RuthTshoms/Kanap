// *** REQUETE API VIA FETCH *** //

const url = 'http://localhost:3000/api/products';

async function recupererCanape() { 
  const requete = await fetch(url, { 
    method: 'GET'
  });

  if (!requete.ok) {
    alert('Un problème est survenu.');
  }
  else {
    let donnees = await requete.json(); // attendre que fetch termine de convertir les données en json pour les récupérer //
    // console.log(donnees); // vérifier que les données demandées nous soient bien retournées (console du navigateur) //

    let kanapHTML = "";
    donnees.forEach(function (donnee) { 
      kanapHTML += `<a href="./product.html?id=${donnee._id}"> 
      <article>
        <img src="${donnee.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">${donnee.name}</h3>
        <p class="productDescription">${donnee.description}</p>
      </article>
    </a>` 

    })
    items.innerHTML = kanapHTML; // reprise du DOM et insertion de kanaHTML à chaque fois (c'est ici que kanapHTml sera changé)

  }

}

recupererCanape();