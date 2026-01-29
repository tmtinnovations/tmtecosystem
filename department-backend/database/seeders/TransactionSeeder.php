<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transactions = [
            ['transaction_id' => 'TRX-9928', 'email' => 'alex.j@example.com', 'amount' => 497.00, 'method' => 'Stripe', 'status' => 'Verified'],
            ['transaction_id' => 'TRX-9929', 'email' => 'sarah.w@example.com', 'amount' => 997.00, 'method' => 'PayPal', 'status' => 'Verified'],
            ['transaction_id' => 'TRX-9930', 'email' => 'm.brown@example.com', 'amount' => 497.00, 'method' => 'Bank Transfer', 'status' => 'Failed'],
            ['transaction_id' => 'TRX-9931', 'email' => 'emily.d@example.com', 'amount' => 2497.00, 'method' => 'Crypto', 'status' => 'Pending'],
            ['transaction_id' => 'TRX-9932', 'email' => 'j.lee@example.com', 'amount' => 497.00, 'method' => 'Stripe', 'status' => 'Verified'],
        ];

        foreach ($transactions as $data) {
            $student = Student::where('email', $data['email'])->first();
            
            if ($student) {
                Transaction::create([
                    'transaction_id' => $data['transaction_id'],
                    'student_id' => $student->id,
                    'amount' => $data['amount'],
                    'currency' => 'USD',
                    'method' => $data['method'],
                    'status' => $data['status'],
                    'transaction_date' => now()->subHours(rand(1, 48)),
                ]);
            }
        }
    }
}
