<?php

namespace App\Repositories\Item;

use App\Repositories\AbstractRepository;

class ItemRepository extends AbstractRepository implements ItemRepositoryInterface
{

    public function model()
    {
        return '\App\Models\Item';
    }

}
