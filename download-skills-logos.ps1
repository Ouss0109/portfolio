# Script PowerShell pour telecharger les logos des technologies
$skillsFolder = "images\skills"

# Liste des logos a telecharger depuis DevIcon
$logos = @(
    @{name="html.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"},
    @{name="css.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"},
    @{name="javascript.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},
    @{name="php.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"},
    @{name="python.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},
    @{name="java.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},
    @{name="cpp.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"},
    @{name="database.svg"; url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"}
)

foreach ($logo in $logos) {
    $filePath = Join-Path $skillsFolder $logo.name
    Write-Host "Telechargement de $($logo.name)..."
    try {
        Invoke-WebRequest -Uri $logo.url -OutFile $filePath -ErrorAction Stop
        Write-Host "OK $($logo.name) telecharge avec succes" -ForegroundColor Green
    } catch {
        Write-Host "Erreur lors du telechargement de $($logo.name): $_" -ForegroundColor Red
    }
}

Write-Host "Telechargement termine!" -ForegroundColor Cyan
