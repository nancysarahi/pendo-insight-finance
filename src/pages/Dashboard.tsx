import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  PiggyBank,
  ArrowUpDown,
  Plus,
  Eye,
  MoreHorizontal 
} from "lucide-react";

declare global {
  interface Window {
    pendo: any;
  }
}

const Dashboard = () => {
  const trackAction = (action: string, details?: any) => {
    if (window.pendo) {
      window.pendo.track(action, {
        timestamp: new Date().toISOString(),
        ...details
      });
    }
  };

  const accountData = [
    {
      name: "Checking Account",
      number: "****1234",
      balance: 5245.67,
      type: "checking"
    },
    {
      name: "Savings Account", 
      number: "****5678",
      balance: 12890.45,
      type: "savings"
    },
    {
      name: "Credit Card",
      number: "****9012", 
      balance: -1247.89,
      type: "credit"
    }
  ];

  const recentTransactions = [
    { id: 1, description: "Netflix Subscription", amount: -15.99, date: "2024-01-24", category: "Entertainment" },
    { id: 2, description: "Salary Deposit", amount: 3500.00, date: "2024-01-23", category: "Income" },
    { id: 3, description: "Grocery Store", amount: -89.32, date: "2024-01-22", category: "Shopping" },
    { id: 4, description: "Gas Station", amount: -45.67, date: "2024-01-21", category: "Transportation" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Demo User!</h1>
        <p className="opacity-90">Here's your financial overview for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-banking-green">$16,888.23</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,450.00</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,145.32</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">$6,800 of $10,000</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Account Overview</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => trackAction('view_all_accounts_clicked')}
              data-pendo="view-all-accounts"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {accountData.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    account.type === 'checking' ? 'bg-banking-light-blue' :
                    account.type === 'savings' ? 'bg-banking-light-green' : 'bg-red-50'
                  }`}>
                    {account.type === 'checking' ? <DollarSign className="h-5 w-5 text-banking-blue" /> :
                     account.type === 'savings' ? <PiggyBank className="h-5 w-5 text-banking-green" /> :
                     <CreditCard className="h-5 w-5 text-red-500" />}
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${account.balance >= 0 ? 'text-banking-green' : 'text-red-500'}`}>
                    ${account.balance >= 0 ? '' : '-'}${Math.abs(account.balance).toFixed(2)}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => trackAction('account_viewed', { account_type: account.type, account_name: account.name })}
                    data-pendo={`view-${account.type}-account`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => trackAction('view_all_transactions_clicked')}
              data-pendo="view-all-transactions"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.amount >= 0 ? 'bg-banking-light-green' : 'bg-red-50'
                    }`}>
                      {transaction.amount >= 0 ? 
                        <TrendingUp className="h-4 w-4 text-banking-green" /> : 
                        <ArrowUpDown className="h-4 w-4 text-red-500" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${transaction.amount >= 0 ? 'text-banking-green' : 'text-red-500'}`}>
                      {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="banking" 
              className="h-20 flex-col"
              onClick={() => trackAction('transfer_money_clicked')}
              data-pendo="quick-transfer"
            >
              <ArrowUpDown className="h-6 w-6 mb-2" />
              Transfer Money
            </Button>
            <Button 
              variant="success" 
              className="h-20 flex-col"
              onClick={() => trackAction('pay_bills_clicked')}
              data-pendo="quick-pay-bills"
            >
              <CreditCard className="h-6 w-6 mb-2" />
              Pay Bills
            </Button>
            <Button 
              variant="premium" 
              className="h-20 flex-col"
              onClick={() => trackAction('deposit_check_clicked')}
              data-pendo="quick-deposit"
            >
              <Plus className="h-6 w-6 mb-2" />
              Deposit Check
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => trackAction('more_services_clicked')}
              data-pendo="quick-more"
            >
              <MoreHorizontal className="h-6 w-6 mb-2" />
              More Services
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;