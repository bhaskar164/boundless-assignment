//Logic To change the view of the images from grid to list and vice-versa

var element = document.getElementById("swaplst");

$('#grd').on('click',function(){
   element.classList.add("row");
});

$('#lst').on('click',function(){
	element.classList.remove("row");
});