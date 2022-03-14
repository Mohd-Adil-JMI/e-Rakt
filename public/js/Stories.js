$(document).ready(function() {
    $("#toggle").click(function() {
      var elem = $("#toggle").text();
      if (elem == "Read More") {
        //when btn is in the read more state
        $("#toggle").text("Read Less");
        $("#text").slideDown();
      } else {
        //when btn is in the read less state
        $("#toggle").text("Read More");
        $("#text").slideUp();
      }
    });
  });