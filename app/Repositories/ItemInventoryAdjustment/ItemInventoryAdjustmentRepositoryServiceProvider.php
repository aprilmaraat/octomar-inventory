<?php

namespace App\Repositories\ItemInventoryAdjustment;

use Illuminate\Support\ServiceProvider;

class ItemInventoryAdjustmentRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\ItemInventoryAdjustment\ItemInventoryAdjustmentRepositoryInterface', function () {
            return new \App\Repositories\ItemInventoryAdjustment\ItemInventoryAdjustmentRepository();
        });
    }
}
