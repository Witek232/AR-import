// scripts/importToSanity.ts
// Uruchamiasz raz: npm run sanity:import

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { multimediaData } from '../src/data/multimediaData.js';

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset:   process.env.SANITY_DATASET || 'production',
  token:     process.env.SANITY_TOKEN!,
  useCdn:    false,
  apiVersion: '2024-01-01',
});

async function importAll() {
  console.log('🚀 Rozpoczynam import do Sanity...\n');
  let total = 0;

  for (const [yearStr, entries] of Object.entries(multimediaData)) {
    const rok = Number(yearStr);
    for (const entry of entries) {
      const doc = {
        _type: 'materialAudiowizualny',
        _id:   `material-${rok}-${entry.slug}`,
        tytul: entry.title,
        slug:  { _type: 'slug', current: entry.slug },
        rok,
        data:      entry.dateSortable,
        miejsce:   entry.place ?? null,
        kategoria: entry.category,
        tagi:      entry.tags ?? [],
        opis: entry.description
          .trim().split('\n').filter(Boolean)
          .map((text, i) => ({
            _type: 'block', _key: `b${i}`, style: 'normal',
            children: [{ _type: 'span', _key: `s${i}`, text: text.trim(), marks: [] }],
            markDefs: [],
          })),
        czesci: entry.parts.map((p, i) => ({
          _type: 'czesc', _key: `p${i}`,
          youtubeId:  p.id,
          label:      p.label,
          czas:       p.duration,
          opisCzesci: p.description ?? null,
        })),
      };
      await client.createOrReplace(doc);
      console.log(`  ✓ ${rok} / ${entry.slug}`);
      total++;
    }
  }
  console.log(`\n✅ Zaimportowano ${total} materiałów.`);
}

importAll().catch(console.error);
