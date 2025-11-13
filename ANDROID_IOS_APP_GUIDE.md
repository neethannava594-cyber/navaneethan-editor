# 📱 Build Android & iOS Apps - Step by Step
## Navaneethan Editor - Mobile App Development Guide

---

## 🎯 Quick Overview

Convert your React website into native Android & iOS apps with:
- ✅ **Same styling** (Gold #D4AF37 + Dark #1a1a1a)
- ✅ **Same backend** (Supabase)
- ✅ **70% code reuse** from your website
- ✅ **One codebase** for both platforms
- ✅ **Deploy to Google Play & App Store**

**Timeline:** 2-4 weeks  
**Cost:** $99/year (App Store) + $25 (Google Play)

---

## 📋 Prerequisites

Before starting, ensure you have:

```bash
# Node.js and npm
node --version  # Should be v16+
npm --version   # Should be v8+

# Git
git --version

# For iOS development (macOS only)
xcode-select --install
brew install watchman

# For Android development (all platforms)
# Download Android Studio from: https://developer.android.com/studio
```

---

## 🚀 PART 1: Setup Expo Project

### Step 1: Create New Expo Project

```bash
# Create new Expo app with TypeScript
npx create-expo-app@latest navaneethan-mobile --template
cd navaneethan-mobile

# Or use Expo CLI
npm install -g expo-cli
expo init navaneethan-mobile --template blank-typescript
cd navaneethan-mobile
```

### Step 2: Install Required Dependencies

```bash
npm install

# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Supabase
npm install @supabase/supabase-js

# Icons
npm install @expo/vector-icons

# Other utilities
npm install zustand axios dotenv
```

### Step 3: Project Folder Structure

```bash
# Create folder structure
mkdir -p src/app/{auth,tabs,admin}
mkdir -p src/shared/{api,context,components,types,data,styles}
mkdir -p src/assets/{images,fonts}

# Move to src directory
mkdir -p src
```

**Project Structure:**
```
navaneethan-mobile/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   ├── tabs/
│   │   │   ├── portfolio.tsx
│   │   │   ├── pricing.tsx
│   │   │   ├── contact.tsx
│   │   │   └── dashboard.tsx
│   │   ├── admin/
│   │   │   └── enquiries.tsx
│   │   └── _layout.tsx
│   ├── shared/
│   │   ├── api/
│   │   │   └── index.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── components/
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── data/
│   │   │   ├── profileData.ts
│   │   │   └── portfolioData.ts
│   │   └── styles/
│   │       └── theme.ts
│   ├── assets/
│   ├── App.tsx
│   ├── index.tsx
│   └── app.json
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🚀 PART 2: Copy Code from Your Website

### Step 1: Copy API Layer

**File: `src/shared/api/index.ts`**

Copy your entire `api.ts` from your website project. Replace `supabase` initialization:

```typescript
// src/shared/api/index.ts
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// For native apps, use secure storage for auth tokens
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: SecureStore as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Copy ALL your API functions from web version
export const apiGetPortfolio = async () => {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const apiGetServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const apiSubmitContactForm = async (
  name: string,
  email: string,
  message: string,
  phone: string,
  service_interest: string
) => {
  const { error } = await supabase
    .from('enquiries')
    .insert([{ name, email, message, phone, service_interest }]);
  
  if (error) throw error;
};

// Copy ALL other API functions from your web api.ts...
export const apiGetAllEnquiries = async () => {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const apiUpdateEnquiry = async (
  enquiryId: string,
  updateData: { status?: string; admin_notes?: string }
) => {
  const { data, error } = await supabase
    .from('enquiries')
    .update(updateData)
    .eq('id', enquiryId)
    .select();
  
  if (error) throw error;
  return data[0];
};
```

### Step 2: Install Secure Store for Auth Tokens

```bash
npm install expo-secure-store
```

### Step 3: Copy Auth Context

**File: `src/shared/context/AuthContext.tsx`**

Copy your `AuthContext.tsx` from web version (it works the same):

```typescript
// src/shared/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { apiGetMe, apiLogin, apiSignup, supabase } from '../api';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Copy from your web AuthContext.tsx...
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(mapSupabaseUserToUser(session.user));
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkLoggedIn = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(mapSupabaseUserToUser(session.user));
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        const user = mapSupabaseUserToUser(data.user);
        setCurrentUser(user);
        return user;
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      if (error) throw error;
      if (data.user) {
        const user = mapSupabaseUserToUser(data.user);
        setCurrentUser(user);
        return user;
      }
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const value = { currentUser, loading, login, logout, signup };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const mapSupabaseUserToUser = (supabaseUser: any): User => {
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email || '',
    role: supabaseUser.user_metadata?.role || 'customer',
    phone: supabaseUser.user_metadata?.phone,
  };
};
```

### Step 4: Copy Types

**File: `src/shared/types/index.ts`**

```typescript
// Copy from your web types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
}

export interface PortfolioVideo {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  videoUrl: string;
  thumbnail: string;
  date: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  deliveryTimeDays: number;
  description: string;
  features: string[];
}

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  status: string;
  priceEstimate: number;
  createdAt: string;
  updatedAt: string;
  notes: string;
  adminNotes: string;
  finalDeliveryLinks?: string[];
}

