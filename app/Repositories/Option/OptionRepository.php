<?php

namespace App\Repositories\Option;

use App\Repositories\AbstractRepository;

class OptionRepository extends AbstractRepository implements OptionRepositoryInterface
{

	public function getByKey($key) {
		
		return $this->model
			->where('key', $key)
			->first();
	}

	public function setByKey($key, $value) {
		
		$option = $this->model
			->where('key', $key)
			->first();

		$option->value = $value;

		$option->save();
	}

    public function model()
    {
        return '\App\Models\Option';
    }

}
