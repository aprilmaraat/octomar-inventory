<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    public $fillable = [
    	'name',
    	'address',
    	'tel_no'
	];

	public function sales_invoices()
	{
		return $this->morphMany('App\Models\SalesInvoice', 'transactor');
	}

	public function item_inventory_adjustment()
	{
		return $this->morphMany('App\Models\ItemInventoryAdjustment', 'transactor');
	}
}
