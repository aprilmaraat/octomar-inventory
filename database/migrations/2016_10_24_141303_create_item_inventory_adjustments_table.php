<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemInventoryAdjustmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_inventory_adjustments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('transactor_type');
            $table->integer('transactor_id');
            $table->dateTime('trans_date');
            $table->string('prepared_by')->nullable();
            $table->string('noted_by')->nullable();
            $table->string('ref_no')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_inventory_adjustments');
    }
}
