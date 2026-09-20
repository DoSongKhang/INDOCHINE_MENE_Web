import React from 'react';
import { Button } from '../components/common/Button';

interface NotFoundPageProps {
  onNavigate?: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '75vh', padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#121212', padding: '48px', borderRadius: '16px', border: '1px solid #222222' }}>
        <div style={{ fontSize: '4rem', color: '#ffffff', fontFamily: 'var(--font-serif)', fontWeight: 'bold', marginBottom: '8px' }}>
          404
        </div>
        <h2 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
          Trang Không Tồn Tại
        </h2>
        <p style={{ color: '#999999', fontSize: '0.9rem', marginBottom: '28px' }}>
          Đường dẫn bạn truy cập hiện không tồn tại hoặc đã được di chuyển.
        </p>
        <Button variant="gold" size="lg" onClick={() => onNavigate && onNavigate('/')}>
          QUAY LẠI TRANG CHỦ INDOCHINE MÈNE
        </Button>
      </div>
    </div>
  );
};
