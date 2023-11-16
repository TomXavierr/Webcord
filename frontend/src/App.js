import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/User/Login & SignUp/Login";
import Signup from "./Components/User/Login & SignUp/Signup";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Activate from "./Components/User/Login & SignUp/Activate";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./Redux/store";
import ProtectedRoute from "./ProtectecRoutes/ProtectedRoute";

import { useEffect, useState } from "react";
import { checkAuthenticated } from "./Redux/actions/userauthaction";

import AuthLoading from "./Components/Loadings/AuthLoading";
import AdminProtectedRoute from "./ProtectecRoutes/AdminProtectedRoute";
import { checkAdminAuthentication } from "./Redux/actions/adminAuthAction";
import Channels from "./Components/User/Home/Channels";
import UserLayout from "./Components/User/Home/UserComponents/UserLayout";
import ServerLayout from "./Components/User/Home/ServerComponents/ServerLayout";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminToken = localStorage.getItem("admin_token");
        const userToken = localStorage.getItem("access");

        if (adminToken) {
            store
                .dispatch(checkAdminAuthentication())
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        } else if (userToken) {
            store
                .dispatch(checkAuthenticated())
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);



    if (loading) {
        return <AuthLoading />;
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
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="/channels"
                                element={<Channels />}
                                exact
                            >
                                <Route path="@me" element={<UserLayout />} />
                                <Route
                                    path=":serverId/:channelId?"
                                    element={<ServerLayout />}
                                />
                            </Route>
                        </Route>

                        <Route path="/admin" element={<AdminLogin />} />
                        <Route element={<AdminProtectedRoute />}>
                            <Route
                                path="/dashboard"
                                element={<AdminDashboard />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </Provider>
            <ToastContainer theme="light" />
        </div>
    );
}

export default App;
