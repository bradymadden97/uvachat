		$(document).ready(function(){
			var mb = document.getElementById('messages_box');
			mb.scrollTop = mb.scrollHeight - mb.clientHeight;
			$("#m").focus();
		});
		var currentspeaker = "";
		var autolinker = new Autolinker( {
			urls : {
				schemeMatches : true,
				wwwMatches    : true,
				tldMatches    : true
			},
			email       : true,
			phone       : false,
			mention     : false,
			hashtag     : false,

			stripPrefix : false,
			stripTrailingSlash : true,
			newWindow   : true,

			truncate : {
				length   : 0,
				location : 'end'
			},

			className : ''
		} );
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
			
			msg = autolinker.link(msg);
			
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
			
			
			if(scrolledup){
				$("#newMsgBtn").css('display','block');
			}else	
				mb.scrollTop = mb.scrollHeight - mb.clientHeight;		
		});
		
		$("#newMsgBtn").on('click', function(){
			var mb = document.getElementById('messages_box');
			mb.scrollTop = mb.scrollHeight - mb.clientHeight;
			setTimeout(function(){
				$("#newMsgBtn").css('display','none');
			}, 200);
			$("#m").focus();
		});
		
		$("#messages_box").on('scroll', function(){
			if($("#newMsgBtn").css('display') != 'none'){
				var mb = document.getElementById('messages_box');
				if(mb.scrollHeight - mb.clientHeight - mb.scrollTop < 5){
					$("#newMsgBtn").addClass('out');
					setTimeout(function(){
						$("#newMsgBtn").css('display','none');
					}, 200);
				}
			}
		});