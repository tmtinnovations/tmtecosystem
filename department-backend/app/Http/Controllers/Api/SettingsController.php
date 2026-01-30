<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingsController extends Controller
{
    /**
     * Get all settings/notifications
     */
    public function index()
    {
        $notifications = Notification::orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        // System configuration (can be stored in cache or a settings table)
        $config = [
            'app_name' => 'TMT Department',
            'timezone' => 'UTC',
            'discord_webhook_enabled' => true,
            'email_notifications_enabled' => true,
            'auto_sync_interval' => 30, // minutes
            'maintenance_mode' => false
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'notifications' => $notifications,
                'config' => $config
            ]
        ]);
    }

    /**
     * Update system configuration
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string',
            'value' => 'required'
        ]);

        // Store in cache (or you could create a settings table)
        Cache::forever('setting_' . $validated['key'], $validated['value']);

        return response()->json([
            'success' => true,
            'message' => 'Setting updated successfully'
        ]);
    }

    /**
     * Get notifications
     */
    public function getNotifications()
    {
        $notifications = Notification::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notifications
        ]);
    }

    /**
     * Store a new notification
     */
    public function storeNotification(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'type' => 'required|in:success,warning,info,error',
            'user_id' => 'nullable|exists:users,id'
        ]);

        $notification = Notification::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Notification created successfully',
            'data' => $notification
        ], 201);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read'
        ]);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead()
    {
        Notification::unread()->update([
            'is_read' => true,
            'read_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read'
        ]);
    }

    /**
     * Delete a notification
     */
    public function deleteNotification($id)
    {
        Notification::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notification deleted'
        ]);
    }

    /**
     * Clear all notifications
     */
    public function clearNotifications()
    {
        Notification::truncate();

        return response()->json([
            'success' => true,
            'message' => 'All notifications cleared'
        ]);
    }

    /**
     * Clear cache
     */
    public function clearCache()
    {
        Cache::flush();

        return response()->json([
            'success' => true,
            'message' => 'Cache cleared successfully'
        ]);
    }
}
