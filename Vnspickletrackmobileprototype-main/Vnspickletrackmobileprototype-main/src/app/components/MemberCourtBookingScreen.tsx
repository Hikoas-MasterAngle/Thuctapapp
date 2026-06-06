import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  RefreshCw,
  Sparkles,
  Timer,
  X,
} from 'lucide-react';
import {
  BOOKING_REMINDER_MINUTES,
  addCourtBookingHistoryItem,
  buildCourtBooking,
  clearCourtBooking,
  formatBookingCompactDate,
  formatBookingDateLabel,
  getBookingCountdown,
  getBookingDateTimeLabel,
  getDateOptions,
  getFacilityStatus,
  getSuggestedSlots,
  loadCourtBooking,
  loadCourtBookingHistory,
  saveCourtBooking,
  type CourtBooking,
  type CourtBookingHistoryItem,
  type CourtSlot,
} from './memberCourtBooking';

interface MemberCourtBookingScreenProps {
  onBack: () => void;
  onBooked: () => void;
  onCancelled: () => void;
  onRescheduled: () => void;
}

function formatTimeStamp(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function BookingChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl px-3 py-2"
      style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.14)' }}
    >
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>{label}</p>
      <p style={{ fontSize: 13, color: 'white', fontWeight: 800, marginTop: 2 }}>{value}</p>
    </div>
  );
}

