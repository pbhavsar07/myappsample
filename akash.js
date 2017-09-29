
function clickESP()
{
	var espTemplate= "/configure service vprn 900 interface \"$INTERFACE_FORMAT$\" create \n/configure service vprn 900 interface \"$INTERFACE_FORMAT$\" description \"CUSTOMER: NID-MGMT: $CUSTNAME$ ($EON$, FRO$NIDFRO$NID) \" \n/configure service vprn 900 interface \"$INTERFACE_FORMAT$\" address $NIDIP$/30 \n/configure service vprn 900 interface \"$INTERFACE_FORMAT$\" ip-mtu 1514 \n/configure service vprn 900 interface \"$INTERFACE_FORMAT$\" sap $SAP_FORMAT$ create \n/configure service vprn 900 interface \"$INTERFACE_FORMAT$\" urpf-check mode loose \n";

	document.getElementById("tarea").value = espTemplate;
	document.getElementById("message").innerHTML = (" ");	
	document.getElementById("tarea").focus();

}

function clickPR()
{
    var PRTemplate="set firewall filter $PRTRUNK$.$NEXTAVAIL-7K$ term NID-MGMT then count MGMT.rx-$PRTRUNK$.$NEXTAVAIL-7K$-i \nset firewall filter $PRTRUNK$.$NEXTAVAIL-7K$ term NID-MGMT then loss-priority low \nset firewall filter $PRTRUNK$.$NEXTAVAIL-7K$ term NID-MGMT then forwarding-class EF \nset interfaces $PRTRUNK$ unit $NEXTAVAIL-7K$ description \"CUSTOMER: NID-MGMT: $CUSTNAME$ ($EON$, FRO$NIDFRO$NID)\" \nset interfaces $PRTRUNK$ unit $NEXTAVAIL-7K$ vlan-id $NEXTAVAIL-VLAN$ \nset interfaces $PRTRUNK$ unit $NEXTAVAIL-7K$ family inet no-redirects \nset interfaces $PRTRUNK$ unit $NEXTAVAIL-7K$ family inet filter input $PRTRUNK$.$NEXTAVAIL-7K$ \nset interfaces $PRTRUNK$ unit $NEXTAVAIL-7K$ family inet address $MGMTIP$/30 \nset routing-instances NID-MGMT interface $PRTRUNK$.$NEXTAVAIL-7K$";
	document.getElementById("tarea").value = PRTemplate;
	document.getElementById("message").innerHTML = (" ");
	document.getElementById("tarea").focus();
}


function clickOther()
{
	document.getElementById("tarea").value = "";
    document.getElementById("message").innerHTML = ("Please paste WiKi template in above box...");
	document.getElementById("tarea").focus();

}

function validateTemplate()
{
	var initialTemplate= document.getElementById("tarea").value;
//	var i= initialTemplate.split("$").length - 1;
	var i= initialTemplate.split("$").length - 1;  // taking number of $ in text area
	console.log("i = "+i);
	var j= initialTemplate.indexOf("<>");
	console.log("j = "+j);
	
	if (i%2 !=0 && j==-1)  // $$ should be in even number and no specialcharacter should be there 
		{
		document.getElementById("message").innerHTML = ("Template Validation failed! Please check weather all parameters are in the form of  $PARAMETER$");
		}
	else if (j!=-1)
		{
		document.getElementById("message").innerHTML = ("Template Validation failed! Please check weather template contains unnecesary special characters like <,>");
		}
	else
		{
			console.log("into get template");
		gettemplate();
		}
	// Template should have even no of $ and no <> ... <> is used for skipped values
}

function clearcode()
{
document.getElementById("tarea").value = "";
document.getElementById("tarea").focus();
document.getElementById("value").style.visibility = 'hidden';
document.getElementById("next").style.display='none';
document.getElementById("enter").style.display='none';
document.getElementById("message").innerHTML = ("Cleared! Please paste WiKi template in above box...");
document.getElementById("radioOther").checked = true;
}


function gettemplate() // get template will fetch the $ value 
{
	var code= document.getElementById("tarea").value;	
	var substring = "$";
	var n;
	console.log("n initial: "+n);
	n=code.indexOf(substring);
	console.log("n = "+n);
	if (n!=-1)
		{
		var m=n;
		n=n+1;
		while (code[n]!='$')
			{
			n=n+1;
			}
		console.log("n value: "+n);
		document.getElementById("value").value= "";
		document.getElementById("value").style.visibility = 'visible';
		document.getElementById("next").style.display='block';
		document.getElementById("enter").style.display='block';
		document.getElementById("value").focus();
		var temp=code.substr(m, n-m+1);
		console.log("temp value: "+temp);
		document.getElementById("temp").value=temp;
		
		document.getElementById("message").innerHTML = ("Enter value for: " +temp);
	
	
	
	}//if ends
	else
		{
		var skipNo=document.getElementById("flag").value;
		if (skipNo ==0)
			{
		    document.getElementById("message").innerHTML = ("    Done!!! Your template is ready to use :)");
			}
		else
			{
			document.getElementById("message").innerHTML = ("    Done !!! Note: "+skipNo +" Parametere(s) skipped");
			document.getElementById("flag").value="0";
			var end=code.indexOf("<>");
			while(end!=-1)
				{
				 code = code.replace("<>", "$");
				 end=code.indexOf("<>");
				}
			document.getElementById("tarea").value=code;
			}
		document.getElementById("tarea").focus().select();
		}
}



function skip() 
{
		var pending =  document.getElementById("temp").value;
		console.log("pending: "+pending);
	    var z=pending.length;
		var skip= pending.substr(1,z-1-1);
		console.log("skip: "+skip);		
		document.getElementById("value").value="<>"+skip+ "<>";
	    var flag= document.getElementById("flag").value;
		var flag=parseInt(flag);
		console.log("flag: "+flag);		
		document.getElementById("flag").value=flag+1;
		// flag is the count i.e no of varaibles skipped
    	replaceValue();
}
function replaceValue()  
{
	var code= document.getElementById("tarea").value;
	var temp2= document.getElementById("value").value;
	if (temp2 =="")
		{
		skip();
		}
	else
		{
	var temp1=document.getElementById("temp").value;
	console.log("temp1: "+temp1);
	var x=code.indexOf(temp1);
	console.log("index of temp1: "+x);
	while(x!=-1)
		{
	     code = code.replace(temp1, temp2); // first will be available replace it  with second parameter
		 x= code.indexOf(temp1); 	// find all the recurring value and replace them with our new value find the replaced value it should be -1 (i.e no where)
		}
console.log("new x = "+x);	
	document.getElementById("tarea").value=code;
	document.getElementById("value").style.visibility = 'hidden';
	document.getElementById("next").style.display='none';
	document.getElementById("enter").style.display='none';
	document.getElementById("message").innerHTML = ("");
	gettemplate();
		}
}