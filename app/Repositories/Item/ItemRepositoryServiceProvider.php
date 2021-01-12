<?php

namespace App\Repositories\Item;

use Illuminate\Support\ServiceProvider;

class ItemRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(ItemRepositoryInterface::class, ItemRepository::class);
    }
}
