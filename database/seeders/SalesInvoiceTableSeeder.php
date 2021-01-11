<?php

use Illuminate\Database\Seeder;

class SalesInvoiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales_invoices')->truncate();

        factory(App\Models\SalesInvoice::class, 20)->create();
    }
}
