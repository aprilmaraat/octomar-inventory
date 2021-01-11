<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Repositories\ItemInventoryAdjustment\ItemInventoryAdjustmentRepositoryInterface;
use Illuminate\Support\Facades\App;

class ItemInventoryAdjustmentController extends Controller
{
    private $itemInventoryAdjustmentRepository;

    public function __construct(
        ItemInventoryAdjustmentRepositoryInterface $itemInventoryAdjustmentRepository
    )
    {
        $this->itemInventoryAdjustmentRepository = $itemInventoryAdjustmentRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'trans_date' => 'string|max:255',
            'prepared_by' => 'string|max:255',
            'noted_by' => 'string|max:255',
            'ref_no' => 'string|max:255',
            'remarks' => 'string'
        ]);

        $fields = $this->itemInventoryAdjustmentRepository->filter(
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
            'transactor_type' => 'required|string|max:255',
            'transactor_id' => 'required|integer',
            'trans_date' => 'required|string|max:255',
            'prepared_by' => 'string|max:255',
            'noted_by' => 'string|max:255',
            'ref_no' => 'string|max:255',
            'remarks' => 'string'
        ]);

        $transactor_type = $request->input('transactor_type');
        $transactor_id = $request->input('transactor_id');
        $trans_date = date('Y-m-d', strtotime($request->input('trans_date')));
        $prepared_by = $request->input('prepared_by');
        $noted_by = $request->input('noted_by');
        $ref_no = $request->input('ref_no');
        $remarks = $request->input('remarks');

        $result = $this->itemInventoryAdjustmentRepository->create([
            'transactor_type' => $transactor_type,
            'transactor_id' => $transactor_id,
            'trans_date' => $trans_date,
            'prepared_by' => $prepared_by,
            'noted_by' => $noted_by,
            'ref_no' => $ref_no,
            'remarks' => $remarks
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
        $data = $this->itemInventoryAdjustmentRepository->find($id);

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
            'transactor_type' => 'string|max:255',
            'transactor_id' => 'integer',
            'trans_date' => 'string|max:255',
            'prepared_by' => 'string|max:255',
            'noted_by' => 'string|max:255',
            'ref_no' => 'string|max:255',
            'remarks' => 'string'
        ]);

        $transactor_type = $request->input('transactor_type');
        $transactor_id = $request->input('transactor_id');
        $trans_date = date('Y-m-d', strtotime($request->input('trans_date')));
        $prepared_by = $request->input('prepared_by');
        $noted_by = $request->input('noted_by');
        $ref_no = $request->input('ref_no');
        $remarks = $request->input('remarks');

        $result = $this->itemInventoryAdjustmentRepository->update([
            'transactor_type' => $transactor_type,
            'transactor_id' => $transactor_id,
            'trans_date' => $trans_date,
            'prepared_by' => $prepared_by,
            'noted_by' => $noted_by,
            'ref_no' => $ref_no,
            'remarks' => $remarks
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
        $result = $this->itemInventoryAdjustmentRepository->delete($id);

        return response()->json($result);
    }
}
