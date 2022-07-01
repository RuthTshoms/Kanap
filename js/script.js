const url = 'http://localhost:3000/api/products';

async function recupererCanape() {
  const requete = await fetch(url, { //  attendre que fetch se termine pour récupérer notre requete //
    method: 'GET'
  });

  if (!requete.ok) {
    alert('Un problème est survenu.');
  }
  else {
    let donnees = await requete.json(); // attendre que fetch termine de convertir les données en json pour les récupérer //
    // console.log(donnees); // vérifier que les données demandées nous soient bien retournées (console du navigateur) //

    //for(let i = 0; i > 0; i++) { // parcourir les objects pour avoir toutes les infos, les détails afin de les afficher //
    // console.log(donnees[0]);
    // }

    //for (const x of donnees) {
    //  console.log(x);
    // }

    let { imageUrl, name, description } = donnees;
console.log(donnees)
    console.log(imageUrl);
    console.log(name);
    console.log(description);

    document.querySelector('img').innerHTML = imageUrl;// js va parcourir le dom pour recup la balise souhaitée, ici l'img, et la modifier  // 
    document.querySelector('.h3').innerHTML = name;
    document.querySelector('.p').innerHTML = description;

  }
}

recupererCanape();





