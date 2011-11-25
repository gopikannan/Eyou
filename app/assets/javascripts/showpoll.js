
          Highcharts.setOptions({
                                global: {
                                        useUTC: false
                                }
                        });
                                
                        var chart;

                        $(document).ready(function() {
                                chart = new Highcharts.Chart({
                                        chart: {
                                                renderTo: 'display',
                                                defaultSeriesType: 'spline',
                                                marginRight: 10,
                                                events: {
                                                        load: function() {
                                
                                                                // set up the updating of the chart each second
                                                                var series = this.series[0];
                                                                var y = 1;
                                                                setInterval(function() {
                                                                        $.ajax({
                                                                                type: 'POST',
                                                                                url: 'update',
                                                                                dataType: 'json',
                                                                                data: {poll_id: <%= @poll.id %>},
                                                                                success: function(json, status, xhr){
                                                                                var x = (new Date()).getTime(); // current time
                                                                                var val = json.message;
                                                                                y = val * 1;
                                                                                var shift = series.data.length > 40;
                                                                                series.addPoint([x, y], true, shift);
                                                                                }
                                                                                });
                                                                }, 1000);
                                                        }
                                                }
                                        },
                                        title: {
                                                text: 'Live random data'
                                        },
                                        xAxis: {
                                                type: 'datetime',
                                                tickPixelInterval: 150
                                        },
                                        yAxis: {
                                                title: {
                                                        text: 'Value'
                                                },
                                                plotLines: [{
                                                        value: 0,
                                                        width: 10,
                                                        color: '#808080'
                                                }]
                                        },
                                        tooltip: {
                                                formatter: function() {
                                                return '<b>'+ this.series.name +'</b><br/>'+
                                                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+ 
                                                                Highcharts.numberFormat(this.y, 2);
                                                }
                                        },
                                        legend: {
                                                enabled: false
                                        },
                                        exporting: {
                                                enabled: false
                                        },
                                        series: [{
                                                name: 'Random data',
                                                data: (function() {
                                                        // generate an array of random data
                                                        var data = [],
                                                                time = (new Date()).getTime(),
                                                                i;
                                                        
                                                        for (i = -1; i <= 0; i++) {
                                                                data.push({
                                                                        x: time + i * 10000,
                                                                        y: 0
                                                                });
                                                        }
                                                        return data;
                                                })()
                                        }]
                                });
                                
                                
                        });



        $(function() {
                $( "#slider" ).slider({
                        value: <%= @poll_value %>,
                        min: -25,
                        max: 25,
                        step: 1,
                        
                });
                
        });
                

        function onSubmit(opt){
				$.ajax({
                        		type: 'POST',
                        		url: '/clicks',
                        		data: {poll_id: <%= @poll.id %>,
                                        option:opt,},
					success:function(data, textStatus) {
						document.getElementById("messages").innerHTML="<p style='color:red'>Thanks Buddy !! </p>";
    					},
    					error:function(request, textStatus, errorThrown) {
						document.getElementById("messages").innerHTML="<p style='color:red'>Chill Buddy !!  Get some fresh air </p>";
					}
                        	});

	}
function onSlide(){
        var val = $("#slider").slider("value");
				$.ajax({
                        		type: 'POST',
                        		url: '/clicks',
                        		data: {poll_id: <%= @poll.id %>,
                                        option:val},
					success:function(data, textStatus) {
						document.getElementById("messages").innerHTML="<p style='color:red'>Thanks Buddy !! </p>";
    					},
    					error:function(request, textStatus, errorThrown) {
						document.getElementById("messages").innerHTML="<p style='color:red'>Chill Buddy !!  Get some fresh air </p>";
					}
                        	});


}

