const selectUF = document.querySelector("select[name=uf]");
const selectCity = document.querySelector("[name=city]");
const inputState = document.querySelector("[name=state]");

function populateUFs() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
      for (const state of states) {
        selectUF.innerHTML += `<option value=${state.id}>${state.nome}</option>`
      }
    })
}

populateUFs();

function getCities(event) {
  const ufValue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  inputState.value = event.target.options[indexOfSelectedState].text;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  fetch(url)
    .then( res => res.json() )
    .then( cities => {
      for (const city of cities) {
        selectCity.innerHTML += `<option value=${city.id}>${city.nome}</option>`
      }
      selectCity.disabled = false;
    })

}



selectUF.addEventListener("change", getCities);