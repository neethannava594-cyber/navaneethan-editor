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
    console.log('Selecting 1 row from orders...');
    const { data, error } = await supabase.from('orders').select().limit(1);
    if (error) {
      console.error('Select error:', error);
      process.exit(1);
    }
    console.log('Row sample:', data);
  } catch (err) {
    console.error('Script failed:', err);
    process.exit(1);
  }
})();
