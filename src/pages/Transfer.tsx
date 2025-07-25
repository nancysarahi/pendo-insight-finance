import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowUpDown, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Building
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    pendo: any;
  }
}

const Transfer = () => {
  const [transferAmount, setTransferAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [transferType, setTransferType] = useState("internal");
  const { toast } = useToast();

  const trackAction = (action: string, details?: any) => {
    if (window.pendo) {
      window.pendo.track(action, {
        timestamp: new Date().toISOString(),
        ...details
      });
    }
  };

  const accounts = [
    { id: "checking", name: "Checking Account", number: "****1234", balance: 5245.67 },
    { id: "savings", name: "Savings Account", number: "****5678", balance: 12890.45 },
  ];

  const handleTransfer = () => {
    if (!transferAmount || !fromAccount || !toAccount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    trackAction('transfer_initiated', {
      amount: parseFloat(transferAmount),
      from_account: fromAccount,
      to_account: toAccount,
      transfer_type: transferType
    });

    toast({
      title: "Transfer Initiated",
      description: `$${transferAmount} transfer has been initiated successfully.`,
    });

    // Reset form
    setTransferAmount("");
    setFromAccount("");
    setToAccount("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <ArrowUpDown className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Transfer Money</h1>
          <p className="text-muted-foreground">Send money between accounts or to others</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transfer Type */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={transferType === "internal" ? "banking" : "outline"}
                  className="h-16 flex-col"
                  onClick={() => {
                    setTransferType("internal");
                    trackAction('transfer_type_selected', { type: 'internal' });
                  }}
                  data-pendo="internal-transfer"
                >
                  <ArrowUpDown className="h-6 w-6 mb-2" />
                  Between My Accounts
                </Button>
                <Button
                  variant={transferType === "external" ? "banking" : "outline"}
                  className="h-16 flex-col"
                  onClick={() => {
                    setTransferType("external");
                    trackAction('transfer_type_selected', { type: 'external' });
                  }}
                  data-pendo="external-transfer"
                >
                  <Building className="h-6 w-6 mb-2" />
                  To External Bank
                </Button>
                <Button
                  variant={transferType === "person" ? "banking" : "outline"}
                  className="h-16 flex-col"
                  onClick={() => {
                    setTransferType("person");
                    trackAction('transfer_type_selected', { type: 'person' });
                  }}
                  data-pendo="person-transfer"
                >
                  <Users className="h-6 w-6 mb-2" />
                  To Another Person
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromAccount">From Account</Label>
                  <Select value={fromAccount} onValueChange={setFromAccount} data-pendo="from-account-select">
                    <SelectTrigger>
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} ({account.number}) - ${account.balance.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toAccount">
                    {transferType === "internal" ? "To Account" : 
                     transferType === "external" ? "To Bank Account" : "To Person"}
                  </Label>
                  {transferType === "internal" ? (
                    <Select value={toAccount} onValueChange={setToAccount} data-pendo="to-account-select">
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.filter(acc => acc.id !== fromAccount).map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} ({account.number})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input 
                      placeholder={transferType === "external" ? "Enter account number" : "Enter email or phone"}
                      value={toAccount}
                      onChange={(e) => setToAccount(e.target.value)}
                      data-pendo="recipient-input"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="pl-10"
                    data-pendo="transfer-amount"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Textarea 
                  id="memo" 
                  placeholder="Add a note for this transfer"
                  data-pendo="transfer-memo"
                />
              </div>
            </CardContent>
          </Card>

          {/* Transfer Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Button 
                  variant="banking" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleTransfer}
                  data-pendo="confirm-transfer"
                >
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Transfer ${transferAmount || "0.00"}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => trackAction('transfer_cancelled')}
                  data-pendo="cancel-transfer"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Transfer Limits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Transfer Limits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Daily Limit:</span>
                <span className="font-medium">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Limit:</span>
                <span className="font-medium">$50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Used Today:</span>
                <span className="font-medium text-banking-green">$1,247</span>
              </div>
            </CardContent>
          </Card>

          {/* Processing Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Processing Times</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-banking-green" />
                <div>
                  <p className="font-medium text-sm">Internal Transfers</p>
                  <p className="text-xs text-muted-foreground">Instant</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-warning" />
                <div>
                  <p className="font-medium text-sm">External Transfers</p>
                  <p className="text-xs text-muted-foreground">1-3 business days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-banking-blue" />
                <div>
                  <p className="font-medium text-sm">Person to Person</p>
                  <p className="text-xs text-muted-foreground">Within minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-banking-green" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All transfers are encrypted and monitored for fraud. You'll receive confirmation via email and SMS.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transfer;