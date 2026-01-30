<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SystemLog;
use Illuminate\Http\Request;

class SystemLogController extends Controller
{
    /**
     * Get all system logs
     */
    public function index(Request $request)
    {
        $query = SystemLog::with(['user', 'student']);

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('message', 'like', "%{$search}%")
                  ->orWhere('module', 'like', "%{$search}%");
            });
        }

        // Level filter
        if ($request->has('level') && $request->level !== 'All') {
            $query->byLevel($request->level);
        }

        // Module filter
        if ($request->has('module') && $request->module !== 'All') {
            $query->byModule($request->module);
        }

        $logs = $query->orderBy('created_at', 'desc')->limit(100)->get();

        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }

    /**
     * Store a new log entry
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'level' => 'required|in:INFO,SUCCESS,WARNING,ERROR',
            'module' => 'required|string|max:255',
            'message' => 'required|string',
            'context' => 'nullable|array',
            'user_id' => 'nullable|exists:users,id',
            'student_id' => 'nullable|exists:students,id'
        ]);

        $log = SystemLog::create([
            'level' => $validated['level'],
            'module' => $validated['module'],
            'message' => $validated['message'],
            'context' => $validated['context'] ?? null,
            'ip_address' => $request->ip(),
            'user_id' => $validated['user_id'] ?? null,
            'student_id' => $validated['student_id'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Log entry created successfully',
            'data' => $log
        ], 201);
    }

    /**
     * Show a single log entry
     */
    public function show($id)
    {
        $log = SystemLog::with(['user', 'student'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $log
        ]);
    }

    /**
     * Clear old logs (older than 30 days)
     */
    public function clear()
    {
        $deleted = SystemLog::where('created_at', '<', now()->subDays(30))->delete();

        return response()->json([
            'success' => true,
            'message' => "Cleared {$deleted} old log entries"
        ]);
    }

    /**
     * Get log statistics
     */
    public function stats()
    {
        $stats = [
            'total' => SystemLog::count(),
            'errors' => SystemLog::errors()->count(),
            'warnings' => SystemLog::warnings()->count(),
            'today' => SystemLog::whereDate('created_at', today())->count(),
            'by_module' => SystemLog::select('module')
                ->selectRaw('count(*) as count')
                ->groupBy('module')
                ->get()
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
