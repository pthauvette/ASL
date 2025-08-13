import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Send,
  Search,
  Plus,
  MoreHorizontal,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Archive,
  Trash2,
  Star,
  Reply,
  Forward,
  Edit,
  Check,
  CheckCheck,
  Clock,
  Users,
  MessageSquare,
  Circle,
  Pin,
  VolumeX,
  Volume2,
  Image,
  FileText,
  Download,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Message, Conversation, ContactInfo, MessagingSystemProps } from './types/messaging-types';
import { DEMO_CONTACTS, DEMO_CONVERSATIONS, DEMO_MESSAGES } from './constants/messaging-constants';
import { 
  formatMessageTime, 
  renderMessageStatus, 
  getContactInfo, 
  getConversationTitle, 
  getConversationAvatar 
} from './utils/messaging-utils';

export function MessagingSystem({ 
  currentUser, 
  onBack, 
  initialConversationId,
  initialContactId 
}: MessagingSystemProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(initialConversationId || null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const loadMessagingData = async () => {
      setIsLoading(true);
      try {
        // Simulation de chargement des données
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setContacts(DEMO_CONTACTS);
        setConversations(DEMO_CONVERSATIONS(currentUser.id));
        setMessages(DEMO_MESSAGES(currentUser.id));
        
        // Si un contact initial est spécifié, créer ou trouver la conversation
        if (initialContactId) {
          let conversation = DEMO_CONVERSATIONS(currentUser.id).find(conv => 
            conv.participantIds.includes(initialContactId) && !conv.isGroup
          );
          
          if (conversation) {
            setSelectedConversation(conversation.id);
          } else {
            // Créer une nouvelle conversation
            const newConv: Conversation = {
              id: `conv-new-${Date.now()}`,
              participantIds: [currentUser.id, initialContactId],
              unreadCount: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              archived: false,
              muted: false,
              pinned: false,
              isGroup: false
            };
            setConversations(prev => [newConv, ...prev]);
            setSelectedConversation(newConv.id);
          }
        }
        
        console.log('✅ Données de messagerie chargées');
      } catch (error) {
        console.error('Erreur chargement messagerie:', error);
        toast.error('Erreur de chargement', {
          description: 'Impossible de charger les messages.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMessagingData();
  }, [currentUser.id, initialContactId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getConversationMessages = (conversationId: string): Message[] => {
    return messages
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const getFilteredConversations = () => {
    let filtered = conversations.filter(conversation => {
      if (!searchQuery) {
        switch (activeTab) {
          case 'unread':
            return conversation.unreadCount > 0;
          case 'archived':
            return conversation.archived;
          case 'groups':
            return conversation.isGroup;
          default:
            return !conversation.archived;
        }
      }
      
      const title = getConversationTitle(conversation, contacts, currentUser.id).toLowerCase();
      return title.includes(searchQuery.toLowerCase()) && !conversation.archived;
    });

    // Trier par épinglé puis par date de mise à jour
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || isSending) return;

    setIsSending(true);
    try {
      const conversation = conversations.find(c => c.id === selectedConversation);
      if (!conversation) return;

      const recipientId = conversation.isGroup ? '' : 
        conversation.participantIds.find(id => id !== currentUser.id) || '';

      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        conversationId: selectedConversation,
        senderId: currentUser.id,
        recipientId,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        read: true,
        type: 'text',
        replyTo: replyingTo?.id
      };

      // Ajouter le message
      setMessages(prev => [...prev, newMsg]);
      
      // Mettre à jour la conversation
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, updatedAt: newMsg.timestamp, lastMessage: newMsg }
          : conv
      ));

      setNewMessage('');
      setReplyingTo(null);
      
      // Simulation de délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Simulation de réponse automatique pour les démos
      if (conversation.participantIds.includes('2') && Math.random() > 0.7) {
        setTimeout(() => {
          const autoReply: Message = {
            id: `msg-auto-${Date.now()}`,
            conversationId: selectedConversation,
            senderId: '2',
            recipientId: currentUser.id,
            content: 'Message reçu ! Je vous réponds bientôt.',
            timestamp: new Date().toISOString(),
            read: false,
            type: 'text'
          };
          setMessages(prev => [...prev, autoReply]);
        }, 2000);
      }
      
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible d\'envoyer le message.'
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markAsRead = (conversationId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.conversationId === conversationId && msg.senderId !== currentUser.id
        ? { ...msg, read: true }
        : msg
    ));
    
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const togglePin = (conversationId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId
        ? { ...conv, pinned: !conv.pinned }
        : conv
    ));
    
    const conversation = conversations.find(c => c.id === conversationId);
    toast.success(conversation?.pinned ? 'Conversation désépinglée' : 'Conversation épinglée');
  };

  const toggleMute = (conversationId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId
        ? { ...conv, muted: !conv.muted }
        : conv
    ));
    
    const conversation = conversations.find(c => c.id === conversationId);
    toast.success(conversation?.muted ? 'Notifications réactivées' : 'Conversation mise en sourdine');
  };

  const archiveConversation = (conversationId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId
        ? { ...conv, archived: true }
        : conv
    ));
    
    if (selectedConversation === conversationId) {
      setSelectedConversation(null);
    }
    
    toast.success('Conversation archivée');
  };

  const renderMessageAttachment = (attachment: any) => (
    <div key={attachment.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border mt-2">
      <FileText className="h-4 w-4 text-gray-500" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
        <p className="text-xs text-gray-500">{(attachment.size / 1024 / 1024).toFixed(1)} MB</p>
      </div>
      <Button variant="ghost" size="sm">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000033] mx-auto mb-4"></div>
          <p className="text-[#43464b]">Chargement de la messagerie...</p>
        </div>
      </div>
    );
  }

  const filteredConversations = getFilteredConversations();

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col lg:flex-row bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Sidebar - Liste des conversations */}
      <div className={`w-full lg:w-80 border-r flex flex-col ${selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
        {/* Header */}
        <div className="p-4 border-b bg-[#f8f9fa]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[#000033]">Messages</h2>
            <div className="flex gap-2">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher des conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="text-xs">Tous</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">Non lus</TabsTrigger>
              <TabsTrigger value="groups" className="text-xs">Groupes</TabsTrigger>
              <TabsTrigger value="archived" className="text-xs">Archivés</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-[#43464b]">
                  {searchQuery ? 'Aucune conversation trouvée' : 'Aucune conversation'}
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const isGroup = conversation.isGroup;
                const title = getConversationTitle(conversation, contacts, currentUser.id);
                const avatar = getConversationAvatar(conversation, contacts, currentUser.id);
                const lastMessage = messages.find(msg => 
                  msg.conversationId === conversation.id &&
                  msg.timestamp === Math.max(
                    ...messages
                      .filter(m => m.conversationId === conversation.id)
                      .map(m => new Date(m.timestamp).getTime())
                  ).toString()
                );

                return (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation.id);
                      markAsRead(conversation.id);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors group relative ${
                      selectedConversation === conversation.id 
                        ? 'bg-[#000033]/5 border border-[#000033]/10' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Indicateur épinglé */}
                    {conversation.pinned && (
                      <div className="absolute top-1 right-1">
                        <Pin className="h-3 w-3 text-[#000033] fill-current" />
                      </div>
                    )}

                    <div className="relative">
                      {isGroup ? (
                        <div className="h-10 w-10 bg-[#000033] rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-[#000033]/10 text-[#000033]">
                              {title.split(' ').map(n => n[0]).join('') || '?'}
                            </AvatarFallback>
                          </Avatar>
                          {/* Online indicator for individual chats */}
                          {!isGroup && (() => {
                            const otherParticipantId = conversation.participantIds.find(id => id !== currentUser.id);
                            const contact = otherParticipantId ? getContactInfo(otherParticipantId, contacts) : null;
                            return contact?.online && (
                              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                            );
                          })()}
                        </>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[#000033] truncate text-sm">
                            {title}
                          </h4>
                          {conversation.muted && (
                            <EyeOff className="h-3 w-3 text-gray-400" />
                          )}
                        </div>
                        {lastMessage && (
                          <span className="text-xs text-[#43464b]">
                            {formatMessageTime(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-[#43464b] truncate">
                          {lastMessage ? (
                            <>
                              {isGroup && lastMessage.senderId !== currentUser.id && (
                                <span className="font-medium">
                                  {getContactInfo(lastMessage.senderId, contacts)?.name.split(' ')[0]}: 
                                </span>
                              )}
                              {lastMessage.attachments?.length ? 
                                `📎 ${lastMessage.attachments[0].name}` : 
                                lastMessage.content
                              }
                            </>
                          ) : 'Aucun message'}
                        </p>
                        
                        <div className="flex items-center gap-1">
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-[#000033] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(conversation.id);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Pin className={`h-3 w-3 ${conversation.pinned ? 'text-[#000033] fill-current' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(conversation.id);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        {conversation.muted ? (
                          <Volume2 className="h-3 w-3 text-gray-400" />
                        ) : (
                          <VolumeX className="h-3 w-3 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {(() => {
            const conversation = conversations.find(c => c.id === selectedConversation);
            if (!conversation) return null;

            const isGroup = conversation.isGroup;
            const title = getConversationTitle(conversation, contacts, currentUser.id);
            const avatar = getConversationAvatar(conversation, contacts, currentUser.id);
            const conversationMessages = getConversationMessages(selectedConversation);

            return (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-[#f8f9fa] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="lg:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="relative">
                      {isGroup ? (
                        <div className="h-10 w-10 bg-[#000033] rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={avatar} />
                          <AvatarFallback className="bg-[#000033]/10 text-[#000033]">
                            {title.split(' ').map(n => n[0]).join('') || '?'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-[#000033] flex items-center gap-2">
                        {title}
                        {conversation.pinned && <Pin className="h-3 w-3 text-[#000033] fill-current" />}
                        {conversation.muted && <EyeOff className="h-3 w-3 text-gray-400" />}
                      </h3>
                      <p className="text-sm text-[#43464b]">
                        {isGroup ? (
                          `${conversation.participantIds.length} participants`
                        ) : (() => {
                          const otherParticipantId = conversation.participantIds.find(id => id !== currentUser.id);
                          const contact = otherParticipantId ? getContactInfo(otherParticipantId, contacts) : null;
                          return contact?.online ? 'En ligne' : 
                            contact?.lastSeen ? `Vu ${formatMessageTime(contact.lastSeen)}` : 'Hors ligne';
                        })()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!isGroup && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => archiveConversation(conversation.id)}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {conversationMessages.map((message, index) => {
                      const isOwn = message.senderId === currentUser.id;
                      const sender = isOwn ? currentUser : (
                        isGroup ? getContactInfo(message.senderId, contacts) : getContactInfo(message.senderId, contacts)
                      );
                      const showAvatar = !isOwn && (
                        index === 0 || 
                        conversationMessages[index - 1].senderId !== message.senderId
                      );

                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                          {!isOwn && (
                            <div className="w-8">
                              {showAvatar ? (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={sender?.avatar} />
                                  <AvatarFallback className="bg-[#000033]/10 text-[#000033] text-xs">
                                    {sender?.name?.split(' ').map(n => n[0]).join('') || '?'}
                                  </AvatarFallback>
                                </Avatar>
                              ) : null}
                            </div>
                          )}
                          
                          <div className={`max-w-[70%] ${isOwn ? 'text-right' : 'text-left'}`}>
                            {/* Sender name for groups */}
                            {!isOwn && isGroup && showAvatar && (
                              <p className="text-xs font-medium text-[#43464b] mb-1">
                                {sender?.name}
                              </p>
                            )}

                            {/* Reply indicator */}
                            {message.replyTo && (
                              <div className={`text-xs p-2 rounded mb-1 border-l-2 ${
                                isOwn ? 'bg-[#000033]/5 border-[#000033]/20' : 'bg-gray-100 border-gray-300'
                              }`}>
                                En réponse à un message précédent
                              </div>
                            )}
                            
                            <div
                              className={`inline-block px-4 py-2 rounded-lg ${
                                isOwn
                                  ? 'bg-[#000033] text-white'
                                  : 'bg-gray-100 text-[#000033]'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              
                              {/* Attachments */}
                              {message.attachments?.map(attachment => 
                                renderMessageAttachment(attachment)
                              )}
                            </div>

                            {/* Edited indicator */}
                            {message.edited && (
                              <p className="text-xs text-gray-400 mt-1">
                                Modifié {message.editedAt ? formatMessageTime(message.editedAt) : ''}
                              </p>
                            )}
                            
                            <div className={`flex items-center gap-1 mt-1 text-xs text-[#43464b] ${isOwn ? 'justify-end' : 'justify-start'}`}>
                              <span>{formatMessageTime(message.timestamp)}</span>
                              {renderMessageStatus(message, currentUser.id)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Reply indicator */}
                {replyingTo && (
                  <div className="px-4 py-2 bg-blue-50 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Reply className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600">
                        En réponse à: {replyingTo.content.substring(0, 50)}...
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                    >
                      ×
                    </Button>
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-3 items-end">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1 relative">
                      <Textarea
                        ref={textareaRef}
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="resize-none pr-12 min-h-[40px] max-h-[120px] py-2"
                        rows={1}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-2 bottom-2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isSending}
                      className="bg-[#000033] hover:bg-[#000033]/90 text-white"
                    >
                      {isSending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#000033] mb-2">Sélectionnez une conversation</h3>
            <p className="text-[#43464b]">
              Choisissez une conversation pour commencer à échanger des messages
            </p>
          </div>
        </div>
      )}
    </div>
  );
}