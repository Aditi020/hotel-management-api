// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@hotel.com',
    password: 'admin123',
    phone: '+1234567890',
    role: 'admin'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@email.com',
    password: 'user123',
    phone: '+1234567891',
    role: 'user'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@email.com',
    password: 'user123',
    phone: '+1234567892',
    role: 'user'
  }
];

// Mock Rooms Data
export const mockRooms = [
  {
    id: 1,
    name: 'Executive Suite',
    type: 'Suite',
    description: 'Luxurious suite with ocean view, king bed, and private balcony.',
    price: 299,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    amenities: ['WiFi', 'AC', 'Mini Bar', 'Ocean View'],
    available: true
  },
  {
    id: 2,
    name: 'Deluxe Room',
    type: 'Deluxe',
    description: 'Comfortable room with modern amenities and city view.',
    price: 199,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    amenities: ['WiFi', 'AC', 'TV', 'City View'],
    available: true
  },
  {
    id: 3,
    name: 'Standard Room',
    type: 'Standard',
    description: 'Cozy room perfect for business travelers.',
    price: 129,
    image: 'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg',
    amenities: ['WiFi', 'AC', 'TV'],
    available: true
  },
  {
    id: 4,
    name: 'Presidential Suite',
    type: 'Presidential',
    description: 'Ultimate luxury with panoramic views and premium amenities.',
    price: 599,
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
    amenities: ['WiFi', 'AC', 'Mini Bar', 'Jacuzzi', 'Butler Service'],
    available: true
  }
];

// Mock Bookings Data
export const mockBookings = [
  {
    id: 1,
    userId: 2,
    userName: 'John Doe',
    roomId: 1,
    roomName: 'Executive Suite',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    totalCost: 897,
    status: 'confirmed',
    bookingDate: '2024-01-10'
  },
  {
    id: 2,
    userId: 3,
    userName: 'Jane Smith',
    roomId: 2,
    roomName: 'Deluxe Room',
    checkIn: '2024-01-20',
    checkOut: '2024-01-22',
    guests: 1,
    totalCost: 398,
    status: 'confirmed',
    bookingDate: '2024-01-12'
  },
  {
    id: 3,
    userId: 2,
    userName: 'John Doe',
    roomId: 3,
    roomName: 'Standard Room',
    checkIn: '2024-02-01',
    checkOut: '2024-02-03',
    guests: 1,
    totalCost: 258,
    status: 'pending',
    bookingDate: '2024-01-15'
  }
];

// Mock Analytics Data
export const mockAnalytics = {
  totalBookings: 156,
  totalRevenue: 45780,
  occupancyRate: 78,
  averageStay: 2.4,
  monthlyRevenue: [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 16500 },
    { month: 'May', revenue: 22100 },
    { month: 'Jun', revenue: 19800 }
  ],
  roomTypeBookings: [
    { type: 'Standard', bookings: 45 },
    { type: 'Deluxe', bookings: 62 },
    { type: 'Suite', bookings: 38 },
    { type: 'Presidential', bookings: 11 }
  ]
};

// API Simulation Functions
export const authenticateUser = (email, password) => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/auth/login', { ... });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const registerUser = (userData) => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/auth/register', { ... });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        reject(new Error('User already exists'));
      } else {
        const newUser = {
          id: mockUsers.length + 1,
          ...userData,
          role: 'user'
        };
        mockUsers.push(newUser);
        const { password: _, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }
    }, 1000);
  });
};

export const fetchRooms = () => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/rooms');
  
  return new Promise(resolve => {
    setTimeout(() => resolve([...mockRooms]), 500);
  });
};

export const fetchBookings = (userId = null) => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/bookings${userId ? `?userId=${userId}` : ''}`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      const bookings = userId 
        ? mockBookings.filter(b => b.userId === userId)
        : [...mockBookings];
      resolve(bookings);
    }, 500);
  });
};

export const createBooking = (bookingData) => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/bookings', { method: 'POST', ... });
  
  return new Promise(resolve => {
    setTimeout(() => {
      const newBooking = {
        id: mockBookings.length + 1,
        ...bookingData,
        status: 'confirmed',
        bookingDate: new Date().toISOString().split('T')[0]
      };
      mockBookings.push(newBooking);
      resolve(newBooking);
    }, 1000);
  });
};