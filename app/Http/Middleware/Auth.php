<?php

namespace App\Http\Middleware;

use App\Classes\CazzRequest;
use Closure;
use Log;


class Auth 
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        if (!$request->session()->has('tokens')) {
            session()->flush();
            return redirect('/session/login');
        }
        
        $tokenTime = (1 * 60);
        if ($request->session()->has('updateTime')) {
            $updateTime = $request->session()->get('updateTime');
            if ($updateTime > time()) {
                return $next($request);
            } else {
                $request->session()->put('updateTime', time() + $tokenTime);
                $this->refreshToken();
            }
        } else {
            $request->session()->put('updateTime', time() + $tokenTime);
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

    private function refreshToken()
    {
        $request = new CazzRequest(config('aws.cognito_exchangetoken_url'));
        $request->addHeaders([
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic ' . base64_encode(config('aws.cognito_client_id') . ":" . config('aws.cognito_client_secret'))
        ]);

        $request->setBody(http_build_query([
            'grant_type' => 'refresh_token',
            'client_id' => config('aws.cognito_client_id'),
            'refresh_token' => session()->get('tokens')['refresh_token']
        ]));

        $response = $request->requestPOST();

        if (isset($response["id_token"],
                    $reponse['access_token'], 
                    $response['expires_in'],
                    $reponse['token_type'])) 
        {
            $response['refresh_token'] = session()->get("tokens")['refresh_token'];
            session()->put('tokens', $response);
            return $reponse;
        } 
        else {
            session()->flush();
            return redirect('/session/login');
        }
    }
}
