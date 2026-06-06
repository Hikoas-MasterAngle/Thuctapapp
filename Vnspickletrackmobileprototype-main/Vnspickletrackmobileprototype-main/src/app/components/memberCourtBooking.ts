export const COURT_BOOKING_STORAGE_KEY = 'vns-pickletrack-member-court-booking-v1';
export const COURT_BOOKING_HISTORY_STORAGE_KEY = 'vns-pickletrack-member-court-booking-history-v1';

export const COURT_NAMES = ['Sân 1', 'Sân 2', 'Sân 3', 'Sân 4'] as const;

export const FACILITY_OPEN_HOUR = 6;
export const FACILITY_CLOSE_HOUR = 22;
export const BOOKING_DURATION_MINUTES = 60;
export const BOOKING_REMINDER_MINUTES = 30;

export interface CourtBooking {
  court: string;
  dateISO: string;
  dateLabel: string;
  timeStart: string;
  timeEnd: string;
  reminderMinutes: number;
  createdAtISO: string;
}

export interface CourtBookingHistoryItem {
  id: string;
  action: 'booked' | 'rescheduled' | 'cancelled';
  court: string;
  dateLabel: string;
  timeStart: string;
  timeEnd: string;
  createdAtISO: string;
}

export interface CourtSlot {
  id: string;
  court: string;
  dateISO: string;
  dateLabel: string;
  timeStart: string;
  timeEnd: string;
  isRecommended: boolean;
  isSoon: boolean;
  note: string;
}

export interface FacilityStatus {
  isOpen: boolean;
  label: string;
  detail: string;
  badge: string;
  minutesUntilOpen: number;
  minutesUntilClose: number;
}

export interface BookingCountdown {
  label: string;
  detail: string;
  isUrgent: boolean;
  isLive: boolean;
}

