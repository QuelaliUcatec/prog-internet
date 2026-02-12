// App.tsx
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center hover:scale-105 transition-transform duration-300 border-4 border-indigo-500">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          ¡Tailwind Configurado! 🚀
        </h1>
        <p className="text-gray-600 mb-6">
          Si ves este texto con estilo y fondo oscuro, el método manual funcionó perfectamente.
        </p>
        <div className="flex gap-4 justify-center">
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            React + TS
          </span>
          <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold animate-bounce">
            Vite
          </span>
        </div>
      </div>
    </div>
  )
}

export default App