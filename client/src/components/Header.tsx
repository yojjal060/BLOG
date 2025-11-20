import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="border-b">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <img src="./website-logo.jpg" alt="Logo of the website" width={60} height={60} className="rounded" />
                    <Link to="/" className="text-lg font-semibold hover:text-blue-600 transition">Home</Link>
                    <Link to="/about" className="text-lg hover:text-blue-600 transition">About</Link>
                    <Link to="/blog" className="text-lg hover:text-blue-600 transition">Blog</Link>
                </div>
                <div className="flex items-center gap-4">
                    <input 
                        type="search" 
                        placeholder="Search posts..." 
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </nav>
        </header>
    )
}