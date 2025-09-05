import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/notify-discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Merci ! Tu seras recontacté très bientôt 🙌");
        setFormData({ name: "", email: "", instagram: "", message: "" });
        setShowForm(false);
      } else {
        alert("Erreur lors de l’envoi.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar simple et épurée */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo simple */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                InkStudio
              </h1>
            </div>
            
            {/* Navigation buttons épurés */}
            <div className="flex items-center space-x-6">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Connexion
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors">
                Inscription
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenu principal simple */}
      <main className="pt-16 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            InkStudio
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Le CRM tout-en-un pour tatoueurs indépendants et salon : planning, projets,
            communication Instagram, devis et vitrine pro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
              Se connecter
            </button>
            <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-md border border-gray-300 hover:border-gray-400 transition-colors">
              S'inscrire
            </button>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {showForm ? "Fermer le formulaire" : "Rejoindre la bêta"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 mb-3"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 mb-3"
              required
            />
            <input
              type="text"
              name="instagram"
              placeholder="@instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full border px-4 py-2 mb-3"
            />
            <textarea
              name="message"
              placeholder="Ton style de tattoo, attentes, etc."
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-4 py-2 mb-3"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
            >
              Envoyer
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
