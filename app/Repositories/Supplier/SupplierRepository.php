<?php

namespace App\Repositories\Supplier;

use App\Repositories\AbstractRepository;

class SupplierRepository extends AbstractRepository implements SupplierRepositoryInterface
{

    public function model()
    {
        return '\App\Models\Supplier';
    }

}
