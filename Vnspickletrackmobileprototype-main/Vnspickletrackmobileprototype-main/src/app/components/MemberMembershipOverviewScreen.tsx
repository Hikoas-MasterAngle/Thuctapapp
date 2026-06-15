import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  RefreshCw,
  ShieldCheck,
  Star,
} from 'lucide-react';

type MembershipPlanPreview = {
  id: number;
  name: string;
  duration: string;
  price: string;
  benefits: string;
  iconColor: string;
  iconBg: string;
  highlight?: string;
};

const CURRENT_MEMBERSHIP = {
  name: 'Hội viên Nâng cao',
  totalMonths: 3,
  usedMonths: 2,
  remainingMonths: 1,
  startDate: '01/04/2026',
  status: 'Sắp hết hạn',
};

const PLANS: MembershipPlanPreview[] = [
  {
    id: 1,
    name: 'Hội viên Cơ bản',
    duration: '1 tháng',
    price: '299.000đ',
    benefits: 'Đặt sân thường · Thuê đồ tại sân',
    iconColor: '#0E7C7B',
    iconBg: 'rgba(14,124,123,0.10)',
  },
  {
    id: 2,
    name: 'Hội viên Nâng cao',
    duration: '3 tháng',
    price: '699.000đ',
    benefits: 'Ưu tiên đặt sân · Đổi / hủy linh hoạt',
    iconColor: '#2A9D8F',
    iconBg: 'rgba(42,157,143,0.10)',
    highlight: 'Đang dùng',
  },
  {
    id: 3,
    name: 'Hội viên VIP',
    duration: '6 tháng',
    price: '1.299.000đ',
    benefits: 'Ưu tiên khung giờ đẹp · Hỗ trợ nhanh',
    iconColor: '#E8832A',
    iconBg: 'rgba(244,162,97,0.14)',
    highlight: 'Ưu tiên cao',
  },
];

interface MemberMembershipOverviewScreenProps {
  onBack?: () => void;
  onRenew?: () => void;
  onViewPlans?: () => void;
}

