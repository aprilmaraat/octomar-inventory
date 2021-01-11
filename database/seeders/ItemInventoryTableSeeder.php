<?php

use Illuminate\Database\Seeder;

class ItemInventoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item_inventories')->truncate();

        for($i = 1; $i <= 20; $i++) {

            DB::table('item_inventories')->insert([
                'item_id' => $i,
                'qty' => 100,
                'trans_type' => 'App\\Models\\ItemInventoryAdjustment',
                'trans_id' => $i,
                'trans_detail_id' => $i
            ]);
        }

        for($i = 1; $i <= 20; $i++) {

            DB::table('item_inventories')->insert([
                'item_id' => $i,
                'qty' => -35,
                'trans_type' => 'App\\Models\\SalesInvoice',
                'trans_id' => $i,
                'trans_detail_id' => $i
            ]);
        }
    }
}
