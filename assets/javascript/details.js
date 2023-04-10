const $contentDescription = document.getElementById (`contentCardDesc`)
let urlParams = location.search
console.log(urlParams)
let params = new URLSearchParams (urlParams)
console.log(new URLSearchParams)
let id = params.get("id")
console.log(id)

let cartfind = data.eventos.filter (card => card.date)

let dateFind = cartfind.find (card => card.date == id)

function impCard (card){
    let templates = ""
    templates = `
        <div class="img-dis">
        <img src=${card.image}alt="...">
        </div>
        <div class="description-tag">
        <ul>
            <li>name:${card.name}</li>
            <li>date:${card.date}</li>
            <li>description:${card.description}</li>
            <li>category:${card.category}</li>
            <li>place:${card.place}</li>
            <li>capacity:${card.capacity}</li>
            <li>assistance:${card.assistance}</li>
            <li>price:${card.price}</li>
        </ul>
        </div>`
     $contentDescription.innerHTML = templates
}

impCard(dateFind)