<?php

namespace App\Repositories\SalesInvoice;

use App\Repositories\AbstractRepository;

class SalesInvoiceRepository extends AbstractRepository implements SalesInvoiceRepositoryInterface
{

    public function model()
    {
        return '\App\Models\SalesInvoice';
    }

}
