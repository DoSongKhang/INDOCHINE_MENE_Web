import React from 'react';
import { Button } from '../components/common/Button';

interface NotFoundPageProps {
  onNavigate?: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ backgroundColor: '#0d0b0c', minHeight: '75vh', padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#171315', padding: '48px', borderRadius: '20px', border: '1px solid #332b2e' }}>
        <div style={{ fontSize: '4rem', color: '#d4af37', fontFamily: 'var(--font-serif)', fontWeight: 'bold', marginBottom: '8px' }}>
          404
        </div>
        <h2 style={{ color: '#f5e6ab', fontSize: '1.6rem', marginBottom: '12px' }}>
          Trang Không Tồn Tại
        </h2>
        <p style={{ color: '#a39c97', fontSize: '0.9rem', marginBottom: '28px' }}>
          Đường dẫn bạn truy cập hiện không tồn tại hoặc đã được di chuyển.
        </p>
        <Button variant="gold" size="lg" onClick={() => onNavigate && onNavigate('/')}>
          QUAY LẠI TRANG CHỦ KHỞI NIÊN
        </Button>
      </div>
    </div>
  );
};
