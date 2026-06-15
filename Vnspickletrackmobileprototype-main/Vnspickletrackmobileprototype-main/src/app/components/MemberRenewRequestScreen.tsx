import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Info,
  RefreshCw,
  Send,
  WalletCards,
  X,
} from 'lucide-react';

type RenewalPackage = {
  id: number;
  name: string;
  sessions: number;
  price: number;
  priceLabel: string;
  perSession: string;
  tag?: string;
};

const MEMBER_INFO = {
  name: 'Nguyễn Văn A',
  currentPackage: 'Gói 12 buổi',
  remaining: 2,
  className: 'Beginner A',
  coach: 'Coach Nam',
};

const PACKAGES: RenewalPackage[] = [
  { id: 1, name: 'Gói 8 buổi', sessions: 8, price: 960000, priceLabel: '960.000đ', perSession: '120.000đ / buổi' },
  { id: 2, name: 'Gói 12 buổi', sessions: 12, price: 1320000, priceLabel: '1.320.000đ', perSession: '110.000đ / buổi', tag: 'Phù hợp hiện tại' },
  { id: 3, name: 'Gói 16 buổi', sessions: 16, price: 1680000, priceLabel: '1.680.000đ', perSession: '105.000đ / buổi', tag: 'Tiết kiệm hơn' },
];

interface MemberRenewRequestScreenProps {
  onBack?: () => void;
  onSubmit?: () => void;
}

interface SuccessDialogProps {
  packageName: string;
  onClose: () => void;
}

