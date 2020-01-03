param(
    [string]$ci_token,
    [string]$project_id,
    [string]$release_message
)

$dir = Split-Path $MyInvocation.MyCommand.Path
Push-Location $dir

npm i -g firebase-tools
write-host "Starting hosting deployment.";
write-host "Firebase version:";
firebase --version;
write-host "firebase deploy --only hosting --token $ci_token --project $project_id --message Release/$release_message";
firebase deploy --only hosting --token "$ci_token" --project $project_id --message "Release/$release_message";
write-host "Hosting deployment finished.";
