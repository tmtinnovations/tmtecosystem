<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\TimelineStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OnboardingController extends Controller
{
    /**
     * Get all students with their onboarding status
     */
    public function index(Request $request)
    {
        $query = Student::with('timelineSteps');

        // Filter by onboarding status
        if ($request->has('status') && $request->status !== 'All') {
            $query->where('onboarding_status', $request->status);
        }

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $students = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $students
        ]);
    }

    /**
     * Get onboarding statistics
     */
    public function stats()
    {
        $total = Student::count();
        $notStarted = Student::where('onboarding_status', 'Not Started')->count();
        $inProgress = Student::where('onboarding_status', 'In Progress')->count();
        $completed = Student::where('onboarding_status', 'Completed')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'not_started' => $notStarted,
                'in_progress' => $inProgress,
                'completed' => $completed,
                'completion_rate' => $total > 0 ? round(($completed / $total) * 100) : 0
            ]
        ]);
    }

    /**
     * Update student onboarding status
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'onboarding_status' => 'required|in:Not Started,In Progress,Completed'
        ]);

        $student = Student::findOrFail($id);
        $student->onboarding_status = $validated['onboarding_status'];
        $student->save();

        return response()->json([
            'success' => true,
            'message' => 'Onboarding status updated successfully',
            'data' => $student
        ]);
    }

    /**
     * Get timeline steps for a student
     */
    public function getTimeline($studentId)
    {
        $student = Student::with('timelineSteps')->findOrFail($studentId);

        return response()->json([
            'success' => true,
            'data' => $student->timelineSteps
        ]);
    }

    /**
     * Update a timeline step
     */
    public function updateTimelineStep(Request $request, $studentId, $stepId)
    {
        $validated = $request->validate([
            'completed' => 'required|boolean'
        ]);

        $step = TimelineStep::where('student_id', $studentId)
            ->where('id', $stepId)
            ->firstOrFail();

        $step->completed = $validated['completed'];
        $step->completed_at = $validated['completed'] ? now() : null;
        $step->save();

        // Update student onboarding status based on timeline completion
        $student = Student::findOrFail($studentId);
        $totalSteps = TimelineStep::where('student_id', $studentId)->count();
        $completedSteps = TimelineStep::where('student_id', $studentId)->where('completed', true)->count();

        if ($completedSteps === 0) {
            $student->onboarding_status = 'Not Started';
        } elseif ($completedSteps === $totalSteps) {
            $student->onboarding_status = 'Completed';
        } else {
            $student->onboarding_status = 'In Progress';
        }
        $student->save();

        return response()->json([
            'success' => true,
            'message' => 'Timeline step updated successfully',
            'data' => $step
        ]);
    }
}
