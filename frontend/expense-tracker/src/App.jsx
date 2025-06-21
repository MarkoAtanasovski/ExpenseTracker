import { Toaster } from "react-hot-toast";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import UserProvider from "./context/userContext";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Expense from "./pages/Dashboard/Expense";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";

const App = () => {
  return (
    <UserProvider>
   <div>
    <Router>
      <Routes>
        <Route path="/" element = {<Root/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<SignUp/>}/>
        <Route path="/dashboard" element = {<Home/>}/>
        <Route path="/income" element = {<Income/>}/>
        <Route path="/expense"  element = {<Expense/>}/>


        
        </Routes>
        </Router>

   </div>
   <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },

        }}
        />
   </UserProvider>
  )
}

export default App;

const Root = () =>{
  // Check for token in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  // If yes go to dashboard 
  return isAuthenticated?(
    <Navigate to = "/dashboard"/>
  )
  :(
  <Navigate to = "/login"/>
);
} 
