<?php

namespace App\Repositories\Supplier;

use Illuminate\Support\ServiceProvider;

class SupplierRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(SupplierRepositoryInterface::class, SupplierRepository::class);
    }
}
