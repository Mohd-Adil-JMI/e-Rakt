function sendMail(params) {
    var tempParams = {
        name : document.getElementById('name').value,
        email: document.getElementById('email').value,
        message : document.getElementById('msg').value,
    }

    emailjs.send('service_z0h4b5o', 'template_hua04zs', tempParams)
    .then(function(res){
        console.log("success", res.status);
    })
}

document.getElementById('myForm').addEventListener('submit', function(e){
    e.preventDefault();
    e.target.reset();
})