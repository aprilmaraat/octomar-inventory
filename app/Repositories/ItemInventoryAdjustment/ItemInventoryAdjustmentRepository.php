<?php

namespace App\Repositories\ItemInventoryAdjustment;

use App\Repositories\AbstractRepository;

class ItemInventoryAdjustmentRepository extends AbstractRepository implements ItemInventoryAdjustmentRepositoryInterface
{

    public function model()
    {
        return '\App\Models\ItemInventoryAdjustment';
    }

}
