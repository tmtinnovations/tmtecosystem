
import React, { useState, useEffect } from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import DashboardView from './features/dashboard/DashboardView';
import DatabaseView from './features/database/DatabaseView';
import PaymentsView from './features/payments/PaymentsView';
import LogsView from './features/logs/LogsView';
import OnboardingView from './features/onboarding/OnboardingView';
import RoleAssignmentView from './features/roles/RoleAssignmentView';
import ReportsView from './features/reports/ReportsView';
import SettingsView from './features/settings/SettingsView';
import LoginView from './features/auth/LoginView';
import { Student, Notification } from './types';
import { apiClient } from './services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load students from API
  useEffect(() => {
    if (isAuthenticated) {
      loadStudents();
    } else {
      // Reset loading state when not authenticated
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getStudents();
      if (response.success && response.data) {
        // Handle paginated response
        const studentsData = (response.data as any).data || response.data;
        // Transform API data to match frontend Student interface
        const transformedStudents = Array.isArray(studentsData) ? studentsData.map((s: any) => ({
          ...s,
          id: String(s.id),
          paymentStatus: s.payment_status || s.paymentStatus || 'Pending',
          onboardingStatus: s.onboarding_status || s.onboardingStatus || 'Not Started',
          discordRoleAssigned: s.discord_role_assigned || s.discordRoleAssigned || false,
          joinedDate: s.joined_date || s.joinedDate || new Date().toISOString().split('T')[0],
          dueDate: s.due_date || s.dueDate || new Date().toISOString().split('T')[0],
          timelineSteps: s.timeline_steps || s.timelineSteps || [],
        })) : [];
        setStudents(transformedStudents);
        if (transformedStudents.length > 0) {
          setSelectedStudent(transformedStudents[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load students:', error);
      // Add error notification
      const errorNotif: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        message: 'Failed to load students from server. Using offline mode.',
        type: 'error',
        time: 'Just now'
      };
      setNotifications(prev => [errorNotif, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = async (studentData: {
    name: string;
    email: string;
    discord_handle?: string;
    program_id: number;
    due_date: string;
  }) => {
    try {
      const response = await apiClient.createStudent(studentData);
      if (response.success && response.data) {
        const newStudent = response.data as Student;
        setStudents([newStudent, ...students]);
        setSelectedStudent(newStudent);
        
        const newNotif: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          message: `System Alert: ${newStudent.name} initialized for program ID ${newStudent.program_id}`,
          type: 'success',
          time: 'Just now'
        };
        setNotifications([newNotif, ...notifications]);
      }
    } catch (error) {
      console.error('Failed to add student:', error);
      const errorNotif: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        message: 'Failed to add student',
        type: 'error',
        time: 'Just now'
      };
      setNotifications([errorNotif, ...notifications]);
    }
  };

  const handleUpdateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const response = await apiClient.updateStudent(id, updates);
      if (response.success) {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
        if (selectedStudent?.id === id) {
          setSelectedStudent(prev => prev ? { ...prev, ...updates } : null);
        }
      }
    } catch (error) {
      console.error('Failed to update student:', error);
      const errorNotif: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        message: 'Failed to update student',
        type: 'error',
        time: 'Just now'
      };
      setNotifications([errorNotif, ...notifications]);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      const studentToRemove = students.find(s => s.id === id);
      const response = await apiClient.deleteStudent(id);
      if (response.success) {
        setStudents(students.filter(s => s.id !== id));
        if (selectedStudent?.id === id) setSelectedStudent(null);

        const newNotif: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          message: `Database Purge: ${studentToRemove?.name || 'Student record'} has been erased.`,
          type: 'warning',
          time: 'Just now'
        };
        setNotifications([newNotif, ...notifications]);
      }
    } catch (error) {
      console.error('Failed to delete student:', error);
      const errorNotif: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        message: 'Failed to delete student',
        type: 'error',
        time: 'Just now'
      };
      setNotifications([errorNotif, ...notifications]);
    }
  };

  const handleUpdateOnboardingStatus = async (id: string, status: 'Not Started' | 'In Progress' | 'Completed') => {
    try {
      const response = await apiClient.updateOnboardingStatus(id, status);
      if (response.success) {
        handleUpdateStudent(id, { onboardingStatus: status });
      }
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveNav('dashboard');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-lg">Loading...</div>
        </div>
      );
    }

    switch (activeNav) {
      case 'dashboard':
        return (
          <DashboardView 
            students={students} 
            selectedStudent={selectedStudent} 
            notifications={notifications}
            onSelectStudent={setSelectedStudent}
          />
        );
      case 'database':
        return (
          <DatabaseView 
            students={students}
            selectedStudentId={selectedStudent?.id}
            onSelectStudent={setSelectedStudent}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            onUpdateStudent={handleUpdateStudent}
          />
        );
      case 'payments':
        return <PaymentsView />;
      case 'logs':
        return <LogsView />;
      case 'status':
        return (
          <OnboardingView 
            students={students} 
            onUpdateStatus={handleUpdateOnboardingStatus}
            onDeleteStudent={handleDeleteStudent}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
          />
        );
      case 'roles':
        return <RoleAssignmentView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden tmt-gradient-bg selection:bg-tmt-emerald/30 selection:text-white">
      {/* Visual Grid Layer */}
      <div className="tmt-grid-overlay" />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden transition-all" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-[70] transform transition-all duration-500 md:relative md:translate-x-0 shrink-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}`}>
        <Sidebar 
          activeItem={activeNav} 
          onNavigate={(item) => { setActiveNav(item); setIsMobileMenuOpen(false); }}
          onLogout={handleLogout}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        <Header 
            title={activeNav === 'database' ? 'Personnel Database' : activeNav.replace(/([A-Z])/g, ' $1').toUpperCase()} 
            onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 min-h-0 relative bg-[#030906] overflow-y-auto overflow-x-hidden scrollbar-hide">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
