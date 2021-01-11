<?php

namespace App\Repositories\SalesInvoiceDetail;

interface SalesInvoiceDetailRepositoryInterface
{
	public function deleteByTransaction($trans_id);
}
