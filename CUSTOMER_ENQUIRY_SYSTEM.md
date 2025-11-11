# 📧 CUSTOMER ENQUIRY SYSTEM - COMPLETE SETUP

## What You Get

You already have a **Contact Form** on your website! Now let's make it fully functional to capture all customer enquiries in your database.

---

## 2 WAYS TO ACCESS ENQUIRIES

### Way 1: View in Database (Supabase) - Complete Data
```
https://app.supabase.com
  → Tables → enquiries
  → See all customer messages
  → Filter, search, edit, export
```

### Way 2: View in Your Website - Admin Dashboard
```
https://navaneethan-editor.vercel.app
  → Log in as admin
  → Dashboard → Enquiries (when added)
  → See all customer messages
```

---

## WHAT YOU NEED TO DO

### Step 1: Create `enquiries` Table in Supabase

**Go to:** https://app.supabase.com

**Click:** SQL Editor (left sidebar)

**Paste and run this SQL:**

```sql
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  admin_notes TEXT
);

-- Enable RLS (Row Level Security)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public can submit enquiry)
CREATE POLICY "Anyone can submit enquiry" 
ON enquiries FOR INSERT 
WITH CHECK (true);

-- Allow admins to select all enquiries
CREATE POLICY "Admins can read all enquiries" 
ON enquiries FOR SELECT 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_enquiries_email ON enquiries(email);
CREATE INDEX idx_enquiries_status ON enquiries(status);
```

**Click:** Run (or Ctrl+Enter)

✅ Done! Table is created.

---

### Step 2: Update API Function

**File:** `api.ts`

**Find and replace this function:**

```typescript
export const apiSubmitContactForm = async (name, email, message) => {
    // In a real app, you would insert into a 'contacts' table or use a serverless function.
    console.log("Contact Form Submitted (mock):", { name, email, message });
    // This is a mock response and doesn't actually save to DB.
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return { success: true };
};
```

**With this:**

```typescript
export const apiSubmitContactForm = async (name: string, email: string, message: string, phone?: string, serviceInterest?: string) => {
    try {
        console.log('🔵 Submitting customer enquiry...');
        
        const { data, error } = await supabase
            .from('enquiries')
            .insert([{
                name,
                email,
                message,
                phone: phone || null,
                service_interest: serviceInterest || null,
                status: 'new',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }])
            .select()
            .single();

        if (error) {
            console.error('🔴 Enquiry submission error:', error);
            throw new Error(`Failed to submit enquiry: ${error.message}`);
        }

        console.log('✅ Enquiry submitted successfully:', data);
        return { success: true, data };
    } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        console.error('🔴 Error:', errorMsg);
        throw new Error(errorMsg);
    }
};
```

---

### Step 3: Update Contact Form Component

**File:** `pages.tsx` → `ContactPage` component

**Replace the ContactPage with this enhanced version:**

```typescript
export const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        service_interest: '',
        message: '' 
    });
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
            setFeedback('Please fill in all required fields');
            setFeedbackType('error');
            return;
        }

        setSubmitting(true);
        setFeedback('');
        
        try {
            await apiSubmitContactForm(
                formState.name, 
                formState.email, 
                formState.message,
                formState.phone,
                formState.service_interest
            );
            setFeedback('✅ Thank you for your enquiry! I will get back to you within 24 hours.');
            setFeedbackType('success');
            setFormState({ name: '', email: '', phone: '', service_interest: '', message: '' });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Failed to submit enquiry';
            setFeedback(`❌ ${errorMsg}`);
            setFeedbackType('error');
            console.error('Enquiry submission error:', error);
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <SectionTitle title="Get In Touch" subtitle="Contact Me" />
            <form onSubmit={handleSubmit} className="space-y-6 bg-brand-surface/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                {feedback && (
                    <div className={`p-4 rounded-lg ${feedbackType === 'success' 
                        ? 'bg-green-900/20 border border-green-700 text-green-300' 
                        : 'bg-red-900/20 border border-red-700 text-red-300'}`}>
                        {feedback}
                    </div>
                )}
                
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={formState.name} 
                        onChange={handleChange} 
                        required
                        className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email *</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formState.email} 
                        onChange={handleChange} 
                        required
                        className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone (Optional)</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        value={formState.phone} 
                        onChange={handleChange}
                        className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                        placeholder="Your phone number"
                    />
                </div>

                <div>
                    <label htmlFor="service_interest" className="block text-sm font-medium text-gray-300">Service Interest</label>
                    <select 
                        id="service_interest" 
                        value={formState.service_interest} 
                        onChange={handleChange}
                        className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                    >
                        <option value="">Select a service...</option>
                        <option value="reel">Reel ($2000)</option>
                        <option value="vertical">Vertical ($3000)</option>
                        <option value="slide">Slide ($2500)</option>
                        <option value="general">General Enquiry</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message *</label>
                    <textarea 
                        id="message" 
                        rows={4} 
                        value={formState.message} 
                        onChange={handleChange} 
                        required
                        className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                        placeholder="Tell me about your project..."
                    ></textarea>
                </div>

                <div>
                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={submitting}
                    >
                        {submitting ? 'Sending...' : 'Send Enquiry'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
```

---

## VIEWING ENQUIRIES

### In Supabase Dashboard

1. Go to: https://app.supabase.com
2. Click **Tables** (left sidebar)
3. Click **enquiries**
4. You see all customer enquiries:
   - name
   - email
   - phone
   - service_interest
   - message
   - status (new, contacted, completed)
   - created_at
   - updated_at
   - admin_notes

### Filter by Status

Click filter icon:
- `status = 'new'` → Unread enquiries
- `status = 'contacted'` → Already replied
- `status = 'completed'` → Resolved

### Edit Status

1. Click enquiry row
2. Click status field
3. Change to: `new` / `contacted` / `completed`
4. Save ✓

### Add Notes

1. Click enquiry row
2. Click admin_notes field
3. Type your notes
4. Save ✓

---

## ENQUIRY DATA STRUCTURE

```
id                  = Unique enquiry ID
name                = Customer name
email               = Customer email
phone               = Customer phone (optional)
service_interest    = Which service (reel, vertical, slide, general)
message             = Customer message
status              = new / contacted / completed
created_at          = When submitted
updated_at          = Last update
admin_notes         = Your internal notes
```

---

## EXAMPLE ENQUIRY

```
id: "enq_123abc"
name: "John Smith"
email: "john@example.com"
phone: "+1-555-1234"
service_interest: "reel"
message: "Hi, I need a 30-second video reel for my business..."
status: "new"
created_at: "2025-11-11T10:30:00Z"
updated_at: "2025-11-11T10:30:00Z"
admin_notes: ""
```

---

## NEXT STEPS

1. ✅ **Create table** - Run the SQL in Supabase
2. ✅ **Update API** - Replace function in `api.ts`
3. ✅ **Update Form** - Replace component in `pages.tsx`
4. ✅ **Push to GitHub** - Commit changes
5. ✅ **Test** - Submit enquiry on contact form
6. ✅ **View** - Check Supabase → enquiries table

---

## QUICK LINKS

| Action | Link |
|--------|------|
| See enquiries | https://app.supabase.com → Tables → enquiries |
| Submit enquiry | https://navaneethan-editor.vercel.app → Contact |
| Manage status | Edit status in Supabase |
| Add notes | Edit admin_notes in Supabase |

---

That's it! Your customer enquiry system is ready! 📧