export interface DateOption {
  label: string;
  subLabel: string;
  dateISO: string;
  isToday: boolean;
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function toStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function createDateFromISO(dateISO: string) {
  const [year, month, day] = dateISO.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function minutesOfDay(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${pad(hours)}:${pad(minutes)}`;
}

function formatDateLabel(date: Date) {
  return `${['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][date.getDay()]}, ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function formatCompactDateLabel(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function formatDayShort(date: Date) {
  return ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function differenceInDays(a: Date, b: Date) {
  const diff = toStartOfDay(a).getTime() - toStartOfDay(b).getTime();
  return Math.round(diff / 86400000);
}

function buildDemoReservations(dayOffset: number) {
  if (dayOffset <= 0) {
    return [
      { court: 'Sân 1', start: '07:00' },
      { court: 'Sân 1', start: '08:00' },
      { court: 'Sân 2', start: '19:00' },
      { court: 'Sân 3', start: '20:00' },
      { court: 'Sân 4', start: '17:00' },
    ];
  }

  if (dayOffset === 1) {
    return [
      { court: 'Sân 1', start: '18:00' },
      { court: 'Sân 2', start: '19:00' },
      { court: 'Sân 3', start: '20:00' },
    ];
  }

  return [
    { court: 'Sân 2', start: '18:00' },
    { court: 'Sân 4', start: '19:00' },
  ];
}

export function formatBookingDateLabel(dateISO: string) {
  return formatDateLabel(createDateFromISO(dateISO));
}

export function formatBookingCompactDate(dateISO: string) {
  return formatCompactDateLabel(createDateFromISO(dateISO));
}

export function formatBookingDayShort(dateISO: string) {
  return formatDayShort(createDateFromISO(dateISO));
}

export function getDateOptions(now = new Date()): DateOption[] {
  return [0, 1, 2].map(offset => {
    const date = addDays(now, offset);
    return {
      label: offset === 0 ? 'Hôm nay' : offset === 1 ? 'Ngày mai' : `+${offset} ngày`,
      subLabel: `${formatCompactDateLabel(date)} · ${formatDayShort(date)}`,
      dateISO: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      isToday: offset === 0,
    };
  });
}

export function getFacilityStatus(now = new Date()): FacilityStatus {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), FACILITY_OPEN_HOUR, 0, 0, 0);
  const close = new Date(now.getFullYear(), now.getMonth(), now.getDate(), FACILITY_CLOSE_HOUR, 0, 0, 0);
  const minutesNow = minutesOfDay(now);
  const openMinutes = FACILITY_OPEN_HOUR * 60;
  const closeMinutes = FACILITY_CLOSE_HOUR * 60;

  if (now < start) {
    return {
      isOpen: false,
      label: 'Đang đóng cửa',
      detail: `Mở cửa lúc ${minutesToTime(openMinutes)}`,
      badge: `Mở sau ${Math.max(1, Math.ceil((start.getTime() - now.getTime()) / 60000))} phút`,
      minutesUntilOpen: Math.max(1, Math.ceil((start.getTime() - now.getTime()) / 60000)),
      minutesUntilClose: Math.max(0, closeMinutes - minutesNow),
    };
  }

  if (now >= close) {
    return {
      isOpen: false,
      label: 'Đã đóng cửa',
      detail: 'Hẹn đặt sân vào ngày mai',
      badge: 'Mở lại 06:00',
      minutesUntilOpen: Math.max(1, (24 * 60 - minutesNow) + openMinutes),
      minutesUntilClose: 0,
    };
  }

  const minutesUntilClose = Math.max(1, Math.ceil((close.getTime() - now.getTime()) / 60000));
  return {
    isOpen: true,
    label: 'Đang mở cửa',
    detail: `Còn ${minutesUntilClose} phút nữa đóng cửa`,
    badge: minutesUntilClose <= 60 ? 'Sắp đóng cửa' : 'Đang phục vụ',
    minutesUntilOpen: 0,
    minutesUntilClose,
  };
}

export function getSuggestedSlots(dateISO: string, now = new Date()) {
  const selectedDate = createDateFromISO(dateISO);
  const today = toStartOfDay(now);
  const dayOffset = differenceInDays(selectedDate, today);
  const reservations = buildDemoReservations(dayOffset);
  const currentMinutes = minutesOfDay(now);
  const desiredMinutes = dayOffset <= 0 ? Math.max(currentMinutes + 60, 18 * 60) : 18 * 60;
  const items: CourtSlot[] = [];

  COURT_NAMES.forEach((court, courtIndex) => {
    for (let startMinutes = FACILITY_OPEN_HOUR * 60; startMinutes < (FACILITY_CLOSE_HOUR * 60); startMinutes += BOOKING_DURATION_MINUTES) {
      const start = minutesToTime(startMinutes);
      const end = minutesToTime(startMinutes + BOOKING_DURATION_MINUTES);
      const isPast = dayOffset <= 0 && startMinutes < currentMinutes + 30;
      const isReserved = reservations.some(item => item.court === court && item.start === start);
      if (isPast || isReserved) continue;

      const distanceScore = Math.abs(startMinutes - desiredMinutes);
      const courtScore = courtIndex * 12;
      const eveningBias = startMinutes >= 17 * 60 ? -18 : 0;

      items.push({
        id: `${dateISO}-${court}-${start}`,
        court,
        dateISO,
        dateLabel: formatBookingDateLabel(dateISO),
        timeStart: start,
        timeEnd: end,
        isRecommended: distanceScore <= 60 || (dayOffset === 0 && startMinutes <= currentMinutes + 120),
        isSoon: dayOffset === 0 && startMinutes <= currentMinutes + 120,
        note: isSoonLabel(startMinutes, currentMinutes, dayOffset),
      });
    }
  });

  return items
    .sort((left, right) => {
      const leftMinutes = timeToMinutes(left.timeStart);
      const rightMinutes = timeToMinutes(right.timeStart);
      const leftScore = Math.abs(leftMinutes - desiredMinutes) + COURT_NAMES.indexOf(left.court as typeof COURT_NAMES[number]) * 12 + (leftMinutes >= 17 * 60 ? -18 : 0);
      const rightScore = Math.abs(rightMinutes - desiredMinutes) + COURT_NAMES.indexOf(right.court as typeof COURT_NAMES[number]) * 12 + (rightMinutes >= 17 * 60 ? -18 : 0);
      return leftScore - rightScore || leftMinutes - rightMinutes;
    })
    .slice(0, 8);
}

function isSoonLabel(startMinutes: number, currentMinutes: number, dayOffset: number) {
  if (dayOffset > 0) return 'Sẵn sàng cho ngày này';
  const delta = startMinutes - currentMinutes;
  if (delta <= 60) return 'Rất gần giờ hiện tại';
  if (delta <= 120) return 'Đề xuất đặt nhanh';
  return 'Khung giờ còn trống';
}

export function buildCourtBooking(slot: CourtSlot, reminderMinutes = BOOKING_REMINDER_MINUTES): CourtBooking {
  return {
    court: slot.court,
    dateISO: slot.dateISO,
    dateLabel: slot.dateLabel,
    timeStart: slot.timeStart,
    timeEnd: slot.timeEnd,
    reminderMinutes,
    createdAtISO: new Date().toISOString(),
  };
}

export function getBookingCountdown(booking: CourtBooking, now = new Date()): BookingCountdown {
  const bookingDate = createDateFromISO(booking.dateISO);
  const start = new Date(
    bookingDate.getFullYear(),
    bookingDate.getMonth(),
    bookingDate.getDate(),
    Number(booking.timeStart.split(':')[0]),
    Number(booking.timeStart.split(':')[1]),
    0,
    0,
  );
  const diff = start.getTime() - now.getTime();
  const minutes = Math.max(0, Math.ceil(diff / 60000));

  if (diff <= 0) {
    return {
      label: 'Đã đến giờ sử dụng',
      detail: 'Hãy ra sân hoặc cập nhật lại lịch nếu bạn đổi kế hoạch.',
      isUrgent: true,
      isLive: true,
    };
  }

  if (minutes <= booking.reminderMinutes) {
    return {
      label: `Nhắc sân trong ${minutes} phút`,
      detail: `Hệ thống sẽ nhắc trước ${booking.reminderMinutes} phút.`,
      isUrgent: true,
      isLive: false,
    };
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return {
    label: hours > 0 ? `Còn ${hours} giờ ${rest} phút` : `Còn ${rest} phút`,
    detail: `Nhắc tự động trước ${booking.reminderMinutes} phút.`,
    isUrgent: false,
    isLive: false,
  };
}

export function loadCourtBooking() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COURT_BOOKING_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CourtBooking;
  } catch {
    return null;
  }
}

export function saveCourtBooking(booking: CourtBooking) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COURT_BOOKING_STORAGE_KEY, JSON.stringify(booking));
}

export function clearCourtBooking() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(COURT_BOOKING_STORAGE_KEY);
}

export function getBookingDateTimeLabel(booking: CourtBooking) {
  return `${booking.dateLabel} · ${booking.timeStart} - ${booking.timeEnd}`;
}

export function loadCourtBookingHistory() {
  if (typeof window === 'undefined') return [] as CourtBookingHistoryItem[];
  try {
    const raw = window.localStorage.getItem(COURT_BOOKING_HISTORY_STORAGE_KEY);
    if (!raw) return [] as CourtBookingHistoryItem[];
    const parsed = JSON.parse(raw) as CourtBookingHistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as CourtBookingHistoryItem[];
  }
}

export function saveCourtBookingHistory(items: CourtBookingHistoryItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COURT_BOOKING_HISTORY_STORAGE_KEY, JSON.stringify(items.slice(0, 5)));
}

export function addCourtBookingHistoryItem(item: Omit<CourtBookingHistoryItem, 'id' | 'createdAtISO'>) {
  const currentItems = loadCourtBookingHistory();
  const nextItems: CourtBookingHistoryItem[] = [
    {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAtISO: new Date().toISOString(),
    },
    ...currentItems,
  ];
  saveCourtBookingHistory(nextItems);
  return nextItems;
}
