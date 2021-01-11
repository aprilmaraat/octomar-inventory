<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Repositories\Customer\CustomerRepositoryInterface;
use Illuminate\Support\Facades\App;
use DB;

class CustomerController extends Controller
{
    private $customerRepository;

    public function __construct(
        CustomerRepositoryInterface $customerRepository
    )
    {
        $this->customerRepository = $customerRepository;
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
            'address' => 'string',
            'tel_no' => 'string|max:255',
        ]);

        $fields = $this->customerRepository->filter(
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
            'address' => 'string',
            'tel_no' => 'string|max:255',
        ]);

        $name = $request->input('name');
        $address = $request->input('address');
        $tel_no = $request->input('tel_no');

        $result = $this->customerRepository->create([
            'name' => $name,
            'address' => $address,
            'tel_no' => $tel_no
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
        $data = $this->customerRepository->find($id);

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
            'address' => 'string',
            'tel_no' => 'string|max:255',
        ]);

        $name = $request->input('name');
        $address = $request->input('address');
        $tel_no = $request->input('tel_no');

        $result = $this->customerRepository->update([
            'name' => $name,
            'address' => $address,
            'tel_no' => $tel_no
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
        $result = $this->customerRepository->delete($id);

        return response()->json($result);
    }
}
