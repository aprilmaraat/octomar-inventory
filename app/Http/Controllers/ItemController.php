<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Repositories\Item\ItemRepositoryInterface;
use App\Repositories\ItemInventory\ItemInventoryRepositoryInterface;
use Illuminate\Support\Facades\App;

class ItemController extends Controller
{
    private $itemRepository;
    private $itemInventoryRepository;

    public function __construct(
        ItemRepositoryInterface $itemRepository,
        ItemInventoryRepositoryInterface $itemInventoryRepository
    )
    {
        $this->itemRepository = $itemRepository;
        $this->itemInventoryRepository = $itemInventoryRepository;
    }

    public function withTotalInventory(Request $request)
    {
        $this->validate($request, [
            'name' => 'string|max:255',
            'description' => 'string',
            'base_price' => 'numeric',
            'unit' => 'string',
        ]);

        $records = $this->itemRepository->filter(
            $request->except('page'), 
            $request->input('page'), 
            $request->input('per_page', 10), 
            $request->input('order_by', 'id'), 
            $request->input('order_type', 'asc')
        );

        foreach ($records as $item) {
            
            $item->total_inventory = $this->itemInventoryRepository->total_item_qty($item->id);
        }

        return response()->json($records);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'name' => 'string|max:255',
            'description' => 'string',
            'base_price' => 'numeric',
            'unit' => 'string',
        ]);

        $fields = $this->itemRepository->filter(
            $request->except('page'), 
            $request->input('page'), 
            $request->input('per_page', 10), 
            $request->input('order_by', 'id'), 
            $request->input('order_type', 'asc')
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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'base_price' => 'required|numeric',
            'unit' => 'required|string',
        ]);

        $name = $request->input('name');
        $description = $request->input('description');
        $base_price = $request->input('base_price');
        $unit = $request->input('unit');

        $result = $this->itemRepository->create([
            'name' => $name,
            'description' => $description,
            'base_price' => $base_price,
            'unit' => $unit
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
        $data = $this->itemRepository->find($id);

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
            'name' => 'string|max:255',
            'description' => 'string',
            'base_price' => 'numeric',
            'unit' => 'string',
        ]);

        $name = $request->input('name');
        $description = $request->input('description');
        $base_price = $request->input('base_price');
        $unit = $request->input('unit');

        $result = $this->itemRepository->update([
            'name' => $name,
            'description' => $description,
            'base_price' => $base_price,
            'unit' => $unit
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
        $result = $this->itemRepository->delete($id);

        return response()->json($result);
    }
}
