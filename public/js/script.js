//function tht control Carsouel
function startCarousel(){
    let activeImage = 0
    const images = document.querySelectorAll('#carousel img')//return an arr 
    function cycleImages(){
        if(!images[activeImage]){//if there's nothing in images that have the active image tag, just exit the function and kill the function
            clearInterval(intervalId)
            return;
        }
        images[activeImage].classList.remove('active')
        activeImage = (activeImage + 1) % images.length
        images[activeImage].classList.add('active')
    }
    let intervalId = setInterval(cycleImages, 3000)
}
//Handle Erros from server if unable to write data (optional)
function checkForError() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
      alert("Validation failed. Name and description are required.");
    }
  }


// function that inserts data in the modal or Pop-Up window
  async function showDetails(id){
    console.log(id)
    try{
      document.querySelector('#detailImage').innerHTML = ''
        const response = await fetch(`/menu/showDetails/${id}`)
        const data = await response.json()

        let img = document.createElement('img')
        img.srcset = `/imgs/${data.image}`
        img.setAttribute("style", "width: 75%")
        document.querySelector('#detailImage').appendChild(img)
        document.querySelector('#staticBackdropLabel').innerHTML = data.name
        document.querySelector('#details').innerHTML = data.detail

    } catch(err){
        console.log(err)
    }
}

window.onload = function(){
  startCarousel();
  checkForError()
}