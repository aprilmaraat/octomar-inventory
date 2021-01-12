<?php

namespace App\Repositories\ItemInventoryAdjustmentDetail;

use Illuminate\Support\ServiceProvider;

class ItemInventoryAdjustmentDetailRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(ItemInventoryAdjustmentDetailRepositoryInterface::class, ItemInventoryAdjustmentDetailRepository::class);
    }
}
