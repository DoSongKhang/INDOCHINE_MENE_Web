import type { WineCategory } from '../types/wine';

export interface CategoryInfo {
  id: WineCategory | 'all';
  name: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', name: 'Tất Cả Sản Phẩm', description: 'Toàn bộ bộ sưu tập Prosecco & Rượu vang Khởi Niên' },
  { id: 'prosecco', name: 'Prosecco Superiore', description: 'Dòng Prosecco Ý đẳng cấp nhập khẩu với bọt sủi tinh tế' },
  { id: 'giftset', name: 'Bộ Sưu Tập Gift Set', description: 'Hộp quà biếu Tết & đối tác cao cấp đính kèm ly pha lê' },
  { id: 'sparkling', name: 'Sparkling Gold', description: 'Dòng vang sủi dát vàng 23K sang trọng cho đại tiệc' },
  { id: 'rose', name: 'Rosé Sparkling', description: 'Vang sủi hồng quyến rũ mang hương vị trái cây mọng đỏ' },
  { id: 'red', name: 'Khởi Niên Red Reserve', description: 'Rượu vang đỏ cao cấp ủ thùng gỗ sồi lâu năm' },
];
