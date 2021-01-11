<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemInventoryAdjustment extends Model
{
    public $fillable = [
        'transactor_type',
        'transactor_id',
    	'trans_date',
        'prepared_by',
        'noted_by',
    	'ref_no',
    	'remarks'
	];

    public $with = ['transactor'];

	public function item_inventories()
	{
		return $this->morphMany('App\Models\ItemInventory', 'trans');
	}

    public function transactor()
    {
        return $this->morphTo();
    }
}
