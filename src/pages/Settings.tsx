import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  CircleUser, 
  CreditCard, 
  Key, 
  Languages, 
  LayoutDashboard, 
  Lock, 
  MailQuestion, 
  Share2, 
  Shield, 
  Smartphone, 
  UserCog,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/hooks/useTheme";
import { useColorTheme } from "@/context/ColorThemeContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function Settings() {
  const { user, updateUser, logout } = useUser();
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [mobileNotifications, setMobileNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Form state for user profile
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [jobTitle, setJobTitle] = useState("Financial Analyst");
  const [bio, setBio] = useState("Financial analyst with 8+ years of experience in portfolio management and investment strategies.");
  
  // Theme settings
  const [darkModeEnabled, setDarkModeEnabled] = useState(theme === "dark");
  const [selectedColorTheme, setSelectedColorTheme] = useState(colorTheme);

  // Sync theme state with the actual theme
  useEffect(() => {
    setDarkModeEnabled(theme === "dark");
  }, [theme]);

  useEffect(() => {
    setSelectedColorTheme(colorTheme);
  }, [colorTheme]);

  const handleSaveChanges = () => {
    // Update user profile
    if (activeTab === "profile") {
      updateUser({ name, email, role });
    } else if (activeTab === "appearance") {
      // Update theme settings
      setTheme(darkModeEnabled ? "dark" : "light");
      setColorTheme(selectedColorTheme);
    }
    
    toast({
      title: "Settings updated",
      description: "Your changes have been successfully saved.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight purple-gradient-text">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-2 sm:grid-cols-4 md:flex md:space-x-2">
            <TabsTrigger value="profile" className="flex items-center gap-1.5">
              <UserCog className="h-4 w-4 mr-1" /> Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-1.5">
              <CircleUser className="h-4 w-4 mr-1" /> Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-1.5">
              <LayoutDashboard className="h-4 w-4 mr-1" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1.5">
              <Bell className="h-4 w-4 mr-1" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 mr-1" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-border/40 shadow-soft">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input 
                      id="role" 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      value={jobTitle} 
                      onChange={(e) => setJobTitle(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="border-border/40 shadow-soft">
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en-US">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-7">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-12">UTC-12:00</SelectItem>
                        <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                        <SelectItem value="utc-7">UTC-07:00 (MST)</SelectItem>
                        <SelectItem value="utc-6">UTC-06:00 (CST)</SelectItem>
                        <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                        <SelectItem value="utc">UTC+00:00 (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Auto-refresh Dashboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically refresh dashboard data every 5 minutes
                      </p>
                    </div>
                    <Switch 
                      checked={autoRefresh} 
                      onCheckedChange={setAutoRefresh} 
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="border-border/40 shadow-soft">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how Fenty Analytics looks on your device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for a more comfortable viewing experience at night
                      </p>
                    </div>
                    <Switch 
                      checked={darkModeEnabled} 
                      onCheckedChange={setDarkModeEnabled} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="density">Layout Density</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="density">
                        <SelectValue placeholder="Select layout density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Adjust the spacing between elements in the interface
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Color Theme</Label>
                    <Select value={selectedColorTheme} onValueChange={setSelectedColorTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select color theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purple">Purple (Default)</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="amber">Amber</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choose the primary color theme for the application
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-border/40 shadow-soft">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Enable Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about important updates and activities
                    </p>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled} 
                  />
                </div>
                
                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Notification Channels</h4>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MailQuestion className="h-4 w-4" />
                        <Label htmlFor="email-notifications" className="cursor-pointer">Email Notifications</Label>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                        disabled={!notificationsEnabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <Label htmlFor="mobile-notifications" className="cursor-pointer">Mobile Notifications</Label>
                      </div>
                      <Switch 
                        id="mobile-notifications" 
                        checked={mobileNotifications} 
                        onCheckedChange={setMobileNotifications} 
                        disabled={!notificationsEnabled}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Notification Types</h4>
                  <div className="grid gap-2">
                    {[
                      { label: "Security Alerts", defaultChecked: true },
                      { label: "Account Changes", defaultChecked: true },
                      { label: "New Features & Updates", defaultChecked: true },
                      { label: "Financial Alerts", defaultChecked: true },
                      { label: "Marketing & Promotions", defaultChecked: false }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center space-x-2">
                        <Checkbox id={item.label.toLowerCase().replace(/\s/g, "-")} defaultChecked={item.defaultChecked} disabled={!notificationsEnabled} />
                        <Label htmlFor={item.label.toLowerCase().replace(/\s/g, "-")} className="text-sm cursor-pointer">
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-border/40 shadow-soft mb-6">
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
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
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-soft">
              <CardHeader>
                <CardTitle>Security Options</CardTitle>
                <CardDescription>Enhance your account security with additional measures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium flex items-center gap-1.5">
                      <Key className="h-4 w-4" /> Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account with two-factor authentication
                    </p>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled} 
                    onCheckedChange={setTwoFactorEnabled} 
                  />
                </div>
                
                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-1.5">
                    <Lock className="h-4 w-4" /> Active Sessions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Manage your active login sessions
                  </p>
                  <div className="rounded-md border p-4 mt-3">
                    <div className="space-y-3">
                      {[
                        { device: "MacBook Pro", location: "San Francisco, CA", time: "Current session" },
                        { device: "iPhone 13", location: "San Francisco, CA", time: "Last active 2 hours ago" }
                      ].map((session, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{session.device}</div>
                            <div className="text-xs text-muted-foreground">{session.location} • {session.time}</div>
                          </div>
                          <Button variant="outline" size="sm">Logout</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-1.5">
                    <Share2 className="h-4 w-4" /> Connected Accounts
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Manage your connected third-party accounts and applications
                  </p>
                  <div className="rounded-md border p-4 mt-3">
                    <div className="space-y-3">
                      {[
                        { name: "Google", status: "Connected", date: "Connected on May 12, 2023" },
                        { name: "Microsoft", status: "Not connected" }
                      ].map((account, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{account.name}</div>
                            <div className="text-xs text-muted-foreground">{account.date || ''}</div>
                          </div>
                          <Button variant={account.status === 'Connected' ? "outline" : "secondary"} size="sm">
                            {account.status === 'Connected' ? 'Disconnect' : 'Connect'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

const Checkbox = ({ id, defaultChecked, disabled }: { id: string, defaultChecked?: boolean, disabled?: boolean }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="rounded border-gray-300 text-primary focus:ring-primary"
      />
    </div>
  );
};
