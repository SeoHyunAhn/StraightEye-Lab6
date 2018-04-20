function handleFileSelect(evt)
{
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++)
    {

        var reader = new FileReader();
        reader.onload = (function(reader)
        {
            return function()
            {
                var contents = reader.result;
                var lines = contents.split('\n');
                //////
                document.getElementById('container').innerHTML=contents;
            }
        })(reader);

        reader.readAsText(f);
    }
}