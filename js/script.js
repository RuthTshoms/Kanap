// *** REQUETE API VIA FETCH *** //

const url = 'http://localhost:3000/api/products';

async function getProduct() { 
  const request = await fetch(url, { 
    method: 'GET'
  });

  if (!request.ok) {
    alert('Un problème est survenu.');
  }
  else {
    let data = await request.json(); // attendre que fetch termine de convertir les données en json pour les récupérer //
    // console.log(donnees); // vérifier que les données demandées nous soient bien retournées (console du navigateur) //

    let kanapHTML = "";
    data.forEach(function (data) { 
      kanapHTML += `<a href="./product.html?id=${data._id}"> 
      <article>
        <img src="${data.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">${data.name}</h3>
        <p class="productDescription">${data.description}</p>
      </article>
    </a>` 

    })
    items.innerHTML = kanapHTML; // reprise du DOM et insertion de kanaHTML à chaque fois (c'est ici que kanapHTml sera changé)

  }

}

getProduct();