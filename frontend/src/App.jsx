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
            EN COURS DE CONSTRUCTION !!!
          </p>
        </div>

      </main>
    </div>
  );
}

export default App;
