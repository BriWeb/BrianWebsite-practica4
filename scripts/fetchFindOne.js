export default async function fetchFindOne (endpoint){
  try {
    const res = await fetch(endpoint);
    if(!res.ok) throw {status: res.status, statusText: res.statusText}
    const pokemon = await res.json();

    
    return pokemon;

  } catch (error) {
    const $input = document.querySelector(".form__input");
    const $messageError = document.createElement("p");
    $messageError.textContent = "Pokémon no encontrado"
    $messageError.classList.add("error");
    $input.after($messageError)
    let message = error.statusText || "Hubo un error"
    console.log(`Error: ${message} ${error.status}`)
  }
}