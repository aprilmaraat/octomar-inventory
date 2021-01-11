<?php

namespace App\Repositories\SalesInvoiceDetail;

use App\Repositories\AbstractRepository;

class SalesInvoiceDetailRepository extends AbstractRepository implements SalesInvoiceDetailRepositoryInterface
{
	public function deleteByTransaction($trans_id) 
	{
		return $this->model
			->where('trans_id', $trans_id)
			->delete();
	}

    public function model()
    {
        return '\App\Models\SalesInvoiceDetail';
    }

}
