const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.sass('resources/sass/app.scss', 'public/css');

mix.copyDirectory('resources/assets/icons', 'public/icons')
    .copyDirectory('resources/assets/css', 'public/css')
    .copyDirectory('resources/assets/images', 'public/images')
    .copyDirectory('resources/assets/locales', 'public/locales')
    .copyDirectory('resources/assets/js/plugins', 'public/js/plugins')

    // Core JS
    .copy('resources/assets/js/core/alerts.js', 'public/js/core')
    .copy('resources/assets/js/core/app.js', 'public/js/core')
    .copy('resources/assets/js/core/attrchange.js', 'public/js/core')
    .copy('resources/assets/js/core/attrchange_ext.js', 'public/js/core')
    .copy('resources/assets/js/core/custom.js', 'public/js/core')
    .copy('resources/assets/js/core/Errors.js', 'public/js/core')
    .copy('resources/assets/js/core/functions_Ajax.js', 'public/js/core')
    .copy('resources/assets/js/core/functions_Validate.js', 'public/js/core')
    .copy('resources/assets/js/core/jssip-3.2.11.js', 'public/js/core')
    .copy('resources/assets/js/core/utils.js', 'public/js/core')
    .copy('resources/assets/js/core/bootstrap.bundle.min.js', 'public/js/core')
    .copy('resources/assets/js/core/jquery.min.js', 'public/js/core')
    .copy('resources/assets/js/core/UForms.js', 'public/js/core')
    .copy('resources/assets/js/core/internationalization.js', 'public/js/core')

    .sass('resources/assets/sass/layouts/layout_2/material/compile/bootstrap.scss', 'public/css/core/material')
    .sass('resources/assets/sass/layouts/layout_2/material/compile/bootstrap_limitless.scss', 'public/css/core/material')
    .sass('resources/assets/sass/layouts/layout_2/material/compile/colors.scss', 'public/css/core/material')
    .sass('resources/assets/sass/layouts/layout_2/material/compile/components.scss', 'public/css/core/material')
    .sass('resources/assets/sass/layouts/layout_2/material/compile/layout.scss', 'public/css/core/material')
    .sass('resources/assets/sass/core/custom.scss', 'public/css/core')

    .version();
