<?php

use App\Http\Controllers\Api\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

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

// User info (authenticated)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
