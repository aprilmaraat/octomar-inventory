<?php

namespace App\Repositories;

interface RepositoryInterface
{

    public function create(array $data);

    public function update(array $data, $id, $attribute = 'id');

    public function all();

    public function find($id = null, $columns = ['*']);

    public function findBy($attribute, $value, $columns = ['*']);

    public function delete($id = null);
}
