const contenedor = document.getElementById (`contenedor-data`); //aca recupere el contenedor de las cards
const events = data.eventos
const $inpContainer = document.getElementById(`cards-conte`);

const $searchImp = document.getElementById(`site-search`)

const categories = events.map(event => event.category)
const setCategories = new Set (categories)
const arrayCategories = Array.from(setCategories)

const listOfCategory = [...new Set (events.map(cart => cart.category))]

imprimirOptions (arrayCategories, $inpContainer)


// FUNCIONES

function newArcontent ( contenido ){ // div creado y modificado
  return `
  <div class="card p-2" style="width: 18rem;">
  <img src="${contenido.image}" class="card-img-top h-50" alt="...">
  <div class="card-body text-center mb-3">
  <h5 class="card-title">${contenido.name}</h5>
    <p class="card-text">${contenido.description}</p>
  </div>
  <footer class="footer-cards text-center">
  <p>Price:${contenido.price}</p>
  <a href="./assets/pages/details.html?id=${contenido.date}" class="btn text-center buttons-nav">Details</a>
  </footer>
  </div>
`
}

function inpCart (newEvenet, content){

  let template = ``

for(let contenido of newEvenet){ // aca se hace un recorrido de todo los objetos del array
  template += newArcontent(contenido) // aca trae 1 a 1 con el += a nuevoArcontent 
}
  content.innerHTML = template

}

inpCart (events, contenedor)

function imprimirOptions (category, check){
  let template = ""
  for (let cate of category){
    template +=
    `<div class="form-check form-check-inline">
     <input class="form-check-input" type="checkbox" id="${cate}" value="${cate}">
     <label class="form-check-label" for="inlineCheckbox1">${cate}</label>
     </div>`
  }
  check.innerHTML += template
}



// ACA FILTRO POR CATEGORIA 

function filterForCategory(listCarts, arrayCategories){
  if (arrayCategories.length == 0 ){
      return listCarts
  }
  return listCarts.filter(cart =>  arrayCategories.includes(cart.category))
}
/////////////////////////////////////////////////////

// ACA FILTRO POR TEXTO QUE INGRESA EL USUARIO
function filterForText(listCarts, text){

  return listCarts.filter(cart => cart.name.toLowerCase().includes( text.toLowerCase() ) || cart.description.toLowerCase().includes( text.toLowerCase() ) )
}
// ACA FILTRO CRUZADO
function filtroCross ( events, catFil, nameText){
  const crossEvent = filterForCategory (events, catFil)
  const crossText = filterForText (crossEvent, nameText )
  
  return crossText
}

// EVENTOS 

$inpContainer.addEventListener("change", () =>{

  let checkSelector = [...document.querySelectorAll(`input[type = "checkbox"]:checked`)].map(check => check.id)

  const carFilterx = filtroCross(events, checkSelector, $searchImp.value )
  
  inpCart(carFilterx, contenedor)

})

$searchImp.addEventListener("input", () =>{
  let checkSelector = [...document.querySelectorAll(`input[type = "checkbox"]:checked`)].map(check => check.id)

  const carFilterx = filtroCross(events, checkSelector, $searchImp.value )

  inpCart(carFilterx, contenedor)
})


