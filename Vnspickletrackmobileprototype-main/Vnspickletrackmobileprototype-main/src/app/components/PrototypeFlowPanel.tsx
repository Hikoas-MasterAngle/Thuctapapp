import { useState } from 'react';
import {
  Play,
  X,
  ChevronRight,
  LogIn,
  ClipboardCheck,
  UserPlus,
  RefreshCw,
  BarChart3,
  CloudUpload,
  Users,
  Minimize2,
  Award,
  FileText,
  Star,
} from 'lucide-react';

export type Screen =
  | 'splash'
  | 'login'
  | 'dashboard'
  | 'dashboard-coach'
  | 'home'
  | 'today-classes'
  | 'attendance-check'
  | 'students-list'
  | 'add-student'
  | 'student-detail'
  | 'renew-package'
  | 'reports'
  | 'report-expiring'
  | 'report-revenue'
  | 'settings'
  | 'backup'
  | 'class-list'
  | 'add-class'
  | 'dialogs-showcase'
  | 'component-library'
  | 'dev-handoff'
  | 'sitemap'
  | 'select-class-session'
  | 'session-detail'
  | 'complete-session'
  | 'session-created-success'
  | 'cancel-session-dialog'
  | 'complete-session-dialog'
  | 'edit-class'
  | 'class-detail'
  | 'assign-students'
  | 'edit-student'
  | 'payment-history'
  | 'attendance-history'
  | 'monthly-report'
  | 'export-csv'
  | 'restore-data'
  | 'package-management'
  | 'package-form'
  | 'user-management'
  | 'change-pin'
  | 'confirm-dialogs'
  | 'suspend-class-dialog'
  | 'adjust-sessions'
  | 'change-student-status'
  | 'attendance-dialogs-demo'
  | 'class-report'
  | 'student-report'
  | 'backup-success'
  | 'add-user'
  | 'empty-states'
  | 'member-dashboard'
  | 'member-profile'
  | 'member-schedule'
  | 'member-court-booking'
  | 'member-membership-overview'
  | 'member-membership-registration'
  | 'member-equipment-rental'
  | 'member-package'
  | 'member-attendance-history'
  | 'member-payment-history'
  | 'member-renew-request'
  | 'member-session-warning'
  | 'member-contact'
  | 'screen-flow-doc';

interface Flow {
  id: number;
  name: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  steps: { screen: Screen; label: string }[];
}

