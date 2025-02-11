import { ImagePlus, Mail } from 'lucide-react';
import { useState } from 'react'

const Ticket = () => {
	const [selectedNumber, setSelectedNumber] = useState("");
	const [step, setStep] = useState(1);

	const handleNext = () => {
			if (step < 3) {
					setStep(step + 1);
			}
	};

	const handleBack = () => {
			if (step > 1) {
					setStep(step - 1);
			}
	};

	const handleNewTicket = () => {
		setStep(1);
	}

	return (
			<section className="container">

				{step === 1 && (
					<>
						<div className="heading">
						<h2>Ticket Selection</h2>
						<p>{step}/3</p>
					</div>
	
					<div className="progress-container">
							<div
									className="progress-bar"
									style={{ width: `${(step / 3) * 100}%`, backgroundColor: "#24A0B5" }}
							></div>
					</div>
					<div className="inner-wrapper">
						<div className="top-details">
							<h1>Techember Fest ”25</h1>
							<p>
								Join us for an unforgettable experience at [Event Name]! Secure your spot now.
							</p>
							<div className="event-details">
								<p>📍 [Event Location] || March 15, 2025 | 7:00 PM </p>
							</div>
						</div>

						<div className="line"></div>

						<div className="ticket-section">
							<p>Select Ticket Type: </p>
								<div className="ticket-types">
									<div className="ticket">
										<div className="type">
											<h3>Regular access</h3>
											<p>20 left!</p>
										</div>
										<div className="amount">
											<h3>Free</h3>
										</div>
									</div>

									<div className="ticket">
										<div className="type">
											<h3>vip access</h3>
											<p>20 left!</p>
										</div>
			
										<div className="amount">
											<h3>$50</h3>
										</div>
									</div>

									<div className="ticket">
										<div className="type">
											<h3>vvip access</h3>
											<p>20 left!</p>
										</div>
										<div className="amount">
											<h3>$150</h3>
										</div>
									</div>
								</div>
						</div>

						<div className="ticket-section">
							<p>Number of Ticket: </p>
							<select
									id="numberDropdown"
									value={selectedNumber}
									onChange={(e) => setSelectedNumber(e.target.value)}
									className='drop-down'
							>
									<option value="" disabled>Choose number of ticket(s)</option>
									{[...Array(10)].map((_, index) => (
											<option key={index + 1} value={index + 1}>
													{index + 1}
											</option>
									))}
							</select>
						</div>

						<div className="bottom-btns">
							<div>
								<button className="btn cancel" onClick={handleBack} disabled={step === 1}>Cancel</button>

								<button className="btn next" onClick={handleNext} disabled={step === 3}>Next</button>
							</div>
						</div>
					</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="heading">
							<h2>Attendee Details</h2>
							<p>{step}/3</p>
						</div>
			
						<div className="progress-container">
								<div
										className="progress-bar"
										style={{ width: `${(step / 3) * 100}%`, backgroundColor: "#24A0B5" }}
								></div>
						</div>

						<div className="inner-wrapper">
							<div className="image-container">
								<p>Upload profile photo</p>
								<div className="darker">
									<div className="image-holder">
										<div className="content">
											<ImagePlus className="upload-icon"/>
											<p>Drag & drop or click to upload</p>
										</div>
									</div>
								</div>
							</div>
					
							<div className="line"></div>

							<div className="input-container">
								<label htmlFor="Name">Enter your name</label>
								<input type="text" />
							</div>
							
							<div className="input-container">
								<label htmlFor="Email">Enter your email*</label>
								<div className='input-box'>
									<Mail className='mail-icon'/>
									<input type="email" placeholder="hello@avioflagos.io" />
								</div>
							</div>

							<div className="input-container">
								<label htmlFor="About">About the project</label>
								<textarea name="About"></textarea>
							</div>
					
							<div>
								<button className="btn cancel" onClick={handleBack} disabled={step === 1}>Back</button>

								<button className="btn next" onClick={handleNext} disabled={step === 3}>Get My Ticket</button>
							</div>
						</div>
					</>
				)}

				{step === 3 && (
					<>
						<div className="heading">
							<h2>Ready</h2>
							<p>{step}/3</p>
						</div>
			
						<div className="progress-container">
								<div
										className="progress-bar"
										style={{ width: `${(step / 3) * 100}%`, backgroundColor: "#24A0B5" }}
								></div>
						</div>

						<div className="inner-wrapper">
							<div className="top-details">

							</div>
					
							<div className="line"></div>
					
							<div>
								<button className="btn cancel" onClick={handleNewTicket}>Book Another Ticket</button>

								<button className="btn next">Download Ticket</button>
							</div>
						</div>
					</>
				)}
			</section>
	)
}

export default Ticket