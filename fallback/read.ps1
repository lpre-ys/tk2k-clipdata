Param($id) # 582

[System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms") > $null
[System.Windows.Forms.DataFormats]::GetFormat($id) > $null

$data = [System.Windows.Forms.Clipboard]::GetData("Format$($id)").toArray()
[system.String]::Join(',', $data)