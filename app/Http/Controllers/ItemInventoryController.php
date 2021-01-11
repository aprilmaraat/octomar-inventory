<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Repositories\ItemInventory\ItemInventoryRepositoryInterface;
use Illuminate\Support\Facades\App;

class ItemInventoryController extends Controller
{
    private $itemInventoryRepository;

    public function __construct(
        ItemInventoryRepositoryInterface $itemInventoryRepository
    )
    {
        $this->itemInventoryRepository = $itemInventoryRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'item_id' => 'integer',
            'qty' => 'integer',
            'trans_type' => 'string|max:255',
            'trans_id' => 'integer',
            'trans_detail_id' => 'integer'
        ]);

        $fields = $this->itemInventoryRepository->filter(
            $request->except('page'), 
            $request->input('page'), 
            $request->input('per_page', 10), 
            $request->input('order_by', 'id'), 
            $request->input('order_type', 'asc'),
            ['*'],
            ['trans']
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
            'item_id' => 'required|integer',
            'qty' => 'required|integer',
            'trans_type' => 'required|string|max:255',
            'trans_id' => 'required|integer',
            'trans_detail_id' => 'required|integer',
        ]);

        $item_id = $request->input('item_id');
        $qty = $request->input('qty');
        $trans_type = $request->input('trans_type');
        $trans_id = $request->input('trans_id');
        $trans_detail_id = $request->input('trans_detail_id');

        $result = $this->itemInventoryRepository->create([
            'item_id' => $item_id,
            'qty' => $qty,
            'trans_type' => $trans_type,
            'trans_id' => $trans_id,
            'trans_detail_id' => $trans_detail_id
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
        $data = $this->itemInventoryRepository->find($id);

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
            'item_id' => 'integer',
            'qty' => 'integer',
            'trans_type' => 'string|max:255',
            'trans_id' => 'integer',
            'trans_detail_id' => 'integer'
        ]);

        $item_id = $request->input('item_id');
        $qty = $request->input('qty');
        $trans_type = $request->input('trans_type');
        $trans_id = $request->input('trans_id');
        $trans_detail_id = $request->input('trans_detail_id');

        $result = $this->itemInventoryRepository->update([
            'item_id' => $item_id,
            'qty' => $qty,
            'trans_type' => $trans_type,
            'trans_id' => $trans_id,
            'trans_detail_id' => $trans_detail_id
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
        $result = $this->itemInventoryRepository->delete($id);

        return response()->json($result);
    }

    public function storeBatch(Request $request)
    {
        $this->validate($request, [
            'items' => 'required|array'
        ]);

        $items = $request->input('items');

        $result = [];
        for($i = 0; $i < count($items); $i++){

            $result[] = $this->itemInventoryRepository->create([
                'trans_id' => $items[$i]['trans_id'],
                'item_id' => $items[$i]['item_id'],
                'qty' => $items[$i]['qty'],
                'trans_type' => $items[$i]['trans_type'],
                'trans_id' => $items[$i]['trans_id'],
                'trans_detail_id' => $items[$i]['trans_detail_id']
            ]);
        }

        return response()->json($result);
    }

    public function deleteByTransaction(Request $request) 
    {
        $this->validate($request, [
            'trans_type' => 'required|string',
            'trans_id' => 'required|integer'
        ]);

        $trans_type = $request->input('trans_type');
        $trans_id = $request->input('trans_id');

        $result = $this->itemInventoryRepository->deleteByTransaction($trans_type, $trans_id);

        return response()->json($result);
    }
}
