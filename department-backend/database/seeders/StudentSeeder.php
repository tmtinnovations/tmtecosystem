<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Alex Johnson',
                'email' => 'alex.j@example.com',
                'discord_handle' => 'alex_trader#9921',
                'program' => 'Get Funded',
                'payment_status' => 'Paid',
                'onboarding_status' => 'Completed',
                'discord_role_assigned' => true,
                'joined_date' => '2023-10-25',
                'due_date' => now()->addDays(15)->toDateString(),
                'last_reminder_sent' => '2023-11-01',
                'timeline_steps' => [
                    ['label' => 'Payment Received', 'status' => 'completed', 'timestamp_label' => '10:00 AM', 'sort_order' => 1],
                    ['label' => 'Auto Logged', 'status' => 'completed', 'timestamp_label' => '10:01 AM', 'sort_order' => 2],
                    ['label' => 'Role Assigned', 'status' => 'completed', 'timestamp_label' => '10:02 AM', 'sort_order' => 3],
                    ['label' => 'Student Notified', 'status' => 'completed', 'timestamp_label' => '10:02 AM', 'sort_order' => 4],
                ],
            ],
            [
                'name' => 'Sarah Williams',
                'email' => 'sarah.w@example.com',
                'discord_handle' => 'sarah_w#1122',
                'program' => 'TAT',
                'payment_status' => 'Paid',
                'onboarding_status' => 'In Progress',
                'discord_role_assigned' => false,
                'joined_date' => '2023-10-26',
                'due_date' => now()->addDays(3)->toDateString(),
                'last_reminder_sent' => now()->subDay()->toDateTimeString(),
                'timeline_steps' => [
                    ['label' => 'Payment Received', 'status' => 'completed', 'timestamp_label' => '09:15 AM', 'sort_order' => 1],
                    ['label' => 'Auto Logged', 'status' => 'completed', 'timestamp_label' => '09:16 AM', 'sort_order' => 2],
                    ['label' => 'Role Assigned', 'status' => 'current', 'timestamp_label' => 'Processing...', 'sort_order' => 3],
                    ['label' => 'Student Notified', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 4],
                ],
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'm.brown@example.com',
                'discord_handle' => 'mike_b_88',
                'program' => 'Premium',
                'payment_status' => 'Failed',
                'onboarding_status' => 'Not Started',
                'discord_role_assigned' => false,
                'joined_date' => '2023-10-26',
                'due_date' => now()->toDateString(),
                'last_reminder_sent' => null,
                'timeline_steps' => [
                    ['label' => 'Payment Received', 'status' => 'failed', 'timestamp_label' => '11:30 AM', 'sort_order' => 1],
                    ['label' => 'Auto Logged', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 2],
                    ['label' => 'Role Assigned', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 3],
                    ['label' => 'Student Notified', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 4],
                ],
            ],
            [
                'name' => 'Emily Davis',
                'email' => 'emily.d@example.com',
                'discord_handle' => 'emily_d#5544',
                'program' => 'TMT Basic',
                'payment_status' => 'Pending',
                'onboarding_status' => 'Not Started',
                'discord_role_assigned' => false,
                'joined_date' => '2023-10-26',
                'due_date' => now()->subDays(2)->toDateString(),
                'last_reminder_sent' => null,
                'timeline_steps' => [
                    ['label' => 'Payment Initiated', 'status' => 'completed', 'timestamp_label' => '12:45 PM', 'sort_order' => 1],
                    ['label' => 'Payment Verified', 'status' => 'current', 'timestamp_label' => 'Verifying...', 'sort_order' => 2],
                    ['label' => 'Auto Logged', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 3],
                    ['label' => 'Role Assigned', 'status' => 'pending', 'timestamp_label' => null, 'sort_order' => 4],
                ],
            ],
            [
                'name' => 'Chris Wilson',
                'email' => 'chris.w@example.com',
                'discord_handle' => 'cwilson#0001',
                'program' => 'Premium Lite',
                'payment_status' => 'Paid',
                'onboarding_status' => 'Completed',
                'discord_role_assigned' => true,
                'joined_date' => '2023-10-24',
                'due_date' => now()->addDays(30)->toDateString(),
                'last_reminder_sent' => null,
                'timeline_steps' => [
                    ['label' => 'Payment Received', 'status' => 'completed', 'timestamp_label' => 'Oct 24', 'sort_order' => 1],
                    ['label' => 'Auto Logged', 'status' => 'completed', 'timestamp_label' => 'Oct 24', 'sort_order' => 2],
                    ['label' => 'Role Assigned', 'status' => 'completed', 'timestamp_label' => 'Oct 24', 'sort_order' => 3],
                    ['label' => 'Student Notified', 'status' => 'completed', 'timestamp_label' => 'Oct 24', 'sort_order' => 4],
                ],
            ],
            [
                'name' => 'Jessica Lee',
                'email' => 'j.lee@example.com',
                'discord_handle' => 'jess_lee#7788',
                'program' => 'MOM',
                'payment_status' => 'Paid',
                'onboarding_status' => 'In Progress',
                'discord_role_assigned' => true,
                'joined_date' => '2023-10-26',
                'due_date' => now()->addDays(6)->toDateString(),
                'last_reminder_sent' => null,
                'timeline_steps' => [
                    ['label' => 'Payment Received', 'status' => 'completed', 'timestamp_label' => '01:20 PM', 'sort_order' => 1],
                    ['label' => 'Auto Logged', 'status' => 'completed', 'timestamp_label' => '01:21 PM', 'sort_order' => 2],
                    ['label' => 'Role Assigned', 'status' => 'completed', 'timestamp_label' => '01:22 PM', 'sort_order' => 3],
                    ['label' => 'Student Notified', 'status' => 'failed', 'timestamp_label' => 'Email Bounce', 'sort_order' => 4],
                ],
            ],
        ];

        foreach ($students as $data) {
            $program = Program::where('name', $data['program'])->first();
            $timelineSteps = $data['timeline_steps'];
            unset($data['program'], $data['timeline_steps']);

            $student = Student::create([
                'uuid' => (string) Str::uuid(),
                ...$data,
                'program_id' => $program->id,
            ]);

            foreach ($timelineSteps as $step) {
                $student->timelineSteps()->create($step);
            }
        }
    }
}
