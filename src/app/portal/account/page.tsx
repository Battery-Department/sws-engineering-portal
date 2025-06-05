'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Shield,
  Clock,
  Calendar,
  Award,
  Settings,
  Bell,
  Lock,
  CreditCard,
  Users,
  AlertCircle,
  CheckCircle,
  Camera,
  Upload
} from 'lucide-react';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  company: string;
  joinDate: string;
  lastActive: string;
  avatar?: string;
  permissions: string[];
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export default function PortalAccountPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Simulate API call to fetch user profile
    setTimeout(() => {
      const mockProfile: UserProfile = {
        id: 'user-001',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@swsteamengineering.co.uk',
        phone: '+44 7890 123456',
        position: 'Senior Design Engineer',
        department: 'Engineering',
        location: 'Cornwall, UK',
        company: 'South West Steam Engineering',
        joinDate: '2020-03-15',
        lastActive: '2024-01-25T14:30:00Z',
        permissions: ['project_read', 'project_write', 'cad_access', 'financial_read'],
        notifications: {
          email: true,
          sms: false,
          push: true
        }
      };
      setProfile(mockProfile);
      setEditForm(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (profile && editForm) {
      setProfile({ ...profile, ...editForm });
      setEditing(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm(profile);
    }
    setEditing(false);
  };

  const handleNotificationChange = (type: keyof UserProfile['notifications']) => {
    if (profile) {
      const updated = {
        ...profile,
        notifications: {
          ...profile.notifications,
          [type]: !profile.notifications[type]
        }
      };
      setProfile(updated);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#F8FAFC'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTop: '4px solid #006FEE',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ color: '#6B7280' }}>Loading account information...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#F8FAFC'
      }}>
        <div style={{ textAlign: 'center' }}>
          <AlertCircle size={48} color="#EF4444" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            Account Not Found
          </h2>
          <p style={{ color: '#6B7280' }}>Unable to load account information.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
            Account Settings
          </h1>
          <p style={{ fontSize: '16px', color: '#6B7280' }}>
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          border: '2px solid #E5E7EB',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              fontWeight: '700',
              position: 'relative'
            }}>
              {profile.firstName[0]}{profile.lastName[0]}
              <button style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Camera size={16} color="#6B7280" />
              </button>
            </div>
            
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>
                {profile.firstName} {profile.lastName}
              </h2>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: '0 0 8px 0' }}>
                {profile.position} • {profile.department}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  color: '#10B981'
                }}>
                  <CheckCircle size={16} />
                  Active
                </span>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                  Last active: {new Date(profile.lastActive).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            <button
              onClick={editing ? handleSave : handleEdit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: editing ? '#10B981' : '#006FEE',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {editing ? (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit size={16} />
                  Edit Profile
                </>
              )}
            </button>

            {editing && (
              <button
                onClick={handleCancel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: 'white',
                  color: '#6B7280',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <X size={16} />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '4px', 
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '4px',
          marginBottom: '24px',
          border: '2px solid #E5E7EB'
        }}>
          {[
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'permissions', label: 'Permissions', icon: Lock }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: activeTab === tab.id ? '#006FEE' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#6B7280',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            border: '2px solid #E5E7EB'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
              Profile Information
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={editing ? editForm.firstName : profile.firstName}
                  onChange={(e) => editing && setEditForm({ ...editForm, firstName: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: editing ? 'white' : '#F9FAFB',
                    color: editing ? '#111827' : '#6B7280'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={editing ? editForm.lastName : profile.lastName}
                  onChange={(e) => editing && setEditForm({ ...editForm, lastName: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: editing ? 'white' : '#F9FAFB',
                    color: editing ? '#111827' : '#6B7280'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={editing ? editForm.email : profile.email}
                  onChange={(e) => editing && setEditForm({ ...editForm, email: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: editing ? 'white' : '#F9FAFB',
                    color: editing ? '#111827' : '#6B7280'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editing ? editForm.phone : profile.phone}
                  onChange={(e) => editing && setEditForm({ ...editForm, phone: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: editing ? 'white' : '#F9FAFB',
                    color: editing ? '#111827' : '#6B7280'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Position
                </label>
                <input
                  type="text"
                  value={editing ? editForm.position : profile.position}
                  onChange={(e) => editing && setEditForm({ ...editForm, position: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: editing ? 'white' : '#F9FAFB',
                    color: editing ? '#111827' : '#6B7280'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={editing ? editForm.location : profile.location}
                  onChange={(e) => editing && setEditForm({ ...editForm, location: e.target.value })}
                  disabled={!editing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    fontSize: '14px',
                    backgroundColor: editing ? 'white' : '#F9FAFB',
                    color: editing ? '#111827' : '#6B7280'
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginTop: '32px',
              padding: '24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Company</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{profile.company}</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Department</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{profile.department}</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Join Date</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                  {new Date(profile.joinDate).toLocaleDateString('en-GB')}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            border: '2px solid #E5E7EB'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
              Notification Preferences
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive updates and alerts via email', icon: Mail },
                { key: 'sms', label: 'SMS Notifications', description: 'Receive urgent alerts via SMS', icon: Phone },
                { key: 'push', label: 'Push Notifications', description: 'Receive notifications in your browser', icon: Bell }
              ].map((item) => {
                const IconComponent = item.icon;
                const isEnabled = profile.notifications[item.key as keyof typeof profile.notifications];
                
                return (
                  <div key={item.key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: isEnabled ? '#006FEE' : '#E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size={20} color={isEnabled ? 'white' : '#6B7280'} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                          {item.label}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleNotificationChange(item.key as keyof typeof profile.notifications)}
                      style={{
                        width: '48px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: isEnabled ? '#006FEE' : '#E5E7EB',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: '2px',
                        left: isEnabled ? '26px' : '2px',
                        transition: 'all 0.2s'
                      }}></div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            border: '2px solid #E5E7EB'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>
              Account Permissions
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {profile.permissions.map((permission, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: '#F0F9FF',
                  borderRadius: '8px',
                  border: '1px solid #0EA5E9'
                }}>
                  <CheckCircle size={20} color="#0EA5E9" />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#0C4A6E' }}>
                    {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '24px',
              padding: '20px',
              backgroundColor: '#FEF3C7',
              borderRadius: '8px',
              border: '1px solid #F59E0B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <AlertCircle size={20} color="#D97706" />
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#92400E', margin: 0 }}>
                  Permission Changes
                </h4>
              </div>
              <p style={{ fontSize: '14px', color: '#92400E', margin: 0 }}>
                To request changes to your account permissions, please contact your system administrator or submit a support ticket.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}