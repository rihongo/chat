/**
 * Created with JetBrains WebStorm.
 * User: UserXP
 * Date: 12. 12. 22
 * Time: 오후 4:16
 * To change this template use File | Settings | File Templates.
 */
(function() {
    window.Chat = {
      socket : null,

      initialize : function(socketURL) {
          console.log('step1 socketURL : %s', socketURL);
          this.socket = io.connect(socketURL);

          console.log('step2 conneciton ok : %s ', this.socket);

          $('#send').click(function() {
              Chat.send();
          });

          $('#message').keyup(function(evt) {
             if((evt.keyCode || evt.which) == 13) {
                 Chat.send();
                 return false;
             }
          });

          this.socket.on('new', this.add);
      },

      add : function(data) {
          console.log('add message : %s', data.name +', '+ data.msg);
          var name = data.name || 'anonymous';
          var msg = $('<div class="msg"></div>')
              .append('<span class="name">' + name + '</span>: ')
              .append('<span class="text">' + data.msg + '</span>');
          console.log('add html : %s', msg);

          $('#messages').append(msg).animate({scrollTop: $('#messages').prop('scrollHeight')}, 0);
      },

      send : function() {
          console.log('sending message : %s', $('#name').val() +', '+ $('#message').val());
          this.socket.emit('msg', {
              name: $('#name').val(),
              msg: $('#message').val()
          });

          $('#message').val('');
      }
    };
}());
