Param($id, [string]$raw) # 582

[System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms") > $null
[System.Windows.Forms.DataFormats]::GetFormat($id) > $null
# $input = Get-Clipboard -Format Text
$data = new-object System.IO.MemoryStream(, $raw.Split(','));
[System.Windows.Forms.Clipboard]::SetData("Format$($id)", $data)
