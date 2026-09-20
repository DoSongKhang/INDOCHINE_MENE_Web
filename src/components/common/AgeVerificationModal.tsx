import React from 'react';
import { useAge } from '../../context/AgeContext';
import { Button } from './Button';

interface AgeVerificationModalProps {
  onNavigate?: (path: string) => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onNavigate }) => {
  const { isVerified, verifyAge, rejectAge, isUnderage } = useAge();

  const handleVerifyAge = () => {
    verifyAge();
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.hash = '/';
    }
  };

  if (isVerified) return null;

  return (
    <div
      className='fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505] p-5'
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505',
        backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(5, 5, 5, 0.98) 75%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#121212',
          border: '1px solid #ffffff',
          borderRadius: '16px',
          maxWidth: '520px',
          width: '100%',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
          animation: 'fadeIn 0.4s ease-out',
        }}
      >
        {/* Brand Crest Header */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              border: '1.5px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#ffffff', fontWeight: 'bold' }}>
              IM
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-serif)', letterSpacing: '2px' }}>
            INDOCHINE MÈNE
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#999999', letterSpacing: '2px', textTransform: 'uppercase' }}>
            FRENCH VINTAGE PROSECCO &amp; FINE WINES
          </p>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #ffffff, transparent)', margin: '20px 0' }} />

        {!isUnderage ? (
          <>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '12px', fontWeight: 500, fontFamily: 'var(--font-serif)' }}>
              XÁC NHẬN ĐỘ TUỔI TRUY CẬP
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#999999', marginBottom: '28px', lineHeight: 1.6 }}>
              Trang web chứa thông tin về sản phẩm đồ uống có cồn. Theo quy định pháp luật Việt Nam, bạn phải từ <strong>18 tuổi trở lên</strong> để truy cập nội dung này.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Button variant="gold" size="lg" fullWidth onClick={handleVerifyAge}>
                Tôi Đã Đủ 18 Tuổi
              </Button>
              <Button variant="outline" size="lg" fullWidth onClick={rejectAge}>
                Chưa Đủ 18 Tuổi
              </Button>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#666666', marginTop: '24px' }}>
              Thưởng thức có trách nhiệm. Không lái xe khi đã uống rượu bia.
            </p>
          </>
        ) : (
          <div style={{ padding: '20px 0' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ff4d4d', marginBottom: '12px' }}>
              RẤT TIẾC, BẠN CHƯA ĐỦ TUỔI TRUY CẬP
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#999999', lineHeight: 1.6 }}>
              Website thương hiệu Indochine Mène chỉ dành cho người dùng từ 18 tuổi trở lên theo quy định pháp luật. Xin hẹn gặp lại bạn trong tương lai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
