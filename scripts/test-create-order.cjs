const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

(async () => {
  try {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (!fs.existsSync(envPath)) {
      console.error('.env.local not found at', envPath);
      process.exit(1);
    }
    const env = fs.readFileSync(envPath, 'utf8');
    const urlMatch = env.match(/VITE_SUPABASE_URL\s*=\s*"?([^"\n\r]+)"?/);
    const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY\s*=\s*"?([^"\n\r]+)"?/);
    const supabaseUrl = urlMatch ? urlMatch[1].trim() : null;
    const supabaseKey = keyMatch ? keyMatch[1].trim() : null;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase URL or ANON key not found in .env.local');
      process.exit(1);
    }

    console.log('Using Supabase URL:', supabaseUrl);

    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = {
      // Use a valid UUID format. If your DB enforces a foreign key to profiles,
      // this may still fail — the real flow should use an authenticated user's id.
      user_id: '00000000-0000-0000-0000-000000000000',
      // service_id in the DB is a bigint — pass a numeric id for testing
      service_id: 1,
      footageLinks: [],
      notes: 'Test order created by local script',
      priceEstimate: 1,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('Inserting test order...');
    const { data, error } = await supabase
      .from('orders')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      process.exit(1);
    }

    console.log('Insert successful, row:', data);
  } catch (err) {
    console.error('Script failed:', err);
    process.exit(1);
  }
})();