const FLOWS: Flow[] = [
  {
    id: 1,
    name: 'Đăng nhập',
    desc: 'Splash → Login → Dashboard Admin',
    color: '#0E7C7B',
    icon: <LogIn style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'splash', label: 'Splash Screen' },
      { screen: 'login', label: 'Đăng nhập' },
      { screen: 'dashboard', label: 'Dashboard Admin' },
    ],
  },
  {
    id: 2,
    name: 'Điểm danh',
    desc: 'Dashboard → Lớp hôm nay → Điểm danh',
    color: '#2A9D8F',
    icon: <ClipboardCheck style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'dashboard', label: 'Dashboard Admin' },
      { screen: 'today-classes', label: 'Lớp hôm nay' },
      { screen: 'attendance-check', label: 'Điểm danh học viên' },
    ],
  },
  {
    id: 3,
    name: 'Thêm học viên',
    desc: 'Dashboard → Học viên → Thêm → Chi tiết',
    color: '#F4A261',
    icon: <UserPlus style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'dashboard', label: 'Dashboard Admin' },
      { screen: 'students-list', label: 'Danh sách học viên' },
      { screen: 'add-student', label: 'Thêm học viên' },
      { screen: 'student-detail', label: 'Chi tiết học viên' },
    ],
  },
  {
    id: 4,
    name: 'Gia hạn gói',
    desc: 'Chi tiết → Gia hạn → Thanh toán',
    color: '#E9C46A',
    icon: <RefreshCw style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'student-detail', label: 'Chi tiết học viên' },
      { screen: 'renew-package', label: 'Gia hạn gói học' },
      { screen: 'student-detail', label: 'Chi tiết học viên' },
    ],
  },
  {
    id: 5,
    name: 'Báo cáo hết buổi',
    desc: 'Dashboard → Báo cáo → Sắp hết buổi → Gia hạn',
    color: '#E76F51',
    icon: <BarChart3 style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'dashboard', label: 'Dashboard Admin' },
      { screen: 'reports', label: 'Báo cáo' },
      { screen: 'report-expiring', label: 'Sắp hết buổi' },
      { screen: 'renew-package', label: 'Gia hạn gói học' },
    ],
  },
  {
    id: 6,
    name: 'Sao lưu',
    desc: 'Dashboard → Cài đặt → Sao lưu ngay',
    color: '#815AD5',
    icon: <CloudUpload style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'dashboard', label: 'Dashboard Admin' },
      { screen: 'settings', label: 'Cài đặt' },
      { screen: 'backup', label: 'Sao lưu dữ liệu' },
    ],
  },
  {
    id: 7,
    name: 'Coach',
    desc: 'Login → Dashboard Coach → Điểm danh',
    color: '#264653',
    icon: <Users style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'login', label: 'Đăng nhập' },
      { screen: 'dashboard-coach', label: 'Dashboard Coach' },
      { screen: 'today-classes', label: 'Lớp hôm nay' },
      { screen: 'attendance-check', label: 'Điểm danh học viên' },
    ],
  },
  {
    id: 8,
    name: 'Tạo buổi học',
    desc: 'Lớp hôm nay → Chọn lớp → Xác nhận → Thành công',
    color: '#F4A261',
    icon: <Play style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'today-classes', label: 'Lớp hôm nay' },
      { screen: 'select-class-session', label: 'Tạo buổi học hôm nay' },
      { screen: 'session-created-success', label: 'Tạo thành công' },
      { screen: 'session-detail', label: 'Chi tiết buổi học' },
      { screen: 'cancel-session-dialog', label: 'Dialog hủy buổi học' },
      { screen: 'complete-session-dialog', label: 'Dialog hoàn tất' },
    ],
  },
  {
    id: 9,
    name: 'Quản lý lớp',
    desc: 'Chi tiết lớp → Gán HV → Dialog ngưng',
    color: '#E76F51',
    icon: <BarChart3 style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'class-detail', label: 'Chi tiết lớp học' },
      { screen: 'assign-students', label: 'Gán học viên' },
      { screen: 'suspend-class-dialog', label: 'Dialog ngưng lớp' },
    ],
  },
  {
    id: 10,
    name: 'Điều chỉnh buổi',
    desc: 'Chi tiết HV → Sửa → Điều chỉnh số buổi',
    color: '#264653',
    icon: <RefreshCw style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'student-detail', label: 'Chi tiết học viên' },
      { screen: 'edit-student', label: 'Sửa học viên' },
      { screen: 'adjust-sessions', label: 'Điều chỉnh số buổi' },
    ],
  },
  {
    id: 11,
    name: 'Đổi trạng thái',
    desc: 'Chi tiết HV → Đổi trạng thái học viên',
    color: '#E76F51',
    icon: <Users style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'student-detail', label: 'Chi tiết học viên' },
      { screen: 'change-student-status', label: 'Dialog đổi trạng thái' },
    ],
  },
  {
    id: 12,
    name: 'Thêm người dùng',
    desc: 'Quản lý ND → Thêm người dùng',
    color: '#815AD5',
    icon: <Users style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'user-management', label: 'Quản lý người dùng' },
      { screen: 'add-user', label: 'Thêm người dùng' },
    ],
  },
  {
    id: 13,
    name: 'Đổi mã PIN',
    desc: 'Cài đặt → Đổi mã PIN',
    color: '#0E7C7B',
    icon: <Play style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'settings', label: 'Cài đặt' },
      { screen: 'change-pin', label: 'Đổi mã PIN' },
    ],
  },
  {
    id: 14,
    name: 'Empty States',
    desc: 'Bộ 6 trạng thái trống',
    color: '#2A9D8F',
    icon: <Play style={{ width: 14, height: 14 }} />,
    steps: [{ screen: 'empty-states', label: 'Empty States' }],
  },
  {
    id: 15,
    name: 'Dialog xác nhận',
    desc: 'Dialogs cảnh báo và xác nhận quan trọng',
    color: '#E76F51',
    icon: <Play style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'attendance-dialogs-demo', label: 'Dialogs điểm danh' },
      { screen: 'dialogs-showcase', label: 'Dialog Showcase' },
      { screen: 'confirm-dialogs', label: 'Confirm Dialogs' },
    ],
  },
  {
    id: 16,
    name: 'Dev Handoff',
    desc: 'Tài liệu bàn giao và Component Library',
    color: '#264653',
    icon: <Play style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'sitemap', label: 'Sitemap' },
      { screen: 'component-library', label: 'Component Library' },
      { screen: 'dev-handoff', label: 'Dev Handoff' },
    ],
  },
  {
    id: 17,
    name: 'Học viên — Tổng quan',
    desc: 'Đăng nhập → Dashboard → Gói học → Cảnh báo',
    color: '#2A9D8F',
    icon: <Play style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'member-dashboard', label: 'Dashboard HV' },
      { screen: 'member-package', label: 'Gói học' },
      { screen: 'member-session-warning', label: 'Cảnh báo hết buổi' },
      { screen: 'member-renew-request', label: 'Gia hạn gói' },
    ],
  },
  {
    id: 18,
    name: 'Học viên — Lịch và hồ sơ',
    desc: 'Lịch học · Lịch sử · Liên hệ · Cá nhân',
    color: '#815AD5',
    icon: <Play style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'member-schedule', label: 'Lịch học' },
      { screen: 'member-attendance-history', label: 'Lịch sử học' },
      { screen: 'member-payment-history', label: 'Thanh toán' },
      { screen: 'member-contact', label: 'Liên hệ Coach' },
      { screen: 'member-profile', label: 'Hồ sơ cá nhân' },
    ],
  },
  {
    id: 19,
    name: 'Học viên — Thành tích',
    desc: 'Dashboard → Thành tích học viên',
    color: '#F4A261',
    icon: <Award style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'member-dashboard', label: 'Dashboard HV' },
      { screen: 'student-report', label: 'Thành tích học viên' },
    ],
  },
  {
    id: 20,
    name: 'Hội viên — Đăng ký gói',
    desc: 'Dashboard → Gói hội viên của tôi → Đăng ký gói → Gửi yêu cầu',
    color: '#0E7C7B',
    icon: <Star style={{ width: 14, height: 14 }} />,
    steps: [
      { screen: 'member-dashboard', label: 'Dashboard HV' },
      { screen: 'member-membership-overview', label: 'Gói hội viên của tôi' },
      { screen: 'member-membership-registration', label: 'Đăng ký gói hội viên' },
    ],
  },
  {
    id: 21,
    name: 'Screen Flow Doc',
    desc: 'Tài liệu luồng màn hình · Sitemap · Permission Matrix',
    color: '#264653',
    icon: <FileText style={{ width: 14, height: 14 }} />,
    steps: [{ screen: 'screen-flow-doc', label: 'Screen Flow Document' }],
  },
];

