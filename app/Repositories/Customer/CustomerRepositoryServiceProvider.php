<?php

namespace App\Repositories\Customer;

use Illuminate\Support\ServiceProvider;

class CustomerRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(CustomerRepositoryInterface::class, CustomerRepository::class);
    }
}
