export default async function findAllPokemons(endpoint) {
  try {
    const res = await fetch(endpoint);
    if(!res.ok) throw { status: res.status, statusText: res.statusText}
    const pokemons = await res.json();


    document.querySelector(".buttons__previous").dataset.previous = pokemons.previous;
    document.querySelector(".buttons__next").dataset.next = pokemons.next;

    console.log(pokemons)

    showAllPokemons(pokemons.results);

  } catch (error) {
    let message = error.statusText || "Hubo un error"
    console.log(`Error: ${message} ${error.status}`)
  }
}

const showAllPokemons = async (pokes) => {
  const $template = document.getElementById("template-pokemon").content,
  $pokemons = document.querySelector(".pokemons"),
  $fragment = document.createDocumentFragment();
  // console.log(pokes)
  try {
    for (let i = 0; i < pokes.length ; i++){
      try {
        const res = await fetch(pokes[i].url);
        if(!res.ok) throw {status: res.status, statusText: res.statusText}
        const data = await res.json();
        let avatar = data.sprites.front_default;


        $template.querySelector(".pokemons__img").src = avatar;
        $template.querySelector(".pokemons__img").alt = pokes[i].name;
        $template.querySelector(".pokemons__name").textContent = pokes[i].name;

        const $clone = document.importNode($template, true);
        $fragment.append($clone);

      } catch (error) {
        let message = error.statusText || "Hubo un error"
        console.log(`Error: ${message} ${error.status}`)
      }
    }
    if($pokemons.children.length){
      $pokemons.textContent = "";
      $pokemons.append($fragment)
    } else{
      $pokemons.append($fragment)
    }
  } catch (error) {
    let message = error.statusText || "Hubo un error"
    console.log(`Error: ${message} ${error.status}`)
  }
}