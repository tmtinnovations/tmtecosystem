<?php

use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\SystemLogController;
use App\Http\Controllers\Api\OnboardingController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\SettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Dashboard Routes
Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);         // GET /api/dashboard
});

// Student Routes
Route::prefix('students')->group(function () {
    Route::get('/', [StudentController::class, 'index']);           // GET /api/students
    Route::post('/', [StudentController::class, 'store']);          // POST /api/students
    Route::get('/stats', [StudentController::class, 'stats']);      // GET /api/students/stats
    Route::post('/bulk-update', [StudentController::class, 'bulkUpdate']); // POST /api/students/bulk-update
    Route::get('/{id}', [StudentController::class, 'show']);        // GET /api/students/{id}
    Route::put('/{id}', [StudentController::class, 'update']);      // PUT /api/students/{id}
    Route::delete('/{id}', [StudentController::class, 'destroy']);  // DELETE /api/students/{id}
    Route::patch('/{id}/onboarding-status', [StudentController::class, 'updateOnboardingStatus']); // PATCH /api/students/{id}/onboarding-status
    Route::patch('/{studentId}/timeline/{stepId}', [StudentController::class, 'updateTimelineStep']); // PATCH /api/students/{studentId}/timeline/{stepId}
});

// Transaction/Payments Routes
Route::prefix('transactions')->group(function () {
    Route::get('/', [TransactionController::class, 'index']);           // GET /api/transactions
    Route::post('/', [TransactionController::class, 'store']);          // POST /api/transactions
    Route::get('/stats', [TransactionController::class, 'stats']);      // GET /api/transactions/stats
    Route::patch('/{id}/status', [TransactionController::class, 'updateStatus']); // PATCH /api/transactions/{id}/status
    Route::delete('/{id}', [TransactionController::class, 'destroy']);  // DELETE /api/transactions/{id}
});

// System Logs Routes
Route::prefix('logs')->group(function () {
    Route::get('/', [SystemLogController::class, 'index']);             // GET /api/logs
    Route::post('/', [SystemLogController::class, 'store']);            // POST /api/logs
    Route::get('/stats', [SystemLogController::class, 'stats']);        // GET /api/logs/stats
    Route::get('/{id}', [SystemLogController::class, 'show']);          // GET /api/logs/{id}
    Route::delete('/clear', [SystemLogController::class, 'clear']);     // DELETE /api/logs/clear
});

// Onboarding Routes
Route::prefix('onboarding')->group(function () {
    Route::get('/', [OnboardingController::class, 'index']);            // GET /api/onboarding
    Route::get('/stats', [OnboardingController::class, 'stats']);       // GET /api/onboarding/stats
    Route::patch('/{id}/status', [OnboardingController::class, 'updateStatus']); // PATCH /api/onboarding/{id}/status
    Route::get('/{studentId}/timeline', [OnboardingController::class, 'getTimeline']); // GET /api/onboarding/{studentId}/timeline
    Route::patch('/{studentId}/timeline/{stepId}', [OnboardingController::class, 'updateTimelineStep']); // PATCH /api/onboarding/{studentId}/timeline/{stepId}
});

// Role Management Routes
Route::prefix('roles')->group(function () {
    Route::get('/', [RoleController::class, 'index']);                  // GET /api/roles
    Route::post('/', [RoleController::class, 'store']);                 // POST /api/roles
    Route::put('/{id}', [RoleController::class, 'update']);             // PUT /api/roles/{id}
    Route::delete('/{id}', [RoleController::class, 'destroy']);         // DELETE /api/roles/{id}
    Route::get('/users', [RoleController::class, 'getUsers']);          // GET /api/roles/users
    Route::patch('/users/{userId}', [RoleController::class, 'updateUserRole']); // PATCH /api/roles/users/{userId}
});

// Reports/Analytics Routes
Route::prefix('reports')->group(function () {
    Route::get('/', [ReportController::class, 'index']);                // GET /api/reports
    Route::get('/inquiry-themes', [ReportController::class, 'inquiryThemes']); // GET /api/reports/inquiry-themes
    Route::get('/response-metrics', [ReportController::class, 'responseMetrics']); // GET /api/reports/response-metrics
    Route::get('/message-volumes', [ReportController::class, 'messageVolumes']); // GET /api/reports/message-volumes
    Route::get('/insights', [ReportController::class, 'insights']);     // GET /api/reports/insights
    Route::get('/export', [ReportController::class, 'export']);         // GET /api/reports/export
});

// Settings Routes
Route::prefix('settings')->group(function () {
    Route::get('/', [SettingsController::class, 'index']);              // GET /api/settings
    Route::put('/', [SettingsController::class, 'update']);             // PUT /api/settings
    Route::get('/notifications', [SettingsController::class, 'getNotifications']); // GET /api/settings/notifications
    Route::post('/notifications', [SettingsController::class, 'storeNotification']); // POST /api/settings/notifications
    Route::patch('/notifications/{id}/read', [SettingsController::class, 'markAsRead']); // PATCH /api/settings/notifications/{id}/read
    Route::patch('/notifications/read-all', [SettingsController::class, 'markAllAsRead']); // PATCH /api/settings/notifications/read-all
    Route::delete('/notifications/{id}', [SettingsController::class, 'deleteNotification']); // DELETE /api/settings/notifications/{id}
    Route::delete('/notifications', [SettingsController::class, 'clearNotifications']); // DELETE /api/settings/notifications
    Route::post('/clear-cache', [SettingsController::class, 'clearCache']); // POST /api/settings/clear-cache
});

// User info (authenticated)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