// Copy all other types from web...
```

### Step 5: Copy Static Data

```bash
# Copy from web project
cp ../navaneethan-editor/profileData.ts src/shared/data/
cp ../navaneethan-editor/portfolioData.ts src/shared/data/
```

---

## 🎨 PART 3: Create Mobile Screens

### Screen 1: Login Screen

**File: `src/app/auth/login.tsx`**

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../shared/context/AuthContext';
import { colors, spacing } from '../../shared/styles/theme';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        // Navigation handled by auth state
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🎬</Text>
        <Text style={styles.title}>Navaneethan Editor</Text>
        <Text style={styles.subtitle}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>
            Don't have an account? <Text style={styles.signupLinkBold}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  logo: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    marginBottom: spacing.md,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 16,
  },
  toggleButton: {
    paddingHorizontal: spacing.md,
  },
  toggleText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
    fontSize: 14,
  },
  signupLinkBold: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
```

### Screen 2: Portfolio Screen

**File: `src/app/tabs/portfolio.tsx`**

```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiGetPortfolio } from '../../shared/api';
import { colors, spacing } from '../../shared/styles/theme';

const PortfolioScreen = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const data = await apiGetPortfolio();
      setVideos(data || []);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
    >
      <Text style={styles.title}>My Portfolio</Text>

      {videos.length > 0 ? (
        videos.map((video) => (
          <View key={video.id} style={styles.card}>
            <Image
              source={{ uri: video.thumbnail }}
              style={styles.thumbnail}
            />
            <View style={styles.cardContent}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.category}>{video.category}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {video.description}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No portfolio videos yet</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing.md,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#333',
  },
  cardContent: {
    padding: spacing.md,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  category: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});

export default PortfolioScreen;
```

### Screen 3: Contact Screen

**File: `src/app/tabs/contact.tsx`**

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { apiSubmitContactForm } from '../../shared/api';
import { colors, spacing } from '../../shared/styles/theme';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await apiSubmitContactForm(
        formData.name,
        formData.email,
        formData.message,
        formData.phone,
        formData.service_interest
      );
      setSuccess(true);
      Alert.alert('Success', 'Thank you! I will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Get In Touch</Text>

        <TextInput
          style={styles.input}
          placeholder="Name *"
          placeholderTextColor="#666"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Email *"
          placeholderTextColor="#666"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          editable={!loading}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#666"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          keyboardType="phone-pad"
          editable={!loading}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.service_interest}
            onValueChange={(value) => handleChange('service_interest', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Service..." value="" />
            <Picker.Item label="Reel ($2000)" value="reel" />
            <Picker.Item label="Vertical ($3000)" value="vertical" />
            <Picker.Item label="Slide ($2500)" value="slide" />
            <Picker.Item label="General Enquiry" value="general" />
          </Picker>
        </View>

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Message *"
          placeholderTextColor="#666"
          value={formData.message}
          onChangeText={(text) => handleChange('message', text)}
          multiline
          numberOfLines={6}
          editable={!loading}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Enquiry</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.requiredNote}>* Required fields</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    marginBottom: spacing.md,
    fontSize: 16,
  },
  messageInput: {
    paddingTop: spacing.md,
  },
  pickerContainer: {
    backgroundColor: colors.surface,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  picker: {
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  requiredNote: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default ContactScreen;
```

---

## 🎨 PART 4: Create Theme System

**File: `src/shared/styles/theme.ts`**

```typescript
export const colors = {
  primary: '#D4AF37',        // Gold
  background: '#1a1a1a',     // Dark
  surface: '#2a2a2a',        // Surface
  text: '#ffffff',           // White
  textSecondary: '#999999',  // Gray
  error: '#ff4444',          // Error
  success: '#44ff44',        // Success
  warning: '#ffaa44',        // Warning
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  rounded: 24,
};
```

---

## 📱 PART 5: Create Main App Navigation

**File: `src/App.tsx`**

```typescript
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './shared/context/AuthContext';
import { colors } from './shared/styles/theme';

// Import screens
import LoginScreen from './app/auth/login';
import SignupScreen from './app/auth/signup';
import PortfolioScreen from './app/tabs/portfolio';
import PricingScreen from './app/tabs/pricing';
import ContactScreen from './app/tabs/contact';
import DashboardScreen from './app/tabs/dashboard';
import EnquiriesScreen from './app/admin/enquiries';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        const iconMap: { [key: string]: any } = {
          Portfolio: 'image',
          Pricing: 'pricetag',
          Contact: 'mail',
          Dashboard: 'person',
        };
        return (
          <Ionicons
            name={iconMap[route.name] || 'home'}
            size={size}
            color={color}
          />
        );
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopColor: '#333',
        borderTopWidth: 1,
      },
    })}
  >
    <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    <Tab.Screen name="Pricing" component={PricingScreen} />
    <Tab.Screen name="Contact" component={ContactScreen} />
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
  </Tab.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser ? (
        <Stack.Screen name="App" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      {currentUser?.role === 'admin' && (
        <Stack.Screen name="Enquiries" component={EnquiriesScreen} />
      )}
    </Stack.Navigator>
  );
};

