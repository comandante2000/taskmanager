
<?php
use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // Other global middleware...
        \App\Http\Middleware\Cors::class, // Add Cors middleware here
    ];

    protected $middlewareGroups = [
        // 'web' => [
        //     // Other middleware...
        //     \App\Http\Middleware\VerifyCsrfToken::class,
        // ],
        'api' => [
            \App\Http\Middleware\VerifyCsrfToken::class,
        ],
    ];
   

    // Other kernel configuration...
}