import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="border-b bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <img src="./website-logo.jpg" alt="Logo" width={60} height={60} className="rounded" />
                    <Link to="/" className="text-lg font-semibold hover:text-blue-600 transition">Home</Link>
                    
                    
                </div>
                <div className="flex items-center gap-4">
                    <Link 
                        to="/add-blog" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        + Add New Post
                    </Link>
                </div>
            </nav>
        </header>
    )
}