function SlotCard({
  slot,
  selected,
  onSelect,
}: {
  slot: CourtSlot;
  selected: boolean;
  onSelect: (slot: CourtSlot) => void;
}) {
  return (
    <button
      onClick={() => onSelect(slot)}
      className="w-full text-left rounded-3xl px-4 py-4 active:scale-[0.99] transition-all"
      style={{
        background: selected ? 'rgba(14,124,123,0.08)' : 'white',
        border: selected ? '1.5px solid rgba(14,124,123,0.30)' : '1.5px solid rgba(0,0,0,0.06)',
        boxShadow: selected ? '0 8px 22px rgba(14,124,123,0.10)' : '0 2px 10px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p style={{ fontSize: 15, fontWeight: 900, color: '#1F2933' }}>{slot.court}</p>
            {slot.isRecommended && (
              <span
                className="px-2 py-0.5 rounded-lg"
                style={{ fontSize: 9, fontWeight: 900, color: '#0E7C7B', background: 'rgba(14,124,123,0.10)' }}
              >
                ĐỀ XUẤT
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Clock style={{ width: 12, height: 12, color: '#6B7280' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
              {slot.timeStart} - {slot.timeEnd}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles style={{ width: 11, height: 11, color: '#9CA3AF' }} />
            <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>{slot.note}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: selected ? 'rgba(14,124,123,0.12)' : 'rgba(0,0,0,0.04)' }}
          >
            <BadgeCheck style={{ width: 16, height: 16, color: selected ? '#0E7C7B' : '#C4C9D4' }} />
          </div>
          <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>{slot.dateLabel}</span>
        </div>
      </div>
    </button>
  );
}

export function MemberCourtBookingScreen({
  onBack,
  onBooked,
  onCancelled,
  onRescheduled,
}: MemberCourtBookingScreenProps) {
  const [now, setNow] = useState(() => new Date());
  const [selectedDateISO, setSelectedDateISO] = useState(() => getDateOptions().find(option => option.isToday)?.dateISO ?? '');
  const [savedBooking, setSavedBooking] = useState<CourtBooking | null>(() => loadCourtBooking());
  const [bookingHistory, setBookingHistory] = useState<CourtBookingHistoryItem[]>(() => loadCourtBookingHistory());
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedDateISO) return;
    const suggestions = getSuggestedSlots(selectedDateISO, now);
    if (!suggestions.length) {
      setSelectedSlotId(null);
      return;
    }

    const matchingBooking = savedBooking && savedBooking.dateISO === selectedDateISO
      ? suggestions.find(slot => slot.court === savedBooking.court && slot.timeStart === savedBooking.timeStart)
      : null;

    setSelectedSlotId(previous => {
      if (previous && suggestions.some(slot => slot.id === previous)) {
        return previous;
      }
      return matchingBooking?.id ?? suggestions[0].id;
    });
  }, [selectedDateISO, now, savedBooking]);

  const dateOptions = getDateOptions(now);
  const facilityStatus = getFacilityStatus(now);
  const suggestions = selectedDateISO ? getSuggestedSlots(selectedDateISO, now) : [];
  const selectedSlot = suggestions.find(slot => slot.id === selectedSlotId) ?? suggestions[0] ?? null;
  const bookingCountdown = savedBooking ? getBookingCountdown(savedBooking, now) : null;
  const selectedMatchesBooking = Boolean(
    savedBooking
    && selectedSlot
    && savedBooking.dateISO === selectedSlot.dateISO
    && savedBooking.court === selectedSlot.court
    && savedBooking.timeStart === selectedSlot.timeStart,
  );
  const uniqueCourts = new Set(suggestions.map(slot => slot.court)).size;

  function applyBooking(slot: CourtSlot, mode: 'new' | 'reschedule') {
    const nextBooking = buildCourtBooking(slot, BOOKING_REMINDER_MINUTES);
    saveCourtBooking(nextBooking);
    setSavedBooking(nextBooking);
    const nextHistory = addCourtBookingHistoryItem({
      action: mode === 'new' ? 'booked' : 'rescheduled',
      court: slot.court,
      dateLabel: slot.dateLabel,
      timeStart: slot.timeStart,
      timeEnd: slot.timeEnd,
    });
    setBookingHistory(nextHistory);
    if (mode === 'new') {
      onBooked();
      return;
    }
    onRescheduled();
  }

  function handlePrimaryAction() {
    if (!selectedSlot) return;
    if (selectedMatchesBooking) return;
    applyBooking(selectedSlot, savedBooking ? 'reschedule' : 'new');
  }

  function handleCancelBooking() {
    if (savedBooking) {
      const nextHistory = addCourtBookingHistoryItem({
        action: 'cancelled',
        court: savedBooking.court,
        dateLabel: savedBooking.dateLabel,
        timeStart: savedBooking.timeStart,
        timeEnd: savedBooking.timeEnd,
      });
      setBookingHistory(nextHistory);
    }
    clearCourtBooking();
    setSavedBooking(null);
    onCancelled();
  }

  function actionLabel(action: CourtBookingHistoryItem['action']) {
    if (action === 'booked') return 'Đã đặt';
    if (action === 'rescheduled') return 'Đổi lịch';
    return 'Đã hủy';
  }

  function actionColor(action: CourtBookingHistoryItem['action']) {
    if (action === 'booked') return '#0E7C7B';
    if (action === 'rescheduled') return '#E8832A';
    return '#E76F51';
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#F0F4F5' }}>
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(148deg,#032C2C 0%,#053E3E 30%,#075E5D 60%,#0E7C7B 85%,#1A8E87 100%)' }}
      >
        <div className="absolute pointer-events-none" style={{ top: -36, right: -28, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: -18, left: -10, width: 110, height: 110, borderRadius: '50%', background: 'rgba(42,157,143,0.10)' }} />

        <div className="relative px-5 pt-14 pb-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <ChevronRight style={{ width: 18, height: 18, color: 'white', transform: 'rotate(180deg)' }} />
            </button>
            <button
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <Bell style={{ width: 18, height: 18, color: 'white' }} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.16)' }}
            >
              <CalendarDays style={{ width: 24, height: 24, color: 'white' }} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 700, letterSpacing: '0.05em' }}>
                ĐẶT SÂN TRỰC TUYẾN
              </p>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: 'white', lineHeight: 1.1, marginTop: 3 }}>
                Đặt sân nhanh cho hội viên
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', fontWeight: 500, marginTop: 4, lineHeight: 1.5 }}>
                Chọn sân trống, giữ chỗ nhanh, đổi ngày hoặc hủy khi lịch thay đổi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <BookingChip label="Giờ hiện tại" value={formatTimeStamp(now)} />
            <BookingChip label="Cơ sở" value={facilityStatus.badge} />
          </div>

          <div
            className="rounded-3xl p-4"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.16)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>
                  Trạng thái cơ sở
                </p>
                <p style={{ fontSize: 18, color: 'white', fontWeight: 900, marginTop: 2 }}>
                  {facilityStatus.label}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.68)', marginTop: 2, lineHeight: 1.4 }}>
                  {facilityStatus.detail}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: facilityStatus.isOpen ? 'rgba(42,157,143,0.18)' : 'rgba(231,111,81,0.18)' }}
              >
                <Timer style={{ width: 22, height: 22, color: 'white' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-4 pt-4 space-y-4">
          {savedBooking && (
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: 'white', border: '1.5px solid rgba(14,124,123,0.16)', boxShadow: '0 6px 20px rgba(14,124,123,0.10)' }}
            >
              <div style={{ height: 3, background: 'linear-gradient(90deg,#0E7C7B 0%,#2A9D8F 100%)' }} />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.05em' }}>
                      SÂN ĐÃ ĐẶT
                    </p>
                    <p style={{ fontSize: 18, color: '#1F2933', fontWeight: 900, marginTop: 2 }}>
                      {savedBooking.court}
                    </p>
                    <p style={{ fontSize: 13, color: '#4B5563', fontWeight: 600, marginTop: 2 }}>
                      {getBookingDateTimeLabel(savedBooking)}
                    </p>
                  </div>
                  <div
                    className="px-3 py-2 rounded-2xl"
                    style={{ background: bookingCountdown?.isUrgent ? 'rgba(231,111,81,0.10)' : 'rgba(14,124,123,0.10)' }}
                  >
                    <p style={{ fontSize: 10, color: bookingCountdown?.isUrgent ? '#E76F51' : '#0E7C7B', fontWeight: 800 }}>
                      {bookingCountdown?.label}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="rounded-2xl p-3" style={{ background: 'rgba(14,124,123,0.06)' }}>
                    <p style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>Nhắc sân</p>
                    <p style={{ fontSize: 13, color: '#0E7C7B', fontWeight: 900, marginTop: 2 }}>
                      Trước {savedBooking.reminderMinutes} phút
                    </p>
                  </div>
                  <div className="rounded-2xl p-3" style={{ background: 'rgba(244,162,97,0.08)' }}>
                    <p style={{ fontSize: 10, color: '#6B7280', fontWeight: 700 }}>Cập nhật</p>
                    <p style={{ fontSize: 13, color: '#E8832A', fontWeight: 900, marginTop: 2 }}>
                      {formatBookingCompactDate(savedBooking.dateISO)}
                    </p>
                  </div>
                </div>

                {bookingCountdown && (
                  <div
                    className="rounded-2xl px-3 py-3 mb-3"
                    style={{
                      background: bookingCountdown.isUrgent ? 'rgba(231,111,81,0.08)' : 'rgba(14,124,123,0.06)',
                      border: `1px solid ${bookingCountdown.isUrgent ? 'rgba(231,111,81,0.18)' : 'rgba(14,124,123,0.16)'}`,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      {bookingCountdown.isUrgent ? (
                        <AlertTriangle style={{ width: 16, height: 16, color: '#E76F51', flexShrink: 0, marginTop: 1 }} />
                      ) : (
                        <Bell style={{ width: 16, height: 16, color: '#0E7C7B', flexShrink: 0, marginTop: 1 }} />
                      )}
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 800, color: bookingCountdown.isUrgent ? '#C85A3D' : '#0E7C7B' }}>
                          {bookingCountdown.label}
                        </p>
                        <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2, lineHeight: 1.4 }}>
                          {bookingCountdown.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleCancelBooking}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl"
                    style={{ background: 'rgba(231,111,81,0.08)', border: '1px solid rgba(231,111,81,0.16)' }}
                  >
                    <X style={{ width: 15, height: 15, color: '#E76F51' }} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#E76F51' }}>Hủy đặt</span>
                  </button>
                  <button
                    onClick={() => {
                      const nextSlot = suggestions.find(slot => slot.id !== selectedSlotId) ?? suggestions[0];
                      if (!nextSlot) return;
                      setSelectedSlotId(nextSlot.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl"
                    style={{ background: 'rgba(14,124,123,0.08)', border: '1px solid rgba(14,124,123,0.16)' }}
                  >
                    <RefreshCw style={{ width: 15, height: 15, color: '#0E7C7B' }} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#0E7C7B' }}>Đổi giờ</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>
                  LỊCH SỬ ĐẶT SÂN
                </p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  Vết booking gần nhất trong prototype.
                </p>
              </div>
              <span
                className="rounded-xl px-2.5 py-1"
                style={{ background: 'rgba(14,124,123,0.10)' }}
              >
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0E7C7B' }}>
                  {bookingHistory.length} mục
                </span>
              </span>
            </div>

            <div className="space-y-2.5">
              {bookingHistory.length > 0 ? bookingHistory.map(item => (
                <div
                  key={item.id}
                  className="rounded-3xl p-3.5"
                  style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p style={{ fontSize: 13, fontWeight: 900, color: '#1F2933' }}>{item.court}</p>
                        <span
                          className="px-2 py-0.5 rounded-lg"
                          style={{ fontSize: 9, fontWeight: 900, color: actionColor(item.action), background: `${actionColor(item.action)}14` }}
                        >
                          {actionLabel(item.action)}
                        </span>
                      </div>
                      <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                        {item.dateLabel}
                      </p>
                      <p style={{ fontSize: 12, color: '#374151', fontWeight: 700, marginTop: 2 }}>
                        {item.timeStart} - {item.timeEnd}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>Đã ghi</p>
                      <p style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, marginTop: 2 }}>
                        {item.createdAtISO.slice(11, 16)}
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                <div
                  className="rounded-3xl p-4 text-center"
                  style={{ background: 'white', border: '1.5px dashed rgba(14,124,123,0.18)' }}
                >
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#1F2933' }}>
                    Chưa có lịch sử đặt sân
                  </p>
                  <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2, lineHeight: 1.5 }}>
                    Khi bạn đặt hoặc đổi sân, lịch sử sẽ hiện ở đây.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>
                  CHỌN NGÀY
                </p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  Lịch đặt sân đồng bộ theo thời gian thực.
                </p>
              </div>
              <div
                className="rounded-xl px-2.5 py-1.5"
                style={{ background: 'rgba(14,124,123,0.10)' }}
              >
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0E7C7B' }}>
                  {facilityStatus.isOpen ? 'Đang mở' : 'Đã đóng'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {dateOptions.map(option => {
                const active = option.dateISO === selectedDateISO;
                return (
                  <button
                    key={option.dateISO}
                    onClick={() => setSelectedDateISO(option.dateISO)}
                    className="rounded-3xl px-3 py-3 text-left active:scale-[0.99] transition-all"
                    style={{
                      background: active ? 'rgba(14,124,123,0.08)' : 'white',
                      border: active ? '1.5px solid rgba(14,124,123,0.28)' : '1.5px solid rgba(0,0,0,0.06)',
                      boxShadow: active ? '0 6px 16px rgba(14,124,123,0.10)' : '0 2px 10px rgba(0,0,0,0.04)',
                    }}
                  >
                    <p style={{ fontSize: 11, color: active ? '#0E7C7B' : '#6B7280', fontWeight: 800 }}>{option.label}</p>
                    <p style={{ fontSize: 13, color: '#1F2933', fontWeight: 900, marginTop: 3 }}>
                      {option.subLabel}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#374151', letterSpacing: '0.04em' }}>
                  SÂN TRỐNG ĐỀ XUẤT
                </p>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>
                  {suggestions.length > 0 ? `Có ${suggestions.length} lựa chọn · ${uniqueCourts} sân khác nhau` : 'Không còn khung giờ trống trong ngày này'}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin style={{ width: 12, height: 12, color: '#0E7C7B' }} />
                <span style={{ fontSize: 11, color: '#0E7C7B', fontWeight: 800 }}>
                  Đặt nhanh
                </span>
              </div>
            </div>

            {suggestions.length > 0 ? (
              <div className="space-y-3">
                {suggestions.map(slot => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    selected={slot.id === selectedSlotId}
                    onSelect={(next) => setSelectedSlotId(next.id)}
                  />
                ))}
              </div>
            ) : (
              <div
                className="rounded-3xl p-5 text-center"
                style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'rgba(231,111,81,0.08)' }}
                >
                  <AlertTriangle style={{ width: 20, height: 20, color: '#E76F51' }} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#1F2933' }}>
                  Ngày này không còn sân trống
                </p>
                <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6, marginTop: 4 }}>
                  Hãy chuyển sang ngày mai hoặc +2 ngày để xem sân đề xuất khác.
                </p>
              </div>
            )}
          </div>

          <div
            className="rounded-3xl p-4"
            style={{ background: 'rgba(14,124,123,0.07)', border: '1.5px solid rgba(14,124,123,0.16)' }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(14,124,123,0.12)' }}
              >
                <Bell style={{ width: 18, height: 18, color: '#0E7C7B' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: 13, fontWeight: 900, color: '#0E7C7B' }}>
                  Thông báo nhắc giờ sử dụng
                </p>
                <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2, lineHeight: 1.5 }}>
                  Mỗi đặt sân mới sẽ tự bật nhắc trước {BOOKING_REMINDER_MINUTES} phút. Đây là bản prototype nên thông báo hiển thị trong giao diện để mô phỏng luồng thực tế.
                </p>
              </div>
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
            onClick={handlePrimaryAction}
            disabled={!selectedSlot || selectedMatchesBooking}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl active:scale-[0.99] transition-all disabled:opacity-50"
            style={{
              background: selectedMatchesBooking ? 'rgba(14,124,123,0.14)' : 'linear-gradient(135deg,#0E7C7B 0%,#2A9D8F 100%)',
              boxShadow: selectedMatchesBooking ? 'none' : '0 10px 24px rgba(14,124,123,0.24)',
            }}
          >
            <CheckCircle2 style={{ width: 18, height: 18, color: 'white' }} />
            <span style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>
              {savedBooking
                ? selectedMatchesBooking
                  ? 'Đã giữ chỗ'
                  : 'Đổi sang khung giờ này'
                : 'Đặt sân nhanh'}
            </span>
          </button>
          <div className="flex items-center justify-between mt-2 px-1">
            <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>
              {selectedSlot ? `${selectedSlot.court} · ${selectedSlot.timeStart} - ${selectedSlot.timeEnd}` : 'Chọn sân để đặt nhanh'}
            </p>
            <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>
              {selectedDateISO ? formatBookingDateLabel(selectedDateISO) : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

