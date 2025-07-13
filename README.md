# Hotel Management System (HMS)

A modern, responsive Hotel Management System (HMS) built with React.js and plain CSS. This system is designed for hotel admins and regular users to manage bookings, rooms, profiles, and analytics. It features a dark mode toggle, color-coded dashboard cards, and improved navigation.

![Application Screenshot](/HMS.png)


## Key Features

- **User Authentication**
  - Registration and login pages for both admins and regular users.
  
- **Role-Based Dashboards**
  - **Admin Dashboard**: Room management, user management, and analytics.
  - **User Dashboard**: View bookings, upcoming stays, and loyalty status.

- **Room Management (Admin only)**
  - Admins can add, update, delete, and view rooms.

- **Booking Management**
  - Search and filter bookings.
  - Users can book, view, and manage their bookings.

- **Profile Management**
  - Users can update their profiles and settings.

- **Analytics (Admin only)**
  - Insights into the hotel’s performance with metrics such as total bookings, revenue, etc.

- **Dark Mode**
  - A complete dark mode toggle for a seamless user experience at night.

- **Mobile-First Design**
  - Responsive design that works seamlessly on all devices (mobile, tablet, and desktop).

---

## Tech Stack

- **Frontend**: React.js
- **Styling**: Plain CSS
- **Routing**: React Router
- **State Management**: React Hooks
- **Theme Management**: CSS Variables for light/dark mode
- **Icons**: React Icons (for user avatars and navbar icons)

---

## Features Overview

### Dark Mode
- **Toggle**: Users can toggle between light and dark themes.
- **CSS Variables**: Centralized theme management for both light and dark modes.

### Dashboard Cards
- Each dashboard stat card is color-coded for better readability and distinction:
  - **Bookings**: Teal Gradient
  - **Revenue/Spent**: Green Gradient
  - **Upcoming Stays**: Orange Gradient
  - **Loyalty Status**: Purple Gradient
  - **Users**: Blue Gradient
  - **Rooms**: Red Gradient
- **Clickable Cards**: Clicking on cards will take users to relevant pages:
  - Total Bookings → My Bookings page
  - Upcoming Stays → My Bookings page
  - Total Spent → My Bookings page
  - Loyalty Status → Profile page

### Navbar
- **Modern Design**: A sleek and responsive navbar with a theme toggle.
- **User Avatar**: Replaced user role labels with avatar initials (no Admin or User text).
- **Mobile-First**: Fully responsive navbar with improved touch targets and spacing.

### Mobile-First Design
- **Responsive Layout**: The application is designed to be fully responsive on mobile, tablet, and desktop.
- **Breakpoints**: Custom breakpoints for optimal viewing on different screen sizes.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/hotel-management-system.git
cd hotel-management-system
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the appropriate port displayed in the terminal).

---

## Usage

* **User**:

  * Login as a regular user using the demo credentials shown on the login page.
  * Access your bookings, upcoming stays, and loyalty status from your dashboard.
* **Admin**:

  * Login as an admin to manage rooms, view detailed analytics, and manage users.
  * Admin can perform CRUD operations on rooms and manage user data.

---

## Contributing

We welcome contributions! Feel free to fork the repository and submit a pull request with improvements or bug fixes.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

