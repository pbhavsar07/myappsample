function clearthis()
{
    console.log("in clear");
    document.getElementById("message").innerHTML = ("Cleared! Please paste WiKi template in above box...");
    document.getElementById("texta").innerHTML = "";
}
function aboutus()
{
    console.log("in about us");
    window.location = "about2.html"
}
function gettemplate()
{
document.getElementById('texta').innerHTML = `interface $INT1$ 
service instance $SERVICE_INSTANCE1$ ethernet
description CSI: $SHORT_NAME$-$FRO_NUM$
!
interface $INT2$
service instance $SERVICE_INSTANCE2$ ethernet
description CSI: $SHORT_NAME$-$FRO_NUM$
!
connect FRO$FRO_NUM$ $INT1$ $SERVICE_INSTANCE1$ $INT2$ $SERVICE_INSTANCE2$
end`
}
function ValidateTemplate()
{
    var code = document.getElementById('texta').value;
    var substring= "$";
    var n =  code.indexOf(substring);
    console.log("n = "+n);
    if(n!=-1)
    {
        var m = n;
        n=n+1;
        while(code[n]!="$" )
        {
            n=n+1;
        }
        console.log("new n"+n);
        
        var temp = code.substring(n+1,m);
        console.log(temp);
    
        document.getElementById('value').value = "";
        document.getElementById('message').innerHTML = 'enter value for'+temp;
        document.getElementById('value').style.visibility='visible';
        document.getElementById('enter').style.visibility='visible';
        document.getElementById('skip').style.visibility='visible';
        document.getElementById('value').focus();
        document.getElementById('temp').value = temp;
    }
    else
    {
        document.getElementById('value').style.visibility = 'hidden';
        document.getElementById('enter').style.visibility='hidden';
        document.getElementById('skip').style.visibility='hidden';
        var f = document.getElementById('flag').value
        if(f>=1)
        {
        document.getElementById('message').innerHTML = "thank you for using this tool you have skipped "+f+" number of values  ";
        }
        else{
            document.getElementById('message').innerHTML = "thank you for using this tool you";
        }
    }
}

function onskip()
{
  var skip = document.getElementById('temp').value ;
  var len = skip.length-1;
   skip =skip.substring(1,len);
   document.getElementById('value').value = '<>'+skip+'<>';
  var flag = document.getElementById('flag').value;
  flag=  parseInt(flag);
  flag=flag+1;
  console.log("flag "+flag);
  document.getElementById('flag').value  = flag;
 Replacevalue();

    
}


function Replacevalue()
{
    var code = document.getElementById('texta').value;
    var value = document.getElementById('value').value;
    if(value == "")
    {
        onskip();
    }
    else
    {
        var temp1 = document.getElementById('temp').value;
        var x = code.indexOf(temp1);        
        while(x!=-1)
        {
           code = code.replace(temp1,value);
            x  = code.indexOf(temp1);  
        }
    
    }
    console.log(code);
    console.log("x "+x);
   document.getElementById('texta').value = code;
/*    document.getElementById('value').style.visibility = 'hidden';
    document.getElementById('enter').style.visibility = 'hidden';
    document.getElementById('skip').style.visibility = 'hidden';   
    document.getElementById('message').innerHTML = ("");  */

ValidateTemplate();
}
