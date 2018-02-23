var url = "http://localhost:3001";
var signUpLink = url + "/api/signUpStudent";
var signUpRecruiter = url + "/api/signUpRecruiter";
var logInLink = url + "/api/login";
var companiesLink =  url + "/api/getCompanyList";

$("document").ready(function() {

    $.get(companiesLink, {}, function (data, status, xhr) {
    })
        .done(function (data, status, xhr) {
            if (data.message === "Success") {
                var companies = data.response;
                var select = document.getElementById('company_list');
                console.log(companies);
                for (var i = 0; i < companies.length; i++){
                    var opt = document.createElement('option');
                    opt.value = companies[i].idCompany;
                    opt.innerHTML = companies[i].CompanyName;
                    select.appendChild(opt);
                }
            }
        })
        .fail(function (jqxhr, settings, ex) {
            console.log('failed company list GET')
        });



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
                    document.cookie="token="+data.token;


                    alert("LOGGED IN!");

                    window.location.href = "http://localhost:3000/home";
                }
            })

            .fail(function(jqxhr, settings, ex) {
                //var dan = JSON.parse(jqxhr.responseText);

                var dan = JSON.parse(jqxhr.responseText);
                alert(dan)
  //              $("#toPutText").html("<p>"+dan.message+"</p>");
            })
    });





    $(".Reg").click(function () {
        console.log('register');
        var recruiter = $('#recruiter').is(':checked');
        console.log(recruiter);
        if ($('#recruiter').is(':checked')) {
            console.log('recruiter signup ' + $("#company_list option:selected").val());
            $.post(signUpRecruiter, {
                    FirstName: $("#fName").val(),
                    LastName: $("#lName").val(),
                    MiddleName: "",
                    EmailID: $("#email").val(),
                    Password: $("#pass").val(),
                    idCompany: $("#company_list option:selected").val(),
                    CompanyName: $('#company').val(),
                    Description: $('#description').val(),
                    Published: 0
                },
                function (res, status) {
                })
                .done(function (data, status, xhr) {
                    if (data.message === "Account created") {
                        alert("Account created!")
                    }
                })

                .fail(function (jqxhr, settings, ex) {
                    console.log('failed to create company')
                })
        } else {
            console.log('student signup');
            $.post(signUpLink, {
                    FirstName: $("#fName").val(), LastName: $("#lName").val(),
                    MiddleName: "", EmailID: $("#email").val(), Password: $("#pass").val()
                },

                function (res, status) {
                })
                .done(function (data, status, xhr) {
                    if (data.message === "Account created") {
                        alert("Account created!")
                    }
                })

                .fail(function (jqxhr, settings, ex) {
                })
        }
    });
    $("#goBack").click(function () {
        $(".register-form").css("display","none")
        $(".login-form").css("display","inline")
    })
});




    $('.message a').click(function () {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

    function toggleCheckbox(item) {
        $('#company_list').toggle('show');
        $('#company_label').toggle('show');
    };

    function companySelect(item) {
        var selected = $("#company_list option:selected").val();
        console.log(selected);
        if (selected == '-1') {
            $("#company").show();
            $('#description').show();
        } else {
            $("#company").hide();
            $('#description').hide();
        }
    }