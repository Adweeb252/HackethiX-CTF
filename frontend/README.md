# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- Write in console to get cookie data

```js
// Function to get a specific cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Get the 'debug_info' cookie
const flagCookie = getCookie('debug_info');

// Decode the Base64 flag if found
if (flagCookie) {
  const decodedFlag = atob(flagCookie);
  console.log("Flag:", decodedFlag);
} else {
  console.log("Flag not found in cookies.");
}
``` -->