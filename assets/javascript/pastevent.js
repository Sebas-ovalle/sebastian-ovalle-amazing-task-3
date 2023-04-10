const $contenedor = document.getElementById (`contenedor-3`); //aca recupere el contenedor de las cards

const events = inpCart(data.eventos)
console.log(events)
const $inpContainer = document.getElementById(`cards-conte`);

const $searchImp = document.getElementById(`site-search`)

const categories = events.map(event => event.category)

const setCategories = new Set (categories)

const arrayCategories = Array.from(setCategories)

const listOfCategory = [...new Set (events.map(cart => cart.category))]

const contenidos = [] // aca le asigne un valor a un array vacio

function nuevoArcontent ( contenido ){ // aca edite la card con nuevos objetos sacadas de data eventos
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
// const events = data.eventos
function inpCart (newEvenet){
  let contenidos = []                                    
for (let contenido of newEvenet){ // aca filtro las fechas correspondientes a evento pasado
    if (contenido.date <= data.fechaActual){ // aca lo mismo que past pero invertido
        contenidos.push(contenido)
       }
       
}
return contenidos
}

function showTemplate(listFilt, contFilt){
    let template = ``

    for(let contenido of listFilt){
        template += nuevoArcontent(contenido)
    }
    contFilt.innerHTML = template
   }

showTemplate (contenidos, $contenedor)



//////////////////////////////////////////////////////////////////////////////////////


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
  
  imprimirOptions (arrayCategories, $inpContainer )

///////////////////////////////////////////////////////////////////////////////////////

function filterForCategory(listCarts, arrayCategories){
    if (arrayCategories.length == 0 ){
        return listCarts
    }
    return listCarts.filter(cart =>  arrayCategories.includes(cart.category))
  }
  
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
  
 ///////////////////////////////////////////////////////////////////////////////////////

  $inpContainer.addEventListener("change", () =>{

    let checkSelector = [...document.querySelectorAll(`input[type = "checkbox"]:checked`)].map(check => check.id)
  
    const carFilterx = filtroCross(events, checkSelector, $searchImp.value )
    
    showTemplate(carFilterx, $contenedor)
  
  })
  
  $searchImp.addEventListener("input", () =>{
    let checkSelector = [...document.querySelectorAll(`input[type = "checkbox"]:checked`)].map(check => check.id)
  
    const carFilterx = filtroCross(events, checkSelector, $searchImp.value )
  
    showTemplate(carFilterx, $contenedor)
  })