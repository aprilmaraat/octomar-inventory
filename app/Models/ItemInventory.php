<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemInventory extends Model
{
    public $fillable = [
    	'item_id',
    	'qty',
    	'trans_type',
    	'trans_id',
    	'trans_detail_id'
	];

    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }

	public function trans()
	{
		return $this->morphTo();
	}
}
