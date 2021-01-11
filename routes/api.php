<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::resource('customer', 'CustomerController');

Route::resource('supplier', 'SupplierController');

Route::get('item/with_total_inventory', 'ItemController@withTotalInventory');

Route::resource('item', 'ItemController');

Route::post('item_inventory/store_batch', 'ItemInventoryController@storeBatch');

Route::delete('item_inventory/transaction', 'ItemInventoryController@deleteByTransaction');

Route::resource('item_inventory', 'ItemInventoryController');

Route::resource('sales_invoice', 'SalesInvoiceController');

Route::post('sales_invoice_detail/store_batch', 'SalesInvoiceDetailController@storeBatch');

Route::delete('sales_invoice_detail/transaction', 'SalesInvoiceDetailController@deleteByTransaction');

Route::resource('sales_invoice_detail', 'SalesInvoiceDetailController');

Route::resource('item_inventory_adjustment', 'ItemInventoryAdjustmentController');

Route::post('item_inventory_adjustment_detail/store_batch', 'ItemInventoryAdjustmentDetailController@storeBatch');

Route::delete('item_inventory_adjustment_detail/transaction', 'ItemInventoryAdjustmentDetailController@deleteByTransaction');

Route::resource('item_inventory_adjustment_detail', 'ItemInventoryAdjustmentDetailController');

Route::post('option/auto_increment', 'OptionController@setAutoIncrement');
Route::get('option', 'OptionController@getOptions');
Route::post('option', 'OptionController@setOption');