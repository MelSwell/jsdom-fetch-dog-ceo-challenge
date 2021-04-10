console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {

  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(dogPhotos => renderDogPhotos(dogPhotos.message))

  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(dogBreeds => renderBreedList(dogBreeds.message))
    
  const breedList = document.getElementById("dog-breeds")
  breedList.addEventListener("click", (event) => {
    toggleTextColorToAqua(event.target)
  })
  
  const breedSelector = document.getElementById("breed-dropdown")
  breedSelector.addEventListener("change", event => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(dogBreeds => {
      const dogBreedsObj = dogBreeds.message
      const breedList = document.getElementById("dog-breeds")
      
      for (const breed in dogBreedsObj) {
        if (event.target.value === "all") {
          renderBreedList(dogBreedsObj)
        } else if (breed.charAt(0) !== event.target.value) {
          delete dogBreedsObj[breed]
        }
      }
      
      breedList.innerHTML = "" 
      renderBreedList(dogBreedsObj)
    })
  })

})

const renderDogPhotos = arrOfDogPhotoUrls => {
  const dogImgContainer = document.querySelector("#dog-image-container")
  
  arrOfDogPhotoUrls.forEach(dogPhotoUrl => {
    const dogImg = document.createElement("div")
    dogImg.innerHTML = `<img src="${dogPhotoUrl}", alt="A dog" height=350px width=500px>`
    dogImgContainer.append(dogImg)
  })      
}

const renderBreedList = dogBreedsObj => {
  const breedList = document.getElementById("dog-breeds")

  for (const breed in dogBreedsObj) {
    const breedListItem = document.createElement("li")
    
    if (dogBreedsObj[breed].length > 0){
      breedListItem.textContent = `${breed}:`
      const subBreedList = document.createElement("ul")
      
      for (subBreed of dogBreedsObj[breed]){
        const subBreedListItem = document.createElement("li")
        subBreedListItem.style.color = "black"
        subBreedListItem.textContent = `${subBreed}`  
        subBreedList.append(subBreedListItem)
        breedListItem.append(subBreedList)
      } 

    } else {
      breedListItem.textContent = `${breed}`
    }
    breedList.append(breedListItem) 
  
  }
}

const toggleTextColorToAqua = element => {
  if (element.style.color === "" || element.style.color === "black"){
    element.style.color = "aqua"
  } else {
    element.style.color = "black"
  }
}