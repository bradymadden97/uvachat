		$(document).ready(function(){
			$("#m").focus();
		});
		var currentspeaker = "";
		var socket = io();
		$('.chat_form').submit(function(){
			if($("#m").val().trim()){
				var upcomingspeaker = checkUserNameCookie();
				var dataobj = {
					speaker:upcomingspeaker,
					message:$('#m').val()
				};
				socket.emit('chat message', dataobj);
				$('#m').val('');
				$("#m").focus();
			}else{
				$('#m').val('');
				$("#m").focus();
			}
				return false;
		});
		socket.on('chat message', function(data){
			var upcomingspeaker = data.speaker;
			var msg = data.message;
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
			
			var mb = document.getElementById('messages_box');
			var scrolledup = false;
			if(mb.scrollHeight - mb.clientHeight - mb.scrollTop > 5){
				scrolledup = true;
			}
			if(currentspeaker == upcomingspeaker)
				$("#messages_box").append($('<li>').append($('<span class="txt">').append('<div class="indenttextchat">'+msg+'</div>')).append($('<span class="time">').append(hr+':'+min+' '+ampm)));
			else{
				currentspeaker = upcomingspeaker;
				$("#messages_box").append($('<li>').append($('<span class="txt">').append("<b>"+upcomingspeaker+":</b><br>"+'<div class="indenttextchat">'+msg+'</div>')).append($('<span class="time">').append(hr+':'+min+' '+ampm)));
			}
			
			
			if(scrolledup)
				console.log("new messages below");
			else	
				mb.scrollTop = mb.scrollHeight - mb.clientHeight;
			//document.getElementById('messages_box').scrollTop = document.getElementById('messages_box').scrollHeight - document.getElementById('messages_box').clientHeight;
			
		});