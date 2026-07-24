# =============================================================
# ABYSS Frame Extractor (JPG 30fps)
# Extracts 30fps image sequences into public/frames/<scene>/ as 0001.jpg, 0002.jpg...
# =============================================================

$projectRoot = Split-Path -Parent $PSScriptRoot
$videoDir    = Join-Path $projectRoot "public\video"
$framesDir   = Join-Path $projectRoot "public\frames"

$scenes = @(
    @{ folder = "01-surface";          video = "01-surface.mp4" },
    @{ folder = "02-dive";             video = "02-dive.mp4" },
    @{ folder = "03-reef";             video = "03-reef.mp4" },
    @{ folder = "04-bioluminescence";  video = "04-bioluminescence.mp4" },
    @{ folder = "05-ruins";            video = "05-ruins.mp4" },
    @{ folder = "06-darkness";         video = "06-darkness.mp4" },
    @{ folder = "07-abyss";            video = "07-abyss.mp4" }
)

foreach ($scene in $scenes) {
    $srcVideo  = Join-Path $videoDir $scene.video
    $dstFolder = Join-Path $framesDir $scene.folder

    if (Test-Path $srcVideo) {
        New-Item -ItemType Directory -Force -Path $dstFolder | Out-Null
        Write-Host "Extracting $($scene.video) -> $($scene.folder)/"
        & ffmpeg -y -loglevel error -i $srcVideo -vf "fps=30" -q:v 4 "$dstFolder\%04d.jpg"
        $count = (Get-ChildItem $dstFolder -Filter "*.jpg").Count
        Write-Host "  -> $count JPG frames extracted in $($scene.folder)"
    } else {
        Write-Host "SKIP: $($scene.video) not found"
    }
}

Write-Host "All JPG frame extractions completed successfully."
