<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemInventoryAdjustmentDetail extends Model
{
    public $fillable = [
    	'trans_id',
    	'item_id',
    	'qty'
	];

    public function transaction()
    {
        return $this->belongsTo('App\Models\ItemInventoryAdjustment', 'trans_id');
    }

    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }
}
