<?php

namespace App\Repositories\ItemInventoryAdjustmentDetail;

use App\Repositories\AbstractRepository;

class ItemInventoryAdjustmentDetailRepository extends AbstractRepository implements ItemInventoryAdjustmentDetailRepositoryInterface
{
	public function deleteByTransaction($trans_id) 
	{
		return $this->model
			->where('trans_id', $trans_id)
			->delete();
	}

    public function model()
    {
        return '\App\Models\ItemInventoryAdjustmentDetail';
    }

}
