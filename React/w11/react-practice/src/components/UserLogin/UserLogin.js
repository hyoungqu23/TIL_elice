import React from 'react';
// 필요한 모듈을 추가로 import하세요.
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import LoginForm from './LoginForm';

// Router Component
export default function UserLogin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail" element={<UserDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// HomePage Component
function HomePage() {
  // Link 컴포넌트를 추가하세요.
  return (
    <div>
      <h2>Home Page</h2>
      <div>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

// LoginPage Component
function LoginPage() {
  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm />
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

// DetailPage Component
function UserDetailPage() {
  // email, password 정보를
  // query param 으로 받아와 저장하고, 정보를 보여주세요.
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
