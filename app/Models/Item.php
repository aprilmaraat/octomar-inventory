<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public $fillable = [
    	'name',
    	'description',
    	'base_price',
    	'unit'
	];

	public function item_inventories()
    {
        return $this->hasMany('App\Models\ItemInventory');
    }

	public function item_inventory_adjustment_details()
    {
        return $this->hasMany('App\Models\ItemInventoryAdjustmentDetail');
    }

	public function sales_invoice_details()
    {
        return $this->hasMany('App\Models\SalesInvoiceDetail');
    }
}
