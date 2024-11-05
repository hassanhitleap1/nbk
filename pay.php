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
                        <img src="user-image.jpg" alt="User Image" class="rounded-circle mb-3" width="100"> <!-- Replace with your image URL -->
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section>
        <div class="container">
            <div class="box-one">
                <div class="d-flex justify-content-center">
                    <img src="https://www.nbk.com/dam/jcr:281bc4f7-7256-48c6-a05e-761bacea00a3/nbk-logo.svg" alt="SPACES" itemprop="logo">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-start">
                        <span class="">المستفيد</span> <!-- Aligns to the left -->
                        <span class="mx-auto text-blue">NBK</span> <!-- Centers within the list item -->
                    </li>
                    <li class="list-group-item d-flex justify-content-start">
                        <span class="">المبلغ</span> <!-- Aligns to the left -->
                        <span class="mx-auto text-blue">100 KD</span> <!-- Centers within the list item -->
                    </li>
                </ul>
            </div>
        </div>
    </section>

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
                                <select class="form-select" id="fullWidthDropdown" name="options" aria-label="Select an option">
                                    <option value="" disabled selected hidden>Select an option</option> <!-- Placeholder option -->
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
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
                                <input type="text" class="form-control" placeholder="Enter your name">
                            </div>
                            <div class="col-4">
                                <select class="form-select" id="fullWidthDropdown" name="options" aria-label="Select an option">
                                    <option value="" disabled selected hidden>Select an option</option> <!-- Placeholder option -->
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </select>
                            </div>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-4">
                                <span class="text-blue">تاريخ الأنتهاء</span> <!-- Aligns to the left -->
                            </div>
                            <div class="col-2">
                                <select class="form-select " id="selectMonth" name="month" aria-label="MM">
                                    <option value="" disabled selected hidden>MM</option>
                                    <option value="1">January</option>
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
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div class="col-2">
                                <select class="form-select w-100" id="selectYear" name="year" aria-label="Select Year">
                                    <option value="" disabled selected hidden>Select a year</option>
                                    <!-- Generate years dynamically if needed -->
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-4">
                                <span class="text-blue">تاريخ الأنتهاء</span> <!-- Aligns to the left -->
                            </div>
                            <div class="col-8">
                                <input type="text" class="form-control" placeholder="Enter your name">
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
                        <button class="btn btn-send w-100" type="submit">Submit</button>
                    </div>
                    <div class="col-md-6 col-sm-6 col-6">
                        <button class="btn btn-send w-100" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
