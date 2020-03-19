<?php 

return  [
	'cognito_signin_url' => env('COGNITO_SIGNIN_URL', null),
	'cognito_signout_url' => env('COGNITO_SIGNOUT_URL', null),
	'cognito_callback_url' => env('COGNITO_CALLBACK_URL', null),

	'cognito_exchangetoken_url' => env('COGNITO_EXCHANGETOKEN_URL', null),
	'cognito_client_id' => env('COGNITO_CLIENT_ID', null),
	'cognito_client_secret' => env('COGNITO_CLIENT_SECRET', null),

	'refresh_token_url' => env('REFRESH_TOKEN_URL', null),
	'user_info_url' => env('USER_INFO_URL', null)
];

 ?>