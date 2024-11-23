import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import Category from "../Pages/Category/Category";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ChatMessage from "../Pages/ChatMessage/ChatMessage";
import Location from "../Pages/Location/Location";
import Carts from "../Pages/Carts/Carts";
import Profile from "../Pages/Profile/Profile";
import ProductDetailPage from "../Pages/ProductDetailPage/ProductDetailPage";
import Checkout from "../Pages/Checkout/Checkout";
import DashboardMain from "../Dashboard/AdminLayout/DashboardMain";
import AdminHome from "../Dashboard/AdminPages/AdminHome/AdminHome/AdminHome";
import AllProducts from "../Dashboard/AdminPages/AllProducts/AllProducts";
import AddNewProduct from "../Dashboard/AdminPages/AddNewProduct/AddNewProduct";
import Categories from "../Dashboard/AdminPages/Categories/Categories";
import AllOrders from "../Dashboard/AdminPages/AllOrders/AllOrders";
import PendingOrders from "../Dashboard/AdminPages/PendingOrders/PendingOrders";
import AllUsers from "../Dashboard/AdminPages/AllUsers/AllUsers";
import Coupons from "../Dashboard/AdminPages/Coupons/Coupons";
import Messages from "../Dashboard/AdminPages/Messages/Messages";
import Transactions from "../Dashboard/AdminPages/Transactions/Transactions";
import AdminUsers from "../Dashboard/AdminPages/AdminUsers/AdminUsers";
import CompleteOrders from "../Dashboard/AdminPages/CompleteOrders/CompleteOrders";
import CanceledOrders from "../Dashboard/AdminPages/CanceledOrders/CanceledOrders";
import SiteSettings from "../Dashboard/AdminPages/SiteSettings/SiteSettings";
import AdminProductDetailsPage from "../Dashboard/AdminProductDetailsPage/AdminProductDetailsPage";
import UpdateProduct from "../Dashboard/UpdateProduct/UpdateProduct";
import PaymentSuccess from "../Pages/Checkout/PaymentStatus/PaymentSuccess";
import PaymentCancel from "../Pages/Checkout/PaymentStatus/PaymentCancel";
import PaymentFailed from "../Pages/Checkout/PaymentStatus/PaymentFailed";
import MyOrders from "../Pages/MyOrders/MyOrders";
import OrderSubmited from "../Pages/Checkout/PaymentStatus/OrderSubmited";
import MyCoupons from "../Pages/MyCoupons/MyCoupons";
import OrdersHistory from "../Pages/OrdersHistory/OrdersHistory";
import OrderTracking from "../Pages/OrderTracking/OrderTracking";
import MyFavorite from "../Pages/MyFavorite/MyFavorite";
import SearchResultPage from "../Pages/SearchResultPage/SearchResultPage";
import SeeAllProducts from "../Component/SeeAllPrroducts/SeeAllProducts";
import BannedPage from "../Component/BannedPage/BannedPage";
import PrivateRoute from "./PrivateRoute";
import ProcessingOrders from "../Dashboard/AdminPages/ProcessingOrders/ProcessingOrders";
import RealTimeWebChat from "../Component/RealTimeWebChat/RealTimeWebChat";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement : <ErrorPage></ErrorPage>,
      children : [
        {
          path : '/',
          element : <Home></Home>
        }, 
        {
          path : '/search',
          element :<SearchResultPage></SearchResultPage>
        }, 
        {
          path : '/category/:category',
          element : <Category></Category>
        },
        {
          path : '/products/:path',
          element : <SeeAllProducts></SeeAllProducts>
        },
        {
          path : '/chat',
          element : <ChatMessage></ChatMessage>
        },
        {
          path : '/webChat',
          element : <PrivateRoute><RealTimeWebChat></RealTimeWebChat></PrivateRoute>
        },
        {
          path : '/location',
          element : <Location></Location>
        },
        {
          path : '/carts',
          element : <PrivateRoute> <Carts></Carts></PrivateRoute>
        },
        {
          path : '/checkout',
          element : <PrivateRoute><Checkout></Checkout></PrivateRoute>
        },
        {
          path : '/profile',
          element : <PrivateRoute> <Profile></Profile></PrivateRoute>
        },
        {
          path : '/product/:id',
          element : <ProductDetailPage></ProductDetailPage>,
          
        },
        {
          path : '/payment-success',
          element : <PrivateRoute> <PaymentSuccess></PaymentSuccess></PrivateRoute>
        },
        {
          path : '/payment-cancel',
          element : <PrivateRoute> <PaymentCancel></PaymentCancel></PrivateRoute>
        },
        {
          path : '/payment-failed',
          element : <PrivateRoute><PaymentFailed></PaymentFailed></PrivateRoute>
        },
        { 
          path : '/order-submited',
          element : <PrivateRoute><OrderSubmited></OrderSubmited></PrivateRoute>
        },
        {
          path : '/profile/myOrders',
          element : <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
        },
        {
          path : '/profile/OrdersHistory',
          element : <PrivateRoute><OrdersHistory></OrdersHistory></PrivateRoute>
        },
        {
          path : '/profile/OrderTraking',
          element : <PrivateRoute><OrderTracking></OrderTracking></PrivateRoute>
        },
        {
          path : '/profile/myCoupons',
          element : <PrivateRoute> <MyCoupons></MyCoupons></PrivateRoute>
        },
        {
          path : '/profile/myFavorite',
          element : <PrivateRoute><MyFavorite></MyFavorite></PrivateRoute>
        },
        {
          path : '/banned',
          element : <BannedPage></BannedPage>
        }
      ]
    },
    {
      path : '/login',
      element : <Login></Login>
    },
    {
      path : '/signup',
      element : <SignUp></SignUp>
    }, 

    // dashboard
    {
      path: '/dashboard',
      element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><DashboardMain/></PrivateRoute>,
      errorElement : <ErrorPage/>,
      children : [
        {
          index : true,
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><AdminHome></AdminHome></PrivateRoute>
        },
        {
          path : '/dashboard/allProducts',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><AllProducts></AllProducts></PrivateRoute>
        },
        {
          path : '/dashboard/admin/products/:id',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><AdminProductDetailsPage></AdminProductDetailsPage></PrivateRoute>
        },
        {
          path : '/dashboard/addNewProduct',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><AddNewProduct></AddNewProduct></PrivateRoute>
        },
        {
          path : '/dashboard/update/:id',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><UpdateProduct></UpdateProduct></PrivateRoute>
        },
        {
          path : '/dashboard/categories',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><Categories></Categories></PrivateRoute>
        },
        {
          path : '/dashboard/allOrders',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><AllOrders></AllOrders></PrivateRoute>
        },
        {
          path : '/dashboard/pendingOrders',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><PendingOrders></PendingOrders></PrivateRoute>
        },
        {
          path : '/dashboard/processingOrders',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><ProcessingOrders></ProcessingOrders></PrivateRoute>
        },
        {
          path : '/dashboard/allUsers',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><AllUsers></AllUsers></PrivateRoute>
        },
        {
          path : '/dashboard/coupons',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><Coupons></Coupons></PrivateRoute>
        },
        {
          path : '/dashboard/message',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><Messages></Messages></PrivateRoute>
        },
        {
          path : '/dashboard/transactions',
          element : <PrivateRoute allowedRole={['manager', 'admin', 'moderator']}><Transactions></Transactions></PrivateRoute>
        },
        {
          path : '/dashboard/transactions/:TxID',
          element :<PrivateRoute allowedRole={['manager', 'admin', 'moderator']}> <Transactions></Transactions></PrivateRoute>
        },
        {
          path : '/dashboard/adminUsers',
          element : <PrivateRoute allowedRole={['manager', 'admin']}> <AdminUsers></AdminUsers></PrivateRoute>
        },
        
        {
          path : '/dashboard/completeOrders',
          element : <PrivateRoute allowedRole={['manager', 'admin']}><CompleteOrders></CompleteOrders></PrivateRoute>
        },
        {
          path : '/dashboard/canceledOrders',
          element : <PrivateRoute allowedRole={['manager', 'admin']}><CanceledOrders></CanceledOrders></PrivateRoute>
        },
        {
          path : '/dashboard/siteSettings',
          element : <PrivateRoute allowedRole={['manager', 'admin']}><SiteSettings></SiteSettings></PrivateRoute>
        },
        
       
      ]
    }

  ]);



export default router;