<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Repositories\Option\OptionRepositoryInterface;
use Illuminate\Support\Facades\App;
use DB;

class OptionController extends Controller
{
    private $optionRepository;

    public function __construct(
        OptionRepositoryInterface $optionRepository
    )
    {
        $this->optionRepository = $optionRepository;
    }

    public function setAutoIncrement(Request $request) {
        
        $this->validate($request, [
            'increment' => 'required|integer'
        ]);

        $increment = $request->input('increment');

        DB::statement("ALTER TABLE sales_invoices AUTO_INCREMENT = {$increment};");

        return response()->json(true);
    }

    public function getOptions() {

        $prepared_by = $this->optionRepository->getByKey('prepared_by');
        $noted_by = $this->optionRepository->getByKey('noted_by');

        return response()->json([
            'prepared_by' => $prepared_by ? $prepared_by->value : '',
            'noted_by' => $noted_by ? $noted_by->value : ''
        ]);
    }

    public function setOption(Request $request) {

        $this->validate($request, [
            'key' => 'required|string',
            'value' => 'required|string'
        ]);

        $key = $request->input('key');
        $value = $request->input('value');
        
        $this->optionRepository->setByKey($key, $value);

        return response()->json(true);
    }
}
