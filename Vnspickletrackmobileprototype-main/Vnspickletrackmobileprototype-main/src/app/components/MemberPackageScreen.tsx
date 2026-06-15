import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  RefreshCw,
  UserRound,
} from 'lucide-react';

type CoursePackage = {
  name: string;
  total: number;
  used: number;
  remaining: number;
  startDate: string;
  className: string;
  coach: string;
};

type PackageSuggestion = {
  id: number;
  name: string;
  sessions: number;
  price: string;
  description: string;
  tag?: string;
};

const CURRENT_PACKAGE: CoursePackage = {
  name: 'Gói 12 buổi',
  total: 12,
  used: 5,
  remaining: 7,
  startDate: '01/04/2026',
  className: 'Beginner A',
  coach: 'Coach Nam',
};

const PACKAGE_OPTIONS: PackageSuggestion[] = [
  {
    id: 1,
    name: 'Gói 8 buổi',
    sessions: 8,
    price: '960.000đ',
    description: 'Phù hợp khi muốn học đều mỗi tuần.',
  },
  {
    id: 2,
    name: 'Gói 12 buổi',
    sessions: 12,
    price: '1.320.000đ',
    description: 'Gói đang dùng · cân bằng chi phí và tiến độ học.',
    tag: 'Đang dùng',
  },
  {
    id: 3,
    name: 'Gói 16 buổi',
    sessions: 16,
    price: '1.680.000đ',
    description: 'Phù hợp khi cần học dày hơn hoặc học bù.',
    tag: 'Tiết kiệm hơn',
  },
];

function getStatus(remaining: number) {
  if (remaining <= 0) {
    return {
      label: 'Đã hết buổi',
      color: '#E76F51',
      background: 'linear-gradient(135deg,#C62828 0%,#E76F51 100%)',
      soft: 'rgba(231,111,81,0.12)',
      border: 'rgba(231,111,81,0.24)',
      alert: 'Bạn đã dùng hết số buổi. Hãy gửi yêu cầu gia hạn để tiếp tục học.',
    };
  }

  if (remaining <= 3) {
    return {
      label: 'Sắp hết buổi',
      color: '#E8832A',
      background: 'linear-gradient(135deg,#D96B25 0%,#F4A261 100%)',
      soft: 'rgba(244,162,97,0.14)',
      border: 'rgba(244,162,97,0.28)',
      alert: `Chỉ còn ${remaining} buổi. Đây là lúc phù hợp để gửi yêu cầu gia hạn.`,
    };
  }

  return {
    label: 'Đang hoạt động',
    color: '#0E7C7B',
    background: 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)',
    soft: 'rgba(14,124,123,0.12)',
    border: 'rgba(14,124,123,0.18)',
    alert: 'Gói học vẫn còn hiệu lực. Bạn có thể chủ động xem trước các gói tiếp theo.',
  };
}

interface MemberPackageScreenProps {
  onBack?: () => void;
  onRenew?: () => void;
}

