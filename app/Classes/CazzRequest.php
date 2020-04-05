<?php

namespace App\Classes;

use GuzzleHttp\Exception\RequestException;
Use Log;

/**
 * Request Class
 */
class CazzRequest
{
    const OK = 200;
    const CREATED = 201;
    const ACCEPTED = 202;
    const REDIRECT = 302;
    const ERR_BAD_REQUEST = 400;
    const ERR_UNAUTHORIZED = 401;
    const ERR_FORBIDDEN = 403;
    const ERR_NOT_FOUND = 404;
    const ERR_CONFLICT = 409;
    const ERR_INTERNAL_SERVER = 500;

    public $url = null;
    public $response = null;

    public $requestOptions = [
        'http' => [
            'header' => [],
            'method' => 'GET',
            'content' => '',
            'ignore_errors' => true,
            'timeout' => 10,
        ],
        'ssl' => [
            'verify_peer' => false,
            'allow_self_signed' => true
        ]
    ];

    function __construct($url = null)
    {
        $this->url = $url;
    }

    public function setBody($body = "")
    {
        $this->requestOptions['http']['content'] = $body;
    }

    public function setJSONBody($array)
    {
        $this->requestOptions['http']['content'] = json_encode($array);
    }

    public function addHeaders($headers = [])
    {
        foreach ($headers as $value) {
            $this->requestOptions['http']['header'][] = $value;
        }
    }

    public function requestGET($json = true)
    {
        if (session()->has('tokens')) {
            $this->requestOptions['http']['header'][] = 'Authorization: Bearer ' . session()->get('tokens')['access_token'];
            //$this->requestOptions['http']['header'][] = 'X-Status-Auth: ' . session()->get('token');
        }

        $this->requestOptions['http']['method'] = 'GET';
        $response = $this->execute();
        return $response;
    }

    public function requestPOST($json = true)
    {
        if (session()->has('tokens')) {
            $this->requestOptions['http']['header'][] = 'Authorization: Bearer ' . session()->get('tokens')['access_token'];
        }

        $this->requestOptions['http']['method'] = 'POST';
        $response = $this->execute();
        return $response;
    }

    public function requestDELETE($json = true)
    {
        if (session()->has('tokens')) {
            //$this->requestOptions['http']['header'][] = 'X-Status-Auth: ' . session()->get('token');
        }

        $this->requestOptions['http']['method'] = 'DELETE';
        $response = $this->execute();
        return $response;
    }

    public function requestPUT($json = true)
    {
        if (session()->has('tokens')) {
            //$this->requestOptions['http']['header'][] = 'X-Status-Auth: ' . session()->get('token');
        }
        $this->requestOptions['http']['method'] = 'PUT';
        $response = $this->execute();
        return $response;
    }

    public function requestPATCH($json = true)
    {
        if (session()->has('tokens')) {
            //$this->requestOptions['http']['header'][] = 'X-Status-Auth: ' . session()->get('token');
        }
        $this->requestOptions['http']['method'] = 'PATCH';
        $response = $this->execute();
        return $response;
    }

    public function execute()
    {
        $response = [
            'msg' => '',
            'code' => 500,
            'data' => []
        ];

        $certPath = storage_path('app/cacert.pem');
        $this->requestOptions['ssl']['cafile'] = $certPath;

        $client = new \GuzzleHttp\Client();

        $headers = [];
        foreach ($this->requestOptions['http']['header'] as $header) {
            [$key, $value] = explode(':', $header, 2);
            $headers[trim($key)] = trim($value);
        }

        $clientOpts = [
            'decode_content' => true,
            'verify' => false
        ];

        if (count($headers) > 0) {
            $clientOpts['headers'] = $headers;
        }

        if ($this->requestOptions['http']['content']) {
            $clientOpts['body'] = $this->requestOptions['http']['content'];
        }
        //Log::info($clientOpts);

        try {

            $res = $client->request($this->requestOptions['http']['method'],
                $this->url,
                $clientOpts
            );

            if (empty($res)) {
                throw new CustomException("Error context", 500);
            }

            //Log::info($res->getHeaders());

            $jsonResponse = json_decode($res->getBody()->getContents(), true);
            if (!isset($jsonResponse)) {
                Log::info($res->getStatusCode());

                if ($res->getStatusCode() == 200) {
                    $response['code'] = 200;
                } else {
                    throw new CustomException("Error JSON parse", 500);
                }
            }

            $response = $jsonResponse;
        } catch (RequestException $e) {
            Log::info($e);

            if ($e->hasResponse()) {
                $responseBody = json_decode($e->getResponse()->getBody(true), true);
                $response['error'] = isset($responseBody['error']) ? $responseBody['error'] : '';
                $response['errorType'] = isset($responseBody['errorType']) ? $responseBody['errorType'] : '';
                $response['validationErrors'] = isset($responseBody['validationErrors']) ? $responseBody['validationErrors'] : '';
            }
            $response['err'] = true;
            $response['msg'] = $e->getMessage();
            $response['code'] = $e->getCode() ? $e->getCode() : 500;
        } catch (CustomException $e) {
            Log::info($e);

            if ($e->hasResponse()) {
                $responseBody = json_decode($e->getResponse()->getBody(true), true);
                $response['error'] = isset($responseBody['error']) ? $responseBody['error'] : '';
                $response['errorType'] = isset($responseBody['errorType']) ? $responseBody['errorType'] : '';
                $response['validationErrors'] = isset($responseBody['validationErrors']) ? $responseBody['validationErrors'] : '';
            }
            $response['err'] = true;
            $response['msg'] = $e->getMessage();
            $response['code'] = $e->getCode() ? $e->getCode() : 500;
        } catch (\ErrorException $e) {
            Log::info($e);

            if ($e->hasResponse()) {
                $responseBody = json_decode($e->getResponse()->getBody(true), true);
                $response['error'] = isset($responseBody['error']) ? $responseBody['error'] : '';
                $response['errorType'] = isset($responseBody['errorType']) ? $responseBody['errorType'] : '';
                $response['validationErrors'] = isset($responseBody['validationErrors']) ? $responseBody['validationErrors'] : '';
            }
            $response['err'] = true;
            $response['msg'] = $e->getMessage();//"Request Error Exception";
            $response['code'] = 500;
        } catch (\GuzzleHttp\Exception\ServerException $e) {
            Log::info($e);

            if ($e->hasResponse()) {
                $responseBody = json_decode($e->getResponse()->getBody(true), true);
                $response['error'] = isset($responseBody['error']) ? $responseBody['error'] : '';
                $response['errorType'] = isset($responseBody['errorType']) ? $responseBody['errorType'] : '';
                $response['validationErrors'] = isset($responseBody['validationErrors']) ? $responseBody['validationErrors'] : '';
            }
            $response['err'] = true;
            $response['msg'] = $e->getMessage();//"Request Error Exception";
            $response['code'] = 500;
        }

        $this->response = $response;
        return $response;
    }
}

?>