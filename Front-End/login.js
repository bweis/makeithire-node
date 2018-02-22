
var signUpLink = "https://makeithire-node.herokuapp.com/api/signUpStudent";
var logInLink = "https://makeithire-node.herokuapp.com/api/login"


$("document").ready(function() {




    function myFunction() {
        alert("yo");
        var x = document.getElementById("myFile");
        var txt = "";
        if ('files' in x) {
            if (x.files.length == 0) {
                txt = "Select one or more files.";
            } else {
                for (var i = 0; i < x.files.length; i++) {
                    txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                    var file = x.files[i];
                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                }
            }
        }
        else {
            if (x.value == "") {
                txt += "Select one or more files.";
            } else {
                txt += "The files property is not supported by your browser!";
                txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
            }
        }
    }



    $("#goReg").click(function () {



        $(".login-form").css("display","none");


        $(".register-form").css("display","inline")



    });





    $(".loginMe").click(function () {





        $.post(logInLink, {EmailID:  $("#mail").val(), Password: $("#password").val() }, function (data, status,xhr) {

        })

            .done(function (data, status,xhr) {
                if(data.message==="Success") {


                    document.cookie="token="+data.Token;

                    alert("LOGGED IN!")

                    //window.location.href = "/client";
                }
            })

            .fail(function(jqxhr, settings, ex) {
                //var dan = JSON.parse(jqxhr.responseText);

                var dan = JSON.parse(jqxhr.responseText);
                alert(dan)
  //              $("#toPutText").html("<p>"+dan.message+"</p>");
//


            })




    });





    $(".Reg").click(function () {





        $.post(signUpLink, {FirstName: $("#fName").val(), LastName: $("#lName").val(),
            MiddleName: "", EmailID: $("#email").val(), Password: $("#pass").val()
            },

            function (res, status) {



        })

            .done(function (data, status,xhr) {

                if(data.message === "Account created") {

                    alert("Account created!")
                }


            })

            .fail(function(jqxhr, settings, ex) {


            })



    });









    $("#goBack").click(function () {

        $(".register-form").css("display","none")
        $(".login-form").css("display","inline")



    })





});




    $('.message a').click(function () {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });




