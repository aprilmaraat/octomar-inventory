<?php

namespace App\Repositories\SalesInvoiceDetail;

use Illuminate\Support\ServiceProvider;

class SalesInvoiceDetailRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(SalesInvoiceDetailRepositoryInterface::class, SalesInvoiceDetailRepository::class);
    }
}
