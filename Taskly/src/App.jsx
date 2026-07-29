import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Hash history so routing works correctly on GitHub Pages
const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
