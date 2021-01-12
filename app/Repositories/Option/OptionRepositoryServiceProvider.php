<?php

namespace App\Repositories\Option;

use Illuminate\Support\ServiceProvider;

class OptionRepositoryServiceProvider extends ServiceProvider
{
    public function boot() {}

    public function register()
    {
        $this->app->bind(OptionRepositoryInterface::class, OptionRepository::class);
    }
}
