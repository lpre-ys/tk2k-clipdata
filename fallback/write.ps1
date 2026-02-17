Param($id) # 582

[System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms") > $null
[System.Windows.Forms.DataFormats]::GetFormat($id) > $null
$raw = [Console]::In.ReadToEnd()
# $input = Get-Clipboard -Format Text
$data = new-object System.IO.MemoryStream(, $raw.Split(','));
[System.Windows.Forms.Clipboard]::SetData("Format$($id)", $data)
