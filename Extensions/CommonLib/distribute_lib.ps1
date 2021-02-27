# Make sure you allow unsigned PowerShell if using this.
# $ Get-ExecutionPolicy
# Needs to be "Unrestricted"
# Run as admin
# $ Set-ExecutionPolicy -ExecutionPolicy Unrestricted

$Folders = Get-Item ..\* | Where-Object {$_.Name -ne "CommonLib"}

foreach ($Folder in $Folders) {
    Copy-Item .\lib.js $Folder
}