const RootApp = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default function App() {
  return (
    <AuthProvider>
      <RootApp />
    </AuthProvider>
  );
}
```

---

## 🔐 PART 6: Environment Configuration

**File: `.env`**

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**File: `.env.example`**

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

---

## 🚀 PART 7: Build & Deploy

### Android Setup

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for Android
eas build --platform android

# Submit to Google Play
eas submit --platform android
```

### iOS Setup (macOS only)

```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Local Development

```bash
# Start dev server
npm start

# iOS (Mac only)
npm run ios
# Or press 'i' in Expo CLI

# Android (requires Android emulator or device)
npm run android
# Or press 'a' in Expo CLI

# Web (optional)
npm run web
# Or press 'w' in Expo CLI
```

---

## 📋 Installation & Setup Checklist

### Prerequisites
- [ ] Node.js 16+ installed
- [ ] npm 8+ installed
- [ ] Expo account created (https://expo.dev)
- [ ] Google Play account created ($25 one-time)
- [ ] Apple Developer account created ($99/year)

### Project Setup
- [ ] Create Expo project
- [ ] Install dependencies
- [ ] Create folder structure
- [ ] Copy API from web version
- [ ] Copy Auth Context
- [ ] Copy Types
- [ ] Copy static data

### Screens
- [ ] Create Login screen
- [ ] Create Portfolio screen
- [ ] Create Pricing screen
- [ ] Create Contact screen
- [ ] Create Dashboard screen
- [ ] Create Admin Enquiries screen

### Configuration
- [ ] Create theme.ts
- [ ] Setup environment variables
- [ ] Create App.tsx navigation
- [ ] Configure app.json

### Testing
- [ ] Test on Android emulator
- [ ] Test on iOS simulator
- [ ] Test all screens
- [ ] Test authentication
- [ ] Test API calls

### Deployment
- [ ] Build for Android (EAS)
- [ ] Build for iOS (EAS)
- [ ] Submit to Google Play
- [ ] Submit to App Store

---

## 📊 App Store Requirements

### Google Play
- App icon (512x512 PNG)
- Screenshots (minimum 2)
- Description
- Category selection
- Content rating
- Privacy policy

### Apple App Store
- App icon (1024x1024 PNG)
- Screenshots (5-7 per device size)
- Preview video (optional)
- Description
- Keywords (30 characters max)
- Support URL
- Privacy policy
- Age rating

---

## 🚀 Next Steps

1. **Initialize project** - Create Expo app structure
2. **Copy code** - Move API, Auth, Types from web
3. **Create screens** - Build 6 mobile screens
4. **Test locally** - Run on emulator/device
5. **Configure build** - Set up EAS builds
6. **Deploy** - Submit to app stores

**Time to deploy: 2-4 weeks**

---

## 📚 Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **Navigation**: https://reactnavigation.org/
- **Supabase Native**: https://supabase.com/docs/guides/auth/native-mobile-deep-linking

---

**Ready to build your mobile app?** Let me know if you need help with any step! 📱🚀
