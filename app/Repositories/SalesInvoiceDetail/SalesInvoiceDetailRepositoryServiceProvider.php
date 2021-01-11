<?php

namespace App\Repositories\SalesInvoiceDetail;

use Illuminate\Support\ServiceProvider;

class SalesInvoiceDetailRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind('\App\Repositories\SalesInvoiceDetail\SalesInvoiceDetailRepositoryInterface', function () {
            return new \App\Repositories\SalesInvoiceDetail\SalesInvoiceDetailRepository();
        });
    }
}
