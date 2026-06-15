import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  RefreshCw,
  Send,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';

type MembershipPlan = {
  id: number;
  name: string;
  duration: string;
  price: string;
  highlight?: string;
  benefits: string[];
  iconBg: string;
  iconColor: string;
};

interface MemberMembershipRegistrationScreenProps {
  onBack: () => void;
  onSubmit: (plan: MembershipPlan) => void;
}

const CURRENT_MEMBERSHIP = {
  id: 2,
  name: 'Hội viên Nâng cao',
  remaining: '21 ngày',
  startDate: '01/04/2026',
  status: 'Đang hoạt động',
  note: 'Ưu tiên đặt sân · Thuê đồ tại sân',
};

const PLANS: MembershipPlan[] = [
  {
    id: 1,
    name: 'Hội viên Cơ bản',
    duration: '1 tháng',
    price: '299.000đ',
    benefits: ['Đặt sân thường', 'Thuê đồ tại sân', 'Nhắc giờ sử dụng'],
    iconBg: 'rgba(14,124,123,0.10)',
    iconColor: '#0E7C7B',
  },
  {
    id: 2,
    name: 'Hội viên Nâng cao',
    duration: '3 tháng',
    price: '699.000đ',
    highlight: 'Phổ biến nhất',
    benefits: ['Ưu tiên đặt sân', 'Đổi / hủy linh hoạt', 'Giảm giá thuê đồ'],
    iconBg: 'rgba(42,157,143,0.10)',
    iconColor: '#2A9D8F',
  },
  {
    id: 3,
    name: 'Hội viên VIP',
    duration: '6 tháng',
    price: '1.299.000đ',
    highlight: 'Ưu tiên cao',
    benefits: ['Ưu tiên khung giờ đẹp', 'Hỗ trợ nhanh tại sân', 'Quyền lợi riêng của CLB'],
    iconBg: 'rgba(244,162,97,0.14)',
    iconColor: '#E8832A',
  },
];

