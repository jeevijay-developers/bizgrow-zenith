import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, Send, Phone, User, Clock, CheckCheck, 
  Search, Filter, Plus, Settings, Zap, Bot, MoreVertical,
  Image, Paperclip, Smile, Mic, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Chat {
  id: string;
  customer_name: string;
  phone: string;
  last_message: string;
  time: string;
  unread: number;
  status: "online" | "offline";
}

interface Message {
  id: string;
  content: string;
  sender: "customer" | "store";
  time: string;
  status: "sent" | "delivered" | "read";
}

const mockChats: Chat[] = [
  { id: "1", customer_name: "Rahul Sharma", phone: "+91 98765 43210", last_message: "Is the Amul butter available?", time: "2 min ago", unread: 2, status: "online" },
  { id: "2", customer_name: "Priya Patel", phone: "+91 98765 43211", last_message: "Thank you for the delivery!", time: "15 min ago", unread: 0, status: "offline" },
  { id: "3", customer_name: "Amit Kumar", phone: "+91 98765 43212", last_message: "When will my order arrive?", time: "1 hour ago", unread: 1, status: "online" },
  { id: "4", customer_name: "Sneha Gupta", phone: "+91 98765 43213", last_message: "Order placed successfully", time: "2 hours ago", unread: 0, status: "offline" },
];

const mockMessages: Message[] = [
  { id: "1", content: "Hello! I would like to order some groceries", sender: "customer", time: "10:30 AM", status: "read" },
  { id: "2", content: "Hi Rahul! Of course, what would you like to order?", sender: "store", time: "10:31 AM", status: "read" },
  { id: "3", content: "I need 1kg Tata Salt, 500g Amul Butter and 2 packets of Maggi", sender: "customer", time: "10:32 AM", status: "read" },
  { id: "4", content: "Sure! That will be ₹328. Should I prepare the order?", sender: "store", time: "10:33 AM", status: "read" },
  { id: "5", content: "Yes please! And can you deliver it by evening?", sender: "customer", time: "10:34 AM", status: "read" },
  { id: "6", content: "Order confirmed! 🎉 It will be delivered by 6 PM today.", sender: "store", time: "10:35 AM", status: "delivered" },
  { id: "7", content: "Is the Amul butter available?", sender: "customer", time: "11:45 AM", status: "read" },
];

const quickReplies = [
  "Order confirmed! 🎉",
  "Your order is on the way!",
  "Thank you for shopping with us!",
  "We'll deliver by 6 PM today.",
  "Yes, that product is available.",
];

const WhatsAppPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredChats = mockChats.filter(chat => 
    chat.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.phone.includes(searchQuery)
  );

  const stats = [
    { label: "Total Chats", value: "156", icon: MessageCircle, color: "text-primary" },
    { label: "Unread", value: "12", icon: MessageCircle, color: "text-orange-500" },
    { label: "Automated", value: "89", icon: Bot, color: "text-green-500" },
    { label: "Response Time", value: "< 5m", icon: Clock, color: "text-blue-500" },
  ];

  return (
    <div className="h-[calc(100vh-120px)] max-w-7xl mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chat Interface */}
      <div className="bg-card rounded-xl border border-border overflow-hidden h-[calc(100%-100px)]">
        <div className="flex h-full">
          {/* Chat List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Search Header */}
            <div className="p-4 border-b border-border space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold flex-1">Conversations</h2>
                <Button size="icon" variant="ghost">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search chats..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                  <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 hover:bg-muted/50 cursor-pointer border-b border-border transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {chat.customer_name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{chat.customer_name}</p>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.last_message}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setSelectedChat(null)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedChat.customer_name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{selectedChat.customer_name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${selectedChat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {selectedChat.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Orders</DropdownMenuItem>
                    <DropdownMenuItem>Block Contact</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'store' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'store'
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-muted rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${
                          msg.sender === 'store' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          <span>{msg.time}</span>
                          {msg.sender === 'store' && (
                            <CheckCheck className={`w-3 h-3 ${msg.status === 'read' ? 'text-blue-400' : ''}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Quick Replies */}
              <div className="px-4 py-2 border-t border-border overflow-x-auto">
                <div className="flex gap-2">
                  {quickReplies.map((reply, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap text-xs"
                      onClick={() => setMessage(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Smile className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Image className="w-5 h-5" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  <Button size="icon" className="h-10 w-10 shrink-0">
                    {message ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 hidden md:flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">WhatsApp Business</h3>
                <p className="text-muted-foreground max-w-sm">
                  Select a conversation to start messaging your customers directly via WhatsApp.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPage;
