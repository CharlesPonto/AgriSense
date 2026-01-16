import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline tracking-wider">Settings</CardTitle>
          <CardDescription>
            Manage your account, preferences, and security settings.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User /> Profile Information
            </CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Admin User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@gmail.com" />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Security Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield /> Security
            </CardTitle>
            <CardDescription>Manage your password and security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Change Password</Button>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bell /> Notification Settings
          </CardTitle>
          <CardDescription>Choose how you want to be notified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
                </div>
                <Switch id="push-notifications" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="risk-alerts">Critical Risk Alerts Only</Label>
                    <p className="text-sm text-muted-foreground">Only get notified for high or critical risks.</p>
                </div>
                <Switch id="risk-alerts" />
            </div>
             <Button>Save Notifications</Button>
        </CardContent>
      </Card>
      
    </div>
  );
}
