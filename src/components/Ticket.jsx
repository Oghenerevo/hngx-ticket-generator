import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react'
import imgUpload from "../assets/upload.svg";
import ticketBg from "../assets/ticket.svg";
import barCode from "../assets/barcode.svg";

const Ticket = () => {
	const [step, setStep] = useState(1);
	const [image, setImage] = useState(null);

	const [errors, setErrors] = useState({
		ticket: "", 
		number: "",
		image: "",
		name: "",
		email: "",
	});

	const [formData, setFormData] = useState(() => {
		return JSON.parse(localStorage.getItem("attendeeForm")) || {
				selectedTicket: "",
				selectedNumber: "",
				name: "",
				email: "",
				request: "",
		};
	});

	useEffect(() => {
		localStorage.setItem("attendeeForm", JSON.stringify(formData));
	}, [formData]);

	const handleImageUpload = (event) => {
			const file = event.target.files[0];
			if (file) {
					const imageUrl = URL.createObjectURL(file);
					setImage(imageUrl);
					setErrors((prev) => ({ ...prev, image: "" }));
			}
	};

	const handleTicketClick = (ticketType) => {
		setFormData((prev) => ({ ...prev, selectedTicket: ticketType }));
		setErrors((prev) => ({ ...prev, ticket: "" }));
	};

	const handleNumberChange = (e) => {
			setFormData((prev) => ({ ...prev, selectedNumber: e.target.value }));
			setErrors((prev) => ({ ...prev, number: "" }));
	};

	const handleNameChange = (e) => {
			setFormData((prev) => ({ ...prev, name: e.target.value }));
			setErrors((prev) => ({ ...prev, name: "" }));
	};

	const handleRequestChange = (e) => {
			setFormData((prev) => ({ ...prev, request: e.target.value }));
	};

	const handleEmailChange = (e) => {
		const value = e.target.value.trim();
		setFormData((prev) => ({ ...prev, email: value }));

		setErrors((prev) => ({
				...prev,
				email:
						value === ""
								? "Email is required."
								: !/^\S+@\S+\.\S+$/.test(value)
								? "Please enter a valid email address."
								: "",
		}));
	};

	const handleDragOver = (event) => {
			event.preventDefault();
	};

	const handleDrop = (event) => {
			event.preventDefault();
			const file = event.dataTransfer.files[0];
			if (file) {
					const imageUrl = URL.createObjectURL(file);
					setImage(imageUrl);
					setErrors((prev) => ({ ...prev, image: "" }));
			}
	};

	const handleNext = () => {
		let newErrors = { ticket: "", number: "" };

		if (!formData.selectedTicket)
				newErrors.ticket = "Please select a ticket type.";
		if (!formData.selectedNumber)
				newErrors.number = "Please select the number of tickets.";

		if (newErrors.ticket || newErrors.number) {
				setErrors(newErrors);
				return;
		}

		setStep(step + 1);
	};

 const handleNextStep2 = () => {
		let newErrors = { image: "", name: "", email: "" };

		if (!image) newErrors.image = "Please upload a profile photo.";
		if (!formData.name.trim()) newErrors.name = "Name is required.";
		if (!formData.email.trim()) {
				newErrors.email = "Email is required.";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
				newErrors.email = "Please enter a valid email address.";
		}

		if (newErrors.image || newErrors.name || newErrors.email) {
				setErrors(newErrors);
				return;
		}

		console.log("Local Storage Data:", localStorage);

		setStep(step + 1);
	};

	const handleBack = () => {
		if (step > 1) {
				setStep(step - 1);
		}
	};

	const handleNewTicket = () => {
			setStep(1);
			localStorage.removeItem("attendeeForm");
			setFormData({
					selectedTicket: "",
					selectedNumber: "",
					name: "",
					email: "",
					request: "",
			});
			setImage(null);
	};

	const imageStyle = image ? { 
			width: "100%", 
			height: "100%", 
			objectFit: "cover", 
			borderRadius: "inherit" 
	} : {};

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
									{[
										{ type: 'Free', description: 'Regular access', available: '20/52' },
										{ type: '$50', description: 'VIP access', available: '20/52' },
										{ type: '$150', description: 'VVIP access', available: '20/52' }
									].map((ticket, index) => (
										<div 
											key={index} 
											onClick={() => handleTicketClick(ticket.type)}
											className={`ticket ${
												formData.selectedTicket === ticket.type ? "selected" : ""
											}`}
											style={formData.selectedTicket === ticket.type ? { border: "1px solid #197686", background: "#12464E" } : {}}
										>
											<h2>{ticket.type}</h2>
											<h4>{ticket.description}</h4>
											<p>{ticket.available}</p>
										</div>
									))}
									</div>
									{errors.ticket && <p style={{ color: "red" }} className="error-text">{errors.ticket}</p>}
							</div>

							<div className="ticket-section">
								<p>Number of Ticket: </p>
								<select
										id="numberDropdown"
										value={formData.selectedNumber}
										onChange={handleNumberChange}
										className='drop-down'
								>
										<option value="" disabled>Number of ticket(s)</option>
										{[...Array(10)].map((_, index) => (
												<option key={index + 1} value={index + 1}>
														{index + 1}
												</option>
										))}
								</select>
								{errors.number && <p style={{ color: "red" }} className="error-text">{errors.number}</p>}
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
								<div className="darker" onDragOver={handleDragOver} onDrop={handleDrop}>
										<div 
											className="image-holder"
											onClick={() => document.getElementById('file-upload').click()} 
											style={{ position: 'relative', cursor: 'pointer' }}
										>
												{image ? (
														<img src={image} alt="Uploaded" className="uploaded-image" style={imageStyle} />
												) : (
														<div className="content">
																<label htmlFor="file-upload" className="upload-label">
																		<img 
																			src={imgUpload} 
																			alt="Upload icon" 
																			className="upload-icon" 
																		/>
																		<p>Drag & drop or click to upload</p>
																</label>
																<input
																		id="file-upload"
																		type="file"
																		accept="image/*"
																		onChange={handleImageUpload}
																		style={{ display: "none" }}
																/>
														</div>
												)}
										</div>
								</div>
    			</div>
							{errors.image && <p style={{ color: "red" }} className="error-text">{errors.image}</p>}
					
							<div className="line"></div>

							<div className="input-container">
								<label htmlFor="Name">Enter your name</label>
								<input type="text" value={formData.name} onChange={handleNameChange} />
								{errors.name && <p style={{ color: "red" }} className="error-text">{errors.name}</p>}
							</div>
							
							<div className="input-container">
								<label htmlFor="Email">Enter your email*</label>
								<div className='input-box'>
									<Mail className='mail-icon'/>
									<input 
										type="email" 
										placeholder="hello@avioflagos.io" 
										value={formData.email} 
										onChange={handleEmailChange} 
									/>
								</div>
    				{errors.email && <p style={{ color: "red" }} className="error-text">{errors.email}</p>}
							</div>

							<div className="input-container">
								<label htmlFor="About">Special Request?</label>
								<textarea 
									name="About" 
									placeholder="Textarea"
									value={formData.request}
									onChange={handleRequestChange}
								></textarea>
							</div>
					
							<div className="btns">
								<button className="btn cancel" onClick={handleBack} disabled={step === 1}>Back</button>

								<button className="btn next" onClick={handleNextStep2} disabled={step === 3}>Get My Ticket</button>
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
									<p><strong>Ticket Type:</strong> {formData.selectedTicket}</p>
									<p><strong>Number of Tickets:</strong> {formData.selectedNumber}</p>
									<p><strong>Name:</strong> {formData.name}</p>
									<p><strong>Email:</strong> {formData.email}</p>
									<p><strong>Special Request:</strong> {formData.request}</p>
									{/* {imageUrl && <img src={imageUrl} alt="Uploaded" className="uploaded-image" />} */}
								</div>
								<img src={barCode} alt="bar-code" className='ticket-barcode'/>
							</div>

							<div className="btns step-3">
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