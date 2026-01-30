<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Transaction;
use App\Models\InquiryTheme;
use App\Models\ResponseMetric;
use App\Models\MessageVolume;
use App\Models\Insight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Get analytics overview
     */
    public function index()
    {
        // Student enrollment by program
        $enrollmentByProgram = Student::select('program_id', DB::raw('count(*) as count'))
            ->groupBy('program_id')
            ->with('program:id,name')
            ->get()
            ->map(function($item) {
                return [
                    'program' => $item->program->name ?? 'Unknown',
                    'count' => $item->count
                ];
            });

        // Payment status breakdown
        $paymentStats = [
            'paid' => Student::where('payment_status', 'Paid')->count(),
            'pending' => Student::where('payment_status', 'Pending')->count(),
            'failed' => Student::where('payment_status', 'Failed')->count()
        ];

        // Onboarding funnel
        $onboardingStats = [
            'not_started' => Student::where('onboarding_status', 'Not Started')->count(),
            'in_progress' => Student::where('onboarding_status', 'In Progress')->count(),
            'completed' => Student::where('onboarding_status', 'Completed')->count()
        ];

        // Weekly enrollment trend (last 4 weeks)
        $weeklyTrend = [];
        for ($i = 3; $i >= 0; $i--) {
            $startOfWeek = now()->subWeeks($i)->startOfWeek();
            $endOfWeek = now()->subWeeks($i)->endOfWeek();
            $weeklyTrend[] = [
                'week' => $startOfWeek->format('M d'),
                'count' => Student::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count()
            ];
        }

        // Discord sync rate
        $totalStudents = Student::count();
        $syncedStudents = Student::where('discord_role_assigned', true)->count();
        $discordSyncRate = $totalStudents > 0 ? round(($syncedStudents / $totalStudents) * 100) : 0;

        return response()->json([
            'success' => true,
            'data' => [
                'enrollment_by_program' => $enrollmentByProgram,
                'payment_stats' => $paymentStats,
                'onboarding_stats' => $onboardingStats,
                'weekly_trend' => $weeklyTrend,
                'discord_sync_rate' => $discordSyncRate,
                'total_students' => $totalStudents
            ]
        ]);
    }

    /**
     * Get inquiry themes
     */
    public function inquiryThemes()
    {
        $themes = InquiryTheme::active()
            ->mostCommon()
            ->limit(10)
            ->get();

        // If no data, seed with sample data
        if ($themes->isEmpty()) {
            $sampleThemes = [
                ['category' => 'Payment Issues', 'description' => 'Questions about payments and transactions', 'icon' => '💳', 'occurrence_count' => 45],
                ['category' => 'Access Problems', 'description' => 'Login and access related inquiries', 'icon' => '🔐', 'occurrence_count' => 32],
                ['category' => 'Discord Setup', 'description' => 'Discord role and connection issues', 'icon' => '🎮', 'occurrence_count' => 28],
                ['category' => 'Course Content', 'description' => 'Questions about course materials', 'icon' => '📚', 'occurrence_count' => 21],
                ['category' => 'Technical Support', 'description' => 'General technical assistance', 'icon' => '🔧', 'occurrence_count' => 18]
            ];

            foreach ($sampleThemes as $theme) {
                InquiryTheme::create($theme);
            }

            $themes = InquiryTheme::active()->mostCommon()->limit(10)->get();
        }

        return response()->json([
            'success' => true,
            'data' => $themes
        ]);
    }

    /**
     * Get response metrics
     */
    public function responseMetrics()
    {
        $metrics = ResponseMetric::latest()
            ->limit(10)
            ->get();

        // If no data, seed with sample data
        if ($metrics->isEmpty()) {
            $sampleMetrics = [
                ['label' => 'FB Page Response Rate', 'value' => '31.70%', 'trend' => 'dropped', 'delta' => '-56.09%', 'is_time' => false, 'recorded_date' => today()],
                ['label' => 'FB Page Response Time', 'value' => '3h 48m', 'trend' => 'dropped', 'delta' => '+1h 51m', 'is_time' => true, 'recorded_date' => today()],
                ['label' => 'Email Response Rate', 'value' => '89.50%', 'trend' => 'improved', 'delta' => '+5.2%', 'is_time' => false, 'recorded_date' => today()],
                ['label' => 'Email Response Time', 'value' => '45m', 'trend' => 'improved', 'delta' => '-15m', 'is_time' => true, 'recorded_date' => today()]
            ];

            foreach ($sampleMetrics as $metric) {
                ResponseMetric::create($metric);
            }

            $metrics = ResponseMetric::latest()->limit(10)->get();
        }

        return response()->json([
            'success' => true,
            'data' => $metrics
        ]);
    }

    /**
     * Get message volumes
     */
    public function messageVolumes()
    {
        $volumes = MessageVolume::latest()
            ->limit(7)
            ->get();

        // If no data, seed with sample data
        if ($volumes->isEmpty()) {
            for ($i = 6; $i >= 0; $i--) {
                MessageVolume::create([
                    'today_count' => rand(80, 200),
                    'week_count' => rand(500, 1500),
                    'trend' => rand(0, 1) ? 'up' : 'down',
                    'is_peak_season' => false,
                    'recorded_date' => today()->subDays($i)
                ]);
            }

            $volumes = MessageVolume::latest()->limit(7)->get();
        }

        return response()->json([
            'success' => true,
            'data' => $volumes
        ]);
    }

    /**
     * Get insights
     */
    public function insights()
    {
        $insights = Insight::active()
            ->byPriority()
            ->get();

        // If no data, seed with sample data
        if ($insights->isEmpty()) {
            $sampleInsights = [
                ['text' => 'Student enrollment up 12% this week', 'type' => 'info', 'priority' => 1],
                ['text' => '15 payments pending verification', 'type' => 'alert', 'priority' => 2],
                ['text' => 'Discord sync rate at 94%', 'type' => 'success', 'priority' => 0]
            ];

            foreach ($sampleInsights as $insight) {
                Insight::create($insight);
            }

            $insights = Insight::active()->byPriority()->get();
        }

        return response()->json([
            'success' => true,
            'data' => $insights
        ]);
    }

    /**
     * Export report data
     */
    public function export(Request $request)
    {
        $type = $request->get('type', 'students');
        
        switch ($type) {
            case 'students':
                $data = Student::with('program')->get();
                break;
            case 'payments':
                $data = Transaction::with('student')->get();
                break;
            case 'inquiry_themes':
                $data = InquiryTheme::all();
                break;
            default:
                $data = [];
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
