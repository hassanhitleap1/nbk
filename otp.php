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
                                <span class="text-blue">otp</span> <!-- Aligns to the left -->
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
  
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
