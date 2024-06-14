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