function RenewalSheet({
  plan,
  note,
  onNoteChange,
  onClose,
  onConfirm,
}: {
  plan: MembershipPlan;
  note: string;
  onNoteChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="overflow-hidden rounded-t-[30px] bg-white"
        style={{ boxShadow: '0 -12px 48px rgba(0,0,0,0.18)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center pb-1 pt-3">
          <div className="h-1.5 w-10 rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
        </div>

        <div className="px-5 pb-8">
          <div className="mb-5 mt-2 flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(14,124,123,0.10)' }}
            >
              <RefreshCw style={{ width: 18, height: 18, color: '#0E7C7B' }} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 17, fontWeight: 900, color: '#1F2933' }}>Yêu cầu gia hạn gói hội viên</p>
              <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>Thực hiện ngay trong màn đăng ký hội viên</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl active:scale-95"
              style={{ background: 'rgba(0,0,0,0.04)' }}
            >
              <X style={{ width: 16, height: 16, color: '#6B7280' }} />
            </button>
          </div>

          <div
            className="rounded-3xl p-4"
            style={{ background: 'rgba(14,124,123,0.06)', border: '1.5px solid rgba(14,124,123,0.16)' }}
          >
            <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 800, letterSpacing: '0.04em' }}>GÓI HIỆN TẠI</p>
            <p style={{ fontSize: 16, fontWeight: 900, color: '#1F2933', marginTop: 4 }}>{plan.name}</p>
            <p style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginTop: 3 }}>
              {plan.duration} · {plan.price}
            </p>
          </div>

          <div className="mt-4">
            <p style={{ fontSize: 12, color: '#374151', fontWeight: 800, letterSpacing: '0.04em', marginBottom: 8 }}>
              GHI CHÚ YÊU CẦU
            </p>
            <textarea
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              maxLength={200}
              className="h-32 w-full resize-none rounded-[24px] border-none px-4 py-4 outline-none"
              style={{ background: '#F8FAFB', fontSize: 15, lineHeight: 1.7, color: '#374151' }}
              placeholder={`Tôi muốn gia hạn ${plan.name}, vui lòng xác nhận giúp tôi.`}
            />
            <div className="mt-2 flex items-center justify-between">
              <span />
              <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700 }}>{note.length}/200</span>
            </div>
          </div>

          <button
            onClick={onConfirm}
            className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 active:scale-[0.99] transition-all"
            style={{ background: 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)', boxShadow: '0 10px 24px rgba(14,124,123,0.24)' }}
          >
            <Send style={{ width: 18, height: 18, color: 'white' }} />
            <span style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>Gửi yêu cầu gia hạn hội viên</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function MemberMembershipRegistrationScreen({
  onBack,
  onSubmit,
}: MemberMembershipRegistrationScreenProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(2);
  const [showRenewSheet, setShowRenewSheet] = useState(false);
  const [renewNote, setRenewNote] = useState('');

  const selectedPlan = useMemo(
    () => PLANS.find((plan) => plan.id === selectedPlanId) ?? PLANS[1],
    [selectedPlanId],
  );
  const currentPlan = useMemo(
    () => PLANS.find((plan) => plan.id === CURRENT_MEMBERSHIP.id) ?? PLANS[1],
    [],
  );

  return (
    <div className="relative flex min-h-screen flex-col" style={{ background: '#F0F4F5' }}>
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(148deg,#032C2C 0%,#053E3E 30%,#075E5D 60%,#0E7C7B 85%,#1A8E87 100%)' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ top: -28, right: -18, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}
        />
        <div className="relative px-5 pt-14 pb-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <button
              onClick={onBack}
              className="flex h-11 w-11 items-center justify-center rounded-2xl active:scale-95 transition-transform"
              style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <ArrowLeft style={{ width: 18, height: 18, color: 'white' }} />
            </button>
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <Package style={{ width: 18, height: 18, color: 'white' }} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <Star style={{ width: 24, height: 24, color: 'white' }} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 700, letterSpacing: '0.05em' }}>
                ĐĂNG KÝ GÓI HỘI VIÊN
              </p>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.1, marginTop: 3 }}>
                Đăng ký và gia hạn gói hội viên
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="space-y-4 px-4 pt-4">
          <div
            className="overflow-hidden rounded-3xl bg-white"
            style={{ border: '1.5px solid rgba(14,124,123,0.15)', boxShadow: '0 6px 20px rgba(14,124,123,0.08)' }}
          >
            <div style={{ height: 3, background: 'linear-gradient(90deg,#0E7C7B 0%,#2A9D8F 100%)' }} />
            <div className="p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 800, letterSpacing: '0.04em' }}>
                    GÓI HỘI VIÊN HIỆN TẠI
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#1F2933', marginTop: 2 }}>{CURRENT_MEMBERSHIP.name}</p>
                  <p style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginTop: 2, lineHeight: 1.45 }}>
                    Còn <strong style={{ color: '#0E7C7B' }}>{CURRENT_MEMBERSHIP.remaining}</strong> · Bắt đầu từ {CURRENT_MEMBERSHIP.startDate}
                  </p>
                  <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginTop: 3, lineHeight: 1.45 }}>
                    {CURRENT_MEMBERSHIP.note}
                  </p>
                </div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl flex-shrink-0"
                  style={{ background: 'rgba(14,124,123,0.10)' }}
                >
                  <BadgeCheck style={{ width: 20, height: 20, color: '#0E7C7B' }} />
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2.5">
                <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(14,124,123,0.06)' }}>
                  <div className="mb-1 flex items-center gap-1.5">
                    <Clock3 style={{ width: 12, height: 12, color: '#0E7C7B' }} />
                    <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>Trạng thái</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#0E7C7B', fontWeight: 900 }}>{CURRENT_MEMBERSHIP.status}</p>
                </div>
                <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(244,162,97,0.08)' }}>
                  <div className="mb-1 flex items-center gap-1.5">
                    <RefreshCw style={{ width: 12, height: 12, color: '#E8832A' }} />
                    <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>Gia hạn</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#E8832A', fontWeight: 900 }}>Có thể gửi ngay</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setRenewNote(`Tôi muốn gia hạn ${currentPlan.name}, vui lòng xác nhận giúp tôi.`);
                  setShowRenewSheet(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 active:scale-[0.99] transition-all"
                style={{ background: 'rgba(14,124,123,0.08)', border: '1px solid rgba(14,124,123,0.16)' }}
              >
                <Send style={{ width: 16, height: 16, color: '#0E7C7B' }} />
                <span style={{ fontSize: 13, fontWeight: 900, color: '#0E7C7B' }}>Yêu cầu gia hạn gói hội viên</span>
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>CHỌN GÓI HỘI VIÊN</p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  Chọn gói phù hợp rồi gửi yêu cầu cho Admin xác nhận.
                </p>
              </div>
              <div className="rounded-xl px-2.5 py-1.5" style={{ background: 'rgba(14,124,123,0.10)' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0E7C7B' }}>{PLANS.length} lựa chọn</span>
              </div>
            </div>

            <div className="space-y-3">
              {PLANS.map((plan) => {
                const selected = plan.id === selectedPlanId;

                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className="w-full rounded-3xl p-4 text-left active:scale-[0.99] transition-all"
                    style={{
                      background: selected ? 'rgba(14,124,123,0.07)' : 'white',
                      border: selected ? '1.5px solid rgba(14,124,123,0.26)' : '1.5px solid rgba(0,0,0,0.06)',
                      boxShadow: selected ? '0 8px 20px rgba(14,124,123,0.08)' : '0 2px 10px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl flex-shrink-0" style={{ background: plan.iconBg }}>
                          <ShieldCheck style={{ width: 20, height: 20, color: plan.iconColor }} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p style={{ fontSize: 14, fontWeight: 900, color: '#1F2933' }}>{plan.name}</p>
                            {plan.highlight && (
                              <span
                                className="rounded-lg px-2 py-0.5"
                                style={{ fontSize: 9, fontWeight: 900, color: plan.iconColor, background: `${plan.iconColor}14` }}
                              >
                                {plan.highlight}
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2, lineHeight: 1.4 }}>
                            Thời hạn: {plan.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p style={{ fontSize: 15, fontWeight: 900, color: plan.iconColor }}>{plan.price}</p>
                        <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, marginTop: 2 }}>một lần</p>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2">
                      {plan.benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-start gap-2 rounded-xl px-3 py-2"
                          style={{ background: 'rgba(0,0,0,0.02)' }}
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: plan.iconColor }} />
                          <p style={{ fontSize: 11, color: '#4B5563', lineHeight: 1.45 }}>{benefit}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays style={{ width: 12, height: 12, color: '#9CA3AF' }} />
                        <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#0E7C7B' }}>Xem chi tiết</span>
                        <ChevronRight style={{ width: 13, height: 13, color: '#0E7C7B' }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-3xl bg-white p-4"
            style={{ border: '1.5px solid rgba(14,124,123,0.15)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>TÓM TẮT ĐĂNG KÝ</p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  Gửi yêu cầu dựa trên gói hội viên đang chọn.
                </p>
              </div>
              <div className="rounded-xl px-2.5 py-1.5" style={{ background: 'rgba(14,124,123,0.10)' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0E7C7B' }}>{selectedPlan.duration}</span>
              </div>
            </div>

            <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(14,124,123,0.06)' }}>
              <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>Gói đã chọn</p>
              <p style={{ fontSize: 14, color: '#0E7C7B', fontWeight: 900, marginTop: 2 }}>{selectedPlan.name}</p>
              <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginTop: 2 }}>
                {selectedPlan.price} · {selectedPlan.benefits[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[390px]"
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
            onClick={() => onSubmit(selectedPlan)}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 active:scale-[0.99] transition-all"
            style={{ background: 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)', boxShadow: '0 10px 24px rgba(14,124,123,0.24)' }}
          >
            <Send style={{ width: 18, height: 18, color: 'white' }} />
            <span style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>Gửi yêu cầu đăng ký</span>
          </button>
        </div>
      </div>

      {showRenewSheet && (
        <RenewalSheet
          plan={currentPlan}
          note={renewNote}
          onNoteChange={setRenewNote}
          onClose={() => setShowRenewSheet(false)}
          onConfirm={() => {
            setShowRenewSheet(false);
            onSubmit(currentPlan);
          }}
        />
      )}
    </div>
  );
}
