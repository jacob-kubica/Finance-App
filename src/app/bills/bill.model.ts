export interface Bill {
  id: string;
  title: string;
  amount: number;
  description: string;
  institution: string;
  category: string;
  frequency: string;
  dueDate: Date;
  paymentMethod: string;
  imagePath: string;
}
