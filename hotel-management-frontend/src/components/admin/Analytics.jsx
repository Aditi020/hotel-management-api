import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, Users, Bed } from 'lucide-react';
import { mockAnalytics } from '../../data/mockData';
import '../../styles/Dashboard.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/analytics?period=${selectedPeriod}`);
      // const analyticsData = await response.json();
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="form-container">
        <div className="container text-center">
          <div>Loading analytics...</div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="form-container">
        <div className="container text-center">
          <div>Failed to load analytics data.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Analytics Dashboard</h1>
          <p className="dashboard-subtitle">Track your hotel's performance and insights</p>
        </div>

        {/* Period Selector */}
        <div style={{ marginBottom: '32px' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="form-select"
            style={{ maxWidth: '200px' }}
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-header">
              <span className="stat-title">Total Bookings</span>
              <Calendar size={24} />
            </div>
            <div className="stat-value">{analytics.totalBookings}</div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={16} color="#4CAF50" />
              <span style={{ color: '#4CAF50', fontSize: '14px', marginLeft: '4px' }}>+12% vs last period</span>
            </div>
          </div>

          <div className="stat-card card secondary">
            <div className="stat-header">
              <span className="stat-title">Total Revenue</span>
              <DollarSign size={24} />
            </div>
            <div className="stat-value">${analytics.totalRevenue.toLocaleString()}</div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={16} color="#4CAF50" />
              <span style={{ color: '#4CAF50', fontSize: '14px', marginLeft: '4px' }}>+18% vs last period</span>
            </div>
          </div>

          <div className="stat-card card accent">
            <div className="stat-header">
              <span className="stat-title">Occupancy Rate</span>
              <Bed size={24} />
            </div>
            <div className="stat-value">{analytics.occupancyRate}%</div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={16} color="#4CAF50" />
              <span style={{ color: '#4CAF50', fontSize: '14px', marginLeft: '4px' }}>+5% vs last period</span>
            </div>
          </div>

          <div className="stat-card card success">
            <div className="stat-header">
              <span className="stat-title">Average Stay</span>
              <Users size={24} />
            </div>
            <div className="stat-value">{analytics.averageStay} days</div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={16} color="#4CAF50" />
              <span style={{ color: '#4CAF50', fontSize: '14px', marginLeft: '4px' }}>+0.2 vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="analytics-charts">
          <div className="recent-section">
            {/* Monthly Revenue Chart */}
            <div className="recent-card card">
              <div className="recent-header">
                <h3 className="recent-title">Monthly Revenue</h3>
              </div>
              <div className="chart-container" style={{ height: '300px', display: 'flex', alignItems: 'end', justifyContent: 'space-between', padding: '20px' }}>
                {analytics.monthlyRevenue.map((data, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div
                      style={{
                        width: '40px',
                        backgroundColor: '#FF6B6B',
                        borderRadius: '4px 4px 0 0',
                        height: `${(data.revenue / Math.max(...analytics.monthlyRevenue.map(d => d.revenue))) * 200}px`,
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        paddingBottom: '4px'
                      }}
                    >
                      ${(data.revenue / 1000).toFixed(0)}k
                    </div>
                    <span style={{ fontSize: '12px', color: '#666' }}>{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Type Bookings */}
            <div className="recent-card card">
              <div className="recent-header">
                <h3 className="recent-title">Bookings by Room Type</h3>
              </div>
              <div className="chart-container" style={{ padding: '20px' }}>
                {analytics.roomTypeBookings.map((data, index) => (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>{data.type}</span>
                      <span>{data.bookings} bookings</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#F0F0F0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: index === 0 ? '#FF6B6B' : index === 1 ? '#4ECDC4' : index === 2 ? '#FFA726' : '#66BB6A',
                          width: `${(data.bookings / Math.max(...analytics.roomTypeBookings.map(d => d.bookings))) * 100}%`,
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="recent-card card" style={{ marginTop: '24px' }}>
            <div className="recent-header">
              <h3 className="recent-title">Performance Insights</h3>
            </div>
            <div style={{ padding: '0 24px 24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ color: '#4CAF50', marginBottom: '8px' }}>✓ Strong Performance</h4>
                <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                  <li>Revenue increased by 18% compared to last period</li>
                  <li>Occupancy rate is above industry average (78%)</li>
                  <li>Deluxe rooms are the most popular choice</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ color: '#FF9800', marginBottom: '8px' }}>⚠ Areas for Improvement</h4>
                <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                  <li>Presidential suites have lower booking rates</li>
                  <li>Average stay duration could be improved</li>
                  <li>March showed a slight revenue dip</li>
                </ul>
              </div>
              
              <div>
                <h4 style={{ color: '#2196F3', marginBottom: '8px' }}>💡 Recommendations</h4>
                <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                  <li>Consider promotional packages for presidential suites</li>
                  <li>Implement loyalty programs to increase repeat bookings</li>
                  <li>Focus marketing efforts on high-demand seasons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;