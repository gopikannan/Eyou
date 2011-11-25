$(document).ready(function(){
        $('.question').tbHinter({
                text: 'Question the world!',
                class: 'grey'
        });
        $('.option1').tbHinter({
                text: 'Option 1?',
                class: 'grey'
        });
        $('.option2').tbHinter({
                text: 'Option 2?',
                class: 'grey'
        });
		$("#poll_question").autocomplete('/polls/autocomplete.js', {
			multiple: true,
			dataType: "json",
			type: "POST",
			parse: function(data) {
			return $.map(data, function(row) {
				return {
					data: row,
					value: row.question,
					result: row.question + " <" + row.option1 + ">"+ " <" + row.option2 + ">"
				}
			});
		},
		formatItem: function(item) {
			return format(item);
		}
		}).result(function(e, item) {
			$("#content").append("<p>selected " + format(item) + "</p>");
		});
});
function format(value) {
		return value.question + " &lt;" + value.option1 + "&gt" + value.option2 + "&gt";
	}

