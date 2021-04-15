console.log("Hello there");

const url = 'http://localhost:3001/'

const homepage = document.querySelector('.homepage')
const loginForm = document.querySelector('.loginForm')
const loginButton = document.querySelector('.login')
const signUpForm = document.querySelector('.signUpForm')
const signUpButton = document.querySelector('.signUp')
const signOut = document.querySelector('.signOut')
const addBizButton = document.querySelector('.addBiz')


// Sign Up Form
document.querySelector('.signUp').addEventListener('click', () => {
    triggerModal('signUpModal', 0)
})

signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const name = document.querySelector('.signUpName').value
    const email = document.querySelector('.signUpEmail').value
    const password = document.querySelector('.signUpPassword').value

    try {
        const response = await axios.post(`${url}users`, {
            name: name,
            email: email,
            password: password
        })

        console.log('line 25', response);

        const userId = response.data.user.id
        localStorage.setItem('userId', userId)

    }catch (error) {
        alert('user already exist')
    }
})

// Login Form
document.querySelector('.login').addEventListener('click', () => {
    triggerModal('loginModal', 1)
})

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const modal = document.querySelector('.loginModal')
    const email = document.querySelector('.loginEmail').value
    const password = document.querySelector('.loginPassword').value
    try {
        const response = await axios.post(`${url}users/login`, {
            email: email,
            password: password
        })

        const userId = response.data.user.id
        localStorage.setItem('userId', userId)

        modal.style.display = 'none'
        loginButton.classList.add('hidden')
        signUpButton.classList.add('hidden')
        addBizButton.classList.remove('hidden')
        signOut.classList.remove('hidden')
    } catch (error) {
        alert('login failed')
    }
})

signOut.addEventListener('click', () => {
    console.log('you logged out');
    localStorage.removeItem('userId')
    location.reload()
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

if (localStorage.getItem('userId')) {
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
