const selectUF = document.querySelector("select[name=uf]");
const selectCity = document.querySelector("[name=city]");
const inputState = document.querySelector("[name=state]");
const inputItems = document.querySelector("input[name=items]");

function populateUFs() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
      for (const state of states) {
        selectUF.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
      }
    })
}

populateUFs();

function getCities(event) {
  const ufValue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  inputState.value = event.target.options[indexOfSelectedState].text;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  selectCity.innerHTML = "<option value>Selecione a Cidade</option>";
  selectCity.disabled = true;

  fetch(url)
    .then( res => res.json() )
    .then( cities => {
      for (const city of cities) {
        selectCity.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
      }
      selectCity.disabled = false;
    })
}



selectUF.addEventListener("change", getCities);

// Itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
   item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];

function handleSelectedItem(event) {
  // Adicionar ou remover uma classe em JS
  const itemLi = event.target;
  itemLi.classList.toggle("selected");
  const itemId = itemLi.dataset.id;

  // Verificar se existem itens selecionados, se sim
  // pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item === itemId;
    return itemFound;
  })

  // se já estiver selecionado
  if (alreadySelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item !== itemId; // false
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  } else {
    // se não estiver selecionado, adicionar à seleção
    selectedItems.push(itemId);
  }

  console.log(selectedItems)


  // atualizar o campo escondido com os dados selecionados
  inputItems.value = selectedItems;
}