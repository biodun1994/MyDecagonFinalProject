//the very beginning of jQuery initiation 
$(document).ready(() =>{

    //sign-up implementation begins here...
    $("#signup-form").on("submit", (e) =>{

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

    //login implementation begins here...
    $("#login-form").on("submit", (e) =>{

        // prevent deafult behaviour
        e.preventDefault();

        //input validations
        if($("#email").val() === "" || $("#password").val() === ""){
            // console.log("button working");
            Swal.fire({
                title: 'Caution!',
                text: 'All felds is required!',
                type: 'error',
                confirmButtonText: 'Ok',
                timer:3000
              });
        }else{
            const user = {
                email:$("#email").val(),
                password: $("#password").val()
            }
            $.getJSON("http://localhost:3000/users", user)
            .done( (data) =>{
                // console.log(data);
                if(data.length === 0){
                    Swal.fire({
                        title: 'Error!',
                        text: 'wrong password or email',
                        type: 'error',
                        confirmButtonText: 'Try Again',
                        timer:3000
                      });
                }else{
                    Swal.fire({
                        title: 'Login Successful!',
                        type: 'success',
                        text: user.email,
                        confirmButtonText: 'Ok',
                        timer:10000
                      });  

                      //implement login such that
                      //if(admin){
                            //allow create, edit and delete post
                      //}else{
                            //allow only comment on post
                      //}
                      //take user to blog page
                      window.location.href="index.html";

                      
                }
            })
            .fail(()=>{
                Swal.fire({
                    title: 'Error making request!',
                    type: 'error',
                    confirmButtonText: 'Try Again',
                    timer:3000
                  });
            });
        }
    });
    //login implementation ends here...

    //MODAL POP UP implementation ends here...

    //get variables
    const MODAL = document.getElementById('modal');
    const CLOSE_MODAL_BUTTON = document.getElementsByClassName('close-modal-button')[0];
    const COMPOSE_BUTTON = document.getElementById('compose');

    console.log(MODAL, CLOSE_MODAL_BUTTON, COMPOSE_BUTTON);

    COMPOSE_BUTTON.addEventListener("click", ()=>{
        MODAL.style.display = 'block';
    });

    CLOSE_MODAL_BUTTON.addEventListener("click", ()=>{
        MODAL.style.display = 'none';
    });

    //to close modal by clicking outside the modal content
    window.addEventListener("click", (e)=>{
        if(e.target === MODAL){
        MODAL.style.display = 'none';
        };
    });


});