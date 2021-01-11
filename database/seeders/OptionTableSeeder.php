<?php

use Illuminate\Database\Seeder;

class OptionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('options')->truncate();

        DB::table('options')->insert([
            'key' => 'prepared_by',
            'value' => 'Ryan Galiposo'
        ]);

        DB::table('options')->insert([
            'key' => 'noted_by',
            'value' => 'Leo Galiposo'
        ]);
    }
}
