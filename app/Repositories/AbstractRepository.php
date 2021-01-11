<?php

namespace App\Repositories;

use App\Repositories\RepositoryInterface;

abstract class AbstractRepository implements RepositoryInterface
{

    private $app;

    protected $model;

    protected $tyr_client;

    public function __construct()
    {
        $this->makeModel();
    }

    public function makeModel()
    {
        $model = \App::make($this->model());

        return $this->model = $model;
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(array $data, $id, $attribute = 'id')
    {
        return $this->model->where($attribute, '=', $id)->update($data);
    }

    public function all()
    {
        return $this->model->all();
    }

    public function paginate($limit)
    {
        return $this->model->paginate($limit);
    }

    public function find($id = null, $columns = ['*'])
    {
        if (is_null($id)) {
            return false;
        }

        return $this->model->find($id, $columns);
    }

    public function findBy($attribute, $value, $columns = ['*'])
    {
        return $this->model->where($attribute, '=', $value)->first($columns);
    }

    public function filter(
        $dictionary = [], 
        $page = 0, 
        $per_page = 10, 
        $order_by = 'id', 
        $order_type = 'asc', 
        $columns = ['*'],
        $eager_load = []
    )
    {
        $where_clause = [];
        $where_or_clause = [];
        $allowed_fields = $this->model->fillable;


        foreach($dictionary as $attribute => $data) {

            if($attribute == 'or') {

                $or_dictionary = json_decode($data);
                foreach($or_dictionary as $or_attr => $or_data) {

                    if(!in_array($or_attr, $allowed_fields) || !$or_data)
                        continue;

                    else if(is_array($or_data)) {

                        $where_or_clause[] = [$or_attr, $or_data->operator, $or_data->operand];
                    } else {

                        if(is_string($or_data) && strpos($or_data, '%') !== false)
                            $where_or_clause[] = [$or_attr, 'like', $or_data];
                        else
                            $where_or_clause[] = [$or_attr, '=', $or_data];
                    }
                }
                continue;
            }

            if(!in_array($attribute, $allowed_fields) || !$data)
                continue;
            
            if(is_array($data)) {

                $where_clause[] = [$attribute, $data->operator, $data->operand];
            } else {

                if(is_string($data) && strpos($data, '%') !== false)
                    $where_clause[] = [$attribute, 'like', $data];
                else
                    $where_clause[] = [$attribute, '=', $data];
            }
        }

        if($page > 0) {

            $result = $this->model
                ->where($where_clause)
                ->orderBy($order_by, $order_type);

            if(count($eager_load) > 0)
                $result = $result->with($eager_load);

            foreach($where_or_clause as $clause){
                $result = $result->orWhere($clause[0], $clause[1], $clause[2]);
            }

            return $result->paginate($per_page);
        }

        $result = $this->model->where($where_clause)->orderBy($order_by, $order_type);

        if(count($eager_load) > 0)
            $result = $result->with($eager_load);

        foreach($where_or_clause as $clause){
            $result = $result->orWhere($clause[0], $clause[1], $clause[2]);
        }

        return [ 'data' => $result->get() ];
    }

    public function delete($id = null)
    {
        if (is_null($id)) {
            return false;
        }

        return $this->model->destroy($id);
    }

    abstract protected function model();
}
