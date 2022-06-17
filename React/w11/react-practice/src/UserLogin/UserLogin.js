import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { loginUser, registerUser } from './services/auth';

function PageLayout({ heading, links, children }) {
  return (
    <div>
      <h2>{heading}</h2>
      <nav>
        {links.map(({ to, text }) => (
          <Link to={to}>{text}</Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}

// Router Component
export default function UserLogin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/detail" element={<UserDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// HomePage Component
function HomePage() {
  return (
    <div>
      <h2>Home Page</h2>
      <div>
        <Link to="/register">Go to Register</Link>
        <br />
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
}

// LoginPage Component
function LoginPage() {
  const history = useHistory();

  const handleSubmit = (formData) => {
    const foundUser = loginUser(formData);

    if (!foundUser) return;

    const location = {
      pathname: '/detail',
      state: {
        user: foundUser,
      },
    };

    history.push(location);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm onSubmit={handleSubmit} />
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

function RegisterPage() {
  const history = useHistory();

  const handleSubmit = (formData) => {
    registerUser(formData);
    history.push('/login');
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleSubmit} />
      <div>
        <Link to="/">Back to Home</Link>
        <br />
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
}

// DetailPage Component
function UserDetailPage() {
  // email, password 정보를 query param 으로 받아와 저장
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get('email');
  const password = searchParams.get('password');

  // email, password가 없는 경우에는 Login Page로 리다이렉트
  if (!email || !password) return <Route path="/login" />;

  return (
    <div>
      <h2>User Detail Page</h2>
      <div>
        <h3>User details</h3>
        <em>{email}</em>
        <br />
        <strong>{password}</strong>
      </div>
      <Link to="/login">Logout</Link>
    </div>
  );
}
