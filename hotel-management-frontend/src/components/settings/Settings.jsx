import React, { useState } from 'react';
import { Bell, Lock, Globe, CreditCard, Palette } from 'lucide-react';
import '../../styles/Forms.css';

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    bookingReminders: true,
    theme: 'light',
    language: 'en',
    currency: 'USD',
    autoLogout: '30'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('notifications');

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/users/${user.id}/settings`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Lock size={16} /> },
    { id: 'preferences', label: 'Preferences', icon: <Globe size={16} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={16} /> }
  ];

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-card card">
          <div className="form-header">
            <h1 className="form-title">Settings</h1>
            <p className="form-description">Customize your experience and preferences</p>
          </div>

          {success && <div className="success-message">{success}</div>}

          {/* Tab Navigation */}
          <div className="tab-navigation" style={{ 
            display: 'flex', 
            marginBottom: '32px', 
            borderBottom: '2px solid #F0F0F0',
            overflowX: 'auto'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id ? '2px solid #FF6B6B' : '2px solid transparent',
                  color: activeTab === tab.id ? '#FF6B6B' : '#666',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ marginBottom: '24px', color: '#333' }}>Notification Preferences</h3>
              
              <div className="setting-group" style={{ marginBottom: '24px' }}>
                <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Email Notifications</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Receive important updates via email</div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px' }}>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: settings.emailNotifications ? '#FF6B6B' : '#ccc',
                      borderRadius: '30px',
                      transition: '0.2s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '22px',
                        width: '22px',
                        left: settings.emailNotifications ? '34px' : '4px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '0.2s'
                      }} />
                    </span>
                  </label>
                </div>

                <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>SMS Notifications</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Receive booking confirmations via SMS</div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px' }}>
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: settings.smsNotifications ? '#FF6B6B' : '#ccc',
                      borderRadius: '30px',
                      transition: '0.2s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '22px',
                        width: '22px',
                        left: settings.smsNotifications ? '34px' : '4px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '0.2s'
                      }} />
                    </span>
                  </label>
                </div>

                <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Marketing Emails</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Receive promotional offers and updates</div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px' }}>
                    <input
                      type="checkbox"
                      checked={settings.marketingEmails}
                      onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: settings.marketingEmails ? '#FF6B6B' : '#ccc',
                      borderRadius: '30px',
                      transition: '0.2s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '22px',
                        width: '22px',
                        left: settings.marketingEmails ? '34px' : '4px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '0.2s'
                      }} />
                    </span>
                  </label>
                </div>

                <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Booking Reminders</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Get reminders about upcoming stays</div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '30px' }}>
                    <input
                      type="checkbox"
                      checked={settings.bookingReminders}
                      onChange={(e) => handleSettingChange('bookingReminders', e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: settings.bookingReminders ? '#FF6B6B' : '#ccc',
                      borderRadius: '30px',
                      transition: '0.2s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '22px',
                        width: '22px',
                        left: settings.bookingReminders ? '34px' : '4px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '0.2s'
                      }} />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Security Tab */}
          {activeTab === 'privacy' && (
            <div>
              <h3 style={{ marginBottom: '24px', color: '#333' }}>Privacy & Security Settings</h3>
              
              <div className="form-group">
                <label className="form-label">Auto Logout (minutes)</label>
                <select
                  value={settings.autoLogout}
                  onChange={(e) => handleSettingChange('autoLogout', e.target.value)}
                  className="form-select"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '8px', marginTop: '24px' }}>
                <h4 style={{ marginBottom: '16px', color: '#333' }}>Data & Privacy</h4>
                <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '12px' }}>
                    Your privacy is important to us. We collect and use your data to provide better service and personalized experiences.
                  </p>
                  <p>
                    You can request to download or delete your data at any time by contacting our support team.
                  </p>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <button className="btn btn-secondary" style={{ marginRight: '8px', fontSize: '14px' }}>
                    Download My Data
                  </button>
                  <button className="btn btn-danger" style={{ fontSize: '14px' }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              <h3 style={{ marginBottom: '24px', color: '#333' }}>App Preferences</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="form-select"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                    className="form-select"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="form-select"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div>
              <h3 style={{ marginBottom: '24px', color: '#333' }}>Billing Information</h3>
              
              <div style={{ padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '16px', color: '#333' }}>Payment Methods</h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p>No payment methods on file.</p>
                  <button className="btn btn-primary" style={{ marginTop: '12px', fontSize: '14px' }}>
                    Add Payment Method
                  </button>
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '16px', color: '#333' }}>Billing History</h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p>No billing history available.</p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="form-actions" style={{ marginTop: '32px' }}>
            <button
              onClick={handleSaveSettings}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading && <span className="loading-spinner"></span>}
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;