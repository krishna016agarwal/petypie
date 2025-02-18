# Create sounds directory if it doesn't exist
$soundsDir = ".\sounds"
if (!(Test-Path $soundsDir)) {
    New-Item -ItemType Directory -Path $soundsDir
}

# Dictionary of sound files to download
$sounds = @{
    "cat-purring.mp3" = "https://cdn.pixabay.com/download/audio/2021/11/25/audio_00fa5593f3.mp3"
    "dog-calm.mp3" = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1ecd.mp3"
    "bird-nature.mp3" = "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e604b.mp3"
    "hamster-calm.mp3" = "https://cdn.pixabay.com/download/audio/2022/03/22/audio_270f49b09d.mp3"
    "rabbit-meadow.mp3" = "https://cdn.pixabay.com/download/audio/2021/09/06/audio_8c0c57f06e.mp3"
    "aquarium-bubbles.mp3" = "https://cdn.pixabay.com/download/audio/2021/08/09/audio_dc39d0263a.mp3"
}

# Download each sound file
foreach ($sound in $sounds.GetEnumerator()) {
    $outputFile = Join-Path $soundsDir $sound.Key
    Write-Host "Downloading $($sound.Key)..."
    Invoke-WebRequest -Uri $sound.Value -OutFile $outputFile
    Write-Host "Downloaded $($sound.Key)"
}
