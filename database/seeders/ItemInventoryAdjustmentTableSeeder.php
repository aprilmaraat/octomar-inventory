<?php

use Illuminate\Database\Seeder;

class ItemInventoryAdjustmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item_inventory_adjustments')->truncate();

        factory(App\Models\ItemInventoryAdjustment::class, 20)->create();
    }
}
