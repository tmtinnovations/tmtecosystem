import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CreditCard, UserPlus, AlertTriangle } from 'lucide-react';
import { Student } from '../types';

interface DataCalendarProps {
  students: Student[];
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'enrollment' | 'payment_due' | 'deadline' | 'reminder';
  color: string;
  student?: Student;
}

const DataCalendar: React.FC<DataCalendarProps> = ({ students }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate calendar events from student data
  const events = useMemo(() => {
    const calendarEvents: CalendarEvent[] = [];

    students.forEach(student => {
      // Add enrollment date
      if (student.joinedDate) {
        calendarEvents.push({
          id: `enrollment-${student.id}`,
          title: `${student.name} enrolled`,
          date: new Date(student.joinedDate),
          type: 'enrollment',
          color: 'bg-emerald-500',
          student
        });
      }

      // Add payment due dates
      if (student.dueDate && student.paymentStatus !== 'Paid') {
        calendarEvents.push({
          id: `payment-${student.id}`,
          title: `Payment due - ${student.name}`,
          date: new Date(student.dueDate),
          type: 'payment_due',
          color: 'bg-amber-500',
          student
        });
      }

      // Add overdue payments as alerts
      if (student.dueDate && student.paymentStatus === 'Failed') {
        calendarEvents.push({
          id: `overdue-${student.id}`,
          title: `Overdue - ${student.name}`,
          date: new Date(student.dueDate),
          type: 'deadline',
          color: 'bg-rose-500',
          student
        });
      }

      // Add onboarding reminders for students not started after 3 days
      if (student.onboardingStatus === 'Not Started' && student.joinedDate) {
        const reminderDate = new Date(student.joinedDate);
        reminderDate.setDate(reminderDate.getDate() + 3);
        calendarEvents.push({
          id: `reminder-${student.id}`,
          title: `Follow up - ${student.name}`,
          date: reminderDate,
          type: 'reminder',
          color: 'bg-blue-500',
          student
        });
      }
    });

    return calendarEvents;
  }, [students]);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-semibold text-white">Activity Calendar</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateMonth('prev')}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </button>
          <span className="text-sm font-semibold text-white min-w-[120px] text-center">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={() => navigateMonth('next')}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs font-semibold text-gray-400 text-center py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((date, index) => {
          const dayEvents = date ? getEventsForDate(date) : [];
          const isSelected = selectedDate && date && 
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();

          return (
            <div 
              key={index} 
              className={`
                aspect-square p-1 rounded-lg cursor-pointer transition-all relative
                ${date ? 'hover:bg-white/5' : ''}
                ${isSelected ? 'bg-purple-500/20 border border-purple-400/30' : ''}
                ${isToday(date) ? 'ring-1 ring-emerald-400/50' : ''}
              `}
              onClick={() => date && setSelectedDate(date)}
            >
              {date && (
                <>
                  <div className={`
                    text-xs font-medium text-center
                    ${isToday(date) ? 'text-emerald-400' : 'text-gray-300'}
                    ${isSelected ? 'text-white' : ''}
                  `}>
                    {date.getDate()}
                  </div>
                  
                  {/* Event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {dayEvents.slice(0, 3).map((event, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${event.color}`}
                          title={event.title}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-gray-400">Enrollments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-gray-400">Due Dates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-gray-400">Overdue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-gray-400">Reminders</span>
          </div>
        </div>

        {/* Selected date events */}
        {selectedEvents.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-white/5">
            <h4 className="text-sm font-semibold text-white mb-2">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <div className="space-y-2">
              {selectedEvents.map(event => (
                <div key={event.id} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${event.color}`} />
                  <span className="text-gray-300">{event.title}</span>
                  {event.student && (
                    <span className="text-gray-500">
                      ({event.student.program_id ? `Program ${event.student.program_id}` : 'No Program'})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCalendar;