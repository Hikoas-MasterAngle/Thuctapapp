import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Package,
  Shirt,
  Sparkles,
  TimerReset,
} from 'lucide-react';

type RentalItem = {
  id: string;
  name: string;
  desc: string;
  price: string;
  icon: typeof BookOpen;
  accent: string;
};

interface MemberEquipmentRentalScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

const RENTAL_ITEMS: RentalItem[] = [
  { id: 'racket', name: 'Vợt pickleball', desc: 'Mẫu cơ bản cho buổi chơi', price: '30.000đ', icon: BookOpen, accent: '#0E7C7B' },
  { id: 'ball', name: 'Bóng thi đấu', desc: 'Bộ 3 quả', price: '20.000đ', icon: Package, accent: '#2A9D8F' },
  { id: 'towel', name: 'Khăn thể thao', desc: 'Khăn nhỏ thấm mồ hôi', price: '15.000đ', icon: Shirt, accent: '#E8832A' },
  { id: 'wristband', name: 'Băng tay / phụ kiện', desc: 'Hỗ trợ khi vận động', price: '10.000đ', icon: Sparkles, accent: '#815AD5' },
];

const RENTAL_RULES = [
  'Thuê theo buổi, lấy tại sân trước giờ chơi.',
  'Prototype chỉ mô phỏng lựa chọn đồ, chưa có thanh toán thật.',
  'Có thể đổi hoặc hủy yêu cầu trước khi xác nhận ở quầy.',
];

export function MemberEquipmentRentalScreen({ onBack, onConfirm }: MemberEquipmentRentalScreenProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['racket', 'ball']);

  const selectedItems = useMemo(
    () => RENTAL_ITEMS.filter((item) => selectedIds.includes(item.id)),
    [selectedIds],
  );

  function toggleItem(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((itemId) => itemId !== id);
      }

      return [...current, id];
    });
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#F0F4F5' }}>
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(148deg,#032C2C 0%,#053E3E 30%,#075E5D 60%,#0E7C7B 85%,#1A8E87 100%)' }}
      >
        <div className="absolute pointer-events-none" style={{ top: -26, right: -18, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative px-5 pt-14 pb-5">
          <div className="flex items-start justify-between gap-3 mb-5">
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <ArrowLeft style={{ width: 18, height: 18, color: 'white' }} />
            </button>
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <CircleDollarSign style={{ width: 18, height: 18, color: 'white' }} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <Package style={{ width: 24, height: 24, color: 'white' }} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 700, letterSpacing: '0.05em' }}>
                THUÊ ĐỒ TẠI SÂN
              </p>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.1, marginTop: 3 }}>
                Chọn đồ dùng nhanh cho buổi chơi
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', fontWeight: 500, marginTop: 4, lineHeight: 1.5 }}>
                Màn chi tiết nhỏ cho hội viên để xem vật dụng thuê sẵn tại sân trước khi ra sân.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 pt-4 space-y-4">
          <div className="rounded-3xl p-4" style={{ background: 'white', border: '1.5px solid rgba(14,124,123,0.15)', boxShadow: '0 6px 20px rgba(14,124,123,0.08)' }}>
            <div className="flex items-start gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(14,124,123,0.10)' }}
              >
                <BadgeCheck style={{ width: 20, height: 20, color: '#0E7C7B' }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 900, color: '#1F2933' }}>Quy trình thuê đồ</p>
                <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2, lineHeight: 1.5 }}>
                  Chọn món cần thuê → xác nhận yêu cầu → nhận tại quầy sân.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>
                DANH SÁCH ĐỒ THUÊ
              </p>
              <span
                className="px-2.5 py-1 rounded-lg"
                style={{ fontSize: 10, fontWeight: 800, color: '#0E7C7B', background: 'rgba(14,124,123,0.10)' }}
              >
                {selectedItems.length} đã chọn
              </span>
            </div>

            <div className="space-y-3">
              {RENTAL_ITEMS.map((item) => {
                const selected = selectedIds.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left rounded-3xl p-4 active:scale-[0.99] transition-all"
                    style={{
                      background: selected ? 'rgba(14,124,123,0.07)' : 'white',
                      border: selected ? '1.5px solid rgba(14,124,123,0.26)' : '1.5px solid rgba(0,0,0,0.06)',
                      boxShadow: selected ? '0 8px 20px rgba(14,124,123,0.08)' : '0 2px 10px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.accent}14` }}
                        >
                          <item.icon style={{ width: 20, height: 20, color: item.accent }} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p style={{ fontSize: 14, fontWeight: 900, color: '#1F2933' }}>{item.name}</p>
                            {selected && (
                              <span
                                className="px-2 py-0.5 rounded-lg"
                                style={{ fontSize: 9, fontWeight: 900, color: item.accent, background: `${item.accent}14` }}
                              >
                                Đã chọn
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2, lineHeight: 1.4 }}>{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p style={{ fontSize: 12, fontWeight: 900, color: item.accent }}>{item.price}</p>
                        <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, marginTop: 2 }}>
                          / lượt
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl p-4" style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-3">
              <TimerReset style={{ width: 16, height: 16, color: '#0E7C7B' }} />
              <p style={{ fontSize: 12, fontWeight: 900, color: '#1F2933' }}>Lưu ý nhanh</p>
            </div>
            <div className="space-y-2">
              {RENTAL_RULES.map((rule) => (
                <div key={rule} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#0E7C7B' }} />
                  <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5 }}>{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-30"
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(18px)',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="px-4 py-3">
          <button
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl active:scale-[0.99] transition-all"
            style={{
              background: 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)',
              boxShadow: '0 10px 24px rgba(14,124,123,0.24)',
            }}
          >
            <Clock3 style={{ width: 18, height: 18, color: 'white' }} />
            <span style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>
              Xác nhận thuê đồ
            </span>
            <ChevronRight style={{ width: 16, height: 16, color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
