const url = 'http://localhost:3000/api/products'; 

async function recupererCanape() {
  const requete = await fetch(url, { //  
    method: 'GET'
  });

  if(!requete.ok) {
    alert('Un problème est survenu.');
  }
  else {
    let donnees = await requete.json();
    console.log(donnees); // vérifier que les données demandées nous soient bien retournées (voir dans la console du navigateur) //
    //for(let i = 0; i > 0; i++) { // parcourir les objects pour avoir toutes les infos, les détails afin de les afficher //
     // console.log(donnees[0]);
    // }
    let informations = ['http://localhost:3000/images/kanap01.jpeg', 'Kanap Sinopé', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'];
    let [imageUrl, name, description] = informations; 
    console.log(imageUrl);
    console.log(name);
    console.log(description);


    // document.querySelector('img').innerHTML = // js va parcourir le dom pour recup l'img UTILISER AFFECTION POUR MANIP // 
    // document.querySelector('.h3');
    // document.querySelector('.p');

    // console.log('img');
  }
}

recupererCanape();

// document.querySelector('img').textContent = donnees.Canape.last;