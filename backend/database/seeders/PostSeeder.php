<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory()
            ->count(100)
            ->state(['user_id' => 1])
            ->state(new Sequence(fn($sequence) => [
                'created_at' => now()->subYear()->addDays($sequence->index),
            ]))
            ->create();
    }
}
