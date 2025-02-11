// import React from 'react'
import logo from "../assets/logo.svg";

const Header = () => {
		return (
				<header>
					<div>
						<img src={logo} alt="logo" />
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
							{/* arrow icon */}
						</button>
					</div>
				</header>
		)
}

export default Header