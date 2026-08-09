'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

const ISLANDS = ['Tahiti', 'Moorea', 'Raiatea', 'Bora Bora', 'Huahine', 'Tikehau'];

export default function CreateShop() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const island = form.island.value;
    const category = form.category.value.trim();
    if (!name) return;

    setSaving(true);
    setError('');

    const { data, error } = await supabase
      .from('shops')
      .insert({ name, island, category })
      .select()
      .single();

    setSaving(false);

    if (error) {
      setError("La création de la boutique a échoué, réessaie.");
      return;
    }

    router.push(`/shop/${data.id}`);
  }

  return (
    <main className="page">
      <a href="/" className="back-link">← Retour</a>
      <h1>Créer ma boutique</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Nom de la boutique
          <input name="name" required placeholder="Ex : Monoï de Marama" />
        </label>

        <label>
          Île
          <select name="island">
            {ISLANDS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </label>

        <label>
          Catégorie (optionnel)
          <input name="category" placeholder="Ex : Cosmétiques, Artisanat..." />
        </label>

        {error && <p className="muted">{error}</p>}

        <button type="submit" className="btn" disabled={saving}>
          {saving ? 'Création...' : 'Créer la boutique'}
        </button>
      </form>
    </main>
  );
}
