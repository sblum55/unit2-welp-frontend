console.log("Hello there");

const url = 'http://localhost:3001/'

const homepage = document.querySelector('.homepage')
const loginForm = document.querySelector('.loginForm')
const loginButton = document.querySelector('.login')
const signUpForm = document.querySelector('.signUpForm')
const signUpButton = document.querySelector('.signUp')
const signOut = document.querySelector('.signOut')
const addBizButton = document.querySelector('.addBiz')
const bizForm = document.querySelector('.addBizForm')
const bizNameInput = document.querySelector('.addBizName')
const bizAddressInput = document.querySelector('.addBizAddress')
const bizDescriptionInput = document.querySelector('.addBizDescription')
const bizImageInput = document.querySelector('.addBizImage')
const bizTypeInput = document.querySelector('.addBizType')
const buttonTestGetAll = document.querySelector('#testGetAll')
const homePageDropZone = document.querySelector('.homepageDropZone')

let allBiz = []


// Reusable Functions

const clearDOM = (area) => {
    while (area.firstChild) {
        area.firstChild.remove()
    }  
}

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
        location.reload()

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

// Add business
bizForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const name = bizNameInput.value
    const address = bizAddressInput.value
    const description = bizDescriptionInput.value
    const image = bizImageInput.value
    const type = bizTypeInput.value
    const userId = localStorage.getItem('userId')

    try {
        const response = await axios.post(`${url}business/new`, {
            name: name,
            address: address,
            description: description,
            image: image,
            type: type,
            userId: userId
        })

        console.log(response)
        location.reload()

    } catch (error) {
        alert('Add business failed')
    }

})


// Home page - get all businesses
buttonTestGetAll.addEventListener('click', () => {
    homeAllBiz()
})



const homeAllBiz = async () => {
    try {
        const response = await axios.get(`${url}business/all`)

        console.log(response)

        allBizDOM(response)

    } catch (error) {
        alert('No good')
    }
}

const allBizDOM = async (response) => {
    clearDOM(homePageDropZone)
    allBiz = response.data

    for ( let biz in allBiz ) {
        let bizComponent = document.createElement('div')
        bizComponent.classList.add('biz-component')
        bizComponent.addEventListener('click', async () =>{
            try {
                const res = await axios.post(`${url}business`, {
                    businessId: `${allBiz[biz].id}`
                })
                console.log(res)
                // callback functions for changing the page

            } catch (error) {    
            }
        })
        homePageDropZone.appendChild(bizComponent)

        let bizTitle = document.createElement('div')
        bizTitle.classList.add('biz-title')
        bizTitle.innerText = `${allBiz[biz].name}`
        bizComponent.appendChild(bizTitle)

        let bizType = document.createElement('div')
        bizType.classList.add('biz-type')
        bizType.innerText = `${allBiz[biz].type}`
        bizComponent.appendChild(bizType)

        let bizImage = document.createElement('img')
        bizImage.src = `${allBiz[biz].image}`
        bizImage.classList.add('biz-image')
        bizComponent.appendChild(bizImage)

    }


}





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
    homeAllBiz()
} else {
    document.querySelector('.login').classList.remove('hidden')
    document.querySelector('.signUp').classList.remove('hidden')
    document.querySelector('.addBiz').classList.add('hidden')
    document.querySelector('.signOut').classList.add('hidden')
    homeAllBiz()
}
