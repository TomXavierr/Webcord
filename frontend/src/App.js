import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/User/Login & SignUp/Login";
import Signup from "./Components/User/Login & SignUp/Signup";
import AdminLogin from "./Components/Admin/AdminLogin";
import Home from "./Components/User/Home/Home";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Activate from "./Components/User/Login & SignUp/Activate";

import { Provider } from "react-redux";
import store from "./Redux/store";
import ProtectedRoute from "./ProtectecRoutes/ProtectedRoute";
import { useEffect, useState } from "react";
import { checkAuthenticated } from "./Redux/actions/userauthaction";

import AuthLoading from "./Components/Loadings/AuthLoading";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        store.dispatch(checkAuthenticated())
            .then(() => setLoading(false)) // Set loading to false on success
            .catch(() => setLoading(false)); // Set loading to false on error
    }, []);

    if (loading) {
        return <AuthLoading />; // Show loading indicator
    }

    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/activate/:uid/:token"
                            element={<Activate />}
                        />
                        <Route path="/admin" element={<AdminLogin />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/home" element={<Home />} exact />
                            <Route
                                path="/dashboard"
                                element={<AdminDashboard />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
