const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

(async () => {
  try {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    const env = fs.readFileSync(envPath, 'utf8');
    const urlMatch = env.match(/VITE_SUPABASE_URL\s*=\s*"?([^"\n\r]+)"?/);
    const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY\s*=\s*"?([^"\n\r]+)"?/);
    const supabaseUrl = urlMatch ? urlMatch[1].trim() : null;
    const supabaseKey = keyMatch ? keyMatch[1].trim() : null;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const candidates = ['service','service_id','pricing_package','pricing_package_id','priceEstimate','price_estimate','footageLinks','footage_links','notes','createdAt','created_at'];

    for (const col of candidates) {
      try {
        const { data, error } = await supabase.from('orders').select(col).limit(1);
        if (error) {
          console.log(col, '=> ERROR', error.code || error.message);
        } else {
          console.log(col, '=> OK');
        }
      } catch (e) {
        console.log(col, '=> EXCEPTION', e.message || e);
      }
    }

  } catch (err) {
    console.error('Script failed:', err);
    process.exit(1);
  }
})();
