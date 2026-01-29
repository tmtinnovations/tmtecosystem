<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SystemLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $logs = [
            ['level' => 'INFO', 'module' => 'Auth', 'message' => 'User Alex Johnson logged in successfully from authorized IP.'],
            ['level' => 'SUCCESS', 'module' => 'Payment', 'message' => 'Webhook received: Stripe payment confirmed for transaction #TRX-9932.'],
            ['level' => 'SUCCESS', 'module' => 'Onboarding', 'message' => 'Welcome email and course access credentials sent to j.lee@example.com.'],
            ['level' => 'ERROR', 'module' => 'Discord', 'message' => 'Failed to assign role "Elite Member" to user ID 88291. Discord API returned 504 Gateway Timeout.'],
            ['level' => 'INFO', 'module' => 'System', 'message' => 'Daily database redundancy backup completed successfully.'],
            ['level' => 'WARNING', 'module' => 'Payment', 'message' => 'Manual verification pending for high-value crypto transaction #TRX-9931.'],
            ['level' => 'INFO', 'module' => 'Cron', 'message' => 'Starting scheduled sync for Discord roles...'],
            ['level' => 'ERROR', 'module' => 'API', 'message' => 'Connection refused to external meta-data provider. Retrying in 30s.'],
            ['level' => 'SUCCESS', 'module' => 'Payment', 'message' => 'PayPal IPN verified for transaction #TRX-9929.'],
            ['level' => 'INFO', 'module' => 'System', 'message' => 'Automated reminder emails sent to 4 students with upcoming due dates.'],
        ];

        foreach ($logs as $index => $log) {
            DB::table('system_logs')->insert([
                'level' => $log['level'],
                'module' => $log['module'],
                'message' => $log['message'],
                'context' => null,
                'ip_address' => '192.168.1.' . rand(1, 255),
                'created_at' => now()->subMinutes($index * 5),
                'updated_at' => now()->subMinutes($index * 5),
            ]);
        }
    }
}
