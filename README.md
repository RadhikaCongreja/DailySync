# 🔄 DailySync - Full Stack Task Management Application

A modern, full-featured task management application built with React (Frontend) and FastAPI (Backend), featuring user authentication, real-time filtering, and persistent filter state across page refreshes. Stay synchronized with your daily goals and boost your productivity.

## ✨ Features

### 🔐 Authentication
- **User Registration** - Create new accounts with email/password
- **Secure Login** - JWT-based authentication system
- **Protected Routes** - Authenticated access to task management
- **Session Management** - Automatic token handling

### 📋 Task Management
- **Create Tasks** - Add new daily tasks with completion status
- **Edit Tasks** - Update task titles and completion status
- **Real-time Updates** - Instant UI updates with API synchronization
- **Modal Interface** - Clean, user-friendly editing experience

### 🔍 Advanced Filtering
- **Filter by Status** - View All, Completed, or Incomplete tasks
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
- **MySQL/SQLite** - Database storage
- **CORS Support** - Cross-origin resource sharing
- **Pydantic** - Data validation and serialization

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **MySQL** (optional, SQLite works for development)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DailySync
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
   DATABASE_URL=postgresql://username:password@localhost/dailysync_db
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

   The app will be available at https://dailysync-ndd8.vercel.app/

## 📁 Project Structure

```
DailySync/
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
│   │   │   ├── DailySyncApp.jsx     # Main task management application
│   │   │   └── TaskModal.jsx        # Task edit/create modal
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── SignIn.jsx           # Login page
│   │   │   ├── SignUp.jsx           # Registration page
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── styles/
│   │   │   ├── auth.css             # Authentication styles
│   │   │   └── main.css             # Main application styles
│   │   └── App.js                   # Main React application
│   └── package.json                 # Node.js dependencies
└── README.md                        # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /sign-up` - User registration
- `POST /token` - User login (get JWT token)
- `GET /verify-token` - Verify JWT token

### Tasks
- `GET /todos` - Get all user tasks
- `POST /todos` - Create new task
- `PATCH /todos/{todo_id}` - Update task

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

2. **Task Management Testing**
   - Create new daily tasks
   - Edit task titles and completion status
   - Verify API synchronization

3. **Filter Persistence Testing**
   - Select different filters
   - Refresh the page
   - Verify filter state persists

## 🚧 Future Enhancements

- [ ] Daily/Weekly/Monthly task views
- [ ] Task categories and priority levels
- [ ] Due dates and smart reminders
- [ ] Drag-and-drop task reordering
- [ ] Dark/light theme toggle
- [ ] Bulk operations (delete/complete multiple)
- [ ] Advanced search and filtering
- [ ] Task analytics and productivity insights
- [ ] Team collaboration features
- [ ] Mobile app version
- [ ] Offline sync capabilities
- [ ] Daily/Weekly progress reports
- [ ] Integration with calendar apps

## 🌟 Why DailySync?

DailySync is more than just a task manager - it's your daily productivity companion that helps you:
- **Stay Organized** - Keep all your daily tasks in one synchronized place
- **Maintain Focus** - Filter and prioritize what matters most
- **Track Progress** - Visualize your daily accomplishments
- **Build Habits** - Develop consistent daily routines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👤 Author

**Radhika**
- GitHub: [@RadhikaCongreja](https://github.com/RadhikaCongreja)
- Email: radhikacongreja@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- FastAPI team for the high-performance backend framework
- Open source community for inspiration and tools
- All productivity enthusiasts who inspired this project

---

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Reach out via email

**Stay Synced, Stay Productive! 🎉**

---

## 📊 Project Stats
<img width="1354" height="658" alt="image" src="https://github.com/user-attachments/assets/09290fd9-3bf6-48c1-9608-129a2558aacd" />


![GitHub last commit](https://img.shields.io/github/last-commit/RadhikaCongreja/DailySync)
![GitHub stars](https://img.shields.io/github/stars/RadhikaCongreja/DailySync)
![GitHub forks](https://img.shields.io/github/forks/RadhikaCongreja/DailySync)
![GitHub issues](https://img.shields.io/github/issues/RadhikaCongreja/DailySync)

*Built with ❤️ for daily productivity enthusiasts*
