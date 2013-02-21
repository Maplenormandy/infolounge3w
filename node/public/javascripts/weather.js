$(function() {
				
			$.simpleWeather({

				
				zipcode: '02139',
				unit: 'f',

				success: function(weather) {
					html1 = '<span style="float:left;padding-left:4%; margin-top:52px; font-size:24px;">Now</span><img style="position:fixed;float:left;left:11%;" width="135px" src="images/weather/'+weather.code+'.png">';
					html1 += '<p><span style="font-size:16px;color:#4C4C4C;"></span><br/><span style="font-size:53.2px;color:#ffffff;"><b>'+weather.temp+'&deg;'+weather.units.temp+'</b></span><span style="font-size:39px;color:#ffffff;"> | Feel '+weather.wind.chill+'&deg;'+weather.units.temp+'<br /></span><b><span style="font-size:34px;color:#ffffff;">'+weather.tempAlt+'&degC </span></b>| Feel	 '+((weather.wind.chill - 32)*(5/9)).toFixed(0)+'&deg;C<br /><span>'+weather.currently+'</span></p><br/><br/><br/>';

					html2 = '<span style="float:left;padding-left:3%; margin-top:35px; font-size:24px;">Today</span><img style="position:fixed;float:left;left:11%;" width="110px" src="images/weather/'+weather.todayCode+'.png">'	;
					html2 += '<p><span style="font-size:16px;color:#4C4C4C;"></span><br/><span style="font-size:34px;color:#ffffff;">'+weather.high+'&deg;'+weather.units.temp+' | '+weather.low+'&deg;'+weather.units.temp+'</span><br />'+((weather.high - 32)*(5/9)).toFixed(0)+'&deg;C | '+((weather.low - 32)*(5/9)).toFixed(0)+'&deg;C<br /><span>'+weather.forecast+'</span></p><br/><br/><br/>';

					html3 = '<span style="float:left;padding-left:3%; margin-top:40px;	font-size:24px;">'+weather.tomorrow.day+'</span><img style="position:fixed;float:left;left:11%;" width="110px" src="images/weather/'+weather.tomorrow.code+'.png">'	;	
					html3 += '<p><span style="font-size:16px;color:#4C4C4C;"></span><br/><span style="font-size:34px;color:#ffffff;">'+weather.tomorrow.high+'&deg;'+weather.units.temp+' | '+weather.tomorrow.low+'&deg;'+weather.units.temp+'</span><br />'+((weather.tomorrow.high - 32)*(5/9)).toFixed(0)+'&deg;C | '+((weather.tomorrow.low - 32)*(5/9)).toFixed(0)+'&deg;C<br /><span>'+weather.tomorrow.forecast+'</span></p>';
					html4 = weather.tomorrow.day+' '+weather.tomorrow.date
					$("#weather1").html(html1);
					$("#weather2").html(html2);
					$("#weather3").html(html3);
					$("#weather4").html(html4);
				},
				error: function(error) {
					$("#weather1").html('<p>'+error+'</p>');
				}
			});
		});