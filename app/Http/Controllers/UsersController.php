<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Form;
use Input;
use App\User;

use Validator;
use Redirect;
use Hash;
use DB;
use Auth;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    public function index()
    {
        
      
       $sort = Input::get('sort');
       if(isset($sort) && $sort == "name"){
          $users = User::orderBy('name', 'asc')->paginate(3); 
       }
       else{
          $users = User::with('comments')->paginate(5);
           /*$users = DB::table('users')
            ->leftJoin('user_comments', 'users.id', '=', 'user_comments.user_id')
            ->get();*/
           
       }
       return view('users.index',['resultset' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('users.create');
    }
    
     
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addUser(Request $request)
    {
        //if (Auth::check()) {}
        $arr['name'] = Input::get('name');
        $arr['email'] = Input::get('email');
        $arr['password'] = Hash::make(Input::get('password'));
        
        $messages = ['email.required' => 'We need to know your e-mail address!'];
        
        $rules = [
            'name' => 'required|between:3,20', // alpha - only contain letters
            'email' => 'required|between:3,35|email|unique:users,email,'.Input::get("id").'', // unique:tablename - checking given table form unique email 
            'password' => 'required|AlphaNum|between:6,15',
           // 'cpassword' => 'required|same:password', //same:password - match with password field
          ];
        //Checking if any error on form or form not completed validation rules. 
        $validator = Validator::make(Input::all(), $rules , $messages);
         if(!empty(Input::get('id'))){$msg='Updated';$view = 'edit/'.Input::get('id');}else{$msg='Created';$view = 'Created';}
        if ($validator->fails()) {
           
           return Redirect::to('users/'.$view)->withErrors($validator)->withInput();
        }
        /*$user = new User;
        $user->name =  $arr['name'];
        $user->email =  $arr['email'];
        $user->password =  $arr['password'];
        $user->save();
        $insertedId = $user->id;
        echo $insertedId;die;*/
      
       if(!empty(Input::get('id'))){
           $save = User::find(Input::get('id'));
           $save->name = $arr['name'];
           $save->email = $arr['email'];
           $save->password = $arr['password'];
           $user  = $save->save();
       } else{
            $user = User::create(array('name' =>$arr['name'],'email' => $arr['email'],'password' => $arr['password'] ));
       }
       if(isset($user) && !empty($user)){
           
            $request->session()->flash('success', 'User '.$msg);
            return Redirect::to('users/'.$view);
       }else{
           $request->session()->flash('error', 'User Not added');
           return Redirect::to('users/create');
       }
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         $users = User::find($id);
         return view('users.show',['resultset' => $users]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        $users = User::find($id);
        return view('users.create',['resultset' => $users]);
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
        //
        $user = User::find(1);

        $user->email = 'john@foo.com';

        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $user = User::find();
        $user->delete();
    }
}
