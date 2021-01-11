<?php

namespace App\Repositories\Customer;

use Illuminate\Support\ServiceProvider;

class CustomerRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\Customer\CustomerRepositoryInterface', function () {
            return new \App\Repositories\Customer\CustomerRepository();
        });
    }
}
