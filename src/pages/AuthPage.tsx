import { useState, useEffect, type FormEvent } from 'react';
import '../assets/css/AuthPage.css';
import anh2_1 from "../assets/images/wines/anh2_1.png";
import { supabase } from '../lib/supabaseClient';

interface AuthPageProps {
  onNavigate?: (path: string) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  // Trạng thái kiểm tra đã đăng nhập hay chưa
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  // Trạng thái chuyển đổi giữa Đăng nhập (true) và Đăng ký (false)
  const [isLogin, setIsLogin] = useState(true);

  // Dữ liệu Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isOver18, setIsOver18] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Trạng thái xử lý
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Trạng thái thông báo điều hướng từ thanh toán hoặc trang khác
  const [redirectNotice] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('redirect_after_auth') === '/checkout'
      ? 'Quý khách vui lòng đăng nhập tài khoản để tiến hành thanh toán đơn hàng.'
      : '';
  });

  // Kiểm tra trạng thái đăng nhập khi load trang
  useEffect(() => {
    // 1. Kiểm tra session từ Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsAlreadyLoggedIn(true);
        setLoggedInUserEmail(session.user.email || '');
        localStorage.setItem('khoi_nien_is_logged_in', 'true');
        localStorage.setItem('khoi_nien_user_email', session.user.email || '');
        if (session.user.user_metadata?.full_name) {
          localStorage.setItem('khoi_nien_user_name', session.user.user_metadata.full_name);
        }
      } else {
        const loggedIn = localStorage.getItem('khoi_nien_is_logged_in') === 'true';
        if (loggedIn) {
          setIsAlreadyLoggedIn(true);
          setLoggedInUserEmail(localStorage.getItem('khoi_nien_user_email') || 'sommelier@indochinemene.com');
        }
      }
    });
  }, []);

  // Hàm chuyển tab
  const handleSwitchMode = (mode: boolean) => {
    setIsLogin(mode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Nút điền nhanh tài khoản VIP mẫu (Demo)
  const handleFillDemo = () => {
    setIsLogin(true);
    setEmail('sommelier@indochinemene.com');
    setPassword('indochine2026');
    setErrorMessage('');
    setSuccessMessage('Đã điền thông tin tài khoản VIP mẫu.');
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Lỗi đăng xuất:', err);
    }
    localStorage.removeItem('khoi_nien_is_logged_in');
    localStorage.removeItem('khoi_nien_user_email');
    localStorage.removeItem('khoi_nien_user_name');
    setIsAlreadyLoggedIn(false);
    setEmail('');
    setPassword('');
    setIsLoading(false);
    setSuccessMessage('Đã đăng xuất thành công.');
  };

  // Xử lý submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Kiểm tra họ tên khi đăng ký
    if (!isLogin && !fullName.trim()) {
      setErrorMessage('Quý khách vui lòng nhập họ và tên của mình.');
      return;
    }

    // Kiểm tra email
    if (!email.trim() || !password) {
      setErrorMessage('Vui lòng điền đầy đủ email và mật khẩu truy cập.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Định dạng email chưa hợp lệ.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu bảo mật phải chứa ít nhất 6 ký tự.');
      return;
    }

    // Kiểm tra đăng ký
    if (!isLogin) {
      if (password !== confirmPassword) {
        setErrorMessage('Mật khẩu xác nhận không trùng khớp.');
        return;
      }
      if (!isOver18) {
        setErrorMessage('Quý khách vui lòng xác nhận đã đủ 18 tuổi để tham gia Indochine Privé.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // ĐĂNG NHẬP VỚI SUPABASE
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          setIsLoading(false);
          if (error.message.toLowerCase().includes('invalid login credentials')) {
            setErrorMessage('Email hoặc mật khẩu không chính xác.');
          } else if (error.message.toLowerCase().includes('email not confirmed')) {
            setErrorMessage('Email chưa được xác nhận. Quý khách vui lòng kiểm tra hộp thư.');
          } else {
            setErrorMessage(`Đăng nhập không thành công: ${error.message}`);
          }
          return;
        }

        const user = data.user;
        localStorage.setItem('khoi_nien_is_logged_in', 'true');
        localStorage.setItem('khoi_nien_user_email', user?.email || email.trim());
        const name = user?.user_metadata?.full_name || fullName;
        if (name) {
          localStorage.setItem('khoi_nien_user_name', name);
        }

        const redirectTarget = sessionStorage.getItem('redirect_after_auth') || '/';
        sessionStorage.removeItem('redirect_after_auth');

        setSuccessMessage(
          redirectTarget === '/checkout'
            ? 'Xác thực thành công! Đang chuyển đến quy trình thanh toán VIP...'
            : redirectTarget === '/cart'
              ? 'Đăng nhập thành công! Đang chuyển đến giỏ hàng của quý khách...'
              : 'Đăng nhập thành công! Chào mừng quý khách quay lại Indochine Mène...'
        );

        setTimeout(() => {
          setIsLoading(false);
          if (onNavigate) {
            onNavigate(redirectTarget);
          } else {
            window.location.hash = redirectTarget;
          }
        }, 900);
      } else {
        // ĐĂNG KÝ VỚI SUPABASE
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) {
          setIsLoading(false);
          if (error.message.toLowerCase().includes('user already registered')) {
            setErrorMessage('Email này đã được đăng ký tài khoản. Quý khách vui lòng chuyển sang Đăng nhập.');
          } else {
            setErrorMessage(`Đăng ký không thành công: ${error.message}`);
          }
          return;
        }

        setIsLoading(false);
        // Kiểm tra xem session có ngay lập tức không (nếu tắt email confirmation)
        if (data.session) {
          localStorage.setItem('khoi_nien_is_logged_in', 'true');
          localStorage.setItem('khoi_nien_user_email', email.trim());
          if (fullName.trim()) {
            localStorage.setItem('khoi_nien_user_name', fullName.trim());
          }
          setSuccessMessage('Đăng ký hội viên thành công! Chào mừng quý khách đến với Indochine Mène.');
          setTimeout(() => {
            if (onNavigate) {
              onNavigate('/');
            } else {
              window.location.hash = '/';
            }
          }, 1200);
        } else {
          setSuccessMessage('Đăng ký tài khoản thành công! Quý khách có thể đăng nhập ngay.');
          setTimeout(() => {
            setIsLogin(true);
          }, 1500);
        }
      }
    } catch (err: unknown) {
      setIsLoading(false);
      const errorMsg = err instanceof Error ? err.message : (err as { message?: string })?.message;
      setErrorMessage(errorMsg || 'Đã có lỗi xảy ra trong quá trình xử lý.');
    }
  };

  const handleGoHome = (path: string = '/') => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* 1. NẾU ĐÃ ĐĂNG NHẬP: HIỂN THỊ THẺ VIP MEMBER PASS */}
      {isAlreadyLoggedIn ? (
        <div className="auth-vip-profile-container">
          <div className="vip-avatar-ring" aria-hidden="true">
            <img src={anh2_1} alt="logo" />
          </div>
          <div className="vip-badge-tag">
            <span>✦ HỘI VIÊN INDOCHINE PRIVÉ ✦</span>
          </div>
          <h2 className="vip-profile-title">Chào Mừng Quý Khách</h2>
          <p className="vip-profile-email">{loggedInUserEmail}</p>

          <div className="vip-perks-grid">
            <div className="vip-perk-card">
              <h5>Đặc quyền Mở bán Giới hạn</h5>
              <p>Ưu tiên đặt trước các niên vụ Prosecco DOCG & Sparkling Gold 23K.</p>
            </div>
            <div className="vip-perk-card">
              <h5>Giao Rượu Chuẩn Nhiệt Độ</h5>
              <p>Miễn phí giao hỏa tốc giữ chuẩn nhiệt độ hầm rượu tại Hà Nội & TP.HCM.</p>
            </div>
          </div>

          <div className="vip-actions-group">
            <button
              type="button"
              className="btn-vip-primary"
              onClick={() => handleGoHome('/products')}
            >
              Khám Phá Hầm Rượu Mène
            </button>
            <button
              type="button"
              className="btn-vip-secondary"
              onClick={() => handleGoHome('/cart')}
            >
              Kiểm Tra Giỏ Hàng
            </button>
            <button
              type="button"
              className="btn-vip-logout"
              onClick={handleLogout}
            >
              Đăng xuất khỏi thiết bị này
            </button>
          </div>
        </div>
      ) : (
        /* 2. CHƯA ĐĂNG NHẬP: BỐ CỤC DUAL-PANE LUXURY EDITORIAL */
        <div className="auth-card-container">
          {/* CỘT TRÁI: SHOWCASE ĐẶC QUYỀN HỘI VIÊN */}
          <div className="auth-showcase-pane">
            <div className="showcase-header">
              <div className="showcase-brand-badge">
                <div className="showcase-monogram"><img src={anh2_1} alt="logo" /></div>
                <div className="showcase-title-box">
                  <h2>INDOCHINE MÈNE</h2>
                  <span>PROSECCO &amp; FINE WINES • MAISON DE LUXE</span>
                </div>
              </div>
            </div>

            <div className="showcase-content">
              <span className="privilege-pill">✦ CÂU LẠC BỘ INDOCHINE PRIVÉ</span>
              <h3 className="showcase-headline">
                Tinh hoa bọt sủi Á Âu &amp; Đặc quyền thưởng thức
              </h3>

              <div className="perks-list">
                <div className="perk-item">
                  <span className="perk-bullet">✦</span>
                  <div className="perk-text">
                    <h4>Tuyển tập Vintage Độc bản</h4>
                    <p>Ưu tiên tiếp cận trước các mẻ Prosecco DOCG và quà tặng phiên bản giới hạn.</p>
                  </div>
                </div>

                <div className="perk-item">
                  <span className="perk-bullet">✦</span>
                  <div className="perk-text">
                    <h4>Thư mời Private Wine Tasting</h4>
                    <p>Tham dự dạ tiệc thử rượu độc quyền cùng các chuyên gia Sommelier quốc tế.</p>
                  </div>
                </div>

                <div className="perk-item">
                  <span className="perk-bullet">✦</span>
                  <div className="perk-text">
                    <h4>Cố vấn 1-on-1 từ Sommelier</h4>
                    <p>Tư vấn riêng danh mục rượu cho yến tiệc, quà biếu doanh nghiệp và bộ sưu tập cá nhân.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase-footer">
              <p className="showcase-quote">
                &ldquo;Le vin est de la poésie en bouteille.&rdquo;
              </p>
              <span className="showcase-origin">
                100% NHẬP KHẨU NGUYÊN CHAI • DOCG VALDOBBIADENE VENETO
              </span>
            </div>
          </div>

          {/* CỘT PHẢI: FORM ĐĂNG NHẬP / ĐĂNG KÝ */}
          <div className="auth-form-pane">
            {/* Thanh điều hướng chế độ & nút Demo */}
            <div className="auth-nav-header">
              <div className="auth-mode-tabs" role="tablist">
                <button
                  type="button"
                  className={`auth-tab-item ${isLogin ? 'active' : ''}`}
                  onClick={() => handleSwitchMode(true)}
                  role="tab"
                  aria-selected={isLogin}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  className={`auth-tab-item ${!isLogin ? 'active' : ''}`}
                  onClick={() => handleSwitchMode(false)}
                  role="tab"
                  aria-selected={!isLogin}
                >
                  Tạo Tài Khoản
                </button>
              </div>

              {isLogin && (
                <button
                  type="button"
                  className="btn-demo-quick"
                  onClick={handleFillDemo}
                  title="Điền sẵn thông tin tài khoản mẫu để trải nghiệm nhanh"
                >
                  ⚡ Tài khoản mẫu
                </button>
              )}
            </div>

            {/* Tiêu đề Form */}
            <div className="auth-heading-area">
              <h2 className="auth-title">
                {isLogin ? 'Chào Mừng Quý Khách' : 'Gia Nhập Indochine Privé'}
              </h2>
              <p className="auth-subtitle">
                {isLogin
                  ? 'Đăng nhập để tiếp cận danh mục rượu vang thượng hạng của bạn.'
                  : 'Trở thành hội viên để nhận trọn vẹn đặc quyền thưởng rượu quý phái.'}
              </p>
            </div>

            {/* Thông báo yêu cầu đăng nhập từ thanh toán */}
            {redirectNotice && !errorMessage && !successMessage && (
              <div className="auth-alert-message info" role="status" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.22)', color: '#ffffff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>{redirectNotice}</span>
              </div>
            )}

            {/* Thông báo lỗi */}
            {errorMessage && (
              <div className="auth-alert-message error" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Thông báo thành công */}
            {successMessage && (
              <div className="auth-alert-message success" role="status">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form nhập liệu */}
            <form onSubmit={handleSubmit} className="auth-inputs-form" noValidate>
              {/* Họ tên (Khi Đăng ký) */}
              {!isLogin && (
                <div className="auth-field-group fade-in">
                  <label htmlFor="fullName" className="auth-label">
                    Họ và tên quý khách
                  </label>
                  <div className="auth-input-box">
                    <span className="auth-input-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      id="fullName"
                      type="text"
                      className="auth-native-input"
                      placeholder="Ví dụ: Đỗ Song Khang"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="auth-field-group">
                <label htmlFor="email" className="auth-label">
                  Địa chỉ Email
                </label>
                <div className="auth-input-box">
                  <span className="auth-input-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    className="auth-native-input"
                    placeholder="khangdo.09102006@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div className="auth-field-group">
                <label htmlFor="password" className="auth-label">
                  Mật khẩu truy cập
                </label>
                <div className="auth-input-box">
                  <span className="auth-input-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-native-input"
                    placeholder="Tối thiểu 6 ký tự"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                  />
                  <button
                    type="button"
                    className="auth-toggle-pwd"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Xác nhận mật khẩu (Khi Đăng ký) */}
              {!isLogin && (
                <div className="auth-field-group fade-in">
                  <label htmlFor="confirmPassword" className="auth-label">
                    Xác nhận lại mật khẩu
                  </label>
                  <div className="auth-input-box">
                    <span className="auth-input-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      className="auth-native-input"
                      placeholder="Nhập lại mật khẩu vừa chọn"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Tùy chọn form */}
              {isLogin ? (
                <div className="auth-options-row">
                  <label className="auth-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Ghi nhớ phiên đăng nhập</span>
                  </label>
                  <a
                    href="#forgot"
                    className="auth-link-forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Vui lòng liên hệ chuyên viên hỗ trợ của Indochine Mène qua Hotline 1900 8888 để được cấp lại mật khẩu an toàn.');
                    }}
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              ) : (
                <div className="auth-options-row fade-in">
                  <label className="auth-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isOver18}
                      onChange={(e) => setIsOver18(e.target.checked)}
                    />
                    <span>Tôi xác nhận mình đã đủ 18 tuổi</span>
                  </label>
                </div>
              )}

              {/* Nút Submit */}
              <button type="submit" className="btn-auth-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="auth-spinner" aria-hidden="true"></span>
                    <span>{isLogin ? 'ĐANG XÁC THỰC...' : 'ĐANG KHỞI TẠO TÀI KHOẢN...'}</span>
                  </>
                ) : (
                  <span>{isLogin ? 'ĐĂNG NHẬP VÀO HẦM RƯỢU' : 'GIA NHẬP INDOCHINE PRIVÉ'}</span>
                )}
              </button>
            </form>

            {/* Đường phân cách */}
            <div className="auth-divider-line">
              <span>HOẶC TIẾP TỤC VỚI</span>
            </div>

            {/* Mạng xã hội */}
            <div className="auth-social-row">
              <button
                type="button"
                className="btn-auth-social"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    localStorage.setItem('khoi_nien_is_logged_in', 'true');
                    localStorage.setItem('khoi_nien_user_email', 'google.member@indochinemene.com');
                    setIsLoading(false);
                    setSuccessMessage('Đăng nhập qua Google thành công!');
                    setTimeout(() => handleGoHome('/'), 800);
                  }, 800);
                }}
              >
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
                <span>Google</span>
              </button>

              <button
                type="button"
                className="btn-auth-social"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    localStorage.setItem('khoi_nien_is_logged_in', 'true');
                    localStorage.setItem('khoi_nien_user_email', 'apple.member@indochinemene.com');
                    setIsLoading(false);
                    setSuccessMessage('Đăng nhập qua Apple ID thành công!');
                    setTimeout(() => handleGoHome('/'), 800);
                  }, 800);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.92-2.84-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.03-.5 2.65-1.25z" />
                </svg>
                <span>Apple ID</span>
              </button>
            </div>

            {/* Chuyển đổi trạng thái */}
            <div className="auth-switch-prompt">
              <span>
                {isLogin ? 'Chưa sở hữu tài khoản Indochine Mène?' : 'Đã có tài khoản thành viên?'}
              </span>
              <button
                type="button"
                className="auth-inline-switch-btn"
                onClick={() => handleSwitchMode(!isLogin)}
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
