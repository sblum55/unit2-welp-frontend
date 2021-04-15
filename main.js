console.log("Hello there");

const homepage = document.querySelector('.homepage')

document.querySelector('.signUp').addEventListener('click', () => {
    triggerModal('signUpModal', 0)
})

document.querySelector('.login').addEventListener('click', () => {
    triggerModal('loginModal', 1)
})

document.querySelector('.addBiz').addEventListener('click', () => {
    triggerModal('addBizModal', 2)
})

const hideAllPages = () => {
    homepage.classList.add('hidden')
}

const triggerModal = (querySelect, closePos) => {
    const modal = document.querySelector('.' + querySelect)
    const span = document.getElementsByClassName("close")[closePos]
    
    modal.style.display = "block";
    
    span.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = event => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/*If (userloggedin) {
    document.querySelector('.login').classList.add('hidden')
    document.querySelector('.signUp').classList.add('hidden')
    document.querySelector('.addBiz').classList.remove('hidden')
    document.querySelector('.signOut').classList.remove('hidden')
} else {
    document.querySelector('.login').classList.remove('hidden')
    document.querySelector('.signUp').classList.remove('hidden')
    document.querySelector('.addBiz').classList.add('hidden')
    document.querySelector('.signOut').classList.add('hidden')
}
*/