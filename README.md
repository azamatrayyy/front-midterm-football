# AITU Football Club Website - Project Report

## 1. Executive Summary & Topic Overview

The AITU Football Club Official Website is a student project introducing the football club at Astana IT University. Its purpose is to promote the club, share information about training and matches, show football photos, and give interested students a way to register for tryouts.

For the Endterm Project, the original Midterm website has been extended with interactive JavaScript and jQuery functionality in `js/script.js` while preserving the original HTML structure, CSS variables, and responsive layout.

## 2. Page Structure & Navigation Breakdown

| Page | Purpose and Interactive Features |
| --- | --- |
| `index.html` — Home | Introduces the club with a hero section, upcoming fixture summary, training schedule, location, and club values. |
| `about.html` — About Us | Describes the club's background, mission, and core values. |
| `matches.html` — Match Schedule | Features **2.2 Real-Time Search & Category Filter** (`All`, `Friendly`, `League`, `Cup`) and **2.3 Dynamic CRUD Table** (Create, Read, Update, Delete matches with confirmation). |
| `gallery.html` — Squad Gallery | Features **2.4 Responsive Image Gallery with Lightbox** on click, navigation arrows, and smooth jQuery transitions (`.fadeIn()`, `.fadeOut()`, `.animate()`). |
| `contact.html` — Tryouts & Contact | Features **2.1 Client-Side Registration Form Validation** with required field checks, RegEx email validation, visual password strength meter (Weak / Medium / Strong), password confirmation matching, real-time DOM/jQuery feedback, and submission blocking on error. |



## 3. Endterm Requirements Implementation

### 2.1 Form Validation (`contact.html` & `js/script.js`)
- Validates required fields: Name (`#player-name`), Email (`#player-email`), Password (`#player-password`), Confirm Password (`#player-confirm-password`), and Message (`#player-message`).
- Checks email format using a Regular Expression (`RegEx`).
- Displays a real-time password strength indicator (`Weak`, `Medium`, `Strong`) with visual color and width transitions.
- Verifies that the password and confirmation password match.
- Provides real-time feedback using Bootstrap `.is-valid` / `.is-invalid` classes, feedback messages, and Bootstrap alerts (`#form-alert`).
- Blocks submission and displays an error alert if any field is invalid.

### 2.2 Search and Filter (`matches.html` & `js/script.js`)
- Filters the match table in real time as the user types using `.keyup()`.
- Includes category filter buttons (`All`, `Friendly`, `League`, `Cup`) that work both independently and together with the search input.
- Performs case-insensitive matching without reloading the page.

### 2.3 Table with CRUD (`matches.html` & `js/script.js`)
- **Create:** Adds new match records dynamically via the match form (`#crud-form`).
- **Read:** Renders all match records dynamically into `#matches-tbody`.
- **Update:** Loads an existing row into the form when clicking `Edit` and updates the record in place.
- **Delete:** Asks for user confirmation via `confirm()` and removes the row with a `.fadeOut()` transition.

### 2.4 Image Gallery (`gallery.html` & `js/script.js`)
- Responsive grid layout built with HTML, CSS Grid, and Bootstrap.
- Opens a full-screen lightbox (`#lightbox-overlay`) when clicking any gallery image, complete with Previous (`❮`) and Next (`❯`) navigation arrows.
- Uses jQuery `.fadeIn()`, `.fadeOut()`, and `.animate()` for smooth visual transitions.

## 4. Individual Contributions Matrix

| Member Name | Primary Pages | Core Features Implemented | Key Technical Focus |
| --- | --- | --- | --- |
| Azamat Ray | `index.html`, `about.html` | Home and club information, shared page structure, navigation, Flexbox header and footer, CSS variables | Semantic HTML and base styling | Client-side registration validation, RegEx email check |
| Abylaikhan | `matches.html`, `gallery.html` | Dynamic CRUD match schedule table, interactive photo gallery with Lightbox and navigation arrows | DOM manipulation, CRUD operations, jQuery effects |
| Isaali | `contact.html`, `README.md` |  Password strength indicator, live search and category filter | Form validation, RegEx, real-time filtering, documentation |

## 5. Technologies

- HTML5
- CSS3 (Flexbox, CSS Grid, custom properties, media queries)
- Bootstrap 5.3.3
- JavaScript (DOM manipulation, events, objects, arrays, RegEx)
- jQuery 3.7.1

## 6. Project Links

- GitHub repository: https://github.com/azamatrayyy/front-midterm-football.git
- GitHub Pages website: https://azamatrayyy.github.io/front-midterm-football/