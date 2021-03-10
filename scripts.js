import findAllPokemons from './scripts/findAllPokemons.js'
import findOnePokemon from './scripts/findOnePokemon.js';

document.addEventListener("DOMContentLoaded", e => {

  const $form = document.querySelector(".form")

  findAllPokemons("https://pokeapi.co/api/v2/pokemon");

  document.addEventListener("click", e => {
    if(e.target.matches(".pokemons__img")){
      let $figcaption = e.target.previousElementSibling;
      findOnePokemon($figcaption.textContent);
    }

    if(e.target.matches(".buttons__next")){
      let endpoint = e.target.dataset.next;
      findAllPokemons(endpoint);
    }

    if(e.target.matches(".buttons__previous")){
      let endpoint = e.target.dataset.previous;
      findAllPokemons(endpoint);
    }
  })


  $form.addEventListener("submit", e => {
    e.preventDefault();
    let pokemonName = e.target.querySelector('[name="name"]').value;
    findOnePokemon(pokemonName.toLowerCase());
    e.target.querySelector('[name="name"]').value = ""
    
  })
})
