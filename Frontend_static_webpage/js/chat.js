function Message (arg) {
    this.text = arg.text,
        this.message_side = arg.message_side;
    this.draw = function(_this) {
        return function() {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);
            return setTimeout(function() {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
};
function getMessageText () {
    var $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
};
function sendMessage (text, message_side) {
    var $messages, message;
    if (text.trim() === '') {
        return;
    }
    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: message_side
    });
    message.draw();
    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
};
// sendMessage('Hello Philip! :)');
// setTimeout(function () {
//     return sendMessage('Hi Sandy! How are you?');
// }, 1000);
// return setTimeout(function () {
//     return sendMessage('I\'m fine, thank you!');
// }, 2000);

var muted = false;

var btn_mute = $('#btn_mute');

btn_mute.on('click', function(e) {
    muted = !muted;

    if (muted)
        btn_mute.css("color", "rgba(255,255,255,0.5)");
    else
        btn_mute.css("color", "rgba(255,255,255,0.9)");
});
