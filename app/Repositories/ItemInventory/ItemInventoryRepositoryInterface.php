<?php

namespace App\Repositories\ItemInventory;

interface ItemInventoryRepositoryInterface
{
	public function deleteByTransaction($trans_type, $trans_id) ;
	
	public function total_item_qty($item_id);
}
