<?php

namespace App\Repositories\Supplier;

use Illuminate\Support\ServiceProvider;

class SupplierRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\Supplier\SupplierRepositoryInterface', function () {
            return new \App\Repositories\Supplier\SupplierRepository();
        });
    }
}