export function MemberMembershipOverviewScreen({
  onBack,
  onRenew,
  onViewPlans,
}: MemberMembershipOverviewScreenProps) {
  const progress = CURRENT_MEMBERSHIP.usedMonths / CURRENT_MEMBERSHIP.totalMonths;

  return (
    <div className="flex min-h-screen flex-col" style={{ background: '#F0F4F5' }}>
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(148deg,#032C2C 0%,#053E3E 30%,#075E5D 60%,#0E7C7B 85%,#1A8E87 100%)' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ top: -24, right: -12, width: 144, height: 144, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}
        />
        <div className="relative px-5 pt-14 pb-6">
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
              <BadgeCheck style={{ width: 18, height: 18, color: 'white' }} />
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.56)', fontWeight: 700, letterSpacing: '0.05em' }}>
            HỘI VIÊN
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.1, marginTop: 3 }}>
            Gói hội viên của tôi
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="space-y-4 px-4 pt-4">
          <div
            className="overflow-hidden rounded-[30px]"
            style={{ background: 'linear-gradient(135deg,#BF360C 0%,#E76F51 100%)', boxShadow: '0 18px 42px rgba(231,111,81,0.18)' }}
          >
            <div className="p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.74)', fontWeight: 800, letterSpacing: '0.04em' }}>
                    GÓI HỘI VIÊN HIỆN TẠI
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 900, color: 'white', marginTop: 4 }}>
                    {CURRENT_MEMBERSHIP.name}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <CalendarDays style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.82)' }} />
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.88)', fontWeight: 600 }}>
                      Ngày bắt đầu: {CURRENT_MEMBERSHIP.startDate}
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-2xl px-4 py-2"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>{CURRENT_MEMBERSHIP.status}</span>
                </div>
              </div>

              <div
                className="grid grid-cols-3 overflow-hidden rounded-[24px]"
                style={{ background: 'rgba(0,0,0,0.12)' }}
              >
                {[
                  { value: CURRENT_MEMBERSHIP.totalMonths, unit: 'tháng', label: 'Tổng tháng' },
                  { value: CURRENT_MEMBERSHIP.usedMonths, unit: 'tháng', label: 'Đã dùng' },
                  { value: CURRENT_MEMBERSHIP.remainingMonths, unit: 'tháng', label: 'Còn lại' },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="px-3 py-5 text-center"
                    style={{ borderLeft: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <p style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{item.value}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.84)', fontWeight: 700, marginTop: 2 }}>{item.unit}</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.56)', fontWeight: 700, marginTop: 8 }}>{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', fontWeight: 800 }}>TIẾN ĐỘ SỬ DỤNG</span>
                  <span style={{ fontSize: 12, color: 'white', fontWeight: 900 }}>
                    {CURRENT_MEMBERSHIP.usedMonths}/{CURRENT_MEMBERSHIP.totalMonths} tháng đã dùng
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress * 100}%`, background: 'rgba(255,255,255,0.92)' }}
                  />
                </div>
                <div className="mt-2 flex justify-between" style={{ fontSize: 10, color: 'rgba(255,255,255,0.60)', fontWeight: 700 }}>
                  <span>0</span>
                  <span>{CURRENT_MEMBERSHIP.usedMonths}</span>
                  <span>{CURRENT_MEMBERSHIP.totalMonths}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 px-5 py-4" style={{ background: 'rgba(0,0,0,0.12)' }}>
              <Clock3 style={{ width: 18, height: 18, color: 'white', marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontSize: 12, lineHeight: 1.6, color: 'white', fontWeight: 700 }}>
                Chỉ còn 1 tháng! Hãy gia hạn để không bị gián đoạn.
              </p>
            </div>
          </div>

          <button
            onClick={onRenew}
            className="flex w-full items-center justify-center gap-3 rounded-[26px] px-5 py-5 active:scale-[0.99] transition-all"
            style={{
              background: 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)',
              boxShadow: '0 14px 30px rgba(14,124,123,0.22)',
            }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.18)' }}
            >
              <RefreshCw style={{ width: 18, height: 18, color: 'white' }} />
            </div>
            <div className="flex-1 text-left">
              <p style={{ fontSize: 17, fontWeight: 900, color: 'white' }}>Yêu cầu gia hạn gói hội viên</p>
            </div>
            <ChevronRight style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.82)' }} />
          </button>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: 'rgba(14,124,123,0.08)' }}
              >
                <BookOpen style={{ width: 18, height: 18, color: '#0E7C7B' }} />
              </div>
              <p style={{ fontSize: 12, color: '#374151', fontWeight: 800, letterSpacing: '0.04em' }}>CÁC GÓI HỘI VIÊN</p>
            </div>

            <div className="space-y-3">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={onViewPlans}
                  className="w-full rounded-[28px] bg-white p-4 text-left active:scale-[0.99] transition-all"
                  style={{ border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: plan.iconBg }}
                      >
                        <ShieldCheck style={{ width: 20, height: 20, color: plan.iconColor }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p style={{ fontSize: 15, fontWeight: 900, color: '#1F2933' }}>{plan.name}</p>
                          {plan.highlight && (
                            <span
                              className="rounded-lg px-2 py-0.5"
                              style={{
                                fontSize: 9,
                                fontWeight: 900,
                                color: plan.id === 2 ? '#0E7C7B' : '#C06030',
                                background: plan.id === 2 ? 'rgba(14,124,123,0.10)' : 'rgba(244,162,97,0.16)',
                              }}
                            >
                              {plan.highlight}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, marginTop: 2 }}>
                          {plan.duration} · {plan.benefits}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: 15, fontWeight: 900, color: '#0E7C7B' }}>{plan.price}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onViewPlans}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 active:scale-[0.99] transition-all"
            style={{ border: '1.5px solid rgba(14,124,123,0.16)', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}
          >
            <Star style={{ width: 16, height: 16, color: '#0E7C7B' }} />
            <span style={{ fontSize: 14, fontWeight: 900, color: '#0E7C7B' }}>Xem chi tiết và đăng ký gói hội viên</span>
            <ChevronRight style={{ width: 16, height: 16, color: '#0E7C7B' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
