
const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Verify Your Account - Edvora</title>
		<style>
			@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
			
			body {
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				font-family: 'Inter', Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				color: #333333;
				margin: 0;
				padding: 20px;
				min-height: 100vh;
				display: flex;
				align-items: center;
				justify-content: center;
			}
	
			.container {
				max-width: 500px;
				width: 100%;
				margin: 0 auto;
				background: #ffffff;
				border-radius: 20px;
				overflow: hidden;
				box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
				border: 1px solid rgba(255, 255, 255, 0.2);
			}

			.header {
				background: linear-gradient(135deg, #FFD60A 0%, #FFC107 100%);
				padding: 30px 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 180px;
				height: auto;
				margin-bottom: 15px;
			}
	
			.title {
				font-size: 28px;
				font-weight: 700;
				color: #000000;
				margin: 0;
				letter-spacing: -0.5px;
			}

			.subtitle {
				font-size: 16px;
				color: #333333;
				margin-top: 8px;
				font-weight: 500;
			}
	
			.content {
				padding: 40px 30px;
			}
	
			.greeting {
				font-size: 18px;
				font-weight: 600;
				color: #2D3748;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 16px;
				color: #4A5568;
				margin-bottom: 30px;
				text-align: center;
				line-height: 1.7;
			}

			.otp-container {
				background: linear-gradient(135deg, #f6f9fc 0%, #f1f5f9 100%);
				border-radius: 15px;
				padding: 25px;
				margin: 30px 0;
				border: 2px dashed #E2E8F0;
			}
	
			.otp-display {
				font-size: 42px;
				font-weight: 800;
				color: #FFD60A;
				text-align: center;
				letter-spacing: 8px;
				margin: 10px 0;
				text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
				background: #000000;
				padding: 15px;
				border-radius: 12px;
				font-family: 'Courier New', monospace;
			}

			.otp-label {
				text-align: center;
				font-size: 14px;
				color: #718096;
				margin-bottom: 15px;
				font-weight: 500;
			}
	
			.instructions {
				background: #F7FAFC;
				border-left: 4px solid #FFD60A;
				padding: 20px;
				border-radius: 8px;
				margin: 25px 0;
			}
	
			.instructions p {
				margin: 8px 0;
				font-size: 14px;
				color: #4A5568;
			}

			.validity {
				text-align: center;
				font-size: 14px;
				color: #E53E3E;
				font-weight: 600;
				margin: 20px 0;
				padding: 12px;
				background: #FED7D7;
				border-radius: 8px;
			}
	
			.footer {
				background: #F8F9FA;
				padding: 25px;
				text-align: center;
				border-top: 1px solid #E2E8F0;
			}
	
			.support {
				font-size: 14px;
				color: #718096;
				margin-bottom: 15px;
			}
	
			.support-link {
				color: #FFD60A;
				text-decoration: none;
				font-weight: 600;
			}
	
			.support-link:hover {
				color: #000000;
				text-decoration: underline;
			}

			.copyright {
				font-size: 12px;
				color: #A0AEC0;
				margin-top: 15px;
			}

			.security-note {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 8px;
				font-size: 13px;
				color: #718096;
				margin-top: 20px;
			}

			.icon {
				font-size: 16px;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="header">
				<a href="http://localhost:3000">
					<img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Edvora Logo">
				</a>
				<h1 class="title">Account Verification</h1>
				<div class="subtitle">Secure your account with OTP</div>
			</div>

			<div class="content">
				<div class="greeting">Hello there! 👋</div>
				
				<div class="message">
					You're just one step away from accessing your Edvora account. 
					Use the verification code below to complete your registration:
				</div>

				<div class="otp-container">
					<div class="otp-label">Your One-Time Password</div>
					<div class="otp-display">${otp}</div>
					<div class="otp-label">Enter this code on the verification page</div>
				</div>

				<div class="validity">
					⏰ This OTP will expire in 5 minutes
				</div>

				<div class="instructions">
					<p>🔒 <strong>Security Tips:</strong></p>
					<p>• Never share this code with anyone</p>
					<p>• Edvora will never ask for your password or OTP</p>
					<p>• This code can only be used once</p>
				</div>
			</div>

			<div class="footer">
				<div class="support">
					Need help? Contact our support team at 
					<a href="mailto:info@edvora.com" class="support-link">info@edvora.com</a>
				</div>
				
				<div class="security-note">
					<span class="icon">🔒</span>
					<span>Your security is our priority</span>
				</div>
				
				<div class="copyright">
					© 2025 Edvora. All rights reserved.
				</div>
			</div>
		</div>
	</body>
	
	</html>`;
};

export default otpTemplate;	