$(document).ready(()=>{

    //login implementation begins here...
    $("#login-form").on("submit", (e) =>{

        console.log("login  button clicked");


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


});