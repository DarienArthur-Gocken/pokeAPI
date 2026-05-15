import "./Header.css"

export default function Header() {
    return (
        <header>
            <input type ="text" className="searchInput"></input>
            <button className = "searchBtn">
                Submit
            </button>
        </header>
    )
}