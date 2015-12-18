<?php
require '../vendor/autoload.php';
$dotenv = new Dotenv\Dotenv('../');
$dotenv->load();
/**
 * @param  string  $filename
 * @return string
 */
function asset_path($filename, $type) {
    $manifest_path = 'build/assets.json';
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), TRUE);
    } else {
        die();
        $manifest = [];
    }

    if(getenv('APP_ENVIRONMENT') == 'local'){
        return $type . '/' . $filename;
    }
    if (array_key_exists($filename, $manifest)) {
        return 'build/'. $type . '/' . $manifest[$filename];
    }

    return $filename;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Start</title>

<!--    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css">
-->
    <link href="<?php echo asset_path('styles.css', 'css'); ?>" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<h1>Start here...</h1>
</body>
</html>