import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Error from "../404/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Regester/Register";
import About from "../Pages/Shared/About";
import AddedService from "../Pages/Service/AddedService";
import AllService from "../Pages/Home/AllService";
import ServiceDetails from "../Pages/Details/ServiceDetails";
import AddReview from "../Review/AddReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signIn",
        element:<Login></Login>
      },
      {
        path: 'register',
        element:<Register></Register>
      },
      {
        path:'addedService',
        element:<AddedService></AddedService>
      },
      {
        path:'addReview',
        element:<AddReview></AddReview>
      },

      {
        path:'/feedback/:id',
        element:<ServiceDetails></ServiceDetails>,
        loader:({params})=> 
          fetch(`http://localhost:7000/feedback/${params.id}`)
        
      }
      ,
      {
        path:'AllService',
        element:<AllService></AllService>,
        loader:() => fetch("http://localhost:7000/feedback")
      },
      {
        path:'about',
        element:<About></About>
      }
    ],
  },
]);

export default router;