function SuccessDialog({ packageName, onClose }: SuccessDialogProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full overflow-hidden rounded-3xl bg-white"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)', border: '1.5px solid rgba(255,255,255,0.80)' }}
      >
        <div style={{ height: 4, background: 'linear-gradient(90deg,#0E7C7B 0%,#2A9D8F 100%)' }} />

        <div className="px-6 pb-7 pt-6">
          <div className="mb-5 flex flex-col items-center text-center">
            <div
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: 'linear-gradient(135deg,#0E7C7B,#2A9D8F)',
                boxShadow: '0 12px 32px rgba(14,124,123,0.38)',
              }}
            >
              <CheckCircle2 style={{ width: 40, height: 40, color: 'white' }} />
            </div>

            <p style={{ fontSize: 20, fontWeight: 900, color: '#1F2933' }}>Đã gửi yêu cầu!</p>
            <p style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginTop: 6, lineHeight: 1.6 }}>
              Yêu cầu gia hạn <strong style={{ color: '#0E7C7B' }}>{packageName}</strong> đã được ghi nhận.
            </p>
          </div>

          <div
            className="mb-5 flex items-start gap-3 rounded-2xl px-4 py-3.5"
            style={{ background: 'rgba(14,124,123,0.07)', border: '1.5px solid rgba(14,124,123,0.18)' }}
          >
            <Info style={{ width: 14, height: 14, color: '#0E7C7B', marginTop: 1, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#0E7C7B', marginBottom: 3 }}>
                Admin sẽ xem xét và xác nhận trong bước tiếp theo.
              </p>
              <p style={{ fontSize: 11, color: '#4B9E98', fontWeight: 500, lineHeight: 1.6 }}>
                Đây là flow prototype nên yêu cầu chỉ được ghi nhận để thể hiện nghiệp vụ, chưa xử lý thanh toán tự động.
              </p>
            </div>
          </div>

          <div className="mb-6 space-y-2.5">
            {[
              { step: '1', label: 'Gửi yêu cầu tới Admin', done: true },
              { step: '2', label: 'Admin kiểm tra gói phù hợp', done: false },
              { step: '3', label: 'Cộng thêm buổi học sau xác nhận', done: false },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 26,
                    height: 26,
                    background: item.done ? 'rgba(14,124,123,0.12)' : 'rgba(0,0,0,0.06)',
                    border: item.done ? '1.5px solid rgba(14,124,123,0.28)' : '1.5px solid rgba(0,0,0,0.10)',
                  }}
                >
                  {item.done ? (
                    <CheckCircle2 style={{ width: 13, height: 13, color: '#0E7C7B' }} />
                  ) : (
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF' }}>{item.step}</span>
                  )}
                </div>
                <span style={{ fontSize: 12, fontWeight: item.done ? 700 : 500, color: item.done ? '#0E7C7B' : '#9CA3AF' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 active:opacity-80 transition-all"
            style={{ background: 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)', boxShadow: '0 8px 24px rgba(14,124,123,0.32)' }}
          >
            <span style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>Quay lại gói học</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PackageCard({
  pkg,
  selected,
  onSelect,
}: {
  pkg: RenewalPackage;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full rounded-3xl px-4 py-4 text-left active:scale-[0.99] transition-all"
      style={{
        background: selected ? 'rgba(14,124,123,0.07)' : 'white',
        border: selected ? '2px solid #0E7C7B' : '1.5px solid rgba(0,0,0,0.08)',
        boxShadow: selected ? '0 6px 20px rgba(14,124,123,0.14)' : '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{
            border: selected ? '2px solid #0E7C7B' : '2px solid #D1D5DB',
            background: selected ? '#0E7C7B' : 'white',
          }}
        >
          {selected && <div className="h-3 w-3 rounded-full bg-white" />}
        </div>

        <div
          className="flex items-center justify-center rounded-2xl"
          style={{ width: 52, height: 52, background: selected ? 'linear-gradient(135deg,#0E7C7B,#2A9D8F)' : 'rgba(0,0,0,0.06)' }}
        >
          <span style={{ fontSize: 22, fontWeight: 900, color: selected ? 'white' : '#6B7280' }}>{pkg.sessions}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: 15, fontWeight: 900, color: selected ? '#0E7C7B' : '#1F2933' }}>{pkg.name}</span>
            {pkg.tag && (
              <span
                className="rounded-lg px-2 py-0.5"
                style={{ fontSize: 9, fontWeight: 800, background: 'rgba(244,162,97,0.16)', color: '#C06030' }}
              >
                {pkg.tag}
              </span>
            )}
          </div>
          <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginTop: 2 }}>
            {pkg.sessions} buổi · {pkg.perSession}
          </p>
        </div>

        <div className="text-right">
          <p style={{ fontSize: 16, fontWeight: 900, color: selected ? '#0E7C7B' : '#1F2933' }}>{pkg.priceLabel}</p>
        </div>
      </div>
    </button>
  );
}

export function MemberRenewRequestScreen({ onBack, onSubmit }: MemberRenewRequestScreenProps) {
  const [selectedId, setSelectedId] = useState(2);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedPkg = useMemo(
    () => PACKAGES.find((pkg) => pkg.id === selectedId) ?? PACKAGES[1],
    [selectedId],
  );

  const defaultNote = `Tôi muốn gia hạn ${selectedPkg.name}, vui lòng xác nhận giúp tôi.`;
  const noteValue = note || defaultNote;
  const isCritical = MEMBER_INFO.remaining <= 2;

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.();
  };

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
              <RefreshCw style={{ width: 18, height: 18, color: 'white' }} />
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 700, letterSpacing: '0.05em' }}>
            GIA HẠN GÓI HỌC
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.1, marginTop: 3 }}>
            Yêu cầu gia hạn
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        <div className="space-y-4 px-4 pt-4">
          <div
            className="rounded-3xl bg-white p-4"
            style={{ border: '1.5px solid rgba(14,124,123,0.15)', boxShadow: '0 6px 20px rgba(14,124,123,0.08)' }}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 800, letterSpacing: '0.04em' }}>GÓI ĐANG DÙNG</p>
                <p style={{ fontSize: 18, fontWeight: 900, color: '#1F2933', marginTop: 2 }}>{MEMBER_INFO.currentPackage}</p>
                <p style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginTop: 2 }}>
                  Còn <strong style={{ color: isCritical ? '#E8832A' : '#0E7C7B' }}>{MEMBER_INFO.remaining} buổi</strong>
                </p>
              </div>
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: 'rgba(14,124,123,0.10)' }}
              >
                <BookOpen style={{ width: 20, height: 20, color: '#0E7C7B' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(14,124,123,0.06)' }}>
                <div className="mb-1 flex items-center gap-1.5">
                  <CalendarDays style={{ width: 12, height: 12, color: '#0E7C7B' }} />
                  <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>Lớp hiện tại</span>
                </div>
                <p style={{ fontSize: 13, color: '#0E7C7B', fontWeight: 900 }}>{MEMBER_INFO.className}</p>
              </div>
              <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(244,162,97,0.08)' }}>
                <div className="mb-1 flex items-center gap-1.5">
                  <AlertTriangle style={{ width: 12, height: 12, color: '#E8832A' }} />
                  <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>Trạng thái</span>
                </div>
                <p style={{ fontSize: 13, color: '#E8832A', fontWeight: 900 }}>
                  {isCritical ? 'Sắp hết buổi' : 'Đang học'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>CHỌN GÓI GIA HẠN</p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  Chọn gói buổi học phù hợp rồi gửi yêu cầu cho Admin.
                </p>
              </div>
              <div className="rounded-xl px-2.5 py-1.5" style={{ background: 'rgba(14,124,123,0.10)' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0E7C7B' }}>{PACKAGES.length} lựa chọn</span>
              </div>
            </div>

            <div className="space-y-3">
              {PACKAGES.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  selected={pkg.id === selectedId}
                  onSelect={() => setSelectedId(pkg.id)}
                />
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl bg-white p-4"
            style={{ border: '1.5px solid rgba(14,124,123,0.15)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>GHI CHÚ YÊU CẦU</p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  Có thể chỉnh lại nội dung trước khi gửi.
                </p>
              </div>
              <button
                onClick={() => setNote('')}
                className="flex h-9 w-9 items-center justify-center rounded-xl active:scale-95"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                <X style={{ width: 14, height: 14, color: '#6B7280' }} />
              </button>
            </div>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={defaultNote}
              maxLength={200}
              className="h-36 w-full resize-none rounded-[24px] border-none px-4 py-4 outline-none"
              style={{
                background: '#F8FAFB',
                fontSize: 15,
                lineHeight: 1.7,
                color: '#374151',
              }}
            />

            <div className="mt-2 flex items-center justify-between">
              <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>Ghi chú giúp Admin xử lý nhanh hơn</span>
              <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700 }}>{note.length}/200</span>
            </div>
          </div>

          <div
            className="rounded-3xl bg-white p-4"
            style={{ border: '1.5px solid rgba(14,124,123,0.15)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>TÓM TẮT YÊU CẦU</p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  Flow này chỉ mô phỏng bước gửi yêu cầu gia hạn khóa học.
                </p>
              </div>
              <div className="rounded-xl px-2.5 py-1.5" style={{ background: 'rgba(14,124,123,0.10)' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0E7C7B' }}>{selectedPkg.sessions} buổi</span>
              </div>
            </div>

            <div className="rounded-2xl px-3 py-3" style={{ background: 'rgba(14,124,123,0.06)' }}>
              <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>Gói đã chọn</p>
              <p style={{ fontSize: 14, color: '#0E7C7B', fontWeight: 900, marginTop: 2 }}>{selectedPkg.name}</p>
              <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginTop: 2 }}>
                {selectedPkg.priceLabel} · {selectedPkg.perSession}
              </p>
            </div>

            <div
              className="mt-3 flex items-start gap-2.5 rounded-2xl px-3 py-3"
              style={{ background: 'rgba(14,124,123,0.05)' }}
            >
              <Info style={{ width: 14, height: 14, color: '#0E7C7B', marginTop: 1, flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: '#4B5563', lineHeight: 1.55 }}>
                Đây là bản prototype nên sau khi gửi, yêu cầu sẽ được ghi nhận để Admin xác nhận. Buổi học chưa được cộng tự động.
              </p>
            </div>
          </div>

          <div
            className="rounded-3xl px-4 py-4"
            style={{ background: 'rgba(233,196,106,0.12)', border: '1.5px solid rgba(233,196,106,0.26)' }}
          >
            <div className="flex items-start gap-3">
              <WalletCards style={{ width: 16, height: 16, color: '#B8860B', marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#7A5C00' }}>Lưu ý nghiệp vụ</p>
                <ul style={{ fontSize: 11, color: '#7A5C00', fontWeight: 600, lineHeight: 1.7, marginTop: 6, paddingLeft: 0, listStyle: 'none' }}>
                  <li>• Hội viên chỉ gửi yêu cầu, không tự cộng buổi.</li>
                  <li>• Admin là bên xác nhận cuối cùng.</li>
                  <li>• Flow này tách riêng với gói hội viên để tránh trùng nghiệp vụ.</li>
                </ul>
              </div>
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
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 active:scale-[0.99] transition-all"
            style={{ background: 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)', boxShadow: '0 10px 24px rgba(14,124,123,0.24)' }}
          >
            <Send style={{ width: 18, height: 18, color: 'white' }} />
            <span style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>Gửi yêu cầu gia hạn</span>
            <ChevronRight style={{ width: 16, height: 16, color: 'white' }} />
          </button>
        </div>
      </div>

      {submitted && (
        <SuccessDialog
          packageName={selectedPkg.name}
          onClose={() => {
            setSubmitted(false);
            onBack?.();
          }}
        />
      )}
    </div>
  );
}
