import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Green Valley Restaurant',
      email: 'contact@greenvalley.com',
      role: 'donor',
      status: 'verified',
      joinDate: '2024-01-15',
      donations: 45,
      avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=150&fit=crop&crop=center'
    },
    {
      id: 2,
      name: 'City Food Bank',
      email: 'admin@cityfoodbank.org',
      role: 'recipient',
      status: 'verified',
      joinDate: '2024-02-03',
      donations: 0,
      avatar: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&h=150&fit=crop&crop=center'
    },
    {
      id: 3,
      name: 'Metro Grocery Chain',
      email: 'donations@metrogrocery.com',
      role: 'donor',
      status: 'pending',
      joinDate: '2024-08-18',
      donations: 12,
      avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=center'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      role: 'recipient',
      status: 'active',
      joinDate: '2024-07-22',
      donations: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=center'
    },
    {
      id: 5,
      name: 'Downtown Bakery',
      email: 'info@downtownbakery.com',
      role: 'donor',
      status: 'suspended',
      joinDate: '2024-03-10',
      donations: 23,
      avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=150&fit=crop&crop=center'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'suspended':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'donor':
        return 'Store';
      case 'recipient':
        return 'Users';
      default:
        return 'User';
    }
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = filterRole === 'all' || user?.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Roles</option>
              <option value="donor">Donors</option>
              <option value="recipient">Recipients</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Joined</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Activity</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={getRoleIcon(user?.role)} size={16} className="text-muted-foreground" />
                      <span className="text-sm capitalize text-foreground">{user?.role}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                      {user?.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm text-foreground">{user?.joinDate}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-sm text-foreground">
                      {user?.role === 'donor' ? `${user?.donations} donations` : 'N/A'}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;