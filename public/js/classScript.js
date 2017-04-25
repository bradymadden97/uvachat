$('.removeClassModal').on('show.bs.modal', function (e) {
    var cls = $(e.relatedTarget).attr('data-class');
	$("#removeClassModalSpan").text(cls);
});
$(".cls").on('click',function(){
	$("#class_name_span").text($(this).attr('data-class'));
	
});