import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import type { User } from '@supabase/supabase-js';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const [emailsFile, setEmailsFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [emailPrompt, setEmailPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      }

      if (data?.user) {
        setUser(data.user);
        setLoading(false);
      } else {
        router.push('/login');
      }
    };
    getUser();
  }, [router]);

  const uploadFile = async (file: File, path: string) => {
    if (!user) throw new Error('User not logged in');

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`${user.id}/${path}`, file, { upsert: true });

    if (error) {
      console.error('Error uploading file:', error.message);
      throw error;
    }

    return data;
  };

  const handleUpload = async () => {
    try {
      if (!briefFile || !emailsFile) {
        setMessage('❌ Please upload both files.');
        return;
      }

      await uploadFile(briefFile, 'brand-brief.txt');
      await uploadFile(emailsFile, 'emails.txt');

      setMessage('✅ Files uploaded successfully.');
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed.');
    }
  };

  const handleGenerateEmail = async () => {
    if (!user) {
      setMessage('❌ User not found.');
      return;
    }

    setMessage('Generating email...');
    try {
      const { data: brief, error: briefError } = await supabase.storage
        .from('uploads')
        .download(`${user.id}/brand-brief.txt`);
      if (briefError) console.error('Error downloading brand brief:', briefError.message);

      const { data: emails, error: emailsError } = await supabase.storage
        .from('uploads')
        .download(`${user.id}/emails.txt`);
      if (emailsError) console.error('Error downloading emails:', emailsError.message);

      if (!brief || !emails) {
        setMessage('❌ Missing uploaded files.');
        return;
      }

      const brandBriefText = await brief.text();
      const emailsText = await emails.text();

      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandBrief: brandBriefText,
          exampleEmails: emailsText,
          prompt: emailPrompt,
        }),
      });

      const json = await response.json();
      setGeneratedEmail(json.email || 'No response received.');
      setMessage('✅ Email generated.');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to generate email.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Checking login status...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          🔓 Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-700">
        Upload your Brand Brief and Email Samples to train your AI Agent.
      </p>

      {/* File Upload Section */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium">📄 Brand Brief (.txt, .pdf, .docx):</label>
          <input
            type="file"
            onChange={e => setBriefFile(e.target.files?.[0] || null)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">📁 Email Samples (.txt or .zip):</label>
          <input
            type="file"
            onChange={e => setEmailsFile(e.target.files?.[0] || null)}
            className="mt-1"
          />
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Files
        </button>
      </div>

      <hr className="my-6" />

      {/* Email Generator */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Generate a New Email</h2>
        <textarea
          placeholder="Describe the email you want the AI to write..."
          rows={4}
          className="w-full p-3 border rounded"
          value={emailPrompt}
          onChange={e => setEmailPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerateEmail}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Email
        </button>
      </div>

      {/* Feedback Message */}
      {message && (
        <p className={`mt-4 font-medium ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      {/* Email Output */}
      {generatedEmail && (
        <div className="mt-6 p-4 border rounded bg-white">
          <h3 className="text-lg font-semibold mb-2">AI-Generated Email:</h3>
          <pre className="whitespace-pre-wrap">{generatedEmail}</pre>
        </div>
      )}
    </div>
  );
}