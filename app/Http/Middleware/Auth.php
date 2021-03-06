<?php

namespace App\Http\Middleware;

use App\Classes\CazzRequest;
use Closure;
use Log;

class Auth
{
    public function handle($request, Closure $next)
    {

        if (!$request->session()->has('tokens')) {
            $request->session()->flush();
            return redirect('/session/login');
        }

        if ($request->session()->has('updateTime')) {
            $updateTime = $request->session()->get('updateTime');
            if ($updateTime > time()) {
                return $next($request);
            } else {
                $request->session()->put('updateTime', time() + (30 * 60));
                $this->refreshToken();
            }
        } else {
            $request->session()->put('updateTime', time() + (30 * 60));
        }

        $response = $next($request);

        if ($response->getStatusCode() == '401') {
            if ($request->ajax()) {
                $request->session()->flush();
                $newResponse['code'] = 401;
                $newResponse['err'] = true;
                $newResponse['message'] = 'Unauthenticated.';
                $newResponse['errType'] = 401;
                return response($newResponse, $newResponse['code']);
            } else {
                $request->session()->flush();
                return redirect('/session/login');
            }
        }

        return $response;
    }

    public function refreshToken()
    {
        Log::info('refreshToken');
        $request = new CazzRequest(config('aws.cognito_exchangetoken_url'));
        $request->addHeaders([
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic ' . base64_encode(config('aws.cognito_client_id') . ":" . config('aws.cognito_client_secret'))
        ]);
        Log::info('Basic ' . base64_encode(config('aws.cognito_client_id') . ":" . config('aws.cognito_client_secret')));
        Log::info(session()->get("tokens")['refresh_token']);
        $params = [
            "grant_type" => "refresh_token",
            "client_id" => config('aws.cognito_client_id'),
            "refresh_token" => session()->get("tokens")['refresh_token'],
        ];
        Log::info(http_build_query($params));
        $request->setBody(http_build_query($params));
        $response = $request->requestPOST();
        Log::info($response);
        if (isset($response["id_token"]) && isset($response["access_token"]) && isset($response["expires_in"]) && isset($response["token_type"])) {
            $response['refresh_token'] = session()->get("tokens")['refresh_token'];
            session()->put('tokens', $response);
        } // Si no se encuentran los tokens, se cierra sesión
        else {
            session()->flush();
            return redirect('/session/login');
        }
    }
}