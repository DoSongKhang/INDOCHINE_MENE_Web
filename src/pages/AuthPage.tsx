import { useState, type FormEvent } from 'react';
import '../assets/css/AuthPage.css';

interface AuthPageProps {
  onNavigate?: (path: string) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  // Trạng thái chuyển đổi giữa Đăng nhập (true) và Đăng ký (false)
  const [isLogin, setIsLogin] = useState(true);

  // Dữ liệu Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isOver18, setIsOver18] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Trạng thái xử lý (loading / thông báo)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Hàm chuyển tab và reset thông báo
  const handleSwitchMode = (mode: boolean) => {
    setIsLogin(mode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Xử lý submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Kiểm tra dữ liệu đăng ký
    if (!isLogin && !fullName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    // Kiểm tra email
    if (!email.trim() || !password) {
      setErrorMessage('Vui lòng điền đầy đủ email và mật khẩu.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Định dạng email không hợp lệ.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }

    // Kiểm tra xác nhận mật khẩu & tuổi khi Đăng ký
    if (!isLogin) {
      if (password !== confirmPassword) {
        setErrorMessage('Mật khẩu xác nhận không khớp.');
        return;
      }
      if (!isOver18) {
        setErrorMessage('Bạn phải xác nhận đã đủ 18 tuổi để tham gia hầm rượu.');
        return;
      }
    }

    // Giả lập gọi API
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        localStorage.setItem('khoi_nien_is_logged_in', 'true');
        const redirectTarget = sessionStorage.getItem('redirect_after_auth') || '/';
        sessionStorage.removeItem('redirect_after_auth');

        setSuccessMessage(
          redirectTarget === '/checkout'
            ? 'Đăng nhập thành công! Đang chuyển đến trang thanh toán...'
            : 'Đăng nhập thành công! Đang vào trang chủ...'
        );
        console.log('Login:', { email, password, rememberMe });
        setTimeout(() => {
          if (onNavigate) {
            onNavigate(redirectTarget);
          } else {
            window.location.hash = redirectTarget;
          }
        }, 1000);
      } else {
        setSuccessMessage('Đăng ký tài khoản thành công! Đang chuyển hướng...');
        console.log('Register:', { fullName, email, password, isOver18 });
        // Tự động chuyển về tab đăng nhập sau 1.5s
        setTimeout(() => setIsLogin(true), 1500);
      }
    }, 1200);
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Logo & Header */}
        <div className="login-header">
          <div className="brand-emblem" aria-hidden="true">
            {/* SVG Biểu tượng ly rượu vang thượng hạng */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 22h8" />
              <path d="M12 15v7" />
              <path d="M12 15a5 5 0 0 0 5-5V2H7v8a5 5 0 0 0 5 5Z" />
              <path d="M7 6h10" />
            </svg>
          </div>
          <h1 className="brand-title">Khoinien Wine</h1>
          <p className="brand-subtitle">
            {isLogin
              ? 'Đăng nhập để khám phá hầm rượu thượng hạng'
              : 'Gia nhập câu lạc bộ thưởng thức rượu vang'}
          </p>
        </div>

        {/* Thanh Tab Chuyển Đổi Đăng nhập / Đăng ký */}
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            className={`auth-tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => handleSwitchMode(true)}
            role="tab"
            aria-selected={isLogin}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => handleSwitchMode(false)}
            role="tab"
            aria-selected={!isLogin}
          >
            Đăng ký
          </button>
        </div>

        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="login-alert error" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Thông báo thành công nếu có */}
        {successMessage && (
          <div className="login-alert success" role="status">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form chính */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Ô Họ tên (Chỉ hiển thị khi Đăng ký) */}
          {!isLogin && (
            <div className="form-group fade-in-group">
              <label htmlFor="fullName" className="form-label">
                Họ và tên
              </label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="fullName"
                  type="text"
                  className="form-input"
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>
          )}

          {/* Ô Email (Dùng chung) */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Địa chỉ Email
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="sommelier@khoinienvine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Ô Mật khẩu (Dùng chung) */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Ô Nhập lại mật khẩu (Chỉ hiển thị khi Đăng ký) */}
          {!isLogin && (
            <div className="form-group fade-in-group">
              <label htmlFor="confirmPassword" className="form-label">
                Xác nhận lại mật khẩu
              </label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
          )}

          {/* Tùy chọn khi Đăng nhập (Ghi nhớ / Quên mật khẩu) */}
          {isLogin ? (
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a href="#forgot" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
                Quên mật khẩu?
              </a>
            </div>
          ) : (
            /* Tùy chọn khi Đăng ký: Xác nhận đủ 18 tuổi */
            <div className="form-options fade-in-group">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={isOver18}
                  onChange={(e) => setIsOver18(e.target.checked)}
                />
                <span>Tôi xác nhận mình đã đủ 18 tuổi</span>
              </label>
            </div>
          )}

          {/* Nút bấm Submit */}
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                <span>{isLogin ? 'Đang kiểm tra...' : 'Đang khởi tạo tài khoản...'}</span>
              </>
            ) : (
              <span>{isLogin ? 'Đăng nhập' : 'Tạo tài khoản thành viên'}</span>
            )}
          </button>
        </form>

        {/* Phân cách */}
        <div className="divider">
          <span>Hoặc tiếp tục với</span>
        </div>

        {/* Đăng nhập nhanh qua Mạng xã hội */}
        <div className="social-buttons">
          <button type="button" className="btn-social" onClick={() => alert('Đăng nhập Google')}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
            Google
          </button>

          <button type="button" className="btn-social" onClick={() => alert('Đăng nhập Facebook')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        {/* Chân trang chuyển đổi mượt mà */}
        <div className="login-footer">
          <span>{isLogin ? 'Chưa có tài khoản thành viên?' : 'Đã có tài khoản thành viên?'}</span>
          <button
            type="button"
            className="register-link-btn"
            onClick={() => handleSwitchMode(!isLogin)}
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
          </button>
        </div>
      </div>
    </div>
  );
}
