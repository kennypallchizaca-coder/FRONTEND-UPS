# Script de configuracion de .env exclusivo para el Frontend (PowerShell)
$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path "$ScriptDir\..\.."
Set-Location $ProjectDir

$Mode = if ($args.Count -gt 0) { $args[0] } else { "dev" }

if ($Mode -eq "prod" -or $Mode -eq "production") {
    Write-Host "Configurando .env de produccion para el Frontend..." -ForegroundColor Cyan
    Copy-Item deployment\env\.env.production .env -Force
} else {
    Write-Host "Configurando .env de desarrollo para el Frontend..." -ForegroundColor Cyan
    Copy-Item deployment\env\.env.development .env -Force
}

Write-Host "Archivo .env del Frontend configurado exitosamente." -ForegroundColor Green