interface PrototypeFlowPanelProps {
  currentScreen: Screen;
  onJump: (screen: Screen, role?: 'admin' | 'coach' | 'member') => void;
}

export function PrototypeFlowPanel({ currentScreen, onJump }: PrototypeFlowPanelProps) {
  const [open, setOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<number | null>(null);
  const [minimised, setMinimised] = useState(false);

  const matchedFlow = FLOWS.find(flow => flow.steps.some(step => step.screen === currentScreen));

  function startFlow(flow: Flow) {
    const firstStep = flow.steps[0];
    const role: 'admin' | 'coach' | 'member' =
      flow.id === 7
        ? 'coach'
        : flow.id === 17 || flow.id === 18 || flow.id === 19 || flow.id === 20
          ? 'member'
          : 'admin';

    setActiveFlow(flow.id);
    setOpen(false);
    onJump(firstStep.screen, role);
  }

  const current = activeFlow ? FLOWS.find(flow => flow.id === activeFlow) : matchedFlow;
  const currentStepIdx = current ? current.steps.findIndex(step => step.screen === currentScreen) : -1;

  if (minimised) {
    return (
      <button
        onClick={() => setMinimised(false)}
        className="fixed bottom-24 right-3 z-40 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
        style={{ background: current?.color ?? '#0E7C7B' }}
      >
        <Play style={{ width: 16, height: 16, color: 'white', marginLeft: 2 }} />
      </button>
    );
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.46)', backdropFilter: 'blur(2px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[390px] overflow-hidden rounded-t-3xl bg-card"
          style={{ boxShadow: '0 -12px 48px rgba(0,0,0,0.22)', animation: 'slideUpIn 250ms ease both' }}
        >
          <div className="flex justify-center pb-1 pt-3">
            <div className="h-1 w-10 rounded-full bg-border" />
          </div>

          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: 'rgba(14,124,123,0.12)' }}
            >
              <Play style={{ width: 14, height: 14, color: '#0E7C7B', marginLeft: 1 }} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: '14px', fontWeight: 700 }}>Prototype Flows</p>
              <p className="text-muted-foreground" style={{ fontSize: '10px' }}>
                21 flows · 46+ màn hình · 3 vai trò
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/60"
            >
              <X style={{ width: 14, height: 14 }} />
            </button>
          </div>

          <div className="no-scrollbar overflow-y-auto" style={{ maxHeight: 400 }}>
            {FLOWS.map(flow => {
              const isActive = activeFlow === flow.id || (!activeFlow && matchedFlow?.id === flow.id);

              return (
                <div
                  key={flow.id}
                  className="flex items-center gap-3 border-b border-border/50 px-5 py-3.5 last:border-0"
                  style={isActive ? { background: `${flow.color}0C` } : {}}
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${flow.color}18`, color: flow.color }}
                  >
                    {flow.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <span
                        className="flex-shrink-0 rounded-full px-1.5 py-0.5"
                        style={{ fontSize: '9px', fontWeight: 800, background: flow.color, color: 'white' }}
                      >
                        F{flow.id}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700 }}>{flow.name}</span>
                      {isActive && (
                        <span
                          className="rounded-full px-1.5 py-0.5"
                          style={{ fontSize: '9px', fontWeight: 700, background: `${flow.color}20`, color: flow.color }}
                        >
                          Đang xem
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      {flow.steps.map((step, index) => (
                        <span key={index} className="flex items-center gap-1">
                          <span
                            className="rounded px-1.5 py-0.5"
                            style={{
                              fontSize: '9px',
                              fontWeight: step.screen === currentScreen ? 700 : 400,
                              background: step.screen === currentScreen ? `${flow.color}25` : 'var(--muted)',
                              color: step.screen === currentScreen ? flow.color : 'var(--muted-foreground)',
                            }}
                          >
                            {step.label}
                          </span>
                          {index < flow.steps.length - 1 && (
                            <ChevronRight style={{ width: 8, height: 8, color: 'var(--muted-foreground)', flexShrink: 0 }} />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => startFlow(flow)}
                    className="flex flex-shrink-0 items-center gap-1 rounded-xl px-3 py-2 transition-opacity active:opacity-80"
                    style={{ background: flow.color, fontSize: '11px', fontWeight: 700, color: 'white' }}
                  >
                    <Play style={{ width: 10, height: 10, marginLeft: 1 }} />
                    Bắt đầu
                  </button>
                </div>
              );
            })}
          </div>

          <div className="h-safe-bottom pb-4" />
        </div>
      )}

      {!open && (
        <div className="fixed bottom-20 right-3 z-40 flex flex-col items-end gap-1.5">
          <button
            onClick={() => setMinimised(true)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card shadow-sm active:scale-95"
          >
            <Minimize2 style={{ width: 12, height: 12, color: 'var(--muted-foreground)' }} />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full pl-2.5 pr-3.5 shadow-lg transition-transform active:scale-95"
            style={{
              background: current ? current.color : '#0E7C7B',
              boxShadow: `0 4px 20px ${(current ? current.color : '#0E7C7B')}60`,
            }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
              <Play style={{ width: 10, height: 10, color: 'white', marginLeft: 1 }} />
            </div>
            <div className="text-left">
              {current ? (
                <>
                  <p className="text-white" style={{ fontSize: '10px', fontWeight: 800, lineHeight: 1 }}>
                    F{current.id} · {current.name}
                  </p>
                  {currentStepIdx >= 0 && (
                    <p className="text-white/60" style={{ fontSize: '9px', lineHeight: 1, marginTop: 1 }}>
                      Bước {currentStepIdx + 1}/{current.steps.length}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-white" style={{ fontSize: '10px', fontWeight: 700 }}>
                  Prototype Flows
                </p>
              )}
            </div>
          </button>

          {current && currentStepIdx >= 0 && (
            <div className="flex items-center justify-center gap-1">
              {current.steps.map((_, index) => (
                <div
                  key={index}
                  className="rounded-full transition-all"
                  style={{
                    width: index === currentStepIdx ? 12 : 5,
                    height: 5,
                    background: index <= currentStepIdx ? current.color : 'rgba(0,0,0,0.15)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
