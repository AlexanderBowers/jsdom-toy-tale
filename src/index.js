let addToy = false;
let selectedToy = {}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetchToys()
  let myForm = document.querySelector('form.add-toy-form')
  console.log(myForm)
  myForm.addEventListener("submit",formSubmit)
  
})

function formSubmit(e){
  e.preventDefault();
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json' 
  },
  body: JSON.stringify({
    'name': e.target.name.value,
    'image': e.target.image.value,
    'likes': 0
    })  
  })
  .then(resp => resp.json())
  .then(resp => console.log(resp))
}


function addLike(event){ 
  let parent = event.target.parentElement
  fetch(`http://localhost:3000/toys/${parent.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    },
    body: JSON.stringify({
      'likes': parseInt(parent.querySelector('p').textContent) + 1 
      })  
    })
    .then(resp => resp.json())
    .then(resp => document.getElementById(`${parent.id}`).querySelector('p').innerText = data.likes)
}

function fetchToys(){fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => addClass(data))}

function addClass(toy){
  let toyCollection = document.getElementById('toy-collection')
  for(const element of toy)
  {
    console.log(element.id)
    let myDiv = document.createElement('div')
    myDiv.id = element.id
    myDiv.classList.add('card')

    let h2 = document.createElement('h2')
    h2.innerText = element.name
    myDiv.appendChild(h2)

    let img = document.createElement('img')
    img.src = element.image
    img.classList.add('toy-avatar')
    myDiv.appendChild(img)

    let p = document.createElement('p')
    p.innerText = element.likes
    myDiv.appendChild(p)

    let btn = document.createElement('button')
    btn.classList.add('like-btn')
    btn.innerText = 'like'
    
    //WE MUST REMOVE addLike from this - it's applied on refresh
    console.log(element.id)
    myDiv.appendChild(btn)
   

    toyCollection.appendChild(myDiv)
    btn.addEventListener('click', addLike)
  }
}
//When the page loads, make a 'GET' request to fetch all the toy objects. With the response data,
// make a <div class="card"> for each toy and add it to the toy-collection div.
