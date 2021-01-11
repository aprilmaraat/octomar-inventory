<?php

use Illuminate\Database\Seeder;

class ItemInventoryAdjustmentDetailTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item_inventory_adjustment_details')->truncate();

        for($i = 1; $i <= 20; $i++) {

            DB::table('item_inventory_adjustment_details')->insert([
                'trans_id' => $i,
                'item_id' => $i,
                'qty' => 100
            ]);
        }
    }
}
