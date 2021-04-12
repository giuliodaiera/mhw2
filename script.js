function aggiungi(){

    const players = document.getElementById('giocatori');

    for(let item of giocatori){
        const playerContainer = creaNodoGiocatore(item);
        players.appendChild(playerContainer);
    }

}

aggiungi();

function creaNodoGiocatore(item){
    const playerContainer = document.createElement('div');
    playerContainer.className = "player";
    playerContainer.id = item.nome;

    const headerContainer = document.createElement('div');
    headerContainer.className = "box1";
    playerContainer.appendChild(headerContainer);

    const nameContainer = document.createElement('label');
    nameContainer.className = "nome";
    headerContainer.appendChild(nameContainer);
    nameContainer.textContent = item.nome;

    const heartContainer = document.createElement('img');
    heartContainer.className = "cuore-bianco";
    heartContainer.id = "cuore-" + item.nome;
    headerContainer.appendChild(heartContainer);
    heartContainer.src = item.cuore;
    heartContainer.addEventListener('click', function() {clickToAddFavorites(item.nome)});

    const innerContainer = document.createElement('div');
    innerContainer.className = "box2";
    playerContainer.appendChild(innerContainer);

    const imageContainer = document.createElement('img');
    imageContainer.className = "immagine";
    innerContainer.appendChild(imageContainer);
    imageContainer.src = item.immagine;

    const lastContainer = document.createElement('div');
    lastContainer.className = "box3";
    lastContainer.id = "box3-" + item.nome;
    playerContainer.appendChild(lastContainer);

    const infoContainer = document.createElement('label');
    infoContainer.className = "details";
    infoContainer.id = "details-" + item.nome;
    lastContainer.appendChild(infoContainer);
    infoContainer.textContent = 'Clicca per statistiche';
    infoContainer.addEventListener('click', function() {moreDetails(item.nome)});

    const statistiche = document.createElement('p');
    statistiche.className = 'statistiche-close';
    statistiche.id = 'statistiche-'+ item.nome;
    lastContainer.appendChild(statistiche);
    statistiche.textContent = item.statistiche;

    return playerContainer;
}

function creaNodoGiocatorePerPreferiti(item){
    const playerContainer = document.createElement('div');
    playerContainer.className = "player";
    playerContainer.id = "preferiti-" + item.nome;

    const headerContainer = document.createElement('div');
    headerContainer.className = "box1";
    playerContainer.appendChild(headerContainer);

    const nameContainer = document.createElement('label');
    nameContainer.className = "nome";
    headerContainer.appendChild(nameContainer);
    nameContainer.textContent = item.nome;

    const heartContainer = document.createElement('img');
    heartContainer.className = "cuore-rosso";
    heartContainer.id = "cuore-favoriti-" + item.nome;
    headerContainer.appendChild(heartContainer);
    heartContainer.src = "heart_red.png"
    heartContainer.addEventListener('click', function() {removeFromFavorites(item.nome)});

    const innerContainer = document.createElement('div');
    innerContainer.className = "box2";
    playerContainer.appendChild(innerContainer);

    const imageContainer = document.createElement('img');
    imageContainer.className = "immagine";
    innerContainer.appendChild(imageContainer);
    imageContainer.src = item.immagine;

    return playerContainer;

}

function moreDetails(nome){
    const button = document.getElementById("details-" + nome);
    const stats = document.getElementById('statistiche-' + nome);

    if(stats.className == "statistiche-open"){
        stats.className = "statistiche-close";
        button.innerHTML = "Clicca per Statistiche";
    } else{
        stats.className = "statistiche-open";
        button.innerHTML = "Nascondi";
    }
}

function clickToAddFavorites(nome){
    const image = document.getElementById('cuore-' + nome);
    const containerPreferiti = document.getElementById('preferiti-container');
    const nodoPreferiti = document.getElementById('preferiti');

    if(image.className == 'cuore-bianco'){
        image.src = "heart_red.png";
        containerPreferiti.setAttribute('style', 'display: block;');
        image.className = "cuore-rosso";

        const giocatore = giocatori.find(g => g.nome === nome);
        nodoPreferiti.appendChild(creaNodoGiocatorePerPreferiti(giocatore));
    }
}

function removeFromFavorites(nome){
    const containerPreferiti = document.getElementById('preferiti-container');
    const imageCalciatoreOriginale = document.getElementById('cuore-' + nome);
    const nodoPreferiti = document.getElementById('preferiti');

    const nodoGiocatoreDaRimuovereDaiPreferiti = document.getElementById("preferiti-" + nome);

    nodoGiocatoreDaRimuovereDaiPreferiti.remove();

    imageCalciatoreOriginale.src = "heart.png";
    imageCalciatoreOriginale.className = "cuore-bianco";

    if(!nodoPreferiti || nodoPreferiti.childNodes.length < 1){
        containerPreferiti.setAttribute('style', 'display: none;');
    }
}

function search(){
    const giocatori = document.getElementById("giocatori").querySelectorAll(".player");
    const inputContainer = document.getElementById("search");

    const text = inputContainer.value.toLowerCase();

    for(const giocatore of giocatori){
        if(giocatore.id.toLowerCase().includes(text)){
            giocatore.setAttribute("style", "display: block;");
        }
        else{
            giocatore.setAttribute("style", "display: none;");
        }
    }
}