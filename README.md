# Professional Posting App

A fully client‑side posting application that simulates user authentication, post publishing, and interactions using browser `localStorage`. Built with vanilla JavaScript, HTML, and CSS.

## Features

- **User Authentication**  
  Signup with email format, password strength (length + number), and confirmation matching.  
  Login with credential verification.  
  Forgot password flow with reset via SweetAlert2 popup.

- **Post Management**  
  Create new posts with title and description.  
  Edit or delete your own posts (ownership‑based controls).  
  Like / unlike any post.

- **Session & Protected Routes**  
  Redirects logged‑in users directly to the post feed.  
  Redirects unauthenticated users away from the feed.

- **Theme Toggle**  
  Light / dark mode switcher with persistent user preference.

- **User Experience**  
  Responsive design with video backgrounds.  
  Real‑time relative timestamps using Moment.js.  
  Elegant alert popups with SweetAlert2.  
  Icons from Font Awesome and Bootstrap Icons.

## Technologies Used

- HTML5
- CSS3 (custom styles, video backgrounds, responsive layout)
- JavaScript (ES6+ modules `.mjs`)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Moment.js](https://momentjs.com/)
- [Font Awesome](https://fontawesome.com/) & [Bootstrap Icons](https://icons.getbootstrap.com/)

## Project Structure

## What I Learned

- Simulating authentication and session state using `localStorage`
- Implementing ownership‑based UI controls (edit/delete only own posts)
- Building a forgot‑password flow with client‑side data manipulation
- Managing dynamic DOM updates and conditional navigation
- Persisting theme preferences and applying them on load
- Enhancing UX with validation feedback and alert popups
- Structuring a multi‑page vanilla JS application with ES modules
