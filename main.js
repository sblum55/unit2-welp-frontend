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
const homePageDropZone = document.querySelector('.homepageDropZone')
const businessContainer = document.querySelector('.businessContainer')
const gitBizLogo = document.querySelector('.gitBiz')

let allBiz = []


gitBizLogo.addEventListener('click', () => {
    location.reload()
})

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

        //LOGIN HAS TO HAVE SUCCEDDED SO RUN THIS
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
                singleBusiness(allBiz[biz])
                homepage.classList.add('hidden')
            } catch (error) {    
            }
        })
        homePageDropZone.appendChild(bizComponent)

        let bizTitle = document.createElement('h2')
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

const singleBusiness = async (response) => {

    //Business Info
    const bizMiddleContainer = document.createElement('div')
    bizMiddleContainer.classList.add('bizMiddleContainer')
    
    let bizTitleContainer = document.createElement('div')
    bizTitleContainer.classList.add('bizTitleContainer')
    businessContainer.appendChild(bizTitleContainer)

    let bizTitle = document.createElement('h1')
    bizTitle.classList.add('bizTitle')
    bizTitle.innerText = response.name
    bizTitleContainer.appendChild(bizTitle)
    
    const bizOwner = await axios.post(`${url}users/getUser`, {
        userId: response.userId
    })
    console.log(bizOwner);

    let bizOwnerText = document.createElement('h3')
    bizOwnerText.innerText = `Owner: ${bizOwner.data.user.name}`
    bizOwnerText.classList.add('bizOwnerName')
    bizTitleContainer.appendChild(bizOwnerText)

    let bizImageContainer = document.createElement('div')
    bizImageContainer.classList.add('bizImageContainer')
    bizMiddleContainer.appendChild(bizImageContainer)

    let bizImage = document.createElement('img')
    bizImage.classList.add('bizImage')
    bizImage.src = response.image
    bizImageContainer.appendChild(bizImage)

    let bizDetailContainer = document.createElement('div')
    bizDetailContainer.classList.add('bizDetailContainer')
    bizMiddleContainer.appendChild(bizDetailContainer)

    let bizAddress = document.createElement('p')
    bizAddress.classList.add('bizAddress')
    bizAddress.innerText = response.address
    bizDetailContainer.appendChild(bizAddress)

    let bizType = document.createElement('p')
    bizType.classList.add('bizType')
    bizType.innerText = response.type
    bizImageContainer.appendChild(bizType)

    let bizDescription = document.createElement('p')
    bizDescription.classList.add('bizDescription')
    bizDescription.innerText = response.description
    bizDetailContainer.appendChild(bizDescription)

    businessContainer.appendChild(bizMiddleContainer)
    if(localStorage.getItem('userId')) {
        let reviewBtn = document.createElement('button')
        reviewBtn.classList.add('reviewBtn')
        reviewBtn.innerText = 'Add Review'
        businessContainer.appendChild(reviewBtn)

        reviewBtn.addEventListener('click', () => {
            triggerModal('reviewModal', 3)
        })

        document.querySelector('.submitReviewBtn').addEventListener('click', async () => {
            const rating = document.querySelector('.reviewRatingInput').value
            const headline = document.querySelector('.reviewHeadline').value
            const review = document.querySelector('.reviewText').value

            const reviewPost = await axios.post(`${url}users/${localStorage.getItem('userId')}/addReview`, {
                id: response.id,
                rating: rating,
                headline: headline,
                content: review
            })
            console.log(reviewPost);
        })
    }

    const res = await axios.post(`${url}business/reviews`, {
        businessId: response.id,
        userId: localStorage.getItem('userId')
    })
    console.log(res);
    //Review Info
    res.data.slice().reverse().forEach(async element => {
        let bizReviewContainer = document.createElement('div')
        bizReviewContainer.classList.add('bizReviewContainer')
        businessContainer.appendChild(bizReviewContainer)
        
        const user = await axios.post(`${url}users/getUser`, {
            userId: element.userId
        })
        console.log(element.userId);

        console.log(user);

        let userName = document.createElement('p')
        userName.classList.add('userName')
        userName.innerText = user.data.user.name
        bizReviewContainer.appendChild(userName)

        let headlineContainer = document.createElement('div')
        headlineContainer.classList.add('headline-container')
        bizReviewContainer.appendChild(headlineContainer)

        let headline = document.createElement('p')
        headline.classList.add('headline')
        headline.innerText = element.headline
        headlineContainer.appendChild(headline)

        let rating = document.createElement('p')
        rating.classList.add('rating')
        rating.innerText = element.rating
        headlineContainer.appendChild(rating)
    
        let content = document.createElement('p')
        content.classList.add('content')
        content.innerText = element.content
        bizReviewContainer.appendChild(content)
    })

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

// IF USER RETURNS TO PAGE AND DIDNT LOGOUT BEFORE THEY LEFT
if (localStorage.getItem('userId')) {
    document.querySelector('.login').classList.add('hidden')
    document.querySelector('.signUp').classList.add('hidden')
    document.querySelector('.addBiz').classList.remove('hidden')
    document.querySelector('.signOut').classList.remove('hidden')
    // document.querySelector('.submit')
    homeAllBiz()
} else {
    document.querySelector('.login').classList.remove('hidden')
    document.querySelector('.signUp').classList.remove('hidden')
    document.querySelector('.addBiz').classList.add('hidden')
    document.querySelector('.signOut').classList.add('hidden')
    homeAllBiz()
}
