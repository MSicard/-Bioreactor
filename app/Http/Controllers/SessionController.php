<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use Log;
use Session;

class SessionController extends Controller
{
    public function login()
    {
    	return redirect(config('aws.cognito_signin_url'), CazzRequest::REDIRECT);
    }

    public function logout(Request $request)
    {
        $request->session()->flush();
        return redirect(config('aws.cognito_signout_url'), 302);

    }

    public function cognitoAuthCallback(Request $request)
    {
        if (! $request->has('code')) {
            return redirect(config('aws.cognito_signin_url'), CazzRequest::REDIRECT);
        }

        $tokens = $this->exchangeToken($request->code);

        if (isset($tokens['refresh_token'], 
                    $tokens['id_token'], 
                    $tokens['access_token'])) 
        {
            session()->put('tokens', $tokens);
            session()->put('userInfo', $this->getUserInfo());
        }
        
        return redirect('/');
    }

    public function exchangeToken(String $code) 
    {
        Log::info($code);
        $result = false;
        $request = new CazzRequest(config('aws.cognito_exchangetoken_url'));
        $request->addHeaders([
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic ' . base64_encode(config('aws.cognito_client_id') . ":" . config('aws.cognito_client_secret'))
        ]);
        $request->setBody(http_build_query([
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => config('aws.cognito_callback_url')
        ]));
        
        $result = $request->requestPOST();
        Log::info($result);
        return $result;
    }

    public function getUserInfo() {
        $result = false;
        $request = new CazzRequest(config('aws.user_info_url'));
        $tokens = session()->get('tokens');

        $request->addHeaders([
            'Authorization: Bearer ' . $tokens['access_token']
        ]);

        $result = $request->requestGET();
        return $result;
    }
}