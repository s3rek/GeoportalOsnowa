<?php
		header('Content-type: text/html');
		$conn = pg_connect("host=unimap.homenet.org port=5432 dbname=osnowaKatowice2019 user=postgres password=MalBry2015");
		if (!$conn) 
		{
			  echo "Wystapil blad podczas podlaczenia do bazy kolego.\n"; 
			  exit;
		}		
		$result = pg_query($conn, "SELECT u.id, r.rodzaj, r.do_czego, r.dostep FROM uzytkownicy u INNER JOIN uprawnienia r ON u.id=r.id_uzytkownika WHERE u.nazwa='".$_POST['uzytkownik']."' AND u.haslo='".$_POST['haslo']."'");
		if(pg_num_rows($result) > 0) 
		{		
				$p_upr = " ";	
				while ($row = pg_fetch_row($result))
				{
						$p_usr = $row[0];
						//zapisuje w formie u_7894.o|o|z|z|z|b,o_20.z|o|z|z|z|o      %7C to |      %2C to ,
						$poz2_upr = str_ireplace(" ",",",ltrim($p_upr." ".$row[1]."_".$row[2].".".$row[3]));						
				}
				//	"/GeoExtRod/" zamienic na "/"
				setcookie("osn_usr", $p_usr, time()+3600, "/", "");
				setcookie("osn_upr", $p_upr, time()+3600, "/", "");
				//$eee = (time()+3600)*1000;
				setcookie("osn_time_to_log",time()+3600,time()+3600,"/","");
				pg_free_result($result);
    		pg_close($conn);
				echo "{success: true}";
		}
		else 
		{
				//tu mozna zrezygnowac z usuwania ciasteczka
				//setcookie("uzytkownik","",time()-3600,"/","127.0.0.1");
				//setcookie("haslo","",time()-3600,"/","127.0.0.1");
				echo "{failure: true}";
		}				
?> 