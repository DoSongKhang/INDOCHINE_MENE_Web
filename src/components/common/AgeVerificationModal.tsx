import React from 'react';
import { useAge } from '../../context/AgeContext';
import { Button } from './Button';

export const AgeVerificationModal: React.FC = () => {
  const { isVerified, verifyAge, rejectAge, isUnderage } = useAge();

  if (isVerified) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#090808',
        backgroundImage: 'radial-gradient(circle at center, rgba(114, 47, 55, 0.25) 0%, rgba(13, 11, 12, 0.95) 75%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#171315',
          border: '1px solid #d4af37',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 0 50px rgba(212, 175, 55, 0.2)',
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
              border: '1px solid #d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(114, 47, 55, 0.2))',
            }}
          >
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#d4af37', fontWeight: 'bold' }}>
              KN
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#f5e6ab', marginBottom: '6px' }}>KHỞI NIÊN</h2>
          <p style={{ fontSize: '0.85rem', color: '#d4af37', letterSpacing: '2px', textTransform: 'uppercase' }}>
            PROSECCO & RƯỢU VANG CAO CẤP SỐ 1 VIỆT NAM
          </p>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '20px 0' }} />

        {!isUnderage ? (
          <>
            <h3 style={{ fontSize: '1.2rem', color: '#f5f3f0', marginBottom: '12px', fontWeight: 500 }}>
              XÁC NHẬN ĐỘ TUỔI TRUY CẬP
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#a39c97', marginBottom: '28px', lineHeight: 1.6 }}>
              Trang web chứa thông tin về sản phẩm đồ uống có cồn. Theo quy định pháp luật Việt Nam, bạn phải từ <strong>18 tuổi trở lên</strong> để truy cập nội dung này.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Button variant="gold" size="lg" fullWidth onClick={verifyAge}>
                Tôi Đã Đủ 18 Tuổi
              </Button>
              <Button variant="outline" size="lg" fullWidth onClick={rejectAge}>
                Chưa Đủ 18 Tuổi
              </Button>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#6e6b68', marginTop: '24px' }}>
              Thưởng thức có trách nhiệm. Không lái xe khi đã uống rượu bia.
            </p>
          </>
        ) : (
          <div style={{ padding: '20px 0' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#e74c3c', marginBottom: '12px' }}>
              RẤT TIẾC, BẠN CHƯA ĐỦ TUỔI TRUY CẬP
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#a39c97', lineHeight: 1.6 }}>
              Website thương hiệu Khởi Niên chỉ dành cho người dùng từ 18 tuổi trở lên theo quy định pháp luật. Xin hẹn gặp lại bạn trong tương lai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
