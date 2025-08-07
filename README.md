# 📝 Todo App - Full Stack Application

A modern, full-featured Todo application built with React (Frontend) and FastAPI (Backend), featuring user authentication, real-time filtering, and persistent filter state across page refreshes.

## ✨ Features

### 🔐 Authentication
- **User Registration** - Create new accounts with email/password
- **Secure Login** - JWT-based authentication system
- **Protected Routes** - Authenticated access to todo management
- **Session Management** - Automatic token handling

### 📋 Todo Management
- **Create Todos** - Add new tasks with completion status
- **Edit Todos** - Update task titles and completion status
- **Real-time Updates** - Instant UI updates with API synchronization
- **Modal Interface** - Clean, user-friendly editing experience

### 🔍 Advanced Filtering
- **Filter by Status** - View All, Completed, or Incomplete todos
- **URL Persistence** - Filters remain active after page refresh
- **Real-time Filtering** - Instant results as you switch filters
- **Filter State Management** - Seamless user experience

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop and mobile devices
- **Clean Interface** - Modern, intuitive user experience
- **Loading States** - Visual feedback during API calls
- **Error Handling** - User-friendly error messages

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **React Router DOM** - Client-side routing with URL persistence
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with responsive design
- **Context API** - State management for authentication

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - Database ORM and management
- **JWT Authentication** - Secure token-based auth
- **PostgreSQL/SQLite** - Database storage
- **CORS Support** - Cross-origin resource sharing
- **Pydantic** - Data validation and serialization

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **PostgreSQL** (optional, SQLite works for development)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd todo-app
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn sqlalchemy psycopg2-binary python-jose bcrypt python-multipart
   ```

4. **Configure database** (optional for PostgreSQL)
   ```bash
   # Create .env file
   DATABASE_URL=postgresql://username:password@localhost/todoapp_db
   SECRET_KEY=your-secret-key-here
   ```

5. **Run the backend server**
   ```bash
   uvicorn main:app --reload --port 8001
   ```

   The API will be available at `http://localhost:8001`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend  # or your frontend folder name
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages**
   ```bash
   npm install react-router-dom axios
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be available at `http://localhost:5173` (or your configured port)

## 📁 Project Structure

```
todo-app/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   ├── auth.py              # Authentication logic
│   ├── database.py          # Database configuration
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoApp.jsx      # Main todo application
│   │   │   └── TodoModal.jsx    # Todo edit/create modal
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── SignIn.jsx       # Login page
│   │   │   ├── SignUp.jsx       # Registration page
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── styles/
│   │   │   ├── auth.css         # Authentication styles
│   │   │   └── main.css         # Main application styles
│   │   └── App.js               # Main React application
│   └── package.json             # Node.js dependencies
└── README.md                    # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /sign-up` - User registration
- `POST /token` - User login (get JWT token)
- `GET /verify-token` - Verify JWT token

### Todos
- `GET /todos` - Get all user todos
- `POST /todos` - Create new todo
- `PATCH /todos/{todo_id}` - Update todo

## 🎯 Key Features Implementation

### Filter Persistence with URL Parameters
The app uses React Router's `useSearchParams` to maintain filter state in the URL:
- Filters are stored as URL parameters (`?filter=Completed`)
- Page refreshes maintain the selected filter
- Clean URLs (default "All" filter doesn't add parameters)

### Authentication Flow
- JWT tokens stored in localStorage
- Automatic token validation on route changes
- Protected routes redirect to login when needed
- Clean logout with token removal

### Real-time UI Updates
- Optimistic updates for better user experience
- Error handling with rollback on API failures
- Loading states for all async operations

## 🧪 Testing

### Manual Testing Steps
1. **Authentication Testing**
   - Register a new account
   - Login with credentials
   - Verify protected route access

2. **Todo Management Testing**
   - Create new todos
   - Edit todo titles and completion status
   - Verify API synchronization

3. **Filter Persistence Testing**
   - Select different filters
   - Refresh the page
   - Verify filter state persists

## 🚧 Future Enhancements

- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Drag-and-drop reordering
- [ ] Dark/light theme toggle
- [ ] Bulk operations (delete/complete multiple)
- [ ] Search functionality
- [ ] Todo sharing between users
- [ ] Mobile app version
- [ ] Offline support with service workers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- FastAPI team for the high-performance backend framework
- Open source community for inspiration and tools

---

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Reach out via email

**Happy Todo Managing! 🎉**
