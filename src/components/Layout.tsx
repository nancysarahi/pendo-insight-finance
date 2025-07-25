import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  CreditCard, 
  ArrowUpDown, 
  Bell,
  Settings,
  LogOut 
} from "lucide-react";

declare global {
  interface Window {
    pendo: any;
  }
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const trackPageView = (pageName: string) => {
    if (window.pendo) {
      window.pendo.track('page_viewed', {
        page_name: pageName,
        url: location.pathname
      });
    }
  };

  const trackAction = (action: string, details?: any) => {
    if (window.pendo) {
      window.pendo.track(action, {
        timestamp: new Date().toISOString(),
        ...details
      });
    }
  };

  const navigationItems = [
    { path: "/", icon: Home, label: "Dashboard", pendoId: "nav-dashboard" },
    { path: "/transactions", icon: CreditCard, label: "Transactions", pendoId: "nav-transactions" },
    { path: "/transfer", icon: ArrowUpDown, label: "Transfer", pendoId: "nav-transfer" },
    { path: "/profile", icon: User, label: "Profile", pendoId: "nav-profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FN</span>
              </div>
              <h1 className="text-xl font-bold text-banking-navy">Fancy Nancy Bank</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => trackAction('notification_bell_clicked')}
                data-pendo="notification-bell"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => trackAction('settings_clicked')}
                data-pendo="settings-button"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => trackAction('logout_clicked')}
                data-pendo="logout-button"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-border min-h-screen p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-pendo={item.pendoId}
                  onClick={() => {
                    trackPageView(item.label);
                    trackAction('navigation_clicked', { 
                      destination: item.label,
                      from: location.pathname 
                    });
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-banking-light-blue text-banking-blue font-medium" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;