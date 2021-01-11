<?php

namespace App\Repositories\ItemInventory;

use App\Repositories\AbstractRepository;

class ItemInventoryRepository extends AbstractRepository implements ItemInventoryRepositoryInterface
{
	public function deleteByTransaction($trans_type, $trans_id) 
	{
		return $this->model
			->where('trans_type', $trans_type)
			->where('trans_id', $trans_id)
			->delete();
	}

	public function total_item_qty($item_id)
	{
		return $this->model
			->where('item_id', $item_id)
			->sum('qty');
	}

    public function model()
    {
        return '\App\Models\ItemInventory';
    }

}
