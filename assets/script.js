//Traigo la url de la API
const url = ('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
//Funcion para manipular la url de la api
const api = (url) =>{
    return fetch(url)
    .then((response)=> response.json())
    .then((responseConJson)=>{
        pokemonIndividual(responseConJson),paginacion(responseConJson);
       }
    )
    .catch((err)=>console.log('Hubo un error',err))
}
//Captural de pokemon individual
const pokemonIndividual = (pokemon) =>{
    let div = "";
    document.getElementById("datosPersonajes").innerHTML = "";
    pokemon.results.forEach((i) => {
        return fetch (i.url)
            .then((response)=>response.json())
            .then((responseConJson)=>{
               pokemonesEnLaPagina(responseConJson,div)
            }).catch((err)=>{
                console.log('Hubo un error', err)
            })
    });
}
//Pokemones en pantalla
const pokemonesEnLaPagina = (pokemon,div) =>{
        div += `<div class="card my-3 mx-3" style="width: 18rem;">`
        div += `<img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`
        div += `<h4 class="card-title">Id: ${pokemon.id}</h4>`
        div += `<h5 class="card-title">Name: ${pokemon.name}</h5>`
        div += `<h5 class="card-title">Base Experience: ${pokemon.base_experience}</h5>`
        div += `<h5 class="card-title"></h5>`
        div += `</div>`
        div += `</div>`
    document.getElementById('datosPersonajes').innerHTML += div
}
//Paginacion de la API
const paginacion = (info) =>{
    let next = "";
    let prev = "";
    let html = "";
    info.previous == null ? prev = 'disabled' : prev = '';
    info.next == null ? next = 'disabled' : next = '';

    html+=`<li class="page-item  ${prev}"><a class="page-link" onclick="api('${info.previous}')" >Anterior</a></li>`
    html+=`<li class="page-item ${next}"> <a class="page-link" onclick="api('${info.next}')" >Siguiente</a></li>`

    document.getElementById('paginacion').innerHTML = html;
}
//Llevo al URL de la API a la funcion
api(url);