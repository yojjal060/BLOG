export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-xl text-gray-600">
          Discover articles, tutorials, and insights about web development
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample blog cards - replace with actual data later */}
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Title 1</h2>
          <p className="text-gray-600 mb-4 font-serif">
            A brief description of the blog post goes here...
          </p>
          <button className="text-blue-600 hover:underline">Read More →</button>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Title 2</h2>
          <p className="text-gray-600 mb-4">
            A brief description of the blog post goes here...
          </p>
          <button className="text-blue-600 hover:underline">Read More →</button>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Title 3</h2>
          <p className="text-gray-600 mb-4">
            A brief description of the blog post goes here...
          </p>
          <button className="text-blue-600 hover:underline">Read More →</button>
        </div>
      </section>
    </div>
  )
}