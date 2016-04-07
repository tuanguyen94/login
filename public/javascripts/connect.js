/**
 * Created by Naut on 05-Apr-16.
 */
$(document).ready(function(){
    var socket = io.connect('http://127.0.0.1:3000');
    socket.emit('NewConnect',document.cookie);
    window.onbeforeunload = function(){
        socket.emit('CloseConnect',document.cookie);
    };
    //
});