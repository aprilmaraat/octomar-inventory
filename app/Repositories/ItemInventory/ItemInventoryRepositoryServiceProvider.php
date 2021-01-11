<?php

namespace App\Repositories\ItemInventory;

use Illuminate\Support\ServiceProvider;

class ItemInventoryRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\ItemInventory\ItemInventoryRepositoryInterface', function () {
            return new \App\Repositories\ItemInventory\ItemInventoryRepository();
        });
    }
}
