import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import AddItem from "./components/add_items.jsx";
import { UserProvider } from "./context/userContext.jsx";
import Front from "./components/front.jsx";
import Upload from "./components/upload.jsx";
import Show from "./components/show.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import PrivateComponent from "./components/protected_routing.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/front" element={<Front />} />
      <Route
        path="/uploadItem"
        element={
          <PrivateComponent fallback={<Front />}>
            <AddItem />
          </PrivateComponent>
        }
      />
      <Route path="/front" element={<Front />} />
      <Route
        path="/show/:id"
        element={
          <PrivateComponent fallback={<Front />}>
            <Show />
          </PrivateComponent>
        }
      />
      <Route
        path="/upload"
        element={
          <PrivateComponent fallback={<Front />}>
            <Upload />
          </PrivateComponent>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateComponent fallback={<Front />}>
            <Home />
          </PrivateComponent>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(

    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  
);
