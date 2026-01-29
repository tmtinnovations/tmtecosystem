
import React from 'react';
import { Notification } from '../types';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationPanelProps {
  notifications: Notification[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications }) => {
  return (
    <div className="bg-tmt-black/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-tmt-emerald" />
            Global Activity
        </h3>
        <span className="text-[10px] text-tmt-emerald font-black uppercase tracking-widest cursor-pointer hover:text-white transition-colors">View Logs</span>
      </div>
      
      <div className="divide-y divide-white/10">
        {notifications.map((notif) => {
          let Icon = Info;
          let iconColor = 'text-blue-300';
          let bgIcon = 'bg-blue-500/20';

          if (notif.type === 'success') {
            Icon = CheckCircle;
            iconColor = 'text-tmt-emerald';
            bgIcon = 'bg-tmt-emerald/20';
          } else if (notif.type === 'warning') {
            Icon = AlertTriangle;
            iconColor = 'text-amber-300';
            bgIcon = 'bg-amber-500/20';
          }

          return (
            <div key={notif.id} className="p-4 hover:bg-white/10 transition-colors flex gap-3 group cursor-default">
              <div className={`w-10 h-10 rounded-xl ${bgIcon} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-white/10`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white leading-snug font-bold group-hover:text-tmt-emerald transition-colors">{notif.message}</p>
                <p className="text-[10px] text-gray-300 mt-1 font-black uppercase tracking-wider">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPanel;
