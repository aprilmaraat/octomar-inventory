<?php

namespace App\Repositories\ItemInventoryAdjustmentDetail;

interface ItemInventoryAdjustmentDetailRepositoryInterface
{
	public function deleteByTransaction($trans_id);
}
