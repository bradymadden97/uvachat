		$(document).ready(function(){
			$("#m").focus();
		});
		
		var socket = io();
		$('form').submit(function(){
			if($("#m").val().trim()){
				socket.emit('chat message', $('#m').val());
				$('#m').val('');
				$("#m").focus();
			}else{
				$('#m').val('');
				$("#m").focus();
			}
				return false;
		});
		socket.on('chat message', function(msg){
			var date = new Date();
			var ampm = 'AM';
			var hr = date.getHours();
			var min = date.getMinutes();
			if(hr > 11)
				ampm = 'PM';
			hr %= 12;
			if(min < 10)
				min = '0' + min;
			msg = msg.replace(/((((http|ftp|https):\/\/)|(www.))[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?)/g, "<a target='_blank' href='$1' >$1</a>");
			$("#messages_box").append($('<li>').append($('<span class="txt">').append(msg)).append($('<span class="time">').append(hr+':'+min+' '+ampm)));
			
		});