<?php

namespace App\Repositories\SalesInvoice;

use Illuminate\Support\ServiceProvider;

class SalesInvoiceRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\SalesInvoice\SalesInvoiceRepositoryInterface', function () {
            return new \App\Repositories\SalesInvoice\SalesInvoiceRepository();
        });
    }
}
