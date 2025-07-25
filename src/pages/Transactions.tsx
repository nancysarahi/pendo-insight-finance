import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  ArrowUpDown,
  ShoppingCart,
  Car,
  Home,
  Coffee,
  Smartphone
} from "lucide-react";
import { useState } from "react";

declare global {
  interface Window {
    pendo: any;
  }
}

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const trackAction = (action: string, details?: any) => {
    if (window.pendo) {
      window.pendo.track(action, {
        timestamp: new Date().toISOString(),
        ...details
      });
    }
  };

  const transactions = [
    { 
      id: 1, 
      description: "Netflix Subscription", 
      amount: -15.99, 
      date: "2024-01-24", 
      category: "Entertainment",
      icon: Smartphone,
      pending: false
    },
    { 
      id: 2, 
      description: "Salary Deposit", 
      amount: 3500.00, 
      date: "2024-01-23", 
      category: "Income",
      icon: TrendingUp,
      pending: false
    },
    { 
      id: 3, 
      description: "Whole Foods Market", 
      amount: -89.32, 
      date: "2024-01-22", 
      category: "Groceries",
      icon: ShoppingCart,
      pending: false
    },
    { 
      id: 4, 
      description: "Shell Gas Station", 
      amount: -45.67, 
      date: "2024-01-21", 
      category: "Transportation",
      icon: Car,
      pending: false
    },
    { 
      id: 5, 
      description: "Rent Payment", 
      amount: -1200.00, 
      date: "2024-01-20", 
      category: "Housing",
      icon: Home,
      pending: false
    },
    { 
      id: 6, 
      description: "Starbucks Coffee", 
      amount: -4.75, 
      date: "2024-01-19", 
      category: "Food & Drink",
      icon: Coffee,
      pending: false
    },
    { 
      id: 7, 
      description: "Pending Transfer", 
      amount: -250.00, 
      date: "2024-01-24", 
      category: "Transfer",
      icon: ArrowUpDown,
      pending: true
    },
  ];

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpent = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalEarned = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Track all your financial activities</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => trackAction('export_transactions_clicked')}
            data-pendo="export-transactions"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="banking"
            onClick={() => trackAction('filter_transactions_clicked')}
            data-pendo="filter-transactions"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">-${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-banking-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-banking-green">+${totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-banking-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-banking-green">+${(totalEarned - totalSpent).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by description or category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                trackAction('transaction_search', { search_term: e.target.value });
              }}
              className="pl-10"
              data-pendo="transaction-search"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const IconComponent = transaction.icon;
              return (
                <div 
                  key={transaction.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer ${
                    transaction.pending ? 'border-warning bg-warning/5' : ''
                  }`}
                  onClick={() => trackAction('transaction_clicked', { 
                    transaction_id: transaction.id,
                    category: transaction.category,
                    amount: transaction.amount 
                  })}
                  data-pendo={`transaction-${transaction.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.amount >= 0 ? 'bg-banking-light-green' : 'bg-red-50'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        transaction.amount >= 0 ? 'text-banking-green' : 'text-red-500'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{transaction.description}</p>
                        {transaction.pending && (
                          <span className="px-2 py-1 text-xs bg-warning text-warning-foreground rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      transaction.amount >= 0 ? 'text-banking-green' : 'text-red-500'
                    }`}>
                      {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Load More */}
      <div className="text-center">
        <Button 
          variant="outline"
          onClick={() => trackAction('load_more_transactions_clicked')}
          data-pendo="load-more-transactions"
        >
          Load More Transactions
        </Button>
      </div>
    </div>
  );
};

export default Transactions;