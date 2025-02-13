import { Mail } from 'lucide-react';
import { useState } from 'react'
import imgUpload from "../assets/upload.svg";
import ticketBg from "../assets/ticket.svg";
import barCode from "../assets/barcode.svg";

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
							<p>Step {step}/3</p>
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
									<p>
										📍 [Event Location]
										<span>| |</span>
									</p>
									<p className="date">March 15, 2025 | 7:00 PM</p>
								</div>
							</div>

							<div className="line"></div>

							<div className="ticket-section">
								<p>Select Ticket Type: </p>
									<div className="ticket-types">
										<div className="ticket">
											<h2>Free</h2>
											<h4>Regular access</h4>
											<p>20/52</p>
										</div>

										<div className="ticket">
											<h2>$50</h2>
											<h4>vip access</h4>
											<p>20/52</p>
										</div>

										<div className="ticket">
											<h2>$150</h2>
											<h4>vvip access</h4>
											<p>20/52</p>
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
										<option value="" disabled>Number of ticket(s)</option>
										{[...Array(10)].map((_, index) => (
												<option key={index + 1} value={index + 1}>
														{index + 1}
												</option>
										))}
								</select>
							</div>

							<div className="btns">
								<button className="btn cancel" onClick={handleBack} disabled={step === 1}>Cancel</button>

								<button className="btn next" onClick={handleNext} disabled={step === 3}>Next</button>
							</div>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<div className="heading">
							<h2>Attendee Details</h2>
							<p>Step {step}/3</p>
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
											<img src={imgUpload} alt="img-upload icon" className="upload-icon"/>
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
								<label htmlFor="About">Special Request?</label>
								<textarea name="About" placeholder="Textarea"></textarea>
							</div>
					
							<div className="btns">
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
							<p>Step {step}/3</p>
						</div>
			
						<div className="progress-container">
								<div
										className="progress-bar"
										style={{ width: `${(step / 3) * 100}%`, backgroundColor: "#24A0B5" }}
								></div>
						</div>

						<div className="">
							<div className='ticket-title'>
								<h1>Your Ticket is Booked!</h1>
								<p>You can download or Check your email for a copy</p>
							</div>

							<div className="ticket-container">
								<img src={ticketBg} alt="ticket-bg" className="ticket-bg" />
								<div className="ticket-info">
									<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat at facere dolor, quidem dolorem eius quod consequatur harum nisi. Dolore amet fuga quia officiis! Aliquid officiis dolores rem sed pariatur laboriosam odio, voluptates dolore eum natus et ratione rerum? Tempora eveniet quae maxime? Ratione tempora natus saepe molestiae est, eveniet distinctio sunt exercitationem tenetur tempore molestias! Est blanditiis quo quis aspernatur, itaque deleniti deserunt debitis ipsa veritatis voluptates repudiandae ut placeat cupiditate obcaecati ea, eaque maiores quibusdam magni doloremque? Aperiam illum animi quae, quasi, perspiciatis explicabo quas enim dicta excepturi autem fugit? Molestiae ut voluptas hic iste ex eos facere.</p>
								</div>
								<img src={barCode} alt="bar-code" className='ticket-barcode'/>
							</div>

							<div className="btns">
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