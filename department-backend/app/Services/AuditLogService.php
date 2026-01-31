<?php

namespace App\Services;

use App\Models\SystemLog;

class AuditLogService
{
    /**
     * Log a student action
     */
    public static function logStudentAction(string $action, array $data, ?int $studentId = null): SystemLog
    {
        $messages = [
            'created' => "New student '{$data['name']}' enrolled in the system",
            'updated' => "Student record '{$data['name']}' has been updated",
            'deleted' => "Student '{$data['name']}' removed from the database",
            'payment_updated' => "Payment status changed to '{$data['status']}' for {$data['name']}",
            'onboarding_updated' => "Onboarding status changed to '{$data['status']}' for {$data['name']}",
        ];

        $levels = [
            'created' => 'SUCCESS',
            'updated' => 'INFO',
            'deleted' => 'WARNING',
            'payment_updated' => $data['status'] === 'Paid' ? 'SUCCESS' : ($data['status'] === 'Failed' ? 'ERROR' : 'INFO'),
            'onboarding_updated' => $data['status'] === 'Completed' ? 'SUCCESS' : 'INFO',
        ];

        return SystemLog::create([
            'level' => $levels[$action] ?? 'INFO',
            'module' => 'Student',
            'message' => $messages[$action] ?? "Student action: {$action}",
            'context' => $data,
            'student_id' => $studentId,
            'ip_address' => request()->ip(),
        ]);
    }

    /**
     * Log a payment/transaction action
     */
    public static function logPaymentAction(string $action, array $data): SystemLog
    {
        $amount = isset($data['amount']) ? '$' . number_format($data['amount'], 2) : '';
        
        $messages = [
            'created' => "New payment of {$amount} recorded for {$data['student_name']} via {$data['method']}",
            'verified' => "Payment of {$amount} verified for {$data['student_name']}",
            'failed' => "Payment verification failed for {$data['student_name']}",
            'pending' => "Payment marked as pending for {$data['student_name']}",
            'deleted' => "Payment record deleted for {$data['student_name']}",
            'status_updated' => "Payment status changed to '{$data['status']}' for {$data['student_name']}",
        ];

        $levels = [
            'created' => 'INFO',
            'verified' => 'SUCCESS',
            'failed' => 'ERROR',
            'pending' => 'WARNING',
            'deleted' => 'WARNING',
            'status_updated' => $data['status'] === 'Verified' ? 'SUCCESS' : ($data['status'] === 'Failed' ? 'ERROR' : 'WARNING'),
        ];

        return SystemLog::create([
            'level' => $levels[$action] ?? 'INFO',
            'module' => 'Payment',
            'message' => $messages[$action] ?? "Payment action: {$action}",
            'context' => $data,
            'ip_address' => request()->ip(),
        ]);
    }

    /**
     * Log a system action
     */
    public static function logSystemAction(string $level, string $module, string $message, array $context = []): SystemLog
    {
        return SystemLog::create([
            'level' => $level,
            'module' => $module,
            'message' => $message,
            'context' => $context,
            'ip_address' => request()->ip(),
        ]);
    }

    /**
     * Log an authentication action
     */
    public static function logAuthAction(string $action, array $data): SystemLog
    {
        $messages = [
            'login' => "User '{$data['user']}' logged in successfully",
            'logout' => "User '{$data['user']}' logged out",
            'failed_login' => "Failed login attempt for '{$data['user']}'",
        ];

        $levels = [
            'login' => 'INFO',
            'logout' => 'INFO',
            'failed_login' => 'WARNING',
        ];

        return SystemLog::create([
            'level' => $levels[$action] ?? 'INFO',
            'module' => 'Auth',
            'message' => $messages[$action] ?? "Auth action: {$action}",
            'context' => $data,
            'ip_address' => request()->ip(),
        ]);
    }

    /**
     * Log a Discord action
     */
    public static function logDiscordAction(string $action, array $data): SystemLog
    {
        $messages = [
            'role_assigned' => "Discord role assigned to {$data['student_name']}",
            'role_removed' => "Discord role removed from {$data['student_name']}",
            'sync_failed' => "Failed to sync Discord role for {$data['student_name']}",
        ];

        $levels = [
            'role_assigned' => 'SUCCESS',
            'role_removed' => 'INFO',
            'sync_failed' => 'ERROR',
        ];

        return SystemLog::create([
            'level' => $levels[$action] ?? 'INFO',
            'module' => 'Discord',
            'message' => $messages[$action] ?? "Discord action: {$action}",
            'context' => $data,
            'ip_address' => request()->ip(),
        ]);
    }
}
