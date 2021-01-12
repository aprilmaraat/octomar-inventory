<?php

namespace App\Repositories\SalesInvoice;

use Illuminate\Support\ServiceProvider;

class SalesInvoiceRepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(SalesInvoiceRepositoryInterface::class, SalesInvoiceRepository::class);
    }
}
