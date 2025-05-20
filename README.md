# Book Recommendation System

## Challenge Overview  
Build a simplified book recommendation system web application that allows users to browse a list of books, rate them, and leave reviews.

---

## Technical Specification : Used Tech stacks
- **Front-end Framework:** React with TypeScript  
- **Styled Components:** Ant Design   
- **HTTP Client:**  Axios

---

## Challenge Components

### User Authentication  
- Simple login page for users to input username and password.  
- On submit, save initials in `localStorage`
- Router guard implemented to prevent access to the app if credentials are missing. 

### Book List  
- Static list of books fetched from Google Books API with: Title, Author, Genre, Average Rating.  
- Dynamic searching by book Title or Author.  
- Client-side pagination UI (20 books per page).  
- UI library for table: Ag-Grid.  

### Review and Rating System  
- Double-click a book to open a detail page with further info.  
- User can rate (1 to 5 stars) and leave a review (textarea).  
- Ratings are tracked in app state management.  
- No persistence in browser storage; state resets on reload.

---

## Additional Requirements  
1. React Router is used to navigate between Book List and Review pages (each book has its unique id).  
2. Components separated reasonably; clean file structure maintained.  
3. Use of CSS preprocessors (Sass, Less) or styled components for styling.  
4. TypeScript used throughout with `strict: true` enabled in tsconfig.json.  
5. Interfaces, types, and enums defined and used appropriately.  
6. Extra UI features like buttons or animations should be documented.  
7. Development server using Webpack Dev Server or Vite.

---

## Setup and Installation

### Prerequisites

1. **Install Node.js and npm**  
    Download and install Node.js (which includes npm) from the official website:  
        https://nodejs.org/  
        Make sure to install the LTS (Long Term Support) version for better stability.

2. **Verify Node.js and npm installation**  
    Open your terminal or command prompt and run:  
        node -v
        npm -v

3. Clone the repository:  
        git clone https://github.com/yedhukrishnagirish/Book_Recommandation_System.git
        cd my-book-app

4. Install dependencies:  
        npm install

5. Run the development server:
        npm run dev