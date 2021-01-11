<?php

use Illuminate\Database\Seeder;

class SalesInvoiceDetailTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales_invoice_details')->truncate();

        for($i = 1; $i <= 20; $i++) {

            DB::table('sales_invoice_details')->insert([
                'trans_id' => $i,
                'item_id' => $i,
                'qty' => 35,
                'trans_price' => 500,
                'discount' => 10
            ]);
        }
    }
}
