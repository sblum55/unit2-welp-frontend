# GitBiz Frontend


## Site Sections

1. Home: just contains some static text with a welcome message, a summary of the purpose of the site, and basic instructions on how to use the site.
2. Signup: contains a form for the user to sign up with email, password, and name.
3. Login: contains a form for the user to login with email and password.
4. List Your Business: contains a form to list a business (described in User stories).
5. All Businesses: list of all businesses
6. Single Business view: note that there is no nav link to this section; rather, you get there by clicking on the name of a business in the All Businesses section

## User Stories

1. The page has a set of always-visible links (described in Site Sections).
2. When I load the page, I am on the home section. The page is on the logged-out state: only Home, All Businesses, Signup, and Login links are visible.
3. I can create an account. Emails must be unique. If I use a duplicate email, I see a message indicating this. After successful account creation, I am back on the home section, and the page is in the logged-in state.
4. In the logged-in state, only Home, All Businesses, List Your Business, and Logout links are visible.
5. If I close and re-open the page, it remembers my logged-in / logged-out state.
6. The logout link logs me out and displays the home section.
7. The login link reveals a login form. When submitted, if login is successful, I'm taken to the logged-in state of the home page. If unsuccessful, I'm shown a message indicating so.
8. The All Businesses link takes me to the All Businesses section described below. Same for List Your Business.
9. When I click on the List Your Business link, I see a form that lets me create a new business, with fields for name, address, description, and type. The type is a dropdown that lets me pick from one of a number of pre-defined business types (restaurant, clothing, etc). After submitting this form, I'm taken to the All Businesses section, which now contains my new business.
10. Clicking on the name of a business in the All Businesses section takes me to the Single Business view for that business. Here I can see the name, address, type, and description of this business. I can also see the name of the user who listed it.
11. Beneath this (still in Single Business view), I can see a list of all reviews that have been left on this business, along with the name of the user who left the review. Each review has headline, a content, and an integer rating out of 5. Reviews are ordered with the most recent review at the top, and the oldest review at the bottom.
12. Still in Single Business view, IF I am logged in, there is a form to leave a review (also consisting of headline, content, and rating out of 5). (If I am not logged in, this form is not present.) This form is sandwiched between the business info and the list of reviews, so that I don't have to scroll all the way to the bottom of a potentially long list of reviews to get to it. When the form is submitted, the new review appears at the top of the list.

## Wireframes
#### Homepage/Logged Out
![alt text](./Wireframes/LoggedOut.jpg)
#### Log In
![alt text](./Wireframes/LogInForm.jpg)
#### Sign Up Form
![alt text](./Wireframes/SignUp.jpg)

#### Signed In
![alt text](./Wireframes/SignedIn.jpg)

#### Single Business
![alt text](./Wireframes/SingleBusiness.jpg)

#### Add A Business
![alt text](./Wireframes/AddBusiness.jpg)

#### Add a Review
![alt text](./Wireframes/AddBusiness.jpg)


## Stretch Stories

1. All stretch goals from auth-replay are implemented. https://github.com/SEI-ATL-3-8/auth-replay
2. In Single Business view, if I am logged in as the business's creator, there are buttons to edit and delete the business.
3. In the All Business section, there is a search bar that lets me search businesses by name (ideally including partial and case-insensitive matches). There is also a type filter dropdown that lets me see business of just a specific type.
4. In the List Your Business form, I can upload an image of the business. Suggested tools for this are multer and cloudinary, and their usage is described here: https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54. (This is a good guide but not a hand-hold tutorial!)