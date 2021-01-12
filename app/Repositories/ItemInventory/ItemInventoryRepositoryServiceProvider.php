<?php

namespace App\Repositories\ItemInventory;

use Illuminate\Support\ServiceProvider;

class ItemInventoryRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(ItemInventoryRepositoryInterface::class, ItemInventoryRepository::class);
    }
}