export function MemberPackageScreen({ onBack, onRenew }: MemberPackageScreenProps) {
  const status = getStatus(CURRENT_PACKAGE.remaining);
  const progress = CURRENT_PACKAGE.used / CURRENT_PACKAGE.total;

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
              <BookOpen style={{ width: 18, height: 18, color: 'white' }} />
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.56)', fontWeight: 700, letterSpacing: '0.05em' }}>
            HỘI VIÊN
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.1, marginTop: 3 }}>
            Gói học của tôi
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="space-y-4 px-4 pt-4">
          <div
            className="overflow-hidden rounded-[30px]"
            style={{ background: status.background, boxShadow: '0 18px 42px rgba(14,124,123,0.18)' }}
          >
            <div className="p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.74)', fontWeight: 800, letterSpacing: '0.04em' }}>
                    GÓI HIỆN TẠI
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 900, color: 'white', marginTop: 4 }}>
                    {CURRENT_PACKAGE.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.88)', fontWeight: 600, marginTop: 4 }}>
                    Bắt đầu từ {CURRENT_PACKAGE.startDate}
                  </p>
                </div>

                <div
                  className="rounded-2xl px-4 py-2"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>{status.label}</span>
                </div>
              </div>

              <div
                className="grid grid-cols-3 overflow-hidden rounded-[24px]"
                style={{ background: 'rgba(0,0,0,0.12)' }}
              >
                {[
                  { value: CURRENT_PACKAGE.total, unit: 'buổi', label: 'Tổng buổi' },
                  { value: CURRENT_PACKAGE.used, unit: 'buổi', label: 'Đã học' },
                  { value: CURRENT_PACKAGE.remaining, unit: 'buổi', label: 'Còn lại' },
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
                    {CURRENT_PACKAGE.used}/{CURRENT_PACKAGE.total} buổi đã dùng
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
                  <span>{CURRENT_PACKAGE.used}</span>
                  <span>{CURRENT_PACKAGE.total}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 px-5 py-4" style={{ background: 'rgba(0,0,0,0.12)' }}>
              <AlertTriangle style={{ width: 18, height: 18, color: 'white', marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontSize: 12, lineHeight: 1.6, color: 'white', fontWeight: 700 }}>
                {status.alert}
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
              <p style={{ fontSize: 17, fontWeight: 900, color: 'white' }}>Yêu cầu gia hạn gói</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', fontWeight: 600, marginTop: 2 }}>
                Gửi yêu cầu mua thêm buổi học cho Admin
              </p>
            </div>
            <ChevronRight style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.82)' }} />
          </button>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p style={{ fontSize: 12, color: '#374151', fontWeight: 800, letterSpacing: '0.04em' }}>CÁC GÓI HỌC</p>
              <span style={{ fontSize: 11, color: '#0E7C7B', fontWeight: 800 }}>{PACKAGE_OPTIONS.length} lựa chọn</span>
            </div>

            <div className="space-y-3">
              {PACKAGE_OPTIONS.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-[28px] bg-white p-4"
                  style={{ border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: pkg.id === 2 ? 'rgba(14,124,123,0.12)' : 'rgba(0,0,0,0.05)' }}
                      >
                        <BookOpen style={{ width: 20, height: 20, color: pkg.id === 2 ? '#0E7C7B' : '#6B7280' }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p style={{ fontSize: 15, fontWeight: 900, color: '#1F2933' }}>{pkg.name}</p>
                          {pkg.tag && (
                            <span
                              className="rounded-lg px-2 py-0.5"
                              style={{
                                fontSize: 9,
                                fontWeight: 900,
                                color: pkg.id === 2 ? '#0E7C7B' : '#C06030',
                                background: pkg.id === 2 ? 'rgba(14,124,123,0.10)' : 'rgba(244,162,97,0.16)',
                              }}
                            >
                              {pkg.tag}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, marginTop: 2 }}>
                          {pkg.sessions} buổi · {pkg.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: 15, fontWeight: 900, color: '#0E7C7B' }}>{pkg.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-[28px] bg-white p-4"
            style={{ border: `1.5px solid ${status.border}`, boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: status.soft }}
              >
                <CheckCircle2 style={{ width: 18, height: 18, color: status.color }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 900, color: '#1F2933' }}>Thông tin đang áp dụng</p>
                <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>Giữ đúng flow khóa học hiện tại</p>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2 rounded-2xl px-3 py-3" style={{ background: '#F8FAFB' }}>
                <CalendarDays style={{ width: 14, height: 14, color: '#0E7C7B' }} />
                <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 700 }}>
                  Lớp đang học: {CURRENT_PACKAGE.className}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl px-3 py-3" style={{ background: '#F8FAFB' }}>
                <UserRound style={{ width: 14, height: 14, color: '#0E7C7B' }} />
                <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 700 }}>
                  Coach phụ trách: {CURRENT_PACKAGE.coach}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl px-3 py-3" style={{ background: '#F8FAFB' }}>
                <Clock3 style={{ width: 14, height: 14, color: '#0E7C7B' }} />
                <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 700 }}>
                  Gia hạn là gửi yêu cầu, Admin sẽ xác nhận sau.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
