import fetchFindOne from "./fetchFindOne.js";

const $loader = document.querySelector(".loader");
const $target = document.querySelector(".pokemon-target");

export default async function findOne(name){
  console.log(name)
  try {
    let endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const pokemon = await fetchFindOne(endpoint)
    
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    $loader.classList.remove("none");
    $target.classList.add("none")

    let abilities = [];
    for( let i = 0; i < pokemon.abilities.length ; i++){
      console.log(pokemon.abilities.length)

      try {
        endpoint = pokemon.abilities[i].ability.url;

        const res = await fetch(endpoint);
        if(!res.ok) throw {status: res.status, statusText: res.statusText}
        const ability = await res.json();


        for( let j = 0; j < ability.effect_entries.length ; j++){
          if(ability.effect_entries[j].language.name === "en"){
            abilities[i] = ability.effect_entries[j].effect;
            break;
          }
        }

      } catch (error) {
        let message = error.statusText || "Hubo un error"
        console.log(`Error: ${message} ${error.status}`)
      }
    }
    showOnePokemon(pokemon, abilities);
  } catch (error) {
    let message = error.statusText || "Hubo un error"
    console.log(`Error: ${message} ${error.status}`)
  }
}


const showOnePokemon = (pokemon, abilities) => {

  const $templateAbility = document.querySelector(".template-abilities").content;
  const $fragment = document.createDocumentFragment();

  $target.querySelector(".pokemon-target__title").textContent = `Habilidades de ${pokemon.name}:`
  $target.querySelector(".pokemon-target__name").textContent = pokemon.name;
  $target.querySelector(".pokemon-target__img").src = pokemon.sprites.front_default;

  abilities.map( (ability, index) => {
    $templateAbility.querySelector(".pokemon-target__ability").textContent = `${pokemon.abilities[index].ability.name} :`
    $templateAbility.querySelector(".pokemon-target__description").textContent = ability;
    const $clone = document.importNode($templateAbility, true);
    $fragment.append($clone);
  })

  
  $target.querySelector(".pokemon-target__abilities").textContent = "";
  $target.querySelector(".pokemon-target__abilities").append($fragment);

  $loader.classList.add("none");
  $target.classList.remove("none")

}