<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run()
    {
        $users = User::pluck('id')->toArray();
        $statuses = ['pending', 'completed', 'canceled'];

        // Create bookings for last 30 days
        for ($i = 0; $i < 30; $i++) {
            $date = Carbon::now()->subDays($i);

            // Create 3-7 bookings per day
            $bookingsPerDay = rand(3, 7);

            for ($j = 0; $j < $bookingsPerDay; $j++) {
                $hour = rand(8, 20);
                $minute = rand(0, 59);
                $timestamp = $date->copy()->setTime($hour, $minute);

                Booking::create([
                    'user_id' => $users[array_rand($users)],
                    'service_id' => 1,
                    'datetime' => $timestamp,
                    'status' => $statuses[array_rand($statuses)],
                    'distance' => rand(1, 50),
                    'fare' => rand(1000, 10000) / 100,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp
                ]);
            }
        }
    }
}
