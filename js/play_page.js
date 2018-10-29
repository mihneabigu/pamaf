
function proceed_login()
{
   d1 = document.getElementById("login_box");
   d2 = document.getElementById("gametype_box");
   if( d2.style.display == "none" )
   {
      d1.style.display = "none";
      d2.style.display = "block";
   }
   else
   {
      d1.style.display = "block";
      d2.style.display = "none";
   }
}
function proceed_gametype()
{
   d1 = document.getElementById("gametype_box");
   d2 = document.getElementById("gameBox");
   if( d2.style.display == "none" )
   {
      d1.style.display = "none";
      d2.style.display = "block";
   }
   else
   {
      d1.style.display = "block";
      d2.style.display = "none";
   }
}