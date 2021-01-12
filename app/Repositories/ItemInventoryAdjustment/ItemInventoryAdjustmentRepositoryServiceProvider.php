<?php

namespace App\Repositories\ItemInventoryAdjustment;

use Illuminate\Support\ServiceProvider;

class ItemInventoryAdjustmentRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(ItemInventoryAdjustmentRepositoryInterface::class, ItemInventoryAdjustmentRepository::class);
    }
}
