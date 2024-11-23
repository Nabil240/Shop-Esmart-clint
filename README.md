## Links to Deployment and Code
- **Live Link (Client-side hosted on Firebase):** [Live Link](https://shopesmart-51ca8.web.app/dashboard)
- **Admin_Email :** admin123@mail.com **Password:** Password!23
- **Server-side hosted on Vercel:** [Server Link](https://esmart-navy.vercel.app/)
- **Client-side GitHub repository:** [Client Repo](https://github.com/MozzammelRidoy/shop-esmart-client)
- **Server-side GitHub repository:** [Server Repo](https://github.com/MozzammelRidoy/shop-esmart-server)

# E-commerce Project Client Overview (Shop esmart)

Shop esmart is a comprehensive e-commerce platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform is designed as a single-page application (SPA), ensuring efficient data handling and a smooth user experience. It offers a user-friendly interface with a focus on security, performance, and responsive design. The site includes both user and admin sections, catering to customers and administrators. It also features flexible product search, filtering, and an order management system.

## Key Features and Future Development Plans

### Technologies Used
- **React.js:** Frontend library for building user interfaces and dynamic components.
- **React Router:** For client-side routing and navigation, ensuring seamless transitions in this Single Page Application (SPA).
- **Tailwind CSS:** Utility-first CSS framework for easy and flexible styling.
- **DaisyUI:** UI component library built on top of Tailwind CSS, used for styling elements with pre-built designs.
- **Vanilla CSS:** Custom styles used for specific components where more control was needed.
- **React Hooks:** For managing component state and lifecycle efficiently.
- **Custom React Hooks:** To encapsulate reusable logic across multiple components.
- **React Hook Form:** For managing form state, validation, and user input handling.
- **Axios:** For making HTTP requests to the backend server, facilitating communication between client and server.
- **Axios Interceptor:** Implemented globally to handle requests and responses, such as adding headers or catching errors.
- **TanStack Query (React Query):** For data fetching, caching, synchronizing server state with the client, and improving data management.
- **Firebase:** Used for authentication and hosting the client-side of the application. Firebase also enables real-time database features.
- **Cloudinary:** For image uploading, hosting, and managing images efficiently.
- **Google reCAPTCHA:** To prevent bots and spam, ensuring authentic user interactions.
- **AOS (Animate On Scroll):** For smooth scrolling animations and enhancing the user experience.
- **Responsive Design:** Ensuring the website is fully responsive and compatible across mobile, tablet, and desktop devices.
- **Dynamic Features:** Personalizing user experiences based on preferences and behavior, such as dynamic product recommendations.
- **SSLCommerz:** Integration of a secure payment gateway for handling transactions.
- **Readable Code Structure:** Best practices followed in organizing the project's folder and file structure for maintainability.
- **AuthProvider:** Custom authentication context provider for managing user authentication and session persistence.
- **Private Route:** Protects sensitive routes and ensures only authenticated users can access certain parts of the application.

### Client-Side Features

#### Header & Navigation
- **Responsive Navbar:** A fully responsive navigation bar tailored for mobile, tablet, and desktop views, ensuring seamless adaptability across different screen sizes.
- **Mobile Navigation:** Designed for quick access to Profile, Cart, Chat, Login/Logout, and Theme Switcher (Dark/Light mode) for an enhanced user experience on mobile devices.
- **Search Box:** Advanced product search functionality enabling users to search by title, name, tags, or product code, improving product discovery with dynamic results.
- **Icons:** Easy navigation with integrated icons for essential actions like Profile, Cart, Chat, Login/Logout, and Theme Switcher.

#### Main Sections
- **Product Slider/Carousel:** Interactive, auto-playing sliders using Swiper.js, providing a fluid product browsing experience with a focus on key products.
- **Category Section:** Products are loaded category-wise for easy navigation, displaying items based on their respective categories.
- **Hot Picks & For You:** Personalized sections featuring products tailored to users based on their browsing and purchasing behavior. The For You section dynamically adjusts to show recommended products.

#### Product Page
- **Grid/List View:** Users can switch between Grid or List views, offering flexibility in how they choose to browse products.
- **Product Filtering:** Allows users to sort products by price range (min to max), newness, alphabetical order, or specific categories, helping users refine their search.
- **Pagination:** Efficient product loading via pagination, allowing users to load products in batches, reducing load times and enhancing performance.
- **Load More:** A "Load More" button allows users to load 10 additional products at a time, preventing the display of all products at once and enhancing the browsing experience.
- **Detailed Product Page:** In-depth product pages feature details like Add to Favorites, Add to Cart, and a Related/Similar Products slider to encourage further exploration of similar items.

#### Cart & Checkout
- **Cart Management:** Users can manage their cart by updating product quantities, applying coupon codes, and selecting shipping methods before proceeding to checkout.
- **Checkout Process:** A secure, seamless checkout experience powered by SSLCommerz, allowing users to review and confirm their orders before making payments.
- **Order Review:** Users can view detailed order summaries and review all items before finalizing their purchase.

#### Profile Section
- **User Profile Management:** Users have full control over their profile, including options to update profile pictures, edit personal details, and manage contact information.
- **Order History:** Users can view their order history, track order statuses, and leave reviews or ratings for purchased products.
- **Coupons & Favorites:** A dedicated section where users can manage applied coupons and their favorite products, offering a streamlined shopping experience.

#### Additional Features
- **Google Map Integration:** Integrated to assist with accurate shipping location inputs during the checkout process.
- **Real-Time Chat Support:** Offers real-time customer support through WhatsApp and Messenger, allowing users to get instant assistance.
- **User Authentication:** Secure login and signup processes featuring password validation, password strength suggestions, and Google reCAPTCHA for added security against bots.
- **Forgot Password:** Includes a Forgot Password option, allowing users to recover lost passwords, with form management handled via React Hook Form for validation and control.

### Admin-Side Features

#### Dashboard & Analytics
- **Date Filtering:** All sections, including Order Analysis, Order Summary, Revenue Summary, and Extended Summary, allow admin users to filter reports by date. Default view shows the last 28 days, with the option to select custom date ranges.
- **Order Analysis:** View date-wise reports including total orders, delivered orders, canceled, and returned orders.
- **Order Summary Section:** Displays key metrics like total orders, pending, confirmed, in courier, completed, canceled, returned orders, users, and transactions.
- **Revenue Summary:** Shows total revenue, profit, coupon discounts, and product-specific discounts.
- **Extended Summary:** Includes top-selling products, trending products, low stock alerts, category-wise sales percentages (via pie charts), and site ratings.

#### Product Management
- **All Products Menu:** View, update, or delete products.
- **Add New Product:** Add new products with react dropZone & beautiful-dnd image upload (Cloudinary) and manage tags by react-tag-input.
- **Categories Menu:** Load, update, delete, or add new categories dynamically.

#### Order Management
- **Pending Orders:** Orders submitted by users are initially categorized as pending. Admin verifies these orders to ensure their validity before confirmation.
- **Confirmed Orders:** Validated orders move to this category after admin confirmation. These orders are prepared for packaging and are ready to be processed.
- **Processing Orders:** Orders in this category are currently being shipped. Admin can track these orders and update their status to either delivered, canceled, or returned.
- **Completed Orders:** This section displays all orders that have been successfully delivered, along with their associated revenue and profit details.
- **Canceled Orders:** Orders that have been either canceled by the admin or returned by the users are displayed here.

#### Transaction & Coupon Management
- **Transaction Menu:** Validate payments, track order payments, and view payment details.
- **Coupons Menu:** Create, update, delete, and view all coupon codes.

#### User Management
- **Admin Users Menu:** Manage admin roles (Admin, Manager, Moderator), update roles, ban/unban users.
- **All Users Menu:** View all users, change roles, ban/unban as needed.

#### Site Settings
- **Site Settings Menu:** Modify key site elements like banners and homepage content.

#### Search Features
- **Search by product, user, transaction, or coupon details across all sections.**

#### Authentication & Role-Based Access
- **Role-based access control (Admin, Manager, Moderator).** Routes are protected with private routes, and authentication is handled via PrivateRoute.

### Future Development Plans
- **Real-time Chat Feature:** Implement a chat feature using Socket.IO, allowing users to engage in real-time conversations with customer support or other users.
- **Behavior Tracking:** The application will track user behavior, such as product views, searches, and cart additions. This data will help create personalized experiences by suggesting relevant products.
- **Dynamic Product Recommendations:** Based on tracked behaviors, users will receive tailored product suggestions in a section like "For You," enhancing the shopping experience through intelligent recommendations.
- **Real-time Data Processing:** Future updates will incorporate real-time data processing capabilities, enabling live updates for products, chat interactions, and instant notifications to users.
- **Enhanced User Experience:** Continued improvements to the UI/UX design, ensuring that users have a pleasant and intuitive shopping experience.


