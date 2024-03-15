export const welcomeEmail = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background-color: #f3f4f6; /* Light gray background */
            color: #333333; /* Dark gray text */
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        .email-content {
            text-align: center;
        }
        .email-header {
            color: #1a202c; /* Darker gray for headers */
        }
        .email-body {
            margin-top: 20px;
        }
        .email-footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #718096; /* Medium gray */
        }
        a {
            color: #3182ce; /* Blue for links */
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-content">
            <h2 class="email-header">Welcome to Uni-Sine Premium!</h2>

            <div class="email-body">
                <p>Thank you for subscribing to Uni-Sine Premium. You now have full access to all our premium features!</p>
                <img src="https://www.uni-sine.com/static/socials/800500_home.png" alt="Welcome Image" style="max-width: 400px; height: auto;">

                <p>Check out all the features you have access to at <a href='https://uni-sine.com'>uni-sine.com</a></p>
            </div>

            <div class="email-footer">
                <p>If you have any questions, feel free to contact our support team.</p>
                <p>&copy; 2023 Uni-Sine. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
`