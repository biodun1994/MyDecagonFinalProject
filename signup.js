$(document).ready(()=>{




         //sign-up implementation begins here...
    $("#signup-form").on("submit", (e) =>{
        console.log("sign up button clicked");
        //prevents default behaviour
        e.preventDefault();

        //input validations
        if($("#reg-email").val() === ''){
            // console.log("email is required");
            Swal.fire({
                title: 'Caution!',
                text: 'Email is required!',
                type: 'error',
                confirmButtonText: 'Ok',
                timer:3000
              });
        }else if($("#reg-password").val() === '' || $("#cfm-password").val() === ''){
            Swal.fire({
                title: 'Caution!',
                text: 'Password is required!',
                type: 'error',
                confirmButtonText: 'Ok',
                timer:3000
              });
        }else if($("#reg-password").val() !== $("#cfm-password").val()){
            // console.log($("#reg-password").val(), $("#cfm-password").val());
            // console.log("passwords do not match");
            Swal.fire({
                title: 'Caution!',
                text: "Password Fields didn't match!",
                type: 'error',
                confirmButtonText: 'Try Again!',
                timer:3000
              });
        }else{
            //if inputs are valid, then make object of newuser
            //from data received 
            const newUser = {
                email: $("#reg-email").val(),
                password: $("#reg-password").val(),
                role:"guest"
            }
            
        //making AJAx POST call
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
            data: newUser,
            dataType: "json",
            encode: true
        })
        .done(() =>{
            // console.log("Data posted successfully");
            Swal.fire({
                title: 'Successful!',
                text: 'You can procede to login',
                type: 'success',
                confirmButtonText: 'Cool',
                timer:5000
              });

            //take user to login page
            window.location.href="login.html";
        })
        .fail(() =>{
            // console.log("Error postion data");
            Swal.fire({
                title: 'Error!',
                text: 'Sorry, an error occurred',
                type: 'error',
                confirmButtonText: 'Try again',
                timer:3000
              })
        });

        $("#signup-form").trigger("reset");
        }
    });
    //sign-up implementation ends here...


});