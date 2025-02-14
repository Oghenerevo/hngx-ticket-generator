import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react'
import imgUpload from "../assets/upload.svg";
import ticketBg from "../assets/ticket.svg";
import barCode from "../assets/barcode.svg";

const Ticket = () => {
	const [step, setStep] = useState(() => {
  return Number(localStorage.getItem("currentStep")) || 1;
	});
	const [image, setImage] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
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

	const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  setImage(imageUrl);
  setErrors((prev) => ({ ...prev, image: "" }));
		setImageFile(file);
		// localStorage.setItem("uploadedImage", imageUrl);
	};

	const handleTicketClick = (ticketStatus) => {
		setFormData((prev) => ({ ...prev, selectedTicket: ticketStatus }));
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

		const nextStep = step + 1;
		setStep(nextStep);
		localStorage.setItem("currentStep", nextStep.toString());
	};

	const handleNextStep2 = async () => {
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

		try {
			setIsUploading(true);

			const formDataUpload = new FormData();
			formDataUpload.append("file", imageFile);
			formDataUpload.append("upload_preset", "event-ticket");

			const response = await fetch("https://api.cloudinary.com/v1_1/dgfvtw11p/image/upload", {
				method: "POST",
				body: formDataUpload
			});

			const data = await response.json();
			if (!data.secure_url) {
				throw new Error("Failed to upload image to Cloudinary.");
			}else {
				setImage(data.secure_url);
				localStorage.setItem("uploadedImage", data.secure_url);
			}

			setFormData((prev) => ({ ...prev, avatar: data.secure_url }));

			console.log("Local Storage Data:", localStorage);

			const nextStep = step + 1;
			setStep(nextStep);
			localStorage.setItem("currentStep", nextStep.toString());
		} catch (error) {
					console.error("Error uploading image to Cloudinary:", error);
					setErrors((prev) => ({ ...prev, image: "Failed to upload image. Please try again." }));
		} finally {
					setIsUploading(false);
		}
	};

	const handleBack = () => {
		if (step > 1) {
				const prevStep = step - 1;
				setStep(prevStep);
				localStorage.setItem("currentStep", prevStep.toString());
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
										{ type: 'Free', description: 'Regular access', available: '20/52', status: 'Regular' },
										{ type: '$50', description: 'VIP access', available: '20/52', status: 'VIP' },
										{ type: '$150', description: 'VVIP access', available: '20/52', status: 'VVIP' }
									].map((ticket, index) => (
										<div 
											key={index} 
											onClick={() => handleTicketClick(ticket.status)}
											className={`ticket ${
												formData.selectedTicket === ticket.status ? "selected" : ""
											}`}
											style={formData.selectedTicket === ticket.status ? { border: "1px solid #197686", background: "#12464E" } : {}}
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
								<button className="btn cancel" onClick={handleNewTicket}>Cancel</button>

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
										<label htmlFor="file-upload" className="image-holder" style={{ cursor: "pointer" }}>
												{image ? (
														<img src={image} alt="Uploaded" className="uploaded-image" style={imageStyle} />
												) : (
														<div className="content">
																<img src={imgUpload} alt="Upload icon" className="upload-icon" />
																<p>Drag & drop or click to upload</p>
														</div>
												)}
										</label>
										<input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
								</div>
    			</div>
							{errors.image && <p style={{ color: "red" }} className="error-text img-error">{errors.image}</p>}
					
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
					
							<div className="btns step-3">
								<button className="btn cancel" onClick={handleBack} disabled={step === 1}>Back</button>

								<button 
									onClick={handleNextStep2} 
									disabled={isUploading} 
									className="btn next"
								>
									{isUploading ? "Uploading..." : "Get My Free Ticket"}
								</button>
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
									<div className="ticket-heading">
										<h1>Techember Fest ”25</h1>
										<p>📍 04 Rumens road, Ikoyi, Lagos</p>
										<p>📅 March 15, 2025 | 7:00 PM</p>
									</div>

									<div className="ticket-img">
										<img src={formData.avatar} alt="UploadedImg" />
									</div>

									<div className="ticket-data">
										<div className="top-data">
											<div className="row-data">
												<div className="data item-1">
													<p>Enter your name</p>
													<h4>{formData.name}</h4>
												</div>
												<div className="data item-2">
													<p>Enter your email*</p>
													<h4>{formData.email}</h4>
												</div>
											</div>
											<div className="row-data">
												<div className="data item-1">
													<p>Ticket Type:</p>
													<h4>{formData.selectedTicket}</h4>
												</div>
												<div className="data item-2">
													<p>Ticket For:</p>
													<h4>{formData.selectedNumber}</h4>
												</div>
											</div>
										</div>
										<div className="bottom-data">
											<p>Specail request?</p>
											<h4>
												{formData.request 
													? formData.request.length > 50
															? `${formData.request.slice(0, 50)} ...` 
															: formData.request 
													: 'No special request'}
											</h4>
										</div>
									</div>
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