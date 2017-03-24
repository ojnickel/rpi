$(function() {

    var imageQuality = 100;
    var format = 'png';

    $('#settings').click(function(){
        imageQuality = LS.imageQuality;
        format = LS.format;
        setQuality(imageQuality);
        changeFormat(format);
        $('#format-setting')
          .find('.active').removeClass('active').end()
          .find('.' + format).addClass('active');
        $('#nimbus-options-popup').fadeIn('fast');
    });

    $('#format-setting').find('button').click(function() {
        $('#format-setting').find('.active').removeClass('active');
        $(this).addClass('active');
        format = $(this).data('format');
        changeFormat(format);
    });

    $("input#quality").bind("input change", function() {
        var q = $(this).val();
        imageQuality = q;
        $('#quality-value span').text(q);
    });

    $('#save-options').click(function() {
        LS.imageQuality = imageQuality;
        LS.format = format;
        $('#done').click();
        $('#nimbus-options-popup').fadeOut('fast');
        chrome.storage.local.set({
            'imageQuality': imageQuality,
            'format': format
        }, function() {});
    });


    function changeFormat(f) {
        if(f === 'jpeg') {
            setQuality(imageQuality);
            $("#image-quality").slideDown('fast');
        } else {
            $("#image-quality").slideUp('fast');
        }
    }
    function setQuality (q) {
        $("input#quality").val(q);
        $('#quality-value span').text(q);
    }

});