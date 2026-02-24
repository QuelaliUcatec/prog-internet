# Project Documentation: NASA Explorer Dashboard

## 1. Work Description

This project consists of the development of a technically and visually advanced web application that functions as a **Real-Time Space Explorer**. Built with React 19, TypeScript, and Vite, the primary goal is to demonstrate the ability to integrate external services (NASA APIs) for the management of astronomical data.

### Key Features:
- **Dynamic Gallery**: Visualize high-resolution images captured by NASA's satellites and telescopes
- **Observation Logbook**: Simulate data transmission and registration to an external server with unique registry IDs
- **Full Client-Server Cycle**: Complete GET and POST methods implementation using Axios
- **Modern Styling**: Responsive design with TailwindCSS v4 for an immersive space-tech aesthetic

![Application Preview](images/app-preview.png)
*NASA Explorer Dashboard landing page showcasing the deep space data retrieval interface*

---

## 2. Technologies Used

A modern, high-performance development stack was used to build this system:

| Technology | Purpose |
|-----------|---------|
| **React 19** | Core library for the component-based user interface with latest features |
| **Vite 7** | Lightning-fast build tool and development server with HMR |
| **TypeScript** | Static typing for reduced bugs and better maintainability across the codebase |
| **Tailwind CSS v4** | Next-generation CSS for responsive design and space-tech aesthetic |
| **Axios** | Promise-based HTTP client for NASA API communication |
| **ESLint** | Code quality and consistency enforcement with React-specific rules |

---

## 3. Functionality

### A. Data Retrieval (GET Method)

**What it does:** Fetches technical information and high-resolution images directly from NASA's Astronomy Picture of the Day (APOD) database.

**How it does it:** Makes asynchronous requests to the `planetary/apod` endpoint with randomized results for varied content.

**Through what:** The `getNasaData` function in the service layer, sending a private `API_KEY` and `count=6` parameter for multiple random images.

#### Code Snippet:
```typescript
export const getNasaData = async (): Promise<NASAImage[]> => {
  // Executes the asynchronous request via Axios
  const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&count=6`);
  return response.data; // Returns JSON array with images, titles, and descriptions
};
```
CSS Visualization: Retrieved data is dynamically mapped into a responsive CSS Grid system with hover animations and smooth transitions.
### B. Logbook Registration (POST Method)

What it does: Sends selected image data to "save" it into an official galactic registry, simulating real mission data transmission.

How it does it: Captures the JSON object of the selected image and constructs a new payload with additional metadata (Registry ID and sync timestamp).

Through what: Uses Axios POST method to a testing API (jsonplaceholder), demonstrating complete CRUD operation flow.
#### Code Snippet:
```typescript
export const postTestData = async (item: NASAImage) => {
  const payload = {
    registry_id: Math.floor(Math.random() * 900000) + 100000, // Unique 6-digit ID
    galactic_title: item.title,
    image_url: item.url,
    sync_date: new Date().toLocaleDateString('en-GB'),
    status: "Synced"
  };
  
  // Transmits the data via POST request to simulation endpoint
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts', 
    payload
  );
  return response.data; // Server returns created object with new ID (Status 201)
};
```
### C. User Interface and Styling (CSS)

What it does: Transforms raw JSON data into an immersive visual experience that feels like a mission control dashboard.

How it does it: Applies Tailwind CSS v4 classes that react dynamically to React states (loading, isPosting, error states).

Through what: Modern CSS features including Flexbox, CSS Grid, CSS Transitions, and conditional class binding.
#### Visual Breakdown:

-    **Loading States** : CSS-animated spinner displayed during GET requests using Tailwind's animate-spin utility

-    **Interactivity**: NASA images scale smoothly on hover (hover:scale-110) with transition effects

-    **Response Terminal**: Server log displayed in monospace fonts with glowing borders (simulating a command console)

-    **Space Aesthetic**: Dark theme with subtle gradients and hover effects for authentic NASA mission feel
## 4. Data Flow (Architecture)
#### Information Journey from Space to Screen:
1. React Component mounts → useEffect triggers data fetch
   ↓
2. Axios GET request → NASA APOD API responds with JSON data
   ↓
3. React state updates → CSS receives JSON and renders gallery with Tailwind styling
   ↓
4. User clicks "ADD TO LOGBOOK" → React captures item and prepares payload
   ↓
5. Axios POST request → External test server confirms registry with HTTP 201
   ↓
6. CSS displays result → Registry File shows server response with unique ID and sync status
   ↓
7. Success feedback → Visual confirmation appears in the Galactic Registry section