<?php

namespace App\Repositories\Customer;

use App\Repositories\AbstractRepository;

class CustomerRepository extends AbstractRepository implements CustomerRepositoryInterface
{

    public function model()
    {
        return '\App\Models\Customer';
    }

}
