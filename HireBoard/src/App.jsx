import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Use hash history so routes work on GitHub Pages (no server rewrite needed)
// URLs become: /HireBoard/dist/index.html#/login, #/jobs, etc.
const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

function App() {
  return <RouterProvider router={router} />;
}

export default App;