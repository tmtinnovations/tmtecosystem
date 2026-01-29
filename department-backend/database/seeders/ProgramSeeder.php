<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            ['name' => 'TMT Basic', 'slug' => 'tmt-basic', 'description' => 'TMT Basic trading program', 'price' => 297.00],
            ['name' => 'TAT', 'slug' => 'tat', 'description' => 'Trade And Transform program', 'price' => 997.00],
            ['name' => 'Get Funded', 'slug' => 'get-funded', 'description' => 'Get Funded trading challenge', 'price' => 497.00],
            ['name' => 'Premium', 'slug' => 'premium', 'description' => 'Premium membership with full access', 'price' => 1997.00],
            ['name' => 'Premium Lite', 'slug' => 'premium-lite', 'description' => 'Premium Lite membership', 'price' => 997.00],
            ['name' => 'MOM', 'slug' => 'mom', 'description' => 'Mastery of Markets program', 'price' => 497.00],
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }
    }
}
