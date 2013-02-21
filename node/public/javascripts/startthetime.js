$(startTime(){

var today=new Date();
var h=today.getHours();
var m=today.getMinutes();
var s=today.getSeconds();

var d=new Date();
var weekday=new Array(7);

var o = d.getDate();
var wd = d.getDay();

weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

var n = weekday[d.getDay()];

var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";
var p = month[d.getMonth()];
var pa = d.getMonth()

// add a zero in front of numbers<10
m=checkTime(m);
s=checkTime(s);

if (h < 10)
  {
  document.getElementById('txt').innerHTML="0"+h+"."+m;
  }
else
  {
  document.getElementById('txt').innerHTML=h+"."+m;
  }
document.getElementById('date').innerHTML=n+" | "+o+" "+p;
t=setTimeout(function(){startTime()},500);



if ((pa==0 && o<7) || (pa==11 && o>21))
	{
	document.getElementById('dining1').innerHTML="There are no dining services today,</br>please hunt for your food"
	}
else if ((pa==0 && o>6) || (pa==1 && o==1))
	{
		if ((h==10 && m>29) || h==11 || h==12 || (h==13 && m<30))
		{
		document.getElementById('dining1').innerHTML="Brunch now at Baker until 13.30</br>Dinner at Baker: 17.30-20.00"
		}
		else if ((h==17 && m>29) || h==18 || h==19)
		{
		document.getElementById('dining1').innerHTML="Dinner now at Baker until 20.00</br>Breakfast at Baker 10.30-13.30"
		}		
		else
		{
		document.getElementById('dining1').innerHTML="Brunch at Baker: 10.30-13.30</br>Dinner at Baker: 17.30-20.00"
		}
	}
else if (wd==0 && din=0)
	{
		if (h==10 || h==11 || h==12)
		{
		document.getElementById('dining1').innerHTML="Brunch now until 13.00</br>Tomorrow: breakfast/dinner"
		}
		else if ((h==17 && m>29) || h==18 || h==19 || (h==20 && m<30))
		{
		document.getElementById('dining1').innerHTML="Dinner now until 20.30</br>Tomorrow: breakfast/dinner"
		}
		else
		{
		document.getElementById('dining1').innerHTML="Today: brunch/dinner</br>Tomorrow: breakfast/dinner"
		}
	}	
else if (wd==6 && din=0)
	{
		if (h==10 || h==11 || h==12)
		{
		document.getElementById('dining1').innerHTML="Brunch now until 13.00</br>Tomorrow: brunch/dinner"
		}
		else if ((h==17 && m>29) || h==18 || h==19 || (h==20 && m<30))
		{
		document.getElementById('dining1').innerHTML="Dinner now until 20.30</br>Tomorrow: brunch/dinner"
		}
		else
		{
		document.getElementById('dining1').innerHTML="Today: brunch/dinner</br>Tomorrow: brunch/dinner"
		}
	}
else if (wd==5 && din=0)
	{
		if (h==8 || h==9)
		{
		document.getElementById('dining1').innerHTML="Breakfast now until 10.00</br>Tomorrow: brunch/dinner"
		}
		else if ((h==17 && m>29) || h==18 || h==19 || (h==20 && m<30))
		{
		document.getElementById('dining1').innerHTML="Dinner now until 20.30</br>Tomorrow: brunch/dinner"
		}
		else
		{
		document.getElementById('dining1').innerHTML="Today: breakfast/dinner</br>Tomorrow: brunch/dinner"
		}		
	}
else
	{
	if (h==8 || h==9)
		{
		document.getElementById('dining1').innerHTML="Breakfast now until 10.00</br>Tomorrow: breakfast/dinner"
		}
		else if ((h==17 && m>29) || h==18 || h==19 || (h==20 && m<30))
		{
		document.getElementById('dining1').innerHTML="Dinner now until 20.30</br>Tomorrow: breakfast/dinner"
		}
		else
		{
		document.getElementById('dining1').innerHTML="Today: breakfast/dinner</br>Tomorrow: breakfast/dinner"
		}
	}
}

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;

})