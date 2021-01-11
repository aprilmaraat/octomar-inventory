<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Repositories\SalesInvoiceDetail\SalesInvoiceDetailRepositoryInterface;
use Illuminate\Support\Facades\App;

class SalesInvoiceDetailController extends Controller
{
    private $salesInvoiceDetailRepository;

    public function __construct(
        SalesInvoiceDetailRepositoryInterface $salesInvoiceDetailRepository
    )
    {
        $this->salesInvoiceDetailRepository = $salesInvoiceDetailRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'trans_id' => 'integer',
            'item_id' => 'integer',
            'qty' => 'integer',
            'trans_price' => 'numeric',
            'discount' => 'numeric'
        ]);

        $fields = $this->salesInvoiceDetailRepository->filter(
            $request->except('page'), 
            $request->input('page'), 
            $request->input('per_page', 10), 
            $request->input('order_by', 'id'), 
            $request->input('order_type', 'asc'),
            ['*'],
            ['item']
        );

        return response()->json($fields);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'trans_id' => 'required|integer',
            'item_id' => 'required|integer',
            'qty' => 'required|integer',
            'trans_price' => 'required|numeric',
            'discount' => 'required|numeric'
        ]);

        $trans_id = $request->input('trans_id');
        $item_id = $request->input('item_id');
        $qty = $request->input('qty');
        $trans_price = $request->input('trans_price');
        $discount = $request->input('discount');

        $result = $this->salesInvoiceDetailRepository->create([
            'trans_id' => $trans_id,
            'item_id' => $item_id,
            'qty' => $qty,
            'trans_price' => $trans_price,
            'discount' => $discount
        ]);

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = $this->salesInvoiceDetailRepository->find($id);

        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'trans_id' => 'integer',
            'item_id' => 'integer',
            'qty' => 'integer',
            'trans_price' => 'numeric',
            'discount' => 'numeric'
        ]);

        $trans_id = $request->input('trans_id');
        $item_id = $request->input('item_id');
        $qty = $request->input('qty');
        $trans_price = $request->input('trans_price');
        $discount = $request->input('discount');

        $result = $this->salesInvoiceDetailRepository->update([
            'trans_id' => $trans_id,
            'item_id' => $item_id,
            'qty' => $qty,
            'trans_price' => $trans_price,
            'discount' => $discount
        ], $id);

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->salesInvoiceDetailRepository->delete($id);

        return response()->json($result);
    }

    public function storeBatch(Request $request)
    {
        $this->validate($request, [
            'details' => 'required|array'
        ]);

        $details = $request->input('details');

        $result = [];
        for($i = 0; $i < count($details); $i++){

            $result[] = $this->salesInvoiceDetailRepository->create([
                'trans_id' => $details[$i]['trans_id'],
                'item_id' => $details[$i]['item_id'],
                'qty' => $details[$i]['qty'],
                'trans_price' => $details[$i]['trans_price'],
                'discount' => $details[$i]['discount']
            ]);
        }

        return response()->json($result);
    }

    public function deleteByTransaction(Request $request) 
    {
        $this->validate($request, [
            'trans_id' => 'required|integer'
        ]);

        $trans_id = $request->input('trans_id');

        $result = $this->salesInvoiceDetailRepository->deleteByTransaction($trans_id);

        return response()->json($result);
    }
}
