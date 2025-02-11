// import React from 'react'
import logo from "../assets/logo.svg";
import { ArrowRight } from "lucide-react";

const Header = () => {
		return (
				<header>
					<div>
						<img src={logo} alt="logo" className="logo" />
					</div>

					<div className="nav-links">
						<ul>
							<li>
								<a href="#">Events</a>
							</li>

							<li>
								<a href="#">My Tickets</a>
							</li>

							<li>
								<a href="#">About Project</a>
							</li>
						</ul>
					</div>

					<div>
						<button>
							my tickets
							<ArrowRight className="btn-icon" />
						</button>
					</div>
				</header>
		)
}

export default Header