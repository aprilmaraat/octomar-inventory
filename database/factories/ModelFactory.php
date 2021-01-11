<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\Customer::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name(),
        'address' => $faker->address(),
        'tel_no' => $faker->phoneNumber()
    ];
});

$factory->define(App\Models\Supplier::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->company(),
        'address' => $faker->address(),
        'tel_no' => $faker->phoneNumber()
    ];
});

$factory->define(App\Models\Item::class, function (Faker\Generator $faker) {

    return [
    	'name' => $faker->company(),
    	'description' => $faker->sentence(4),
    	'base_price' => $faker->numberBetween(100, 9999),
    	'unit' => 'PCS'
    ];
});

$factory->define(App\Models\ItemInventoryAdjustment::class, function (Faker\Generator $faker) {

    return [
        'transactor_type' => 'App\\Models\\Supplier',
        'transactor_id' => $faker->numberBetween(1, 20),
    	'trans_date' => $faker->dateTime(),
        'prepared_by' => $faker->name(),
        'noted_by' => $faker->name(),
        'ref_no' => $faker->numerify('####'),
    	'remarks' => $faker->paragraph(2)
    ];
});

$factory->define(App\Models\SalesInvoice::class, function (Faker\Generator $faker) {

    return [
        'transactor_type' => 'App\\Models\\Customer',
        'transactor_id' => $faker->numberBetween(1, 20),
    	'trans_date' => $faker->dateTime(),
        'prepared_by' => $faker->name(),
    	'ref_no' => $faker->numerify('####'),
    	'remarks' => $faker->paragraph(2)
    ];
});