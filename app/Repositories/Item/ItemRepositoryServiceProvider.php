<?php

namespace App\Repositories\Item;

use Illuminate\Support\ServiceProvider;

class ItemRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\Item\ItemRepositoryInterface', function () {
            return new \App\Repositories\Item\ItemRepository();
        });
    }
}
