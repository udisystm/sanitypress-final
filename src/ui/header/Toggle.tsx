import { RxHamburgerMenu } from "react-icons/rx";

export default function Toggle() {
	return (
		<label className="[grid-area:toggle] md:hidden">
			<input id="header-open" type="checkbox" hidden />

			<span className="header-open:hidden"><RxHamburgerMenu />
			</span>
			<span className="header-closed:hidden"><RxHamburgerMenu /></span>
		</label>
	)
}
