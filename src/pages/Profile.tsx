import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  CreditCard,
  Bell,
  Settings,
  Edit
} from "lucide-react";
import { useState } from "react";

declare global {
  interface Window {
    pendo: any;
  }
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const trackAction = (action: string, details?: any) => {
    if (window.pendo) {
      window.pendo.track(action, {
        timestamp: new Date().toISOString(),
        ...details
      });
    }
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    trackAction('edit_profile_toggled', { editing: !isEditing });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    trackAction('profile_saved');
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Demo User</CardTitle>
              <p className="text-muted-foreground">Premium Banking Customer</p>
            </div>
          </div>
          <Button 
            variant={isEditing ? "success" : "banking"}
            onClick={isEditing ? handleSaveProfile : handleEditProfile}
            data-pendo="edit-profile-button"
          >
            {isEditing ? "Save Changes" : <><Edit className="h-4 w-4 mr-2" />Edit Profile</>}
          </Button>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                defaultValue="Demo User" 
                disabled={!isEditing}
                data-pendo="profile-full-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                defaultValue="demo@securebank.com" 
                disabled={!isEditing}
                data-pendo="profile-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                defaultValue="+1 (555) 123-4567" 
                disabled={!isEditing}
                data-pendo="profile-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                defaultValue="123 Banking Street, Financial District, NY 10001" 
                disabled={!isEditing}
                data-pendo="profile-address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Account Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-banking-blue" />
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                </div>
              </div>
              <Button 
                variant="success" 
                size="sm"
                onClick={() => trackAction('2fa_setup_clicked')}
                data-pendo="setup-2fa"
              >
                Enabled
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-banking-blue" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => trackAction('notification_settings_clicked')}
                data-pendo="notification-settings"
              >
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-banking-blue" />
                <div>
                  <p className="font-medium">Linked Cards</p>
                  <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => trackAction('manage_cards_clicked')}
                data-pendo="manage-cards"
              >
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-banking-light-blue rounded-lg">
              <div className="text-2xl font-bold text-banking-blue">5</div>
              <p className="text-sm text-muted-foreground">Years as Customer</p>
            </div>
            <div className="text-center p-6 bg-banking-light-green rounded-lg">
              <div className="text-2xl font-bold text-banking-green">Premium</div>
              <p className="text-sm text-muted-foreground">Account Status</p>
            </div>
            <div className="text-center p-6 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-foreground">A+</div>
              <p className="text-sm text-muted-foreground">Credit Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="banking" 
              className="justify-start h-14"
              onClick={() => trackAction('change_password_clicked')}
              data-pendo="change-password"
            >
              <Shield className="h-5 w-5 mr-3" />
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-14"
              onClick={() => trackAction('download_statements_clicked')}
              data-pendo="download-statements"
            >
              <CreditCard className="h-5 w-5 mr-3" />
              Download Statements
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-14"
              onClick={() => trackAction('privacy_settings_clicked')}
              data-pendo="privacy-settings"
            >
              <Settings className="h-5 w-5 mr-3" />
              Privacy Settings
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-14"
              onClick={() => trackAction('contact_support_clicked')}
              data-pendo="contact-support"
            >
              <Mail className="h-5 w-5 mr-3" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;