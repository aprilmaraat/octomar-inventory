<?php

namespace App\Repositories\Option;

interface OptionRepositoryInterface
{
	public function getByKey($key);

	public function setByKey($key, $value);
}
