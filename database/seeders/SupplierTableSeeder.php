<?php

use Illuminate\Database\Seeder;

class SupplierTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('suppliers')->truncate();

        DB::table('suppliers')->insert([
            'name' => 'DEFAULT SUPPLIER',
            'address' => 'DEFAULT SUPPLIER',
            'tel_no' => ''
        ]);

        factory(App\Models\Supplier::class, 19)->create();
    }
}
