<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Get all transactions (payments)
     */
    public function index(Request $request)
    {
        $query = DB::table('transactions');

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('student_name', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->has('status') && $request->status !== 'All') {
            $query->where('status', $request->status);
        }

        // Method filter
        if ($request->has('method') && $request->method !== 'All') {
            $query->where('method', $request->method);
        }

        $transactions = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $transactions
        ]);
    }

    /**
     * Store a new transaction
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|in:Stripe,PayPal,Bank Transfer,Crypto',
            'status' => 'required|in:Verified,Pending,Failed'
        ]);

        $id = DB::table('transactions')->insertGetId([
            'student_name' => $validated['student_name'],
            'amount' => $validated['amount'],
            'method' => $validated['method'],
            'status' => $validated['status'],
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $transaction = DB::table('transactions')->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Transaction created successfully',
            'data' => $transaction
        ], 201);
    }

    /**
     * Update transaction status
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Verified,Pending,Failed'
        ]);

        DB::table('transactions')
            ->where('id', $id)
            ->update([
                'status' => $validated['status'],
                'updated_at' => now()
            ]);

        $transaction = DB::table('transactions')->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Transaction status updated successfully',
            'data' => $transaction
        ]);
    }

    /**
     * Delete a transaction
     */
    public function destroy($id)
    {
        DB::table('transactions')->where('id', $id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Transaction deleted successfully'
        ]);
    }

    /**
     * Get transaction statistics
     */
    public function stats()
    {
        $verified = DB::table('transactions')->where('status', 'Verified')->sum('amount');
        $pending = DB::table('transactions')->where('status', 'Pending')->sum('amount');
        $failed = DB::table('transactions')->where('status', 'Failed')->sum('amount');

        return response()->json([
            'success' => true,
            'data' => [
                'verified_total' => $verified,
                'pending_total' => $pending,
                'failed_total' => $failed
            ]
        ]);
    }
}
