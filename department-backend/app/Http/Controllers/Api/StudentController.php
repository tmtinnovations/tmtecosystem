<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\TimelineStep;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of students.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Student::with(['program', 'timelineSteps', 'discordRole']);

        // Filter by payment status
        if ($request->has('payment_status')) {
            $query->byPaymentStatus($request->payment_status);
        }

        // Filter by onboarding status
        if ($request->has('onboarding_status')) {
            $query->byOnboardingStatus($request->onboarding_status);
        }

        // Filter by program
        if ($request->has('program_id')) {
            $query->where('program_id', $request->program_id);
        }

        // Filter overdue
        if ($request->boolean('overdue')) {
            $query->overdue();
        }

        // Filter due soon
        if ($request->has('due_soon')) {
            $query->dueSoon((int) $request->due_soon);
        }

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $students = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $students,
        ]);
    }

    /**
     * Store a newly created student.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'discord_handle' => 'nullable|string|max:255',
            'program_id' => 'required|exists:programs,id',
            'payment_status' => 'sometimes|in:Paid,Pending,Failed',
            'onboarding_status' => 'sometimes|in:Not Started,In Progress,Completed',
            'joined_date' => 'sometimes|date',
            'due_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            $student = Student::create([
                'name' => $request->name,
                'email' => $request->email,
                'discord_handle' => $request->discord_handle,
                'program_id' => $request->program_id,
                'payment_status' => $request->payment_status ?? 'Pending',
                'onboarding_status' => $request->onboarding_status ?? 'Not Started',
                'discord_role_assigned' => false,
                'joined_date' => $request->joined_date ?? now()->toDateString(),
                'due_date' => $request->due_date,
            ]);

            // Create default timeline steps
            $defaultSteps = [
                ['label' => 'Form Submitted', 'status' => 'completed', 'timestamp_label' => now()->format('h:i A'), 'sort_order' => 1],
                ['label' => 'Payment Verification', 'status' => 'current', 'timestamp_label' => 'Awaiting...', 'sort_order' => 2],
                ['label' => 'Auto Logged', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 3],
                ['label' => 'Role Assigned', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 4],
            ];

            foreach ($defaultSteps as $step) {
                $student->timelineSteps()->create($step);
            }

            DB::commit();

            $student->load(['program', 'timelineSteps']);

            // Log the student creation
            AuditLogService::logStudentAction('created', [
                'name' => $student->name,
                'email' => $student->email,
                'program_id' => $student->program_id,
            ], $student->id);

            return response()->json([
                'success' => true,
                'message' => 'Student created successfully',
                'data' => $student,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create student',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified student.
     */
    public function show(string $id): JsonResponse
    {
        $student = Student::with(['program', 'timelineSteps', 'transactions', 'discordRole'])
            ->where('id', $id)
            ->orWhere('uuid', $id)
            ->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $student,
        ]);
    }

    /**
     * Update the specified student.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $student = Student::where('id', $id)->orWhere('uuid', $id)->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:students,email,' . $student->id,
            'discord_handle' => 'nullable|string|max:255',
            'program_id' => 'sometimes|exists:programs,id',
            'payment_status' => 'sometimes|in:Paid,Pending,Failed',
            'onboarding_status' => 'sometimes|in:Not Started,In Progress,Completed',
            'discord_role_assigned' => 'sometimes|boolean',
            'joined_date' => 'sometimes|date',
            'due_date' => 'sometimes|date',
            'last_reminder_sent' => 'sometimes|nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $oldData = $student->toArray();
            
            $student->update($request->only([
                'name',
                'email',
                'discord_handle',
                'program_id',
                'payment_status',
                'onboarding_status',
                'discord_role_assigned',
                'joined_date',
                'due_date',
                'last_reminder_sent',
            ]));

            $student->load(['program', 'timelineSteps']);

            // Log the student update
            AuditLogService::logStudentAction('updated', [
                'name' => $student->name,
                'email' => $student->email,
                'changes' => array_diff_assoc($student->toArray(), $oldData),
            ], $student->id);

            // Log specific status changes
            if ($request->has('payment_status') && $oldData['payment_status'] !== $request->payment_status) {
                AuditLogService::logStudentAction('payment_updated', [
                    'name' => $student->name,
                    'status' => $request->payment_status,
                    'previous_status' => $oldData['payment_status'],
                ], $student->id);
            }

            if ($request->has('onboarding_status') && $oldData['onboarding_status'] !== $request->onboarding_status) {
                AuditLogService::logStudentAction('onboarding_updated', [
                    'name' => $student->name,
                    'status' => $request->onboarding_status,
                    'previous_status' => $oldData['onboarding_status'],
                ], $student->id);
            }

            return response()->json([
                'success' => true,
                'message' => 'Student updated successfully',
                'data' => $student,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update student',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified student.
     */
    public function destroy(string $id): JsonResponse
    {
        $student = Student::where('id', $id)->orWhere('uuid', $id)->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student not found',
            ], 404);
        }

        try {
            $studentName = $student->name;
            $studentEmail = $student->email;
            
            $student->delete(); // Soft delete

            // Log the student deletion
            AuditLogService::logStudentAction('deleted', [
                'name' => $studentName,
                'email' => $studentEmail,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Student deleted successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete student',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update student's onboarding status.
     */
    public function updateOnboardingStatus(Request $request, string $id): JsonResponse
    {
        $student = Student::where('id', $id)->orWhere('uuid', $id)->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'onboarding_status' => 'required|in:Not Started,In Progress,Completed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $student->update(['onboarding_status' => $request->onboarding_status]);

        return response()->json([
            'success' => true,
            'message' => 'Onboarding status updated successfully',
            'data' => $student,
        ]);
    }

    /**
     * Update a timeline step for a student.
     */
    public function updateTimelineStep(Request $request, string $studentId, string $stepId): JsonResponse
    {
        $student = Student::where('id', $studentId)->orWhere('uuid', $studentId)->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student not found',
            ], 404);
        }

        $step = $student->timelineSteps()->find($stepId);

        if (!$step) {
            return response()->json([
                'success' => false,
                'message' => 'Timeline step not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|in:completed,current,pending,failed',
            'timestamp_label' => 'sometimes|nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $step->update($request->only(['status', 'timestamp_label']));

        return response()->json([
            'success' => true,
            'message' => 'Timeline step updated successfully',
            'data' => $step,
        ]);
    }

    /**
     * Get dashboard statistics.
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total_students' => Student::count(),
            'new_payments' => Student::byPaymentStatus('Paid')
                ->whereDate('created_at', now()->toDateString())
                ->count(),
            'students_auto_logged' => Student::where('onboarding_status', '!=', 'Not Started')->count(),
            'pending_verifications' => Student::byPaymentStatus('Pending')->count(),
            'failed_automations' => Student::byPaymentStatus('Failed')->count(),
            'overdue_students' => Student::overdue()->count(),
            'due_soon_students' => Student::dueSoon(7)->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Bulk update students.
     */
    public function bulkUpdate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:students,id',
            'payment_status' => 'sometimes|in:Paid,Pending,Failed',
            'onboarding_status' => 'sometimes|in:Not Started,In Progress,Completed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $updateData = $request->only(['payment_status', 'onboarding_status']);

        if (empty($updateData)) {
            return response()->json([
                'success' => false,
                'message' => 'No update data provided',
            ], 422);
        }

        Student::whereIn('id', $request->ids)->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Students updated successfully',
        ]);
    }
}
