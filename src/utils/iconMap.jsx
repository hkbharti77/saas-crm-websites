import React from 'react';
import {
  Zap,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  Bot,
  Layers,
  Activity,
  CheckCircle2,
  Database,
  UserCheck,
  Workflow,
  Target,
  BarChart3,
  ArrowRight,
  UserPlus,
  BrainCircuit,
  Users,
  Headset,
  Laptop,
  Home,
  Building2,
  ShoppingBag,
  Landmark,
  GraduationCap,
  Factory,
  Briefcase,
  PhoneCall,
  Mail,
  MessageCircle,
  Smartphone,
  Lock,
  FileText,
  KeyRound,
  Server,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const ICON_MAP = {
  Zap,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  Bot,
  Layers,
  Activity,
  CheckCircle2,
  Database,
  UserCheck,
  Workflow,
  Target,
  BarChart3,
  ArrowRight,
  UserPlus,
  BrainCircuit,
  Users,
  Headset,
  Laptop,
  Home,
  Building2,
  ShoppingBag,
  Landmark,
  GraduationCap,
  Factory,
  Briefcase,
  PhoneCall,
  Mail,
  MessageCircle,
  Smartphone,
  Lock,
  FileText,
  KeyRound,
  Server,
  Clock,
  ArrowUpRight,
  Sparkles,
};

export function renderLucideIcon(iconNameOrElement, props = { size: 20 }) {
  if (!iconNameOrElement) return null;
  if (React.isValidElement(iconNameOrElement)) {
    return iconNameOrElement;
  }
  if (typeof iconNameOrElement === 'string') {
    const Component = ICON_MAP[iconNameOrElement] || Zap;
    return <Component {...props} />;
  }
  if (typeof iconNameOrElement === 'function') {
    const Component = iconNameOrElement;
    return <Component {...props} />;
  }
  return null;
}
