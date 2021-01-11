<?php

namespace App\Repositories\ItemInventoryAdjustmentDetail;

use Illuminate\Support\ServiceProvider;

class ItemInventoryAdjustmentDetailRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\ItemInventoryAdjustmentDetail\ItemInventoryAdjustmentDetailRepositoryInterface', function () {
            return new \App\Repositories\ItemInventoryAdjustmentDetail\ItemInventoryAdjustmentDetailRepository();
        });
    }
}
