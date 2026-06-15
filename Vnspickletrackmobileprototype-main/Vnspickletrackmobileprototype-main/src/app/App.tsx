import { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

/* â”€â”€ Component imports â”€â”€ */
import { SplashScreen }             from './components/SplashScreen';
import { LoginScreen }              from './components/LoginScreen';
import { DashboardAdmin }           from './components/DashboardAdmin';
import { DashboardCoach }           from './components/DashboardCoach';
import { TodayClassesScreen }       from './components/TodayClassesScreen';
import { AttendanceCheckScreen }    from './components/AttendanceCheckScreen';
import { StudentsListScreen }       from './components/StudentsListScreen';
import { AddStudentScreen }         from './components/AddStudentScreen';
import { StudentDetailScreen }      from './components/StudentDetailScreen';
import { EditStudentScreen }        from './components/EditStudentScreen';
import { RenewPackageScreen }       from './components/RenewPackageScreen';
import { PaymentHistoryScreen }     from './components/PaymentHistoryScreen';
import { AttendanceHistoryScreen }  from './components/AttendanceHistoryScreen';
import { ReportsPage }              from './components/ReportsPage';
import { ReportExpiringScreen }     from './components/ReportExpiringScreen';
import { RevenueReportScreen }      from './components/RevenueReportScreen';
import { SettingsPage }             from './components/SettingsPage';
import { BackupScreen }             from './components/BackupScreen';
import { ClassListScreen }          from './components/ClassListScreen';
import { AddClassScreen }           from './components/AddClassScreen';
import { EditClassScreen }          from './components/EditClassScreen';
import { ClassDetailScreen }        from './components/ClassDetailScreen';
import { AssignStudentsScreen }     from './components/AssignStudentsScreen';
import { SelectClassForSessionScreen } from './components/SelectClassForSessionScreen';
import { SessionDetailScreen }      from './components/SessionDetailScreen';
import { CompleteSessionScreen }    from './components/CompleteSessionScreen';
import { MonthlySessionReportScreen } from './components/MonthlySessionReportScreen';
import { ExportCSVScreen }            from './components/ExportCSVScreen';
import { RestoreDataScreen }          from './components/RestoreDataScreen';
import { PackageManagementScreen }    from './components/PackageManagementScreen';
import { PackageFormScreen }          from './components/PackageFormScreen';
import { SessionCreatedSuccessScreen } from './components/SessionCreatedSuccessScreen';
import { ClassReportScreen }          from './components/ClassReportScreen';
import { StudentReportScreen }        from './components/StudentReportScreen';
import { BackupSuccessScreen }        from './components/BackupSuccessScreen';
import { PrototypeFlowPanel }         from './components/PrototypeFlowPanel';
import type { Screen }                from './components/PrototypeFlowPanel';
import { BottomNavigation }          from './components/BottomNavigation';
import { UserManagementScreen }      from './components/UserManagementScreen';
import { AddUserScreen }             from './components/AddUserScreen';
import { ChangePINScreen }           from './components/ChangePINScreen';
import { EmptyStatesScreen }         from './components/EmptyStates';
import { AccessDeniedScreen }        from './components/AccessDeniedScreen';

/* â”€â”€ Newly wired screens â”€â”€ */
import { AdjustSessionsScreen }            from './components/AdjustSessionsScreen';
import { ChangeStudentStatusDialogScreen } from './components/ChangeStudentStatusDialog';
import { CancelSessionDialog }             from './components/CancelSessionDialog';
import { CompleteSessionDialog }           from './components/CompleteSessionDialog';
import { SuspendClassDialog }              from './components/SuspendClassDialog';
import { DialogsShowcase }                 from './components/DialogsShowcase';
import { AttendanceDialogsDemo }           from './components/AttendanceDialogsDemo';
import { ImportantConfirmDialogScreen }    from './components/ImportantConfirmDialogScreen';
import { ComponentLibraryScreen }          from './components/ComponentLibraryScreen';
import { DevHandoffScreen }                from './components/DevHandoffScreen';
import { Sitemap }                         from './components/Sitemap';
import { ScreenFlowDocument }              from './components/ScreenFlowDocument';

/* â”€â”€ Member / Student role screens â”€â”€ */
import { MemberDashboard }                 from './components/MemberDashboard';
import { MemberProfileScreen }             from './components/MemberProfileScreen';
import { MemberScheduleScreen }            from './components/MemberScheduleScreen';
import { MemberCourtBookingScreen }        from './components/MemberCourtBookingScreen';
import { MemberMembershipOverviewScreen }  from './components/MemberMembershipOverviewScreen';
import { MemberMembershipRegistrationScreen } from './components/MemberMembershipRegistrationScreen';
import { MemberEquipmentRentalScreen }     from './components/MemberEquipmentRentalScreen';
import { MemberPackageScreen }             from './components/MemberPackageScreen';
import { MemberAttendanceHistoryScreen }   from './components/MemberAttendanceHistoryScreen';
import { MemberPaymentHistoryScreen }      from './components/MemberPaymentHistoryScreen';
import { MemberRenewRequestScreen }        from './components/MemberRenewRequestScreen';
import { MemberSessionWarningScreen }      from './components/MemberSessionWarningScreen';
import { MemberContactScreen }             from './components/MemberContactScreen';
import { MemberBottomNavigation }          from './components/MemberBottomNavigation';

/* â”€â”€ Success Dialog â”€â”€ */
interface SuccessDialogProps {
  message:  string;
  onClose:  () => void;
}
function SuccessDialog({ message, onClose }: SuccessDialogProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 1800);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-8"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[280px] bg-card rounded-3xl text-center overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)', animation: 'fadeInScale 200ms ease both' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="pt-8 pb-4 flex justify-center">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 80, height: 80, background: 'rgba(42,157,143,0.12)', border: '6px solid rgba(42,157,143,0.22)' }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 58, height: 58, background: 'rgba(42,157,143,0.22)' }}
            >
              <CheckCircle2 style={{ width: 30, height: 30, color: '#2A9D8F' }} />
            </div>
          </div>
        </div>
        <p style={{ fontSize: '20px', fontWeight: 800, color: '#0E7C7B' }}>Thành công!</p>
        <p className="text-muted-foreground mt-1.5 px-6 pb-2" style={{ fontSize: '13px', lineHeight: 1.5 }}>
          {message}
        </p>
        <div className="flex justify-center pb-6 mt-2">
          <div className="h-1 w-16 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ background: '#0E7C7B', animation: 'progressBar 1.8s linear both' }}
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes progressBar {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}

/* â”€â”€ Tab screens â”€â”€ */
const TAB_SCREENS: Screen[] = ['dashboard', 'today-classes', 'students-list', 'reports', 'settings'];
type Role = 'admin' | 'coach' | 'member';

const ROUTE_ALIASES: Partial<Record<string, Screen>> = {
  'attendance-today': 'today-classes',
  students: 'students-list',
  attendance: 'attendance-check',
};

const PUBLIC_SCREENS = new Set<string>(['splash', 'login']);

const COACH_ALLOWED_SCREENS = new Set<string>([
  'dashboard-coach',
  'today-classes',
  'attendance-check',
  'students-list',
  'student-detail',
  'attendance-history',
  'reports',
  'report-expiring',
  'class-report',
  'student-report',
  'settings',
  'change-pin',
  'class-list',
  'class-detail',
  'select-class-session',
  'session-detail',
  'complete-session',
  'monthly-report',
  'cancel-session-dialog',
  'complete-session-dialog',
  'attendance-dialogs-demo',
]);

const ADMIN_BLOCKED_SCREENS = new Set<string>([
  'dashboard-coach',
  'member-dashboard',
  'member-profile',
  'member-schedule',
  'member-court-booking',
  'member-membership-overview',
  'member-membership-registration',
  'member-equipment-rental',
  'member-package',
  'member-attendance-history',
  'member-payment-history',
  'member-renew-request',
  'member-session-warning',
  'member-contact',
]);

const SCREEN_LABELS: Partial<Record<Screen, string>> = {
  dashboard: 'Dashboard Admin',
  'dashboard-coach': 'Dashboard Coach',
  'today-classes': 'Lá»›p hĂ´m nay',
  'attendance-check': 'Äiá»ƒm danh há»c viĂªn',
  'students-list': 'Danh sĂ¡ch há»c viĂªn',
  'add-student': 'ThĂªm há»c viĂªn',
  'student-detail': 'Chi tiáº¿t há»c viĂªn',
  'renew-package': 'Gia háº¡n gĂ³i há»c',
  reports: 'BĂ¡o cĂ¡o',
  'report-revenue': 'Doanh thu thĂ¡ng',
  settings: 'CĂ i Ä‘áº·t',
  backup: 'Sao lÆ°u dá»¯ liá»‡u',
  'export-csv': 'Xuáº¥t CSV',
  'restore-data': 'KhĂ´i phá»¥c dá»¯ liá»‡u',
  'package-management': 'Quáº£n lĂ½ gĂ³i há»c',
  'user-management': 'Quáº£n lĂ½ ngÆ°á»i dĂ¹ng',
  'member-dashboard': 'Dashboard Há»™i viĂªn',
  'member-schedule': 'Lá»‹ch há»c Há»™i viĂªn',
  'member-court-booking': 'Äáº·t sĂ¢n Há»™i viĂªn',
  'member-membership-overview': 'Gói hội viên của tôi',
  'member-membership-registration': 'ÄÄƒng kĂ½ gĂ³i há»™i viĂªn',
  'member-equipment-rental': 'ThuĂª Ä‘á»“ táº¡i sĂ¢n',
  'member-package': 'GĂ³i há»c',
  'member-attendance-history': 'Lá»‹ch sá»­ há»c Há»™i viĂªn',
  'member-payment-history': 'Lá»‹ch sá»­ thanh toĂ¡n Há»™i viĂªn',
  'member-renew-request': 'YĂªu cáº§u gia háº¡n',
};

function normalizeScreen(screen: Screen): Screen {
  return ROUTE_ALIASES[screen] ?? screen;
}

function homeForRole(role: Role): Screen {
  if (role === 'coach') return 'dashboard-coach' as Screen;
  if (role === 'member') return 'member-dashboard' as Screen;
  return 'dashboard';
}

function roleDisplayName(role: Role) {
  if (role === 'coach') return 'Huáº¥n luyá»‡n viĂªn';
  if (role === 'member') return 'Há»™i viĂªn';
  return 'Quáº£n trá»‹ viĂªn';
}

function canAccessScreen(screen: Screen, role: Role) {
  const normalized = normalizeScreen(screen);
  const screenId = normalized as string;

  if (PUBLIC_SCREENS.has(screenId)) return true;
  if (role === 'member') return screenId.startsWith('member-');
  if (role === 'coach') return COACH_ALLOWED_SCREENS.has(screenId);
  return !ADMIN_BLOCKED_SCREENS.has(screenId);
}

export default function App() {
  /* â”€â”€ Navigation stack â”€â”€ */
  const [stack,   setStack]   = useState<Screen[]>(['splash']);
  const [dir,     setDir]     = useState<'forward' | 'back' | 'tab'>('forward');
  const [animKey, setAnimKey] = useState(0);

  /* â”€â”€ Role â”€â”€ */
  const [role, setRole] = useState<Role>('admin');

  /* â”€â”€ Success dialog â”€â”€ */
  const [successMsg,  setSuccessMsg]  = useState<string | null>(null);
  const successCb = useRef<(() => void) | null>(null);

  /* â”€â”€ Current screen â”€â”€ */
  const currentScreen = stack[stack.length - 1];

  function navigate(screen: Screen, replace = false) {
    const target = normalizeScreen(screen);
    setDir('forward');
    setAnimKey(k => k + 1);
    setStack(prev => replace ? [...prev.slice(0, -1), target] : [...prev, target]);
  }

  function goBack() {
    if (stack.length <= 1) return;
    setDir('back');
    setAnimKey(k => k + 1);
    setStack(prev => prev.slice(0, -1));
  }

  function switchTab(screen: Screen) {
    const target = normalizeScreen(screen);
    setDir('tab');
    setAnimKey(k => k + 1);
    setStack([target]);
  }

  function showSuccess(msg: string, cb: () => void) {
    successCb.current = cb;
    setSuccessMsg(msg);
  }

  function onSuccessClose() {
    setSuccessMsg(null);
    successCb.current?.();
    successCb.current = null;
  }

  function logout() {
    setRole('admin');
    setDir('back');
    setAnimKey(k => k + 1);
    setStack(['login']);
  }

  function leaveBlockedRoute() {
    if (stack.length > 1) {
      goBack();
      return;
    }
    switchTab(homeForRole(role));
  }

  /* â”€â”€ Jump (from flow panel) â”€â”€ */
  function handleJump(screen: Screen, flowRole?: Role) {
    const target = normalizeScreen(screen);
    if (flowRole) setRole(flowRole);
    if (target === 'dashboard' && flowRole === 'coach') {
      setDir('tab');
      setAnimKey(k => k + 1);
      setStack(['dashboard-coach' as Screen]);
    } else if (target === 'dashboard' && flowRole === 'member') {
      setDir('tab');
      setAnimKey(k => k + 1);
      setStack(['member-dashboard' as Screen]);
    } else {
      setDir('forward');
      setAnimKey(k => k + 1);
      setStack([target]);
    }
  }

  /* â”€â”€ Auto Splash â†’ Login â”€â”€ */
  useEffect(() => {
    if (currentScreen === 'splash') {
      const t = setTimeout(() => navigate('login', true), 2500);
      return () => clearTimeout(t);
    }
  }, [currentScreen]);

  /* â”€â”€ Animation class â”€â”€ */
  const animClass = dir === 'back' ? 'screen-enter-back' : dir === 'tab' ? 'screen-enter-tab' : 'screen-enter-forward';

  /* â”€â”€ Show bottom nav â”€â”€ */
  const showNav = role !== 'member' && (TAB_SCREENS.includes(currentScreen) || currentScreen === ('dashboard-coach' as Screen));

  /* â”€â”€ Member tab screens â”€â”€ */
  const MEMBER_TAB_SCREENS: Screen[] = [
    'member-dashboard', 'member-schedule', 'member-package',
    'member-attendance-history', 'member-profile',
  ];
  const showMemberNav = role === 'member' && MEMBER_TAB_SCREENS.includes(currentScreen);

  /* â”€â”€ Member tab active â”€â”€ */
  const memberTabActive = currentScreen;

  /* â”€â”€ Active tab â”€â”€ */
  const activeTab =
    currentScreen === 'dashboard' || currentScreen === ('dashboard-coach' as Screen)
      ? 'home'
      : TAB_SCREENS.includes(currentScreen)
        ? currentScreen
        : 'home';

  /* â”€â”€ Render â”€â”€ */
  function renderScreen() {
    if (!canAccessScreen(currentScreen, role)) {
      return (
        <AccessDeniedScreen
          onBack={leaveBlockedRoute}
          roleName={roleDisplayName(role)}
          featureName={SCREEN_LABELS[currentScreen] ?? currentScreen}
        />
      );
    }

    switch (currentScreen as string) {

      /* â”€â”€ Onboarding â”€â”€ */
      case 'splash':
        return <SplashScreen />;

      case 'login':
        return (
          <LoginScreen onLogin={(r) => {
            setRole(r);
            const home = homeForRole(r);
            setDir('forward');
            setAnimKey(k => k + 1);
            setStack([home]);
          }} />
        );

      /* â”€â”€ Dashboards â”€â”€ */
      case 'dashboard':
        return (
          <DashboardAdmin onNavigate={(s) => navigate(s as Screen)} />
        );

      case 'dashboard-coach':
        return (
          <DashboardCoach onNavigate={(s) => navigate(s as Screen)} />
        );

      /* â”€â”€ Attendance â”€â”€ */
      case 'today-classes':
        return (
          <TodayClassesScreen
            onAttendance={() => navigate('session-detail')}
            onCreateClass={() => navigate('select-class-session')}
          />
        );

      case 'attendance-check':
        return (
          <AttendanceCheckScreen
            onBack={goBack}
            onSave={() => showSuccess('ÄĂ£ lÆ°u Ä‘iá»ƒm danh thĂ nh cĂ´ng!', () => navigate('today-classes', true))}
          />
        );

      /* â”€â”€ Students â”€â”€ */
      case 'students-list':
        return (
          <StudentsListScreen
            onAddStudent={() => navigate('add-student')}
            onStudentDetail={() => navigate('student-detail')}
          />
        );

      case 'add-student':
        return (
          <AddStudentScreen
            onBack={goBack}
            onSave={() => showSuccess('ÄĂ£ thĂªm há»c viĂªn thĂ nh cĂ´ng!', () => navigate('student-detail', true))}
          />
        );

      case 'student-detail':
        return (
          <StudentDetailScreen
            onBack={goBack}
            onEdit={() => navigate('edit-student')}
            onRenew={() => navigate('renew-package')}
            onPaymentHistory={() => navigate('payment-history')}
            onAttendanceHistory={() => navigate('attendance-history')}
          />
        );

      case 'renew-package':
        return (
          <RenewPackageScreen
            onBack={goBack}
            onConfirm={() => showSuccess('ÄĂ£ gia háº¡n gĂ³i há»c thĂ nh cĂ´ng!', () => navigate('student-detail', true))}
          />
        );

      /* â”€â”€ Reports â”€â”€ */
      case 'reports':
        return <ReportsPage role={role} onNavigate={(s) => navigate(s as Screen)} />;

      case 'report-expiring':
        return (
          <ReportExpiringScreen
            onBack={goBack}
            onRenew={() => navigate('renew-package')}
          />
        );

      case 'report-revenue':
        if (role !== 'admin') {
          return (
            <AccessDeniedScreen
              onBack={goBack}
              roleName={role === 'coach' ? 'Huáº¥n luyá»‡n viĂªn' : 'Há»™i viĂªn'}
              featureName="Doanh thu thĂ¡ng"
            />
          );
        }
        return <RevenueReportScreen onBack={goBack} />;

      case 'class-report':
        return <ClassReportScreen onBack={goBack} onNavigate={(s) => navigate(s as Screen)} />;

      case 'student-report':
        return <StudentReportScreen onBack={goBack} onNavigate={(s) => navigate(s as Screen)} />;

      /* â”€â”€ Settings â”€â”€ */
      case 'settings':
        return (
          <SettingsPage
            role={role}
            onNavigate={(s) => navigate(s as Screen)}
            onLogout={logout}
          />
        );

      case 'backup':
        return <BackupScreen onBack={goBack} onNavigate={(s) => navigate(s as Screen)} />;

      case 'backup-success':
        return (
          <BackupSuccessScreen
            onShare={() => {
              console.log('Share backup file');
              // In real app: trigger native share
            }}
            onBack={() => navigate('settings', true)}
          />
        );

      /* â”€â”€ Classes â”€â”€ */
      case 'class-list':
        return (
          <ClassListScreen
            onBack={goBack}
            onAddClass={() => navigate('add-class')}
            onClassDetail={() => navigate('class-detail')}
            onCreateSession={() => navigate('session-created-success')}
          />
        );

      case 'add-class':
        return (
          <AddClassScreen
            onBack={goBack}
            onSave={() => showSuccess('ÄĂ£ thĂªm lá»›p há»c thĂ nh cĂ´ng!', goBack)}
          />
        );

      case 'edit-class':
        return (
          <EditClassScreen
            onBack={goBack}
            onSave={() => showSuccess('ÄĂ£ cáº­p nháº­t lá»›p há»c thĂ nh cĂ´ng!', goBack)}
          />
        );

      case 'class-detail':
        return (
          <ClassDetailScreen
            onBack={goBack}
            onEdit={() => navigate('edit-class')}
            onAssignStudents={() => navigate('assign-students')}
            onStudentDetail={() => navigate('student-detail')}
            onCreateSession={() => navigate('session-created-success')}
            onSessionDetail={() => navigate('session-detail')}
          />
        );

      case 'assign-students':
        return (
          <AssignStudentsScreen
            onBack={goBack}
            onConfirm={() => showSuccess('ÄĂ£ cáº­p nháº­t danh sĂ¡ch há»c viĂªn trong lá»›p!', goBack)}
          />
        );

      /* â”€â”€ Sessions â”€â”€ */
      case 'select-class-session':
        return (
          <SelectClassForSessionScreen
            onBack={goBack}
            onSelect={() => navigate('session-detail')}
          />
        );

      case 'session-created-success':
        return (
          <SessionCreatedSuccessScreen
            onAttendance={() => navigate('session-detail')}
            onBack={() => navigate('today-classes', true)}
          />
        );

      case 'session-detail':
        return (
          <SessionDetailScreen
            onBack={goBack}
            onComplete={() => navigate('complete-session')}
            onAttendance={() => navigate('attendance-check')}
          />
        );

      case 'complete-session':
        return (
          <CompleteSessionScreen
            onBack={goBack}
            onComplete={() => showSuccess('ÄĂ£ hoĂ n táº¥t buá»•i há»c thĂ nh cĂ´ng!', () => navigate('today-classes', true))}
            onCancel={() => showSuccess('ÄĂ£ há»§y buá»•i há»c.', () => navigate('today-classes', true))}
          />
        );

      /* â”€â”€ Student extras â”€â”€ */
      case 'edit-student':
        return (
          <EditStudentScreen
            onBack={goBack}
            onSave={() => showSuccess('ÄĂ£ cáº­p nháº­t thĂ´ng tin há»c viĂªn!', () => navigate('student-detail', true))}
          />
        );

      case 'adjust-sessions':
        return (
          <AdjustSessionsScreen
            onBack={goBack}
            onConfirm={() => showSuccess('ÄĂ£ Ä‘iá»u chá»‰nh sá»‘ buá»•i thĂ nh cĂ´ng!', () => navigate('student-detail', true))}
          />
        );

      case 'change-student-status':
        return (
          <ChangeStudentStatusDialogScreen
            onBack={goBack}
            onConfirm={() => showSuccess('ÄĂ£ cáº­p nháº­t tráº¡ng thĂ¡i há»c viĂªn!', () => navigate('student-detail', true))}
          />
        );

      case 'payment-history':
        return <PaymentHistoryScreen onBack={goBack} onRenew={() => navigate('renew-package')} />;

      case 'attendance-history':
        return <AttendanceHistoryScreen onBack={goBack} />;

      /* â”€â”€ Session dialogs (standalone demo pages) â”€â”€ */
      case 'cancel-session-dialog':
        return (
          <div className="relative h-screen flex flex-col items-center justify-end bg-gray-900/60">
            <div className="absolute inset-0 bg-[#F7F9FA]" style={{ filter:'blur(2px)', opacity:0.5 }} />
            <CancelSessionDialog
              visible={true}
              onClose={goBack}
              onConfirm={() => showSuccess('ÄĂ£ há»§y buá»•i há»c thĂ nh cĂ´ng!', () => navigate('today-classes', true))}
            />
          </div>
        );

      case 'complete-session-dialog':
        return (
          <div className="relative h-screen">
            <div className="absolute inset-0 bg-[#F7F9FA]" />
            <CompleteSessionDialog
              visible={true}
              onClose={goBack}
              onConfirm={() => showSuccess('ÄĂ£ hoĂ n táº¥t buá»•i há»c!', () => navigate('today-classes', true))}
            />
          </div>
        );

      case 'suspend-class-dialog':
        return (
          <div className="relative h-screen">
            <div className="absolute inset-0 bg-[#F7F9FA]" />
            <SuspendClassDialog
              visible={true}
              onClose={goBack}
              onConfirm={() => showSuccess('ÄĂ£ ngÆ°ng lá»›p há»c!', () => navigate('class-list', true))}
            />
          </div>
        );

      /* â”€â”€ Dialog showcases â”€â”€ */
      case 'dialogs-showcase':
        return (
          <DialogsShowcase onBack={goBack} />
        );

      case 'confirm-dialogs':
        return (
          <ImportantConfirmDialogScreen onBack={goBack} />
        );

      case 'attendance-dialogs-demo':
        return (
          <AttendanceDialogsDemo onBack={goBack} />
        );

      /* â”€â”€ Dev / design tools â”€â”€ */
      case 'component-library':
        return (
          <ComponentLibraryScreen onBack={goBack} />
        );

      case 'dev-handoff':
        return (
          <DevHandoffScreen onBack={goBack} />
        );

      case 'sitemap':
        return (
          <Sitemap onNavigate={(s) => navigate(s as Screen)} />
        );

      case 'screen-flow-doc':
        return (
          <ScreenFlowDocument onBack={goBack} />
        );

      /* â”€â”€ Reports â”€â”€ */
      case 'monthly-report':
        return <MonthlySessionReportScreen onBack={goBack} />;

      /* â”€â”€ Data management â”€â”€ */
      case 'export-csv':
        return <ExportCSVScreen onBack={goBack} />;

      case 'restore-data':
        return <RestoreDataScreen onBack={goBack} />;

      /* â”€â”€ Settings extras â”€â”€ */
      case 'package-management':
        return (
          <PackageManagementScreen
            onBack={goBack}
            onAddPackage={() => navigate('package-form')}
            onEditPackage={() => navigate('package-form')}
          />
        );

      case 'package-form':
        return (
          <PackageFormScreen
            onBack={goBack}
            onSave={() => showSuccess('ÄĂ£ lÆ°u gĂ³i há»c thĂ nh cĂ´ng!', goBack)}
          />
        );

      case 'user-management':
        return (
          <UserManagementScreen
            onBack={goBack}
            onAddUser={() => navigate('add-user' as Screen)}
            onEditUser={() => navigate('add-user' as Screen)}
          />
        );

      case 'add-user':
        return (
          <AddUserScreen
            onBack={goBack}
            onSave={() => showSuccess('ÄĂ£ thĂªm ngÆ°á»i dĂ¹ng thĂ nh cĂ´ng!', () => navigate('user-management', true))}
          />
        );

      case 'change-pin':
        return (
          <ChangePINScreen
            onBack={goBack}
            onSave={() => navigate('settings', true)}
          />
        );

      case 'empty-states':
        return (
          <EmptyStatesScreen
            onBack={goBack}
            onAddStudent={() => navigate('add-student')}
            onAddClass={() => navigate('add-class')}
            onCreateSession={() => navigate('select-class-session')}
          />
        );

      /* â•â• MEMBER / STUDENT ROLE â•â• */
      case 'member-dashboard':
        return (
          <MemberDashboard
            onNavigate={(s) => navigate(s as Screen)}
            onNotification={() => navigate('member-session-warning')}
          />
        );

      case 'member-profile':
        return (
          <MemberProfileScreen
            onNavigate={(s) => navigate(s as Screen)}
            onLogout={logout}
          />
        );

      case 'member-schedule':
        return <MemberScheduleScreen />;

      case 'member-court-booking':
        return (
          <MemberCourtBookingScreen
            onBack={goBack}
            onBooked={() => showSuccess('Đã đặt sân thành công! Nhắc giờ đã được bật trước 30 phút.', () => navigate('member-dashboard', true))}
            onRescheduled={() => showSuccess('Đã đổi khung giờ sân thành công!', () => navigate('member-dashboard', true))}
            onCancelled={() => showSuccess('Đã hủy đặt sân thành công.', () => navigate('member-dashboard', true))}
          />
        );

      case 'member-equipment-rental':
        return (
          <MemberEquipmentRentalScreen
            onBack={goBack}
            onConfirm={() => showSuccess('Đã ghi nhận yêu cầu thuê đồ tại sân!', () => navigate('member-dashboard', true))}
          />
        );

      case 'member-membership-overview':
        return (
          <MemberMembershipOverviewScreen
            onBack={goBack}
            onRenew={() => navigate('member-membership-registration')}
            onViewPlans={() => navigate('member-membership-registration')}
          />
        );

      case 'member-membership-registration':
        return (
          <MemberMembershipRegistrationScreen
            onBack={goBack}
            onSubmit={() => showSuccess('ÄĂ£ gá»­i yĂªu cáº§u gĂ³i há»™i viĂªn! Admin sáº½ xĂ¡c nháº­n sá»›m.', () => navigate('member-dashboard', true))}
          />
        );

      case 'member-package':
        return (
          <MemberPackageScreen
            onBack={goBack}
            onRenew={() => navigate('member-renew-request')}
          />
        );

      case 'member-attendance-history':
        return <MemberAttendanceHistoryScreen />;

      case 'member-payment-history':
        return <MemberPaymentHistoryScreen />;

      case 'member-renew-request':
        return (
          <MemberRenewRequestScreen
            onBack={goBack}
            onSubmit={() => showSuccess('YĂªu cáº§u gia háº¡n Ä‘Ă£ Ä‘Æ°á»£c gá»­i! Admin sáº½ xĂ¡c nháº­n sá»›m.', () => navigate('member-package', true))}
          />
        );

      case 'member-session-warning':
        return (
          <MemberSessionWarningScreen
            onRenew={() => navigate('member-renew-request')}
            onDismiss={goBack}
          />
        );

      case 'member-contact':
        return (
          <MemberContactScreen
            onBack={goBack}
          />
        );

      default:
        return <DashboardAdmin onNavigate={(s) => navigate(s as Screen)} />;
    }
  }

  /* â”€â”€ Tab bar handler â”€â”€ */
  function handleTabChange(tab: string) {
    const tabMap: Record<string, Screen> = {
      'home':          homeForRole(role),
      'today-classes': 'today-classes',
      'students-list': 'students-list',
      'reports':       'reports',
      'settings':      'settings',
    };
    const target = tabMap[tab] ?? (tab as Screen);
    switchTab(target);
  }

  return (
    <div className="min-h-screen bg-muted/30">

      {/* â”€â”€ Full-width screens (bypass device frame) â”€â”€ */}
      {currentScreen === 'screen-flow-doc' ? (
        <div className="min-h-screen" style={{ background: '#F7F9FA' }}>
          <ScreenFlowDocument onBack={goBack} />
          <PrototypeFlowPanel
            currentScreen={currentScreen as Screen}
            onJump={handleJump}
          />
        </div>
      ) : (
      /* â”€â”€ Device frame â”€â”€ */
      <div
        className="max-w-[390px] mx-auto min-h-screen bg-background relative overflow-hidden shadow-2xl"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 8px 40px rgba(0,0,0,0.12)' }}
      >
        {/* â”€â”€ Screen with transition â”€â”€ */}
        <div
          key={animKey}
          className={`h-screen overflow-y-auto ${animClass}`}
        >
          {renderScreen()}
        </div>

        {/* â”€â”€ Bottom nav â”€â”€ */}
        {showNav && (
          <BottomNavigation
            currentTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}

        {/* â”€â”€ Member Bottom nav â”€â”€ */}
        {showMemberNav && (
          <MemberBottomNavigation
            currentTab={memberTabActive}
            onTabChange={(tab) => switchTab(tab as Screen)}
          />
        )}

        {/* â”€â”€ Success overlay â”€â”€ */}
        {successMsg && (
          <SuccessDialog message={successMsg} onClose={onSuccessClose} />
        )}

        {/* â”€â”€ Prototype Flow Panel â”€â”€ */}
        <PrototypeFlowPanel
          currentScreen={currentScreen as Screen}
          onJump={handleJump}
        />
      </div>
      )}
    </div>
  );
}

