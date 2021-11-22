# E-commerce Fashion Portal
![javascript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Jest](https://img.shields.io/badge/-Jest-20232A?style=for-the-badge&logo=jest&logoColor=red)
![node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=green)
![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![Webpack](https://img.shields.io/badge/-webpack-20232A?style=for-the-badge&logo=webpack&logoColor=blueviolet)
![Babel](https://img.shields.io/badge/-Babel-20232A?style=for-the-badge&logo=babel&logoColor=yellow)


## Project Catwalk
This is the Hack Reactor Front End Capstone. The challenge was to create a modernized retail portal based on design specifications and requirements outlined by project stakeholders. As a group, we created a dynamic e-commerce browsing experience on an accelerated development timeline, with each team member builing out one of the four required components.

<!-- Insert gif of overall image  -->

## Tech Stack and Challenges

### React
We utilized React on to implement a responsive, single-page application capable of rendering data from a third-party API. We implemented click tracking with higher order React components.


### Node.js and Express
<!-- - Despite being a front-end capstone that explicitly placed back-end implementation out of scope, used Nodejs to utilize Express. -->
<!-- - Simplified API requests by implementing a proxy server in Express.js that adds authentication while forwarding requests to an existing RESTful API. -->
Although the emphasis of this project was front-end development, we utilized an Express for Node.js server to route requests to a RESTful API with necessary authorization added. Express compression middleware was used for optimization.

### CSS
<!-- - Aside from being the sole technology used for the aesthetic styling of this application:
  - All styling, including functional implementations like the modals and image gallery, were written solely with CSS.
  - The use of Grid made the overlay button functionality and precise placement of static assets accessible and simple.
  - Flexbox was instrumental in handling the wealth of dynamic data being delivered to the page. -->
A goal of this project was to deeply understand CSS without importing addtional styling frameworks, so all styling and functional implementations were written purely with CSS. The app includes both a light mode and a dark mode, which were implemented using only CSS. We also utilized Google Fonts and Font Awesome.

### Webpack
We used webpack as our solution for bundling static assets. The compression, imageminimizer and cssminimizer plugins help boost web performance.
<!-- - Webpack was our solution to elegantly handle our numerous static assets, implement JSX, and harness ES6 in this project. -->

---

## Product Overview

## Related Products and Your Outfit List
<p align="center">
<img src="https://github.com/hr-rfp55-fec7-zuko/project-catwalk/blob/master/readMeAssets/relatedProduct.gif" width="350"></p>

Related product widgets consist of two parts.
One is the Related products which present the user with products similar to the currently selected product, provided by the external API and it changes accordingly. Having carousel of cards let users navigate between the card. When a user clicks on the star icon in the upper righthand corner of the card, a modal will pop up comparing the feature of the current product and the selected product.

The second part is the outfit section which provides the user a way to keep track of their favorite outfits. It gives the user the ability to save the current outfit or delete any outfit from their outfit list and even away from the application and maintain their list of saved outfits.

## Questions and Answers
<!-- We implemented modals using React.CreatePortal. -->

![QuestionsAndAnswersGif][QuestionsAndAnswers]

The questions and answers section has below features and functionalities.

   * Search bar to filter out any questions after user typing more than 3 characters
   * User can upvote Helpfulness in each question and answer and question list and answer list are sorted by Helpfulness
   * User can report question and answer. If a question or an answer is reported, it will be deleted upon future rendering.
   * User can add answer to each question with image upload function.
   * User can add new question.
   * The question and answer list is rendered with 4 questions and 2 answers each by default. Users can click on See More Answers and More Answered Questions to look for more information.

## Ratings and Reviews
<!-- We implemented modals using React.CreatePortal. -->

![RatingsAndReviewsGif](/readMeAssets/ratingsAndReviews.gif)

The ratings and reviews section includes a list of available reviews paired with a side panel displaying product metadata. The review list pulls in data from an API endpoint and dynamically renders individual reviews with varying sub-components.

The side pannel includes a review rating breakdown and product characteristic meter bars. Each star rating bar acts as filter for the review list, allowing the user to refine the review list based on average rating.

Selecting an option from the “sort by” dropdown menu sends a fresh request to the API for reviews ordered by the selected characteristic.

Within individual review tiles, users can mark a review as helpful or report the review, sending a put request to the API to update the review meta-data. Clicking on a review image thumbnail renders a modal created using React DOM.

Selecting the “add a review” button at the bottom of the review list renders a new React DOM modal housing a form that allows users to rate the overall product score and their satisfaction with characteristics, before writing their own review with an option to add photos. Submitting the form sends a post request to the API to save the data.
![RatingsAndReviewsGif](/readMeAssets/rrForm.gif)


## Set up Instructions
1. Clone this repository to your local machine
2. Using npm, install project dependencies :

   ```
   npm install
   ```
3. Make a copy of the file `config.example.js` and rename it to `config.js`
4. Update the GitHub and PHOTO API token (from Cloudinary)

5. Using webpack, bundle the files:
   ```
   npm run build
   ```
6. To run the server:
   ```
   npm run start
   ```
7. Open localhost: 3000 in the browser

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[QuestionsAndAnswers]: readMeAssets/QuestionAnswer.gif
