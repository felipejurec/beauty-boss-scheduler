
import { Appointment, BusinessType, Client, Professional, Service, SubscriptionPlan, User } from "@/types";

export const mockUser: User = {
  id: "user-1",
  name: "João da Silva",
  email: "joao@example.com",
  whatsapp: "+5511999999999",
  isSubscribed: false
};

export const mockBusinessTypes: { id: BusinessType; name: string; icon: string }[] = [
  { id: 'hair_salon', name: 'Salão de Cabelo', icon: '💇‍♀️' },
  { id: 'nail_salon', name: 'Manicure/Pedicure', icon: '💅' },
  { id: 'spa', name: 'Spa & Massagem', icon: '💆‍♀️' },
  { id: 'barber_shop', name: 'Barbearia', icon: '💈' },
  { id: 'esthetician', name: 'Estética Facial', icon: '👩‍⚕️' },
  { id: 'makeup_artist', name: 'Maquiagem', icon: '💄' },
  { id: 'other', name: 'Outros', icon: '✨' }
];

export const mockProfessionals: Professional[] = [
  { id: "prof-1", name: "João da Silva", userId: "user-1" },
  { id: "prof-2", name: "Maria Oliveira", userId: null }
];

export const mockServices: Service[] = [
  { id: "service-1", name: "Corte de Cabelo", duration: 60, price: 80, professionalId: "prof-1" },
  { id: "service-2", name: "Escova", duration: 45, price: 60, professionalId: "prof-1" },
  { id: "service-3", name: "Coloração", duration: 120, price: 150, professionalId: "prof-1" },
  { id: "service-4", name: "Manicure", duration: 45, price: 50, professionalId: "prof-2" }
];

export const mockClients: Client[] = [
  { id: "client-1", name: "Ana Santos", email: "ana@example.com", phone: "+5511988888888", professionalId: "prof-1" },
  { id: "client-2", name: "Paulo Mendes", email: "paulo@example.com", phone: "+5511977777777", professionalId: "prof-1" }
];

export const mockAppointments: Appointment[] = [
  { 
    id: "appt-1", 
    clientId: "client-1", 
    professionalId: "prof-1", 
    serviceId: "service-1", 
    datetime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(), 
    status: "scheduled" 
  },
  { 
    id: "appt-2", 
    clientId: "client-2", 
    professionalId: "prof-1", 
    serviceId: "service-2", 
    datetime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(), 
    status: "scheduled" 
  }
];

export const getServicesByBusinessType = (businessType: BusinessType): { name: string; duration: number; price: number }[] => {
  switch (businessType) {
    case 'hair_salon':
      return [
        { name: "Corte Feminino", duration: 60, price: 80 },
        { name: "Corte Masculino", duration: 30, price: 50 },
        { name: "Escova", duration: 45, price: 60 },
        { name: "Coloração", duration: 120, price: 150 }
      ];
    case 'nail_salon':
      return [
        { name: "Manicure", duration: 45, price: 40 },
        { name: "Pedicure", duration: 60, price: 50 },
        { name: "Esmaltação em Gel", duration: 60, price: 70 },
        { name: "Unhas de Fibra", duration: 120, price: 120 }
      ];
    case 'spa':
      return [
        { name: "Massagem Relaxante", duration: 60, price: 120 },
        { name: "Massagem Modeladora", duration: 60, price: 150 },
        { name: "Drenagem Linfática", duration: 60, price: 130 },
        { name: "Esfoliação Corporal", duration: 45, price: 90 }
      ];
    case 'barber_shop':
      return [
        { name: "Corte Masculino", duration: 30, price: 40 },
        { name: "Barba", duration: 30, price: 35 },
        { name: "Corte + Barba", duration: 60, price: 70 },
        { name: "Pigmentação", duration: 45, price: 50 }
      ];
    case 'esthetician':
      return [
        { name: "Limpeza de Pele", duration: 60, price: 100 },
        { name: "Microagulhamento", duration: 60, price: 200 },
        { name: "Peeling", duration: 45, price: 150 },
        { name: "Botox", duration: 30, price: 350 }
      ];
    case 'makeup_artist':
      return [
        { name: "Maquiagem Social", duration: 60, price: 120 },
        { name: "Maquiagem para Noivas", duration: 90, price: 250 },
        { name: "Design de Sobrancelhas", duration: 30, price: 50 },
        { name: "Extensão de Cílios", duration: 90, price: 180 }
      ];
    default:
      return [
        { name: "Serviço Padrão", duration: 60, price: 100 }
      ];
  }
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Básico",
    price: 89.90,
    features: [
      "1 profissional",
      "Até 100 agendamentos por mês",
      "Link personalizado para agendamentos",
      "Suporte por email"
    ]
  },
  {
    id: "pro",
    name: "Profissional",
    price: 139.90,
    features: [
      "Até 5 profissionais",
      "Agendamentos ilimitados",
      "Link personalizado para agendamentos",
      "Lembretes por WhatsApp",
      "Suporte prioritário"
    ]
  },
  {
    id: "business",
    name: "Empresarial",
    price: 269.90,
    features: [
      "Até 15 profissionais",
      "Agendamentos ilimitados",
      "Link personalizado para agendamentos",
      "Lembretes por WhatsApp",
      "Relatórios avançados",
      "Suporte VIP"
    ]
  }
];
