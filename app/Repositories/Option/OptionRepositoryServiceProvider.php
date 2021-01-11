<?php

namespace App\Repositories\Option;

use Illuminate\Support\ServiceProvider;

class OptionRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\Option\OptionRepositoryInterface', function () {
            return new \App\Repositories\Option\OptionRepository();
        });
    }
}
