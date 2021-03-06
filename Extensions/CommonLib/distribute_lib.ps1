# Make sure you allow unsigned PowerShell if using this.
    # https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1
    # $ Get-ExecutionPolicy
    # Needs to be "Unrestricted"
    # Run as admin
    # $ Set-ExecutionPolicy -ExecutionPolicy Unrestricted

# Expected to be run in the context of the directory the script is in.
$Folders = Get-Item ..\* | Where-Object {$_.Name -ne "CommonLib"} | Where-Object {$_.Name -ne "Test"}

foreach ($Folder in $Folders) {
    Copy-Item .\lib.js ($Folder.FullName + "\lib\")
    Copy-Item .\jquery.min.js ($Folder.FullName + "\lib\")
    Copy-Item .\constants.js ($Folder.FullName + "\lib\")
}