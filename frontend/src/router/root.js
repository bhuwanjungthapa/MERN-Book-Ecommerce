import { createBrowserRouter } from "react-router-dom";

import Home from "client/home/views/Index";
import Product from "client/product/views/Index";
import Login from "auth/Login";
import Register from "auth/Register";
import ClientLayout from "client/common/Layout"
import AdminLayout from "admin/common/Layout"
import User from "admin/user/views/Index"
import CreateUser from "admin/user/views/Create"
import Book from "admin/book/views/Index"
import CreateBook from "admin/book/views/Create"
import Banner from "admin/banner/views/Index"
import CreateBanner from "admin/banner/views/Create"

const router = createBrowserRouter([
    {
        element: <ClientLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "product",
                element: <Product />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <User />
            },
            {
                path: "user",
                element: <User />
            },
            {
                path: "user/create",
                element: <CreateUser />
            },
            {
                path: "book",
                element: <Book />
            },
            {
                path: "book/create",
                element: <CreateBook />
            },
            {
                path: "banner",
                element: <Banner />
            },
            {
                path: "banner/create",
                element: <CreateBanner />
            }

        ]
    }
]);

export default router;