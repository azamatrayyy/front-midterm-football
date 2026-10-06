# AITU Football Club Website - Project Report

## 1. Executive Summary & Topic Overview

The AITU Football Club Official Website is a student project introducing the football club at Astana IT University. Its purpose is to promote the club, share information about training and matches, show football photos, and give interested students a way to enquire about tryouts.

The target audience is AITU students, prospective club members, and people interested in the club. The main objectives are to:

- Present the club and its values in a clear, welcoming way.
- Make match and training information easy to find.
- Introduce the team through a photo gallery.
- Provide a simple tryout enquiry form.
- Connect the project pages through consistent navigation.

## 2. Page Structure & Navigation Breakdown

The website is organized into five pages. A shared header navigation and footer links help visitors move between them.

| Page | Purpose and content |
| --- | --- |
| `index.html` — Home | Introduces the club with a hero heading and training photo. It highlights an upcoming fixture, training days and times, the location, and club values. |
| `about.html` — About Us | Describes why the club was created, its mission, and values such as fair play, leadership, unity, and respect. |
| `matches.html` — Match Schedule | Presents upcoming fixtures in a table with dates, opponents, locations, and kickoff times. The current table is a schedule; completed results and competition status are not displayed. |
| `gallery.html` — Squad Gallery | Shows football photos in a three-column grid with labels for training, match day, and team practice. The current gallery presents photos rather than individual player profiles or roster statistics. |
| `contact.html` — Tryouts & Contact | Provides a name and email form for students interested in tryouts. The form is a front-end example and does not currently submit to a server or display separate contact details. |

## 3. Technical Implementation & Compliance

### Semantic HTML5

The pages use semantic `<header>`, `<nav>`, `<main>`, and `<footer>` elements for shared page structure. The match schedule uses a `<table>` with `<tr>`, `<th>`, and `<td>` elements. The tryout page uses a `<form>` with labels, text and email inputs, and a submit button. Images include alternative text.

### CSS Variables

The shared stylesheet defines the requested custom properties in `:root`:

- `--primary-color: #123c2d` for the club's dark green.
- `--accent-color: #f2b705` for the gold accent.
- `--main-font: 'Montserrat', sans-serif` for the main typeface.

The header and primary link button use CSS variables. The other site rules use direct CSS values.

### Layout Systems

- **Flexbox:** The header and footer use `display: flex`, `justify-content: space-between`, and `align-items: center` to align their contents.
- **CSS Grid:** The gallery uses `display: grid`, `grid-template-columns: repeat(3, 1fr)`, and a `20px` gap to arrange photos in three columns.
- **Bootstrap:** The schedule table is wrapped in `.container` and uses `.table`. The tryout form uses `.form-control` and `.mb-3`.

### Positioning and Interaction

Gallery photo wrappers use `position: relative`, allowing each photo badge to use `position: absolute` and sit over its image. The schedule uses `:nth-child(even)` to alternate the background color of even table rows. The tryout button has `:hover` and `:focus` styles.

### Image Loading

Images have descriptive `alt` text. The current image elements  set `loading="lazy"`;

## 4. Responsive Design & Bootstrap Integration

The stylesheet includes an `@media (max-width: 768px)` rule. At this width, the header and navigation list change to a vertical flex layout, and the tryout form section becomes wider relative to the page.
Also includes `@media (max-width : 568px)`  which changes photo to vertical and navigation list to a vertical side.

Bootstrap 5 is included on the match schedule and tryout pages. The match table uses `.container` and `.table`; the form inputs use `.form-control`, and each input group uses `.mb-3`. The current pages do not use Bootstrap `.row` or `.col-*` classes; the gallery layout is implemented with CSS Grid.

## 5. Individual Contributions Matrix

| Member Name | Primary Pages | Core Features Implemented | Key Technical Focus |
| ----------- | ------------- | ------------------------- | ------------------- |
| Azamat Ray | `index.html`, `about.html` | Home and club information, shared page structure, navigation, Flexbox header and footer, CSS variables | Semantic HTML and base styling |
| Abylaikhan | `matches.html`, `gallery.html` | Match schedule table, squad photo gallery, gallery badges, alternating table rows | CSS Grid, positioning, and pseudo-classes |
| Isaali | `contact.html`, `README.md` | Tryout enquiry form, Bootstrap form classes, responsive media query, project report | Forms, Bootstrap integration, and responsiveness |

## Technologies

- HTML5
- CSS3, including Flexbox, CSS Grid, custom properties, and media queries
- Bootstrap 5
- Git and GitHub
- GitHub Pages for project hosting

## Project Links

- GitHub repository: https://github.com/azamatrayyy/front-midterm-football.git
- GitHub Pages website: https://azamatrayyy.github.io/front-midterm-football/