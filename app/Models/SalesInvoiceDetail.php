<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesInvoiceDetail extends Model
{
    public $fillable = [
    	'trans_id',
    	'item_id',
    	'qty',
    	'trans_price',
        'discount'
	];

    public function transaction()
    {
        return $this->belongsTo('App\Models\SalesInvoice', 'trans_id');
    }

    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }
}
