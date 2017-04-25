		$(document).ready(function(){
			$("#m").focus();
		});
		var currentspeaker = "";
		var socket = io();
		$('.chat_form').submit(function(){
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
			var upcomingspeaker = "StudentName"; //Get current speaker from param in future
			
			var date = new Date();
			var ampm = 'AM';
			var hr = date.getHours();
			var min = date.getMinutes();
			if(hr > 11)
				ampm = 'PM';
			hr %= 12;
			if(hr == 0)
				hr = 12;
			if(min < 10)
				min = '0' + min;
			msg = msg.replace(/((((http|ftp|https):\/\/)|(www.))[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?)/g, "<a target='_blank' href='$1' >$1</a>");
			if(currentspeaker == upcomingspeaker)
				$("#messages_box").append($('<li>').append($('<span class="txt">').append('<div class="indenttextchat">'+msg+'</div>')).append($('<span class="time">').append(hr+':'+min+' '+ampm)));
			else{
				currentspeaker = upcomingspeaker;
				$("#messages_box").append($('<li>').append($('<span class="txt">').append("<b>"+upcomingspeaker+":</b><br>"+'<div class="indenttextchat">'+msg+'</div>')).append($('<span class="time">').append(hr+':'+min+' '+ampm)));
			}
		});