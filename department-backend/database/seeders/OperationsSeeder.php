<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OperationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Response Metrics
        $metrics = [
            ['label' => 'FB Page Response Rate', 'value' => '31.70%', 'trend' => 'dropped', 'delta' => '-56.09%', 'is_time' => false],
            ['label' => 'FB Page Response Time', 'value' => '3h 48m', 'trend' => 'dropped', 'delta' => '+1h 51m', 'is_time' => true],
            ['label' => 'FB Group/IG Resp. Rate', 'value' => '0.00%', 'trend' => 'dropped', 'delta' => '-100%', 'is_time' => false],
            ['label' => 'FB Group/IG Resp. Time', 'value' => '0m', 'trend' => 'neutral', 'delta' => '0', 'is_time' => true],
        ];

        foreach ($metrics as $metric) {
            DB::table('response_metrics')->insert([
                'label' => $metric['label'],
                'value' => $metric['value'],
                'trend' => $metric['trend'],
                'delta' => $metric['delta'],
                'is_time' => $metric['is_time'],
                'recorded_date' => now()->toDateString(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Message Volumes
        DB::table('message_volumes')->insert([
            'today_count' => 492,
            'week_count' => 2002,
            'trend' => 'up',
            'is_peak_season' => true,
            'recorded_date' => now()->toDateString(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Inquiry Themes
        $inquiries = [
            ['category' => 'Get Funded next steps', 'description' => 'Upon paying, what is the next step?', 'icon' => '💬'],
            ['category' => 'Backtesting / TradingView', 'description' => 'Is there free backtesting on Discord?', 'icon' => '❓'],
            ['category' => 'Live session schedule', 'description' => 'Where is the live session today?', 'icon' => '📅'],
            ['category' => 'Promo inquiries', 'description' => 'Can the Black Friday promo be extended?', 'icon' => '🏷️'],
            ['category' => 'Discord onboarding', 'description' => 'How do I change my server name?', 'icon' => '🔧'],
            ['category' => 'International customers', 'description' => 'Can I join from another country?', 'icon' => '🌍'],
        ];

        foreach ($inquiries as $inquiry) {
            DB::table('inquiry_themes')->insert([
                'category' => $inquiry['category'],
                'description' => $inquiry['description'],
                'icon' => $inquiry['icon'],
                'occurrence_count' => rand(10, 150),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Insights
        $insights = [
            ['text' => 'Response rate drops due to high volume of new conversation threads.', 'type' => 'alert', 'priority' => 1],
            ['text' => 'Automated replies do NOT count as valid responses (Meta rule).', 'type' => 'info', 'priority' => 2],
            ['text' => 'Message overflow causes manual response delays.', 'type' => 'alert', 'priority' => 3],
            ['text' => 'Inquiries are longer and more technical this season.', 'type' => 'info', 'priority' => 4],
            ['text' => 'Human replies define the real response time metrics.', 'type' => 'success', 'priority' => 5],
        ];

        foreach ($insights as $insight) {
            DB::table('insights')->insert([
                'text' => $insight['text'],
                'type' => $insight['type'],
                'is_active' => true,
                'priority' => $insight['priority